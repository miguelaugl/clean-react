Cypress.Commands.add('getByTestId', (value) => cy.get(`[data-testid=${value}]`));
