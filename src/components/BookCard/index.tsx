import type { GoogleBookItem } from "../../types";

type BookCardProps = {
  bookData: GoogleBookItem;
  onBookSelected: (book: GoogleBookItem) => void;
};

export const BookCard = ({ bookData, onBookSelected }: BookCardProps) => {
  return (
    <div className="flex rounded-lg sm:w-1/2 md:w-[307px] mt-5 mr-2 border border-gray-300 shadow-md">
      <div
        data-testid="book-card-image"
        className={`flex items-center w-1/2 h-full ${
          bookData.volumeInfo.imageLinks?.thumbnail ? "bg-black" : "bg-white"
        }`}
      >
        {bookData.volumeInfo.imageLinks?.thumbnail ? (
          <img
            src={bookData.volumeInfo.imageLinks.thumbnail}
            alt={bookData.volumeInfo.title}
            className="h-[270px] w-full object-cover rounded-t-lg"
          />
        ) : (
          <img
            src="public/not-found.png"
            alt="Capa não encontrada"
            className="h-[270px] w-full object-cover rounded-t-lg"
          />
        )}
      </div>

      <div className="flex flex-col ml-3 p-2 w-1/2 justify-between h-full">
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold text-[#6C63FF]">
            {bookData.volumeInfo.title}
          </h3>
          {bookData.volumeInfo.authors && (
            <div className="flex flex-col mt-1">
              <p className="text-xs text-[#8B8B8B] font-semibold">Autor(a):</p>
              <p className="text-sm text-[#8B8B8B] font-normal">
                {bookData.volumeInfo.authors[0]}
              </p>
            </div>
          )}
          {bookData.volumeInfo.publishedDate && (
            <div className="flex flex-col mt-1">
              <p className="text-xs text-[#8B8B8B] font-semibold">
                Data de publicação:
              </p>
              <p className="text-sm text-[#8B8B8B] font-normal">
                {new Date(bookData.volumeInfo.publishedDate).toLocaleDateString(
                  "pt-BR"
                )}
              </p>
            </div>
          )}
          {bookData.volumeInfo.publisher && (
            <div className="flex flex-col mt-1">
              <p className="text-xs text-[#8B8B8B] font-semibold">Editora:</p>
              <p className="text-sm text-[#8B8B8B] font-normal">
                {bookData.volumeInfo.publisher}
              </p>
            </div>
          )}
        </div>

        <button
          className="bg-[#6C63FF] h-[40px] rounded-lg text-white text-base font-semibold mt-3 cursor-pointer"
          onClick={() => onBookSelected(bookData)}
        >
          Mais detalhes
        </button>
      </div>
    </div>
  );
};
