import { errorMessage } from "@/utils/schema/car";

/**
 * Testa a funcionalidade de registrar um veículo da aba de Entrada.
 */
describe("Register plate", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should be able to register plate", () => {
    cy.get('[data-testid="input_entry_plate"]').type("AAA-0000");

    cy.get('[data-testid="submit_entry-plate"]')
      .should("not.be.disabled")
      .click();

    cy.get('[data-testid="loading"]').should("exist");

    cy.get('[data-testid="state_message"]').then(($message) => {
      if ($message.text() === "Registrado!") {
        cy.log("Veículo registrado com sucesso!");
      } else {
        cy.log("Erro ao registrar veículo.");
      }
    });
  });
});

// it("should not be able to register plate with invalid format", () => {
//   cy.get('[data-testid="input_entry_plate"]').type("AAA0000");

//   cy.get('[data-testid="submit_entry-plate"]')
//     .should("not.be.disabled")
//     .click();

//   cy.get('[data-testid="state_message"]').should("have.text", errorMessage);
// });
// it("should not be able to register plate with invalid format", () => {
//   cy.get('[data-testid="input_entry_plate"]').type("AA0-0000");

//   cy.get('[data-testid="submit_entry-plate"]')
//     .should("not.be.disabled")
//     .click();

//   cy.get('[data-testid="state_message"]').should("have.text", errorMessage);
// });
// it("should not be able to register plate with invalid format", () => {
//   cy.get('[data-testid="input_entry_plate"]').type("000-AAAA");

//   cy.get('[data-testid="submit_entry-plate"]')
//     .should("not.be.disabled")
//     .click();

//   cy.get('[data-testid="state_message"]').should("have.text", errorMessage);
// });

// Teste das abas da home
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
    cy.visit("/?tab=exit");
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
