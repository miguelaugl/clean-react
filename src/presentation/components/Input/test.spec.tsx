import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { FormContextProvider } from '@/presentation/contexts/form';
import { Input } from '.';

const makeSut = (): RenderResult => {
  return render(
    <FormContextProvider value={{ state: {} }}>
      <Input name='field' />
    </FormContextProvider>,
  );
};

describe('Input Component', () => {
  it('should begin with readOnly', () => {
    const { getByTestId } = makeSut();
    const input = getByTestId('field') as HTMLInputElement;
    expect(input.readOnly).toBe(true);
  });
});
