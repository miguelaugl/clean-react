import { fireEvent, render, RenderResult } from '@testing-library/react';
import faker from 'faker';
import React from 'react';

import { FormContextProvider } from '@/presentation/contexts';

import { Input } from '.';

const makeSut = (fieldName: string): RenderResult => {
  return render(
    <FormContextProvider value={{ state: {} }}>
      <Input name={fieldName} />
    </FormContextProvider>,
  );
};

describe('Input Component', () => {
  it('should begin with readOnly', () => {
    const field = faker.database.column();
    const { getByTestId } = makeSut(field);
    const input = getByTestId(field) as HTMLInputElement;
    expect(input.readOnly).toBe(true);
  });

  it('should remove readOnly on focus', () => {
    const field = faker.database.column();
    const { getByTestId } = makeSut(field);
    const input = getByTestId(field) as HTMLInputElement;
    fireEvent.focus(input);
    expect(input.readOnly).toBe(false);
  });

  it('should focus input on label click', () => {
    const field = faker.database.column();
    const { getByTestId } = makeSut(field);
    const input = getByTestId(field);
    const label = getByTestId(`${field}-label`);
    fireEvent.click(label);
    expect(document.activeElement).toBe(input);
  });
});
