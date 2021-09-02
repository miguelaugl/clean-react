import faker from 'faker';

import * as Helper from '../support/helpers';
import * as Http from '../support/survey-list-mocks';

describe('SurveyList', () => {
  beforeEach(() => {
    Helper.setLocalStorageItem('account', {
      accessToken: faker.datatype.uuid(),
      name: faker.name.findName(),
    });
  });

  it('should present error on UnexpectedError', () => {
    Http.mockUnexpectedError();
    cy.visit('');
    cy.getByTestId('error').should('have.text', 'Algo de errado aconteceu. Tente novamente em breve.');
  });

  it('should logout on AccessDeniedError', () => {
    Http.mockAccessDeniedError();
    cy.visit('');
    Helper.testUrl('/login');
  });

  it('should present correct username', () => {
    Http.mockUnexpectedError();
    cy.visit('');
    const { name } = Helper.getLocalStorageItem('account');
    cy.getByTestId('username').should('have.text', name);
  });

  it('should logout on logout link click', () => {
    Http.mockUnexpectedError();
    cy.visit('');
    cy.getByTestId('logout').click();
    Helper.testUrl('/login');
  });
});