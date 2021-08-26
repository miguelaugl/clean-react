import { cleanup, render, RenderResult } from '@testing-library/react';
import React from 'react';

import { FormHelper } from '@/presentation/test';

import { SignUp } from '.';

type SutTypes = {
  sut: RenderResult;
};

const makeSut = (): SutTypes => {
  const sut = render(<SignUp />);
  return {
    sut,
  };
};

describe('SignUp Component', () => {
  afterEach(cleanup);

  it('should start with initial state', () => {
    const validationError = 'Campo obrigatório';
    const { sut } = makeSut();
    FormHelper.testChildCount(sut, 'error-wrap', 0);
    FormHelper.testButtonIsDisabled(sut, 'submit');
    FormHelper.testStatusForField(sut, 'name', validationError);
    FormHelper.testStatusForField(sut, 'email', validationError);
    FormHelper.testStatusForField(sut, 'password', validationError);
    FormHelper.testStatusForField(sut, 'passwordConfirmation', validationError);
  });
});
