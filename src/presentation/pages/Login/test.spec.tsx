import { fireEvent, render, screen, waitFor } from '@testing-library/react';
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
  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
      <Router history={history}>
        <Login validation={validationStub} authentication={authenticationSpy} />
      </Router>
    </ApiContext.Provider>,
  );
  return {
    authenticationSpy,
    setCurrentAccountMock,
  };
};

const simulateValidSubmit = async (
  email = faker.internet.email(),
  password = faker.internet.password(),
): Promise<void> => {
  FormHelper.populateField('email', email);
  FormHelper.populateField('password', password);
  const form = screen.getByTestId('form');
  fireEvent.submit(form);
  await waitFor(() => form);
};

describe('Login Component', () => {
  it('should start with initial state', () => {
    const validationError = faker.random.words();
    makeSut({ validationError });
    expect(screen.getByTestId('error-wrap').children).toHaveLength(0);
    expect(screen.getByTestId('submit')).toBeDisabled();
    FormHelper.testStatusForField('email', validationError);
    FormHelper.testStatusForField('password', validationError);
  });

  it('should show email error if Validation fails', () => {
    const validationError = faker.random.words();
    makeSut({ validationError });

    FormHelper.populateField('email');
    FormHelper.testStatusForField('email', validationError);
  });

  it('should show password error if Validation fails', () => {
    const validationError = faker.random.words();
    makeSut({ validationError });

    FormHelper.populateField('password');
    FormHelper.testStatusForField('password', validationError);
  });

  it('should show valid email state if Validation succeeds', () => {
    makeSut();
    FormHelper.populateField('email');
    FormHelper.testStatusForField('email');
  });

  it('should show valid password state if Validation succeeds', () => {
    makeSut();
    FormHelper.populateField('password');
    FormHelper.testStatusForField('password');
  });

  it('should enable submit button if form is valid', () => {
    makeSut();
    FormHelper.populateField('email');
    FormHelper.populateField('password');
    expect(screen.getByTestId('submit')).toBeEnabled();
  });

  it('should show spinner on submit', async () => {
    makeSut();
    await simulateValidSubmit();
    expect(screen.queryByTestId('spinner')).toBeInTheDocument();
  });

  it('should call Authentication with correct values', async () => {
    const { authenticationSpy } = makeSut();
    const email = faker.internet.email();
    const password = faker.internet.password();
    await simulateValidSubmit(email, password);
    expect(authenticationSpy.params).toEqual({
      email,
      password,
    });
  });

  it('should call Authentication only once', async () => {
    const { authenticationSpy } = makeSut();
    await simulateValidSubmit();
    await simulateValidSubmit();
    expect(authenticationSpy.callsCount).toBe(1);
  });

  it('should not call Authentication if form is invalid', async () => {
    const validationError = faker.random.words();
    const { authenticationSpy } = makeSut({ validationError });
    await simulateValidSubmit();
    expect(authenticationSpy.callsCount).toBe(0);
  });

  it('should present error if Authentication fails', async () => {
    const { authenticationSpy } = makeSut();
    const error = new InvalidCredentialsError();
    jest.spyOn(authenticationSpy, 'auth').mockReturnValueOnce(Promise.reject(error));
    await simulateValidSubmit();
    expect(screen.getByTestId('main-error')).toHaveTextContent(error.message);
    expect(screen.getByTestId('error-wrap').children).toHaveLength(1);
  });

  it('should call SaveAcessToken on success', async () => {
    const { authenticationSpy, setCurrentAccountMock } = makeSut();
    await simulateValidSubmit();
    expect(setCurrentAccountMock).toHaveBeenCalledWith(authenticationSpy.account);
    expect(history.length).toBe(1);
    expect(history.location.pathname).toBe('/');
  });

  it('should go to signup page', async () => {
    makeSut();
    const signUpLink = screen.getByTestId('signup-link');
    fireEvent.click(signUpLink);
    expect(history.length).toBe(2);
    expect(history.location.pathname).toBe('/signup');
  });
});
