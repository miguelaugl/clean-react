import * as Helper from '../utils/helpers';
import * as Http from '../utils/http-mocks';

const path = /surveys/;
export const mockUnexpectedError = (): void => Http.mockServerError(path, 'GET');
export const mockAccessDeniedError = (): void => Http.mockForbiddenError(path, 'GET');
export const mockSuccess = (): void => {
  cy.fixture('survey-list').then((surveyList) => {
    Http.mockOk(path, 'GET', surveyList);
  });
};

describe('SurveyList', () => {
  beforeEach(() => {
    cy.fixture('account').then((account) => {
      Helper.setLocalStorageItem('account', account);
    });
  });

  it('should present error on UnexpectedError', () => {
    mockUnexpectedError();
    cy.visit('');
    cy.getByTestId('error').should('have.text', 'Algo de errado aconteceu. Tente novamente em breve.');
  });

  it('should reload on button click', () => {
    mockUnexpectedError();
    cy.visit('');
    cy.getByTestId('error').should('have.text', 'Algo de errado aconteceu. Tente novamente em breve.');
    mockSuccess();
    cy.getByTestId('reload').click();
    cy.get('li:not(:empty)').should('have.length', 2);
  });

  it('should logout on AccessDeniedError', () => {
    mockAccessDeniedError();
    cy.visit('');
    Helper.testUrl('/login');
  });

  it('should logout on logout link click', () => {
    mockUnexpectedError();
    cy.visit('');
    cy.getByTestId('logout').click();
    Helper.testUrl('/login');
  });

  it('should present survey items', () => {
    mockSuccess();
    cy.visit('');
    cy.get('li:empty').should('have.length', 4);
    cy.get('li:not(:empty)').should('have.length', 2);
    cy.get('li:nth-child(1)').then((li) => {
      assert.equal(li.find('[data-testid="day"]').text(), '03');
      assert.equal(li.find('[data-testid="month"]').text(), 'fev');
      assert.equal(li.find('[data-testid="year"]').text(), '2018');
      assert.equal(li.find('[data-testid="question"]').text(), 'Question 1');
      cy.fixture('icons').then((icons) => {
        assert.equal(li.find('[data-testid="icon"]').attr('src'), icons.thumbUp);
      });
    });
    cy.get('li:nth-child(2)').then((li) => {
      assert.equal(li.find('[data-testid="day"]').text(), '20');
      assert.equal(li.find('[data-testid="month"]').text(), 'out');
      assert.equal(li.find('[data-testid="year"]').text(), '2020');
      assert.equal(li.find('[data-testid="question"]').text(), 'Question 2');
      cy.fixture('icons').then((icons) => {
        assert.equal(li.find('[data-testid="icon"]').attr('src'), icons.thumbDown);
      });
    });
  });

  it('should present correct username', () => {
    mockUnexpectedError();
    cy.visit('');
    const account = Helper.getLocalStorageItem('account');
    cy.getByTestId('username').should('have.text', account.name);
  });
});
