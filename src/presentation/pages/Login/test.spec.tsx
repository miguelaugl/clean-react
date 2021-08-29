import { cleanup, fireEvent, render, RenderResult, waitFor } from '@testing-library/react';
import faker from 'faker';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';

import { InvalidCredentialsError } from '@/domain/errors';
import { AccountModel } from '@/domain/models';
import { ApiContext } from '@/presentation/contexts';
import { Login } from '@/presentation/pages';
import { ValidationStub, AuthenticationSpy, FormHelper } from '@/presentation/test';

type SutTypes = {
  sut: RenderResult;
  authenticationSpy: AuthenticationSpy;
  setCurrentAccountMock(account: AccountModel): void;
};

type SutParams = {
  validationError: string;
};

const history = createMemoryHistory({ initialEntries: ['/login'] });
const makeSut = (params?: SutParams): SutTypes => {
  const setCurrentAccountMock = jest.fn();
  const validationStub = new ValidationStub();
  const authenticationSpy = new AuthenticationSpy();
  validationStub.errorMessage = params?.validationError;
  const sut = render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
      <Router history={history}>
        <Login validation={validationStub} authentication={authenticationSpy} />
      </Router>
    </ApiContext.Provider>,
  );
  return {
    sut,
    authenticationSpy,
    setCurrentAccountMock,
  };
};

const simulateValidSubmit = async (
  sut: RenderResult,
  email = faker.internet.email(),
  password = faker.internet.password(),
): Promise<void> => {
  FormHelper.populateField(sut, 'email', email);
  FormHelper.populateField(sut, 'password', password);
  const form = sut.getByTestId('form');
  fireEvent.submit(form);
  await waitFor(() => form);
};

describe('Login Component', () => {
  afterEach(cleanup);

  it('should start with initial state', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    FormHelper.testChildCount(sut, 'error-wrap', 0);
    FormHelper.testButtonIsDisabled(sut, 'submit');
    FormHelper.testStatusForField(sut, 'email', validationError);
    FormHelper.testStatusForField(sut, 'password', validationError);
  });

  it('should show email error if Validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });

    FormHelper.populateField(sut, 'email');
    FormHelper.testStatusForField(sut, 'email', validationError);
  });

  it('should show password error if Validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });

    FormHelper.populateField(sut, 'password');
    FormHelper.testStatusForField(sut, 'password', validationError);
  });

  it('should show valid email state if Validation succeeds', () => {
    const { sut } = makeSut();
    FormHelper.populateField(sut, 'email');
    FormHelper.testStatusForField(sut, 'email');
  });

  it('should show valid password state if Validation succeeds', () => {
    const { sut } = makeSut();
    FormHelper.populateField(sut, 'password');
    FormHelper.testStatusForField(sut, 'password');
  });

  it('should enable submit button if form is valid', () => {
    const { sut } = makeSut();
    FormHelper.populateField(sut, 'email');
    FormHelper.populateField(sut, 'password');
    FormHelper.testButtonIsDisabled(sut, 'submit', false);
  });

  it('should show spinner on submit', async () => {
    const { sut } = makeSut();
    await simulateValidSubmit(sut);
    FormHelper.testElementExists(sut, 'spinner');
  });

  it('should call Authentication with correct values', async () => {
    const { sut, authenticationSpy } = makeSut();
    const email = faker.internet.email();
    const password = faker.internet.password();
    await simulateValidSubmit(sut, email, password);
    expect(authenticationSpy.params).toEqual({
      email,
      password,
    });
  });

  it('should call Authentication only once', async () => {
    const { sut, authenticationSpy } = makeSut();
    await simulateValidSubmit(sut);
    await simulateValidSubmit(sut);
    expect(authenticationSpy.callsCount).toBe(1);
  });

  it('should not call Authentication if form is invalid', async () => {
    const validationError = faker.random.words();
    const { sut, authenticationSpy } = makeSut({ validationError });
    await simulateValidSubmit(sut);
    expect(authenticationSpy.callsCount).toBe(0);
  });

  it('should present error if Authentication fails', async () => {
    const { sut, authenticationSpy } = makeSut();
    const error = new InvalidCredentialsError();
    jest.spyOn(authenticationSpy, 'auth').mockReturnValueOnce(Promise.reject(error));
    await simulateValidSubmit(sut);
    FormHelper.testElementText(sut, 'main-error', error.message);
    FormHelper.testChildCount(sut, 'error-wrap', 1);
  });

  it('should call SaveAcessToken on success', async () => {
    const { sut, authenticationSpy, setCurrentAccountMock } = makeSut();
    await simulateValidSubmit(sut);
    expect(setCurrentAccountMock).toHaveBeenCalledWith(authenticationSpy.account);
    expect(history.length).toBe(1);
    expect(history.location.pathname).toBe('/');
  });

  it('should go to signup page', async () => {
    const { sut } = makeSut();
    const signUpLink = sut.getByTestId('signup-link');
    fireEvent.click(signUpLink);
    expect(history.length).toBe(2);
    expect(history.location.pathname).toBe('/signup');
  });
});
