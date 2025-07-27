import { useState } from "react";

type SearchInputProps = {
  onSearch: (value: string) => void;
};

export const SearchInput = ({ onSearch }: SearchInputProps) => {
  const [searchInput, setSearchInput] = useState("");

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSearch(searchInput);
      setSearchInput("");
    }
  };

  return (
    <div className="flex items-center border-2 border-[#6C63FF] rounded-lg px-4 py-2 max-w-md w-[474px]">
      {searchInput.length === 0 && (
        <img
          src="public/google-icon.png"
          alt="google logo"
          className="h-[24px] w-[70px] mr-3 opacity-30"
        />
      )}

      <input
        type="text"
        value={searchInput}
        className="flex-1 outline-none bg-transparent text-sm
                 transition-all duration-200
                 group-focus-within:flex-grow"
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyUp={handleKeyPress}
      />
      <button className="cursor-pointer" onClick={() => onSearch(searchInput)}>
        <img
          src="public/search.svg"
          alt="search icon"
          className="h-[24px] w-[24px] ml-3"
        />
      </button>
    </div>
  );
};
