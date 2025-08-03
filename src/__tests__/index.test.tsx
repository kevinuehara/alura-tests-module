import {render, screen, waitFor} from "@testing-library/react"
import App from "../App"
import axios from "axios"
import userEvent from "@testing-library/user-event"
import {base, faker} from "@faker-js/faker"
import { generateBookMock } from "../mocks"

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>

const bookMocks = generateBookMock(3);
const fakeQuery = faker.lorem.words(1);
const baseUrl = "https://www.googleapis.com/books/v1/volumes";

describe("<App/>", () => {
    it("should render the App component with header and search input", () => {
        render(<App/>);

        expect(screen.getByRole("img", {name: /Logo Buscante/i}))
        expect(screen.getByText(/que livro você procura/i)).toBeInTheDocument();
        expect(screen.getByRole("textbox")).toBeInTheDocument();
        expect(screen.getByText(/busque o livro que quiser na nossa estante/i)).toBeInTheDocument()
        expect(screen.getByAltText("home image")).toBeInTheDocument()
    });

    it("should fetch books when a search is performed", async () => {
        mockedAxios.get.mockImplementation(() => new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    data: {
                        totalItems: bookMocks.length,
                        items: bookMocks
                    }
                })
            }, 100)
        }))

        render(<App/>)
        const input = screen.getByRole("textbox")
        await userEvent.type(input, `${fakeQuery}{enter}`)

        expect(mockedAxios.get).toHaveBeenCalledWith(baseUrl, {params: {q: fakeQuery}})

        expect(await screen.findByRole("status")).toBeInTheDocument()

        await waitFor(() => {
            expect(screen.queryByRole("status")).toBeNull()
        })

        expect(screen.getAllByTestId("book-card-image")).toHaveLength(bookMocks.length)
    });

    it("should open dialog when a book is selected", async () => {
        mockedAxios.get.mockResolvedValueOnce({
            data: {
                kind: faker.word.sample(),
                totalItems: bookMocks.length,
                items: bookMocks
            }
        })

        render(<App/>)

        const input = screen.getByRole("textbox")
        await userEvent.type(input, `${fakeQuery}{enter}`)

        await userEvent.click(
            screen.getAllByRole("button", {name: /mais detalhes/i})[0]
        )

        await waitFor(() => {
            expect(screen.getByTestId("book dialog")).toBeInTheDocument()
        })

        const closeButton = screen.getByAltText("Fechar")
        await userEvent.click(closeButton)

        expect(screen.queryByTestId("book dialog")).toBeNull()
    })
    
    it("should handle erros when fetching books", async () => {
        const consoleErrorMock = jest.spyOn(console, "error").mockImplementation(() => {})
        mockedAxios.get.mockRejectedValueOnce(new Error("Network Error"))

        render(<App/>)
        const input = screen.getByRole("textbox");
        await userEvent.type(input , `${fakeQuery}{enter}`)

        expect(mockedAxios.get).toHaveBeenCalledWith(baseUrl, {params: {q: fakeQuery}})

        expect(consoleErrorMock).toHaveBeenCalledWith("Erro ao buscar livros:", expect.any(Error))
        consoleErrorMock.mockRestore()
    })
})