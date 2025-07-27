import { Brand } from "..";
import { render, screen } from "@testing-library/react";

describe("<Brand />", () => {
  it("should render the Brand Component correctly", () => {
    const text = "Alura Buscante";
    render(
      <Brand>
        <h1>{text}</h1>
      </Brand>
    );

    expect(screen.getByRole("heading", { name: text })).toBeInTheDocument();
    expect(screen.getByTestId("brand")).toBeInTheDocument();
  });

  it("should render the Brand Component with a custom className", () => {
    const className = "custom-class";
    render(<Brand className={className} />);

    expect(screen.getByTestId("brand")).toHaveClass(className);
  });
});
