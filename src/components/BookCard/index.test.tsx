import {render, screen} from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { BookCard } from "."
import { generateBookMock } from "../../mocks"

const [bookData] = generateBookMock(1);

describe("<BookCard/>", () => {
    it("should render the BookCard componente with book data", () => {
        render(<BookCard bookData={bookData} onBookSelected={jest.fn()}/>)
        expect(screen.getByRole("img", {name: bookData.volumeInfo.title})).toBeInTheDocument()
        expect(screen.getByTestId("book-card-image")).toHaveClass("bg-black")
        expect(screen.getByText(bookData.volumeInfo.title)).toBeInTheDocument()
        expect(screen.getByText(bookData.volumeInfo.authors?.[0] || "")).toBeInTheDocument()
        expect(screen.getByText(bookData.volumeInfo.publisher || "")).toBeInTheDocument()
        expect(screen.getByText(new Date(bookData.volumeInfo.publishedDate || "").toLocaleDateString("pt-BR"))).toBeInTheDocument()
    });

    it("should call onBookSelected when the card is clicked", async () => {
        const mockSelectedBookFn = jest.fn();
        render(<BookCard bookData={bookData} onBookSelected={mockSelectedBookFn}/>)

        const bookButton = screen.getByRole("button", {name: /mais detalhes/i})

        await userEvent.click(bookButton);
        expect(mockSelectedBookFn).toHaveBeenCalledWith(bookData)
    });

    it("should display a placeholder image if the book cover is not available", () => {
        const mockBookWithoutImage = {
            ...bookData,
            volumeInfo: {
                ...bookData.volumeInfo,
                imageLinks: undefined
            }
        }

        render(<BookCard bookData={mockBookWithoutImage} onBookSelected={jest.fn()}/>)

        expect(screen.getByTestId("book-card-image")).toHaveClass("bg-white");
        expect(screen.getByRole("img", {name: "Capa não encontrada"})).toBeInTheDocument()
    })
})