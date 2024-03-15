import { errorMessage } from "@/utils/schema/car";

/**
 * Testa funcionalidades da aba de Entrada.
 */
describe("Entry actions", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should be able to entry and return a message", () => {
    cy.get('[data-testid="input_entry_plate"]').type("AAA-0000");

    cy.get('[data-testid="submit_entry_plate"]')
      .should("not.be.disabled")
      .click();

    cy.get('[data-testid="loading"]').should("exist");

    cy.get('[data-testid="state_message"]');
  });
});

/**
 * Testa a funcionalidades da aba de saída.
 */
describe("Exit actions", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get('[data-testid="home_exit_btn"]').click();
  });

  it("should be able to pay and return a message", () => {
    cy.get('[data-testid="input_exit_plate"]').type("AAA-0000");

    cy.get('[data-testid="open_pay_alert_btn"]')
      .should("not.be.disabled")
      .click();

    cy.get('[data-testid="submit_pay_plate"]')
      .should("not.be.disabled")
      .click();

    cy.get('[data-testid="loading"]').should("exist");
  });

  it("should be able to exit and return a message", () => {
    cy.get('[data-testid="input_exit_plate"]').type("AAA-0000");

    cy.get('[data-testid="open_exit_alert_btn"]')
      .should("not.be.disabled")
      .click();

    cy.get('[data-testid="submit_exit_plate"]')
      .should("not.be.disabled")
      .click();

    cy.get('[data-testid="loading"]').should("exist");
  });
});

/**
 * Testa das abas da home.
 */
describe("Navigate between tabs", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should be possible to open the entry tab", () => {
    cy.get('[data-testid="home_entry_btn"]').click();

    cy.get('[data-testid="home_entry_tab"]').should("exist");
    cy.get('[data-testid="home_entry_tab"]').should(
      "have.attr",
      "data-state",
      "active",
    );
  });

  it("should be possible to open the exit tab", () => {
    cy.get('[data-testid="home_exit_btn"]').click();

    cy.get('[data-testid="home_exit_tab"]').should("exist");
    cy.get('[data-testid="home_exit_tab"]').should(
      "have.attr",
      "data-state",
      "active",
    );
  });
});

/**
 * Teste de navegação para o histórico de veículos.
 */
describe("Open history", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get('[data-testid="home_exit_btn"]').click();
  });

  it("should be possible to open the history page", () => {
    cy.get('[data-testid="input_exit_plate"]').type("AAA-0000");

    cy.get('[data-testid="link_history"]').should("not.be.disabled").click();
    cy.url().should("include", "/history/AAA-0000");
  });

  it("should not be possible to open the history page", () => {
    cy.get('[data-testid="input_exit_plate"]').type("AAA0000");
    cy.get('[data-testid="link_history"]').should("not.be.disabled").click();

    cy.location("pathname").should("eq", "/");
    cy.get('[data-testid="state_message"]').should("have.text", errorMessage);
  });
});
