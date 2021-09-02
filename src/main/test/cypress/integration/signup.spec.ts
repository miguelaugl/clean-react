import faker from 'faker';

import * as FormHelper from '../utils/form-helpers';
import * as Helper from '../utils/helpers';
import * as Http from '../utils/http-mocks';

const path = /signup/;
export const mockEmailInUseError = (): void => Http.mockForbiddenError(path, 'POST');
export const mockUnexpectedError = (): void => Http.mockServerError(path, 'POST');
export const mockSuccess = (): void => {
  cy.fixture('account').then((account) => {
    Http.mockOk(path, 'POST', account);
  });
};

const populateFields = (): void => {
  cy.getByTestId('name').focus().type(faker.name.findName());
  cy.getByTestId('email').focus().type(faker.internet.email());
  const password = faker.random.alphaNumeric(7);
  cy.getByTestId('password').focus().type(password);
  cy.getByTestId('passwordConfirmation').focus().type(password);
};

const simulateValidSubmit = (): void => {
  populateFields();
  cy.getByTestId('submit').click();
};

describe('SignUp', () => {
  beforeEach(() => {
    cy.visit('signup');
  });

  it('should load with correct initial state', () => {
    FormHelper.testInputStatus('name', 'Campo obrigatório');
    cy.getByTestId('name').should('have.attr', 'readOnly');
    FormHelper.testInputStatus('email', 'Campo obrigatório');
    cy.getByTestId('email').should('have.attr', 'readOnly');
    FormHelper.testInputStatus('password', 'Campo obrigatório');
    cy.getByTestId('password').should('have.attr', 'readOnly');
    FormHelper.testInputStatus('passwordConfirmation', 'Campo obrigatório');
    cy.getByTestId('passwordConfirmation').should('have.attr', 'readOnly');
    cy.getByTestId('submit').should('have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('should present error state if form is invalid', () => {
    cy.getByTestId('name')
      .focus()
      .type(
        faker.random.alpha({
          count: 2,
        }),
      );
    FormHelper.testInputStatus('name', 'Campo inválido');
    cy.getByTestId('email').focus().type(faker.random.word());
    FormHelper.testInputStatus('email', 'Campo inválido');
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(3));
    FormHelper.testInputStatus('password', 'Campo inválido');
    cy.getByTestId('passwordConfirmation').focus().type(faker.random.alphaNumeric(4));
    FormHelper.testInputStatus('passwordConfirmation', 'Campo inválido');
    cy.getByTestId('submit').should('have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('should present valid state if form is valid', () => {
    cy.getByTestId('name').focus().type(faker.name.findName());
    FormHelper.testInputStatus('name');
    cy.getByTestId('email').focus().type(faker.internet.email());
    FormHelper.testInputStatus('email');
    const password = faker.random.alphaNumeric(5);
    cy.getByTestId('password').focus().type(password);
    FormHelper.testInputStatus('password');
    cy.getByTestId('passwordConfirmation').focus().type(password);
    FormHelper.testInputStatus('passwordConfirmation');
    cy.getByTestId('submit').should('not.have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('should present EmailInUseError on 403', () => {
    mockEmailInUseError();
    simulateValidSubmit();
    FormHelper.testMainError('Esse e-mail já está em uso');
    Helper.testUrl('/signup');
  });

  it('should present UnexpectedError on default error cases', () => {
    mockUnexpectedError();
    simulateValidSubmit();
    FormHelper.testMainError('Algo de errado aconteceu. Tente novamente em breve.');
    Helper.testUrl('/signup');
  });

  it('should prevent multiple submits', () => {
    mockSuccess();
    populateFields();
    cy.getByTestId('submit').dblclick();
    Helper.testHttpCallsCount(1);
  });

  it('should save account if valid credentials are provided', () => {
    mockSuccess();
    simulateValidSubmit();
    cy.getByTestId('main-error').should('not.exist');
    cy.getByTestId('spinner').should('not.exist');
    Helper.testUrl('/');
    Helper.testLocalStorageItem('account');
  });

  it('should not call submit if form is invalid', () => {
    mockSuccess();
    cy.getByTestId('email').focus().type(faker.internet.email()).type('{enter}');
    Helper.testHttpCallsCount(0);
  });
});
