import type { GoogleBookItem } from "../../types";

type DialogProps = {
  onClose: VoidFunction;
  data?: GoogleBookItem;
};

export const Dialog = ({ onClose, data }: DialogProps) => {
  return (
    <div className="flex flex-col md:w-[640px] w-full h-[748px] mt-28 rounded-lg top-[370px] left-1/2 bottom-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg z-50 p-3 fixed">
      <div className="flex">
        <div
          className={`flex items-center justify-center w-1/2 h-[369px] ${
            data?.volumeInfo.imageLinks?.thumbnail ? "bg-black" : "bg-white"
          }`}
        >
          {data?.volumeInfo.imageLinks?.thumbnail ? (
            <img
              src={data.volumeInfo.imageLinks?.thumbnail}
              alt={data.volumeInfo.title}
              className="h-full w-3/4 object-cover rounded-t-lg"
            />
          ) : (
            <img
              src="public/not-found.png"
              alt="Capa não encontrada"
              className="h-full w-3/4 object-cover rounded-t-lg"
            />
          )}
        </div>

        <div className="flex flex-col ml-3 p-2 w-1/2 justify-between h-full">
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold text-[#6C63FF]">
              {data?.volumeInfo.title}
            </h3>
            {data?.volumeInfo.authors && (
              <div className="flex flex-col mt-3">
                <p className="text-xs text-[#8B8B8B] font-semibold">
                  Autor(a):
                </p>
                <p className="text-sm text-[#8B8B8B] font-normal">
                  {data.volumeInfo.authors[0]}
                </p>
              </div>
            )}
            {data?.volumeInfo.publishedDate && (
              <div className="flex flex-col mt-3">
                <p className="text-xs text-[#8B8B8B] font-semibold">
                  Data de publicação:
                </p>
                <p className="text-sm text-[#8B8B8B] font-normal">
                  {new Date(data.volumeInfo.publishedDate).toLocaleDateString(
                    "pt-BR"
                  )}
                </p>
              </div>
            )}
            {data?.volumeInfo.publisher && (
              <div className="flex flex-col mt-3">
                <p className="text-xs text-[#8B8B8B] font-semibold">Editora:</p>
                <p className="text-sm text-[#8B8B8B] font-normal">
                  {data.volumeInfo.publisher}
                </p>
              </div>
            )}

            {data?.volumeInfo.publisher && (
              <div className="flex flex-col mt-3">
                <p className="text-xs text-[#8B8B8B] font-semibold">
                  Número de páginas:
                </p>
                <p className="text-sm text-[#8B8B8B] font-normal">
                  {data.volumeInfo.pageCount}
                </p>
              </div>
            )}
          </div>

          <button className="bg-[#6C63FF] h-[40px] rounded-lg text-white text-base font-semibold mt-3 cursor-pointer">
            Ler prévia
          </button>
        </div>

        <img
          src="public/close.svg"
          alt="Fechar"
          onClick={onClose}
          className="h-[15px] w-[15px] cursor-pointer"
        />
      </div>

      <div className="mt-5">
        <h4 className="text-base font-semibold text-[#8B8B8B]">Sinopse</h4>
        <p className="text-base font-normal text-[#8B8B8B] mt-2">
          {data?.volumeInfo.description || "Descrição não disponível."}
        </p>
      </div>
    </div>
  );
};
