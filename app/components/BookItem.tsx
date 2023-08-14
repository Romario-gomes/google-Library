import Link from "next/link";
import { Book } from "../../pages";
import Image from 'next/image';

interface BookItemProps {
  book: Book;
}

const BookItem: React.FC<BookItemProps> = ({ book }) => {
  return (
    <li key={book.id} className="bg-white rounded-lg shadow-md p-4">
      <Link href={`/books/${book.id}`}>
        <div className="flex items-center justify-center mb-4">
          <Image
            src={book.volumeInfo.imageLinks?.thumbnail || '/images/default.jpg'}
            alt={`${book.volumeInfo.title} cover`}
            width={96} // Defina a largura desejada
            height={144} // Defina a altura desejada
            className="object-cover"
          />
        </div>
        <h2 className="text-lg text-gray-600 font-semibold text-center">{book.volumeInfo.title}</h2>
        <p className="text-gray-600 mb-2">{book.volumeInfo.authors?.join(', ')}</p>
        <p className="text-gray-500">{book.volumeInfo.publishedDate}</p>
      </Link>
    </li>
  );
};

export default BookItem;