import { useCallback, useState } from "react";
import { Brand } from "./components/Brand";
import { SearchInput } from "./components/SearchInput";
import type { GoogleBookItem, GoogleBooksResponse } from "./types";
import axios from "axios";
import { BookCard } from "./components/BookCard";
import { Dialog } from "./components/Dialog";

function App() {
  const [booksResults, setBooksResults] = useState<GoogleBooksResponse>();
  const [selectedBook, setSelectedBook] = useState<GoogleBookItem>();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBooks = useCallback(async (query: string) => {
    try {
      const response = await axios.get<GoogleBooksResponse>(
        "https://www.googleapis.com/books/v1/volumes",
        {
          params: {
            q: query,
          },
        }
      );

      setIsLoading(false);
      setBooksResults(response.data);
    } catch (error) {
      console.error("Erro ao buscar livros:", error);
    }
  }, []);

  return (
    <div className="w-screen h-screen">
      <header>
        <Brand className="w-full h-[96px] flex items-center justify-between">
          <img
            src="public/logo.png"
            alt="Logo Buscante"
            className="w-[235px] h-[59px] ml-20"
          />
          <nav className="flex gap-3 mr-20">
            <li className="text-white text-lg font-normal list-none">
              <a href="#">Home</a>
            </li>
            <li className="text-white text-lg font-normal list-none">
              <a href="#">Sobre</a>
            </li>
          </nav>
        </Brand>
      </header>

      <section className="mt-10 flex flex-col gap-1 items-center">
        <div className="flex flex-col items-center w-full max-w-md">
          <h1 className="text-2xl font-semibold text-[#6C63FF] text-center">
            Que livro você procura?
          </h1>

          <SearchInput
            onSearch={(value) => {
              fetchBooks(value);
              setIsLoading(true);
            }}
          />

          <div className="w-full">
            <p className="text-base text-left text-[#8B8B8B] font-normal">
              Busque por assunto, autoria, nome...
            </p>
          </div>
        </div>
      </section>

      {!booksResults && (
        <section className="flex flex-col items-center justify-center mt-5">
          <div className="w-[439px]">
            <h2 className="font-semibold text-[32px] text-start">
              Busque o livro que quiser na nossa estante!
            </h2>
          </div>

          <img
            src="public/image-home.png"
            alt="home image"
            className="w-[380px] h-[380px] mt-5"
          />
        </section>
      )}

      {isLoading && (
        <div data-testid="loader" role="status" className="flex items-center justify-center mt-20">
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      )}

      {booksResults && booksResults.totalItems > 0 && (
        <section className="w-full mt-5 pb-[100px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto px-4">
            {booksResults.items.map((book) => (
              <BookCard
                bookData={book}
                key={book.id}
                onBookSelected={(book) => {
                  setSelectedBook(book);
                  setDialogOpen(true);
                }}
              />
            ))}
          </div>
        </section>
      )}

      {dialogOpen && selectedBook && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" />
          <Dialog data={selectedBook} onClose={() => setDialogOpen(false)} />
        </>
      )}

      <footer>
        <Brand className="w-full h-[83px] flex items-center justify-center fixed bottom-0">
          <img
            src="public/register.png"
            alt="Logo"
            className="w-[28px] h-[27px]"
          />
          <p className="text-white text-medi font-base ml-2">
            Desenvolvido por Alura
          </p>
        </Brand>
      </footer>
    </div>
  );
}

export default App;
