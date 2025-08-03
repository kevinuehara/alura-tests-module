import {render, screen} from "@testing-library/react"
import { SearchInput } from "."
import userEvent from "@testing-library/user-event";

describe("<SearchInput/>", () => {
    it("should render the SearchInput component", () => {
        render(<SearchInput onSearch={jest.fn()} />);
        expect(screen.getByRole("textbox")).toBeInTheDocument();
        expect(screen.getByRole("button")).toBeInTheDocument();
        expect(screen.getByRole("img", {name: /google logo/i})).toBeInTheDocument()
    });

    it("should call onSearch with the input value when Enter is pressed", async () => {
        const mockOnSearch = jest.fn();
        render(<SearchInput onSearch={mockOnSearch}/>)

        const input = screen.getByRole("textbox");
        await userEvent.type(input, "test");
        await userEvent.type(input, "{enter}");
        expect(mockOnSearch).toHaveBeenCalledWith("test")
    });

    it("should call onSearch with the input value when the search icon is clicked", async () => {
        const mockOnSearch = jest.fn();
        render(<SearchInput onSearch={mockOnSearch}/>)

        const input = screen.getByRole("textbox")
        const searchButton = screen.getByRole("button");

        await userEvent.type(input, "test")
        await userEvent.click(searchButton);

        expect(mockOnSearch).toHaveBeenCalledWith("test")
    })
})