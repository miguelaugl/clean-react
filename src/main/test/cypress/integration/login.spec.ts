import faker from 'faker';

import * as FormHelper from '../utils/form-helpers';
import * as Helper from '../utils/helpers';
import * as Http from '../utils/http-mocks';

const path = /login/;
export const mockInvalidCredentialsError = (): void => Http.mockUnauthorizedError(path);
export const mockUnexpectedError = (): void => Http.mockServerError(path, 'POST');
export const mockSuccess = (): void => {
  cy.fixture('account').then((account) => {
    Http.mockOk(path, 'POST', account);
  });
};

const populateFields = (): void => {
  cy.getByTestId('email').focus().type(faker.internet.email());
  cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5));
};

const simulateValidSubmit = (): void => {
  populateFields();
  cy.getByTestId('submit').click();
};

describe('Login', () => {
  beforeEach(() => {
    cy.visit('login');
  });

  it('should load with correct initial state', () => {
    FormHelper.testInputStatus('email', 'Campo obrigatório');
    cy.getByTestId('email').should('have.attr', 'readOnly');
    FormHelper.testInputStatus('password', 'Campo obrigatório');
    cy.getByTestId('password').should('have.attr', 'readOnly');
    cy.getByTestId('submit').should('have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('should present error state if form is invalid', () => {
    cy.getByTestId('email').focus().type(faker.random.word());
    FormHelper.testInputStatus('email', 'Campo inválido');
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(3));
    FormHelper.testInputStatus('password', 'Campo inválido');
    cy.getByTestId('submit').should('have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('should present valid state if form is valid', () => {
    cy.getByTestId('email').focus().type(faker.internet.email());
    FormHelper.testInputStatus('email');
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5));
    FormHelper.testInputStatus('password');
    cy.getByTestId('submit').should('not.have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('should present InvalidCredentialsError on 401', () => {
    mockInvalidCredentialsError();
    populateFields();
    cy.getByTestId('submit').click().should('not.have.attr', 'disabled');
    FormHelper.testMainError('Credenciais inválidas');
    Helper.testUrl('/login');
  });

  it('should present UnexpectedError on 400', () => {
    mockUnexpectedError();
    simulateValidSubmit();
    FormHelper.testMainError('Algo de errado aconteceu. Tente novamente em breve.');
    Helper.testUrl('/login');
  });

  it('should save account if valid credentials are provided', () => {
    mockSuccess();
    simulateValidSubmit();
    cy.getByTestId('main-error').should('not.exist');
    cy.getByTestId('spinner').should('not.exist');
    Helper.testUrl('/');
    Helper.testLocalStorageItem('account');
  });

  it('should prevent multiple submits', () => {
    mockSuccess();
    populateFields();
    cy.getByTestId('submit').dblclick();
    cy.wait('@request');
    Helper.testHttpCallsCount(1);
  });

  it('should not call submit if form is invalid', () => {
    mockSuccess();
    cy.getByTestId('email').focus().type(faker.internet.email()).type('{enter}');
    Helper.testHttpCallsCount(0);
  });
});
