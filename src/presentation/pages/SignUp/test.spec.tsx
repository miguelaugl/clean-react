import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import faker from 'faker';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';

import { EmailInUseError } from '@/domain/errors';
import { AccountModel } from '@/domain/models';
import { ApiContext } from '@/presentation/contexts';
import { AddAccountSpy, FormHelper, ValidationStub } from '@/presentation/test';

import { SignUp } from '.';

type SutTypes = {
  addAccountSpy: AddAccountSpy;
  setCurrentAccountMock(account: AccountModel): void;
};

type SutParams = {
  validationError: string;
};

const history = createMemoryHistory({ initialEntries: ['/signup'] });
const makeSut = (params?: SutParams): SutTypes => {
  const setCurrentAccountMock = jest.fn();
  const validationStub = new ValidationStub();
  validationStub.errorMessage = params?.validationError;
  const addAccountSpy = new AddAccountSpy();
  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
      <Router history={history}>
        <SignUp validation={validationStub} addAccount={addAccountSpy} />
      </Router>
    </ApiContext.Provider>,
  );
  return {
    addAccountSpy,
    setCurrentAccountMock,
  };
};

const simulateValidSubmit = async (
  name = faker.name.findName(),
  email = faker.internet.email(),
  password = faker.internet.password(),
): Promise<void> => {
  FormHelper.populateField('name', name);
  FormHelper.populateField('email', email);
  FormHelper.populateField('password', password);
  FormHelper.populateField('passwordConfirmation', password);
  const form = screen.getByTestId('form');
  fireEvent.submit(form);
  await waitFor(() => form);
};

describe('SignUp Component', () => {
  it('should start with initial state', () => {
    const validationError = faker.random.words();
    makeSut({ validationError });
    FormHelper.testChildCount('error-wrap', 0);
    FormHelper.testButtonIsDisabled('submit');
    FormHelper.testStatusForField('name', validationError);
    FormHelper.testStatusForField('email', validationError);
    FormHelper.testStatusForField('password', validationError);
    FormHelper.testStatusForField('passwordConfirmation', validationError);
  });

  it('should show name error if Validation fails', () => {
    const validationError = faker.random.words();
    makeSut({ validationError });
    FormHelper.populateField('name');
    FormHelper.testStatusForField('name', validationError);
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

  it('should show passwordConfirmation error if Validation fails', () => {
    const validationError = faker.random.words();
    makeSut({ validationError });

    FormHelper.populateField('passwordConfirmation');
    FormHelper.testStatusForField('passwordConfirmation', validationError);
  });

  it('should show valid name state if Validation succeeds', () => {
    makeSut();
    FormHelper.populateField('name');
    FormHelper.testStatusForField('name');
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

  it('should show valid passwordConfirmation state if Validation succeeds', () => {
    makeSut();
    FormHelper.populateField('passwordConfirmation');
    FormHelper.testStatusForField('passwordConfirmation');
  });

  it('should enable submit button if form is valid', async () => {
    makeSut();
    await simulateValidSubmit();
    FormHelper.testButtonIsDisabled('submit', false);
  });

  it('should show spinner on submit', async () => {
    makeSut();
    await simulateValidSubmit();
    FormHelper.testElementExists('spinner');
  });

  it('should call AddAccount with correct values', async () => {
    const { addAccountSpy } = makeSut();
    const name = faker.name.findName();
    const email = faker.internet.email();
    const password = faker.internet.password();
    await simulateValidSubmit(name, email, password);
    expect(addAccountSpy.params).toEqual({
      name,
      email,
      password,
      passwordConfirmation: password,
    });
  });

  it('should call AddAccount only once', async () => {
    const { addAccountSpy } = makeSut();
    await simulateValidSubmit();
    await simulateValidSubmit();
    expect(addAccountSpy.callsCount).toBe(1);
  });

  it('should not call Authentication if form is invalid', async () => {
    const validationError = faker.random.words();
    const { addAccountSpy } = makeSut({ validationError });
    await simulateValidSubmit();
    expect(addAccountSpy.callsCount).toBe(0);
  });

  it('should present error if Authentication fails', async () => {
    const { addAccountSpy } = makeSut();
    const error = new EmailInUseError();
    jest.spyOn(addAccountSpy, 'add').mockRejectedValueOnce(error);
    await simulateValidSubmit();
    FormHelper.testElementText('main-error', error.message);
    FormHelper.testChildCount('error-wrap', 1);
  });

  it('should call SaveAcessToken on success', async () => {
    const { addAccountSpy, setCurrentAccountMock } = makeSut();
    await simulateValidSubmit();
    expect(setCurrentAccountMock).toHaveBeenCalledWith(addAccountSpy.account);
    expect(history.length).toBe(1);
    expect(history.location.pathname).toBe('/');
  });

  it('should go to login page', async () => {
    makeSut();
    const loginLink = screen.getByTestId('login-link');
    fireEvent.click(loginLink);
    expect(history.length).toBe(1);
    expect(history.location.pathname).toBe('/login');
  });
});
