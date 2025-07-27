import { render, screen } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";

describe("<App />", () => {
  it("should call API and render the cards of books", async () => {
    render(<App />);

    const input = screen.getByRole("textbox");
    await userEvent.type(input, `Harry potter{enter}`);

    const bookCards = await screen.findAllByText(/harry/i);
    expect(bookCards.length).toBeGreaterThan(0);
  });
});
