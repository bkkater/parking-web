/**
 * Testa o aparecimento do Menu.
 */
describe("Open menu content", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should be possible to open menu", () => {
    cy.get('[data-testid="btn_menu"]').click();
    cy.get('[data-testid="dialog_menu"').should(
      "have.attr",
      "data-state",
      "open",
    );
  });
});

/**
 * Testa a navegalibilidade do Menu.
 */
describe("Navigate between menu links", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get('[data-testid="btn_menu"]').click();
    cy.get('[data-testid="dialog_menu"').should(
      "have.attr",
      "data-state",
      "open",
    );
  });

  it("should be possible to open the entry tab", () => {
    cy.get('[data-testid="dialog_menu_entry"]').click();

    cy.location("pathname").should("eq", "/");
    cy.location("search").should("eq", "?tab=entry");
  });

  it("should be possible to open the exit tab", () => {
    cy.get('[data-testid="dialog_menu_exit"]').click();

    cy.location("pathname").should("eq", "/");
    cy.location("search").should("eq", "?tab=exit");
  });
});
