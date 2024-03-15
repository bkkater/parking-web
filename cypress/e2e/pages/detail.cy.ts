describe("History detail records", () => {
  beforeEach(() => {
    cy.visit("/history/ABC-0000");
    cy.get('[data-testid="history_card"]').first().click();
    cy.location("pathname").should("eq", "/history/detail");
  });

  it("should show detail card", () => {
    cy.get('[data-testid="detail_history_card"]').should("exist");
  });

  it("should show error message on refresh", () => {
    cy.visit("/history/detail");

    cy.contains(
      "Nenhum registro encontrado. Volte a página de histórico e tente novamente",
    ).should("exist");
  });
});
