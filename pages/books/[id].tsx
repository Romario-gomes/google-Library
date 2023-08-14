'use client';
import googleBooksAPI from '../../app/utils/googleBooksApi';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import Link from 'next/link';
import Container from '../../app/components/Container';
import { useState } from 'react';

interface BookDetailsProps{
  book: {
    id: string;
    image: string;
    title: string;
    author: string;
    published_date: string;
    description: string;
  }
}

interface Params extends ParsedUrlQuery {
  id: string;
}

export default function detailsBook({ book }: BookDetailsProps) {

  return (
    <>  
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">BibliotecaJS</span>
      </div>
    </nav>
    <Container>
      <Link href="/" className="inline-flex items-center px-4 py-2 dark:bg-gray-800 hover:dark:bg-gray-900 text-white text-sm font-medium rounded-md">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
        </svg>
        Voltar
      </Link>


      <div className="flex justify-center items-start mt-6 min-h-screen w-full">
        <div className="p-6 border rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-4 text-center">{book.title}</h1>
          <div className="flex mb-4 justify-center">
            <img
              src={book.image || '/images/default.jpg'}
              alt={book.title}
              className="w-32 h-auto mr-4"
            />
            <div>
              <p className="text-gray-600 mb-2">{book.author || 'Autor não encontrado.'}</p>
              <p className="text-gray-600 mb-2">{book.published_date || 'Data de publicação não encontrada'}</p>
            </div>
          </div>
          <p className="text-gray-700">{book.description || 'Descrição não encontrada.'}</p>
        </div>
      </div>
    </Container>
    
    </>
  )
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as Params;
  const response = await googleBooksAPI.get(`volumes/${id}`);

  const bookInfo = response.data.volumeInfo;
  const bookDetails = {
    id: id,
    image: bookInfo.imageLinks?.thumbnail || null,
    title: bookInfo.title || null,
    author: bookInfo.authors?.join(", ") || null,
    published_date: bookInfo.publishedDate || null,
    description: bookInfo?.description?.replace(/<\/?p>|<br>/g, "") || null,
  };


  return {
    props: {
      book: bookDetails,
    },
    redirect: 60 * 30, // 30 minutes
  }
}