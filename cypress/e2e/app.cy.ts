describe("App", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should display the homepage correctly", () => {
    cy.contains("Que livro você procura?").should("be.visible");
    cy.get("input[data-testid='search-input']").should("be.visible");
  });

  it("should search for books and display results", () => {
    cy.get("input[data-testid='search-input']").type("Harry Potter{enter}");

    cy.get("[data-testid='loader']").should("be.visible");

    cy.get("[data-testid='loader']").should("not.exist");
    cy.contains(/harry/i).should("exist");
  });

  it("should open and close the book details dialog", () => {
    cy.get("input[data-testid='search-input']").type("Harry Potter{enter}");

    cy.get("div")
      .filter(':contains("Harry")')
      .first()
      .contains("Mais detalhes")
      .click();

    cy.get("[data-testid='book dialog']").should("be.visible");

    cy.get("[data-testid='close dialog']").click();
    cy.get("[data-testid='book dialog']").should("not.exist");
  });
});
