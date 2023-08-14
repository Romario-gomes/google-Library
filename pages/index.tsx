'use client';
import { useRouter } from 'next/router'; // Importando o useRouter
import { useEffect, useState } from 'react';

import googleBooksAPI from '../app/utils/googleBooksApi';
import BookItem from '../app/components/BookItem';
import LoadingSpinner from '../app/components/Loading';

export interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    publishedDate?: string;
    imageLinks?: {
      thumbnail?: string;
    };
  };
}
export default function Home() {
  const router = useRouter();
  const [books, setBooks] = useState([]);
  const [ isLoading, setIsLoading ] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const { page = '1', search = 'a' } = router.query;
  const pageInIntFormat = parseInt(page as string);
  const itemsPerPage = 12;

  useEffect(() => {
    async function fetchBooks() {
      try {
        const startIndex = (pageInIntFormat - 1) * itemsPerPage;
        const response = await googleBooksAPI.get('volumes', {
          params: {
            q: search ? search : 'a',
            startIndex: startIndex,
            maxResults: itemsPerPage,
          },
        });
        setBooks(response.data.items);
        setTotalItems(response.data.totalItems);
        setIsLoading(true);

      } catch (error) {
        console.error('Error fetching books:', error);
      }
    }

    fetchBooks();
  }, [page, search]);

  const handlePageChange = (newStartIndex: number) => {
    router.push({
      pathname: '/',
      query: { ...router.query, page: newStartIndex.toString() },
    });
  };

  const handleSearchChange = (value: string) => {
    router.push({
      pathname: '/',
      query: { ...router.query, search: value },
    });
  };
  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">BibliotecaJS</span>
          <div className="flex md:order-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
                <span className="sr-only">Search icon</span>
              </div>
              <input type="text" value={search}
                onChange={(e) => handleSearchChange(e.target.value)} id="search-navbar" className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." />
            </div>
          </div>

        </div>
      </nav>
      <div className="min-h-screen bg-neutral-200 p-8">
        <h1 className="text-2xl font-semibold mb-4 text-center">Registros encontrados</h1>
        { !isLoading ? (
          <LoadingSpinner />
        ) :  ''}
        {books && books.length > 0 ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {books.map((book: Book) => (
              <BookItem key={book.id} book={book} />
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">Nenhum livro disponível.</p>
        )}
        <div className="mt-4 flex justify-between">
          <button
            onClick={() => handlePageChange(Math.max(pageInIntFormat - 1, 0))}
            disabled={pageInIntFormat <= 1}
            className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 rounded hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <svg className="w-3.5 h-3.5 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4" />
            </svg>
            Anterior
          </button>
          <button
            onClick={() => handlePageChange(pageInIntFormat + 1)}
            disabled={pageInIntFormat + itemsPerPage >= totalItems}
            className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Proxima
            <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
