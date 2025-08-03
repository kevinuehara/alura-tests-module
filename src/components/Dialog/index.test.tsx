import {render, screen} from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Dialog } from "."
import { generateBookMock } from "../../mocks"

const [bookMock] = generateBookMock(1);

describe("<Dialog/>", () => {
    it("should render the Dialog component with book data", () => {
        render(<Dialog onClose={jest.fn()} data={bookMock} />)

        expect(screen.getByRole("img", {name: bookMock.volumeInfo.title})).toBeInTheDocument()
        expect(screen.getByText(bookMock.volumeInfo.title)).toBeInTheDocument()
        expect(screen.getByText(bookMock.volumeInfo.authors?.[0] || "")).toBeInTheDocument()
        expect(screen.getByText(bookMock.volumeInfo.publisher || "")).toBeInTheDocument();
        expect(screen.getByText(new Date(bookMock.volumeInfo.publishedDate || "").toLocaleDateString("pt-BR"))).toBeInTheDocument()
        expect(screen.getByText(bookMock.volumeInfo.description || "")).toBeInTheDocument()
    })

    it("shoudl display a placeholder image if the book cover is not available", () => {
        const mockBookWithoutImage = {
            ...bookMock,
            volumeInfo: {
                ...bookMock.volumeInfo,
                imageLinks: undefined
            }
        };

        render(<Dialog onClose={jest.fn()} data={mockBookWithoutImage}/>)
        expect(screen.getByRole("img", {name: "Capa não encontrada"})).toBeInTheDocument()
    })

    it("shoudl call onClose when the close button is clicked", async () => {
        const mockCloseFn = jest.fn();
        render(<Dialog onClose={mockCloseFn} data={bookMock}/>)

        const closeButton = screen.getByAltText("Fechar");
        await userEvent.click(closeButton)

        expect(mockCloseFn).toHaveBeenCalled()
    })
})