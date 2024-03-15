/**
 * Testa o click ícone de Back do Box.
 */
describe("Click back", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.visit("/history/ABC-0000");
  });

  it("should redirect to back page on click", () => {
    cy.get('[data-testid="box_back_btn"]').click();

    cy.location("pathname").should("eq", "/");
  });
});
