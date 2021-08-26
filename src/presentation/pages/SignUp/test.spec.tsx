import { cleanup, fireEvent, render, RenderResult, waitFor } from '@testing-library/react';
import faker from 'faker';
import React from 'react';

import { AddAccountSpy, FormHelper, ValidationStub } from '@/presentation/test';

import { SignUp } from '.';

type SutTypes = {
  sut: RenderResult;
  addAccountSpy: AddAccountSpy;
};

type SutParams = {
  validationError: string;
};

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  validationStub.errorMessage = params?.validationError;
  const addAccountSpy = new AddAccountSpy();
  const sut = render(<SignUp validation={validationStub} addAccount={addAccountSpy} />);
  return {
    sut,
    addAccountSpy,
  };
};

const simulateValidSubmit = async (
  sut: RenderResult,
  name = faker.name.findName(),
  email = faker.internet.email(),
  password = faker.internet.password(),
): Promise<void> => {
  FormHelper.populateField(sut, 'name', name);
  FormHelper.populateField(sut, 'email', email);
  FormHelper.populateField(sut, 'password', password);
  FormHelper.populateField(sut, 'passwordConfirmation', password);
  const form = sut.getByTestId('form');
  fireEvent.submit(form);
  await waitFor(() => form);
};

describe('SignUp Component', () => {
  afterEach(cleanup);

  it('should start with initial state', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    FormHelper.testChildCount(sut, 'error-wrap', 0);
    FormHelper.testButtonIsDisabled(sut, 'submit');
    FormHelper.testStatusForField(sut, 'name', validationError);
    FormHelper.testStatusForField(sut, 'email', validationError);
    FormHelper.testStatusForField(sut, 'password', validationError);
    FormHelper.testStatusForField(sut, 'passwordConfirmation', validationError);
  });

  it('should show name error if Validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    FormHelper.populateField(sut, 'name');
    FormHelper.testStatusForField(sut, 'name', validationError);
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

  it('should show passwordConfirmation error if Validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });

    FormHelper.populateField(sut, 'passwordConfirmation');
    FormHelper.testStatusForField(sut, 'passwordConfirmation', validationError);
  });

  it('should show valid name state if Validation succeeds', () => {
    const { sut } = makeSut();
    FormHelper.populateField(sut, 'name');
    FormHelper.testStatusForField(sut, 'name');
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

  it('should show valid passwordConfirmation state if Validation succeeds', () => {
    const { sut } = makeSut();
    FormHelper.populateField(sut, 'passwordConfirmation');
    FormHelper.testStatusForField(sut, 'passwordConfirmation');
  });

  it('should enable submit button if form is valid', async () => {
    const { sut } = makeSut();
    await simulateValidSubmit(sut);
    FormHelper.testButtonIsDisabled(sut, 'submit', false);
  });

  it('should show spinner on submit', async () => {
    const { sut } = makeSut();
    await simulateValidSubmit(sut);
    FormHelper.testElementExists(sut, 'spinner');
  });

  it('should call AddAccount with correct values', async () => {
    const { sut, addAccountSpy } = makeSut();
    const name = faker.name.findName();
    const email = faker.internet.email();
    const password = faker.internet.password();
    await simulateValidSubmit(sut, name, email, password);
    expect(addAccountSpy.params).toEqual({
      name,
      email,
      password,
      passwordConfirmation: password,
    });
  });

  it('should call AddAccount only once', async () => {
    const { sut, addAccountSpy } = makeSut();
    await simulateValidSubmit(sut);
    await simulateValidSubmit(sut);
    expect(addAccountSpy.callsCount).toBe(1);
  });
});
