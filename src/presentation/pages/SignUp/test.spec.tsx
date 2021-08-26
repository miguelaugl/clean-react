import { cleanup, render, RenderResult } from '@testing-library/react';
import React from 'react';

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

const testChildCount = (sut: RenderResult, elName: string, count: number): void => {
  const el = sut.getByTestId(elName);
  expect(el.childElementCount).toBe(count);
};

const testButtonIsDisabled = (sut: RenderResult, elName: string, isDisabled = true) => {
  const button = sut.getByTestId(elName) as HTMLButtonElement;
  expect(button.disabled).toBe(isDisabled);
};

const testStatusForField = (
  sut: RenderResult,
  fieldName: string,
  validationError?: string,
): void => {
  const fieldStatus = sut.getByTestId(`${fieldName}-status`);
  expect(fieldStatus.title).toBe(validationError || 'Tudo certo');
  expect(fieldStatus.textContent).toBe(validationError ? '🔴' : '🟢');
};

describe('SignUp Component', () => {
  afterEach(cleanup);

  it('should start with initial state', () => {
    const validationError = 'Campo obrigatório';
    const { sut } = makeSut();
    testChildCount(sut, 'error-wrap', 0);
    testButtonIsDisabled(sut, 'submit');
    testStatusForField(sut, 'name', validationError);
    testStatusForField(sut, 'email', validationError);
    testStatusForField(sut, 'password', validationError);
    testStatusForField(sut, 'passwordConfirmation', validationError);
  });
});
