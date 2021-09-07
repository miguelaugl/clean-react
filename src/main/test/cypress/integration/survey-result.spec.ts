import * as Helper from '../utils/helpers';
import * as Http from '../utils/http-mocks';

const path = /api\/surveys/;
export const mockUnexpectedError = (): void => Http.mockServerError(path, 'GET');
export const mockAccessDeniedError = (): void => Http.mockForbiddenError(path, 'GET');
export const mockSuccess = (): void => {
  cy.fixture('survey-result').then((surveyResult) => {
    Http.mockOk(path, 'GET', surveyResult);
  });
};

describe('SurveyResult', () => {
  beforeEach(() => {
    cy.fixture('account').then((account) => {
      Helper.setLocalStorageItem('account', account);
    });
  });

  it('should present error on UnexpectedError', () => {
    mockUnexpectedError();
    cy.visit('surveys/any_id');
    cy.getByTestId('error').should('have.text', 'Algo de errado aconteceu. Tente novamente em breve.');
  });

  it('should reload on button click', () => {
    mockUnexpectedError();
    cy.visit('surveys/any_id');
    cy.getByTestId('error').should('have.text', 'Algo de errado aconteceu. Tente novamente em breve.');
    mockSuccess();
    cy.getByTestId('reload').click();
    cy.getByTestId('question').should('exist');
  });

  it('should logout on AccessDeniedError', () => {
    mockAccessDeniedError();
    cy.visit('');
    Helper.testUrl('/login');
  });
});
