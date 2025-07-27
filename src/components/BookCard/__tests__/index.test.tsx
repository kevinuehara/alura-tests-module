import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BookCard } from "..";
import { generateBookMock } from "../../../mocks";

const [bookMock] = generateBookMock(1);

describe("<BookCard />", () => {
  it("should render the BookCard component with book data", () => {
    const mockSelectBookFn = jest.fn();
    render(<BookCard bookData={bookMock} onBookSelected={mockSelectBookFn} />);

    expect(
      screen.getByRole("img", { name: bookMock.volumeInfo.title })
    ).toBeInTheDocument();
    expect(screen.getByTestId("book-card-image")).toHaveClass("bg-black");
    expect(screen.getByText(bookMock.volumeInfo.title)).toBeInTheDocument();
    expect(
      screen.getByText(bookMock.volumeInfo.authors?.[0] || "")
    ).toBeInTheDocument();
    expect(
      screen.getByText(bookMock.volumeInfo.publisher || "")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        new Date(bookMock.volumeInfo.publishedDate || "").toLocaleDateString(
          "pt-BR"
        )
      )
    ).toBeInTheDocument();
  });

  it('should call "onBookSelected" when the card is clicked', async () => {
    const mockSelectBookFn = jest.fn();
    render(<BookCard bookData={bookMock} onBookSelected={mockSelectBookFn} />);

    const bookButton = screen.getByRole("button", {
      name: /Mais detalhes/i,
    });

    await userEvent.click(bookButton);

    expect(mockSelectBookFn).toHaveBeenCalledWith(bookMock);
  });

  it("should display a placeholder image if the book cover is not available", () => {
    const mockBookWithoutImage = {
      ...bookMock,
      volumeInfo: {
        ...bookMock.volumeInfo,
        imageLinks: undefined,
      },
    };

    render(
      <BookCard bookData={mockBookWithoutImage} onBookSelected={jest.fn()} />
    );

    expect(screen.getByTestId("book-card-image")).toHaveClass("bg-white");

    expect(
      screen.getByRole("img", { name: "Capa não encontrada" })
    ).toBeInTheDocument();
  });
});
