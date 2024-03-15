import { errorMessage } from "@/utils/schema/car";

/**
 * Teste de veículos que possuem histórico.
 */
describe("Show history records", () => {
  beforeEach(() => {
    cy.visit("/history/ABC-0000");
  });

  it("should show plate as title", () => {
    cy.contains("ABC-0000").should("exist");
  });

  it("should show some records card", () => {
    cy.get('[data-testid="history_card"]').should("exist");
  });
});

/**
 * Teste de veículos que não possuem histórico.
 */
describe("Don't show history records", () => {
  beforeEach(() => {
    cy.visit("/history/ZZZ-8751");
  });

  it("should show plate as title", () => {
    cy.contains("ZZZ-8751").should("exist");
  });

  it("should not show card and should show records not founded", () => {
    cy.get('[data-testid="history_card"]').should("not.exist");

    cy.get('[data-testid="state_message"]').should(
      "have.text",
      "Nenhum registro encontrado",
    );
  });
});

/**
 * Teste de parâmetros inválidos na página de histórico.
 */
describe("Invalid params", () => {
  beforeEach(() => {
    cy.visit("/history/ZZZ8751");
  });

  it("should show plate as title", () => {
    cy.contains("ZZZ8751").should("exist");
  });

  it("should not show card and should show invalid params", () => {
    cy.get('[data-testid="history_card"]').should("not.exist");

    cy.get('[data-testid="state_message"]').should("have.text", errorMessage);
  });
});

/**
 * Teste do click no card de histórico.
 */
describe("Card click", () => {
  beforeEach(() => {
    cy.visit("/history/ABC-0000");
  });

  it("should be able to click card", () => {
    cy.get('[data-testid="history_card"]').first().click();
    cy.location("pathname").should("eq", "/history/detail");
  });

  it("should store data on click card", () => {
    cy.get('[data-testid="history_card"]').first().click();

    cy.window().then((win) => {
      expect(win.localStorage.getItem("historyData")).not.to.be.null;
    });

    cy.location("pathname").should("eq", "/history/detail");
  });
});
