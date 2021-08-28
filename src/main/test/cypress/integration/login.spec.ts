import faker from 'faker';

const { baseUrl } = Cypress.config();

describe('Login', () => {
  beforeEach(() => {
    cy.visit('login');
  });

  it('should load with correct initial state', () => {
    cy.getByTestId('email').should('have.attr', 'readOnly');
    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'Campo obrigatório')
      .should('contain.text', '🔴');
    cy.getByTestId('password').should('have.attr', 'readOnly');
    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Campo obrigatório')
      .should('contain.text', '🔴');
    cy.getByTestId('submit').should('have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('should present error state if form is invalid', () => {
    cy.getByTestId('email').focus().type(faker.random.word());
    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'Campo inválido')
      .should('contain.text', '🔴');
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(3));
    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Campo inválido')
      .should('contain.text', '🔴');
    cy.getByTestId('submit').should('have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('should present valid state if form is valid', () => {
    cy.getByTestId('email').focus().type(faker.internet.email());
    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'Tudo certo')
      .should('contain.text', '🟢');
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5));
    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Tudo certo')
      .should('contain.text', '🟢');
    cy.getByTestId('submit').should('not.have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('should present InvalidCredentialsError on 401', () => {
    cy.intercept(
      { method: 'POST', url: /login/ },
      { statusCode: 401, body: { error: faker.random.word() } },
    );
    cy.getByTestId('email').focus().type(faker.internet.email());
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5));
    cy.getByTestId('submit').click().should('not.have.attr', 'disabled');
    cy.getByTestId('spinner').should('not.exist');
    cy.getByTestId('main-error').should('contain.text', 'Credenciais inválidas');
    cy.url().should('eq', `${baseUrl}/login`);
  });

  it('should present UnexpectedError on 400', () => {
    cy.intercept(
      { method: 'POST', url: /login/ },
      { statusCode: 400, body: { error: faker.random.word() } },
    );
    cy.getByTestId('email').focus().type(faker.internet.email());
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5));
    cy.getByTestId('submit').click();
    cy.getByTestId('spinner').should('not.exist');
    cy.getByTestId('main-error').should(
      'contain.text',
      'Algo de errado aconteceu. Tente novamente em breve.',
    );
    cy.url().should('eq', `${baseUrl}/login`);
  });

  it('should save accessToken if valid credentials are provided', () => {
    cy.intercept(
      { method: 'POST', url: /login/ },
      { statusCode: 200, body: { accessToken: faker.datatype.uuid() } },
    );
    cy.getByTestId('email').focus().type(faker.internet.email());
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5));
    cy.getByTestId('submit').click();
    cy.getByTestId('main-error').should('not.exist');
    cy.getByTestId('spinner').should('not.exist');
    cy.url().should('eq', `${baseUrl}/`);
    cy.window().then((window) => assert.isOk(window.localStorage.getItem('accessToken')));
  });

  it('should present UnexpectedError if invalid data is returned', () => {
    cy.intercept(
      { method: 'POST', url: /login/ },
      { statusCode: 200, body: { invalidProperty: faker.datatype.uuid() } },
    );
    cy.getByTestId('email').focus().type(faker.internet.email());
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5)).type('{enter}');
    cy.getByTestId('main-error').should(
      'contain.text',
      'Algo de errado aconteceu. Tente novamente em breve.',
    );
    cy.getByTestId('spinner').should('not.exist');
    cy.url().should('eq', `${baseUrl}/login`);
  });

  it('should prevent multiple submits', () => {
    cy.intercept(
      { method: 'POST', url: /login/ },
      { statusCode: 200, body: { accessToken: faker.datatype.uuid() } },
    ).as('request');
    cy.getByTestId('email').focus().type(faker.internet.email());
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5));
    cy.getByTestId('submit').dblclick();
    cy.get('@request.all').should('have.length', 1);
  });

  it('should not call submit if form is invalid', () => {
    cy.intercept(
      { method: 'POST', url: /login/ },
      { statusCode: 200, body: { accessToken: faker.datatype.uuid() } },
    ).as('request');
    cy.getByTestId('email').focus().type(faker.internet.email()).type('{enter}');
    cy.get('@request.all').should('have.length', 0);
  });
});
