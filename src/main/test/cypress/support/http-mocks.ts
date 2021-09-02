import faker from 'faker';

export const mockUnauthorizedError = (url: RegExp): void => {
  cy.intercept({ method: 'POST', url }, { statusCode: 401, body: { error: faker.random.word() } }).as('request');
};

export const mockServerError = (url: RegExp, method: string): void => {
  cy.intercept({ method, url }, { statusCode: 400, body: { error: faker.random.word() } }).as('request');
};

export const mockForbiddenError = (url: RegExp, method: string): void => {
  cy.intercept({ method, url }, { statusCode: 403, body: { error: faker.random.word() } }).as('request');
};

export const mockOk = (url: RegExp, method: string, body: any): void => {
  cy.intercept({ method, url }, { statusCode: 200, body }).as('request');
};
