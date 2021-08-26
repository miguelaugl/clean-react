import React from 'react';

import { useForm } from '@/presentation/contexts/form';

type Props = {
  text: string;
};

export const SubmitButton = ({ text }: Props) => {
  const { state } = useForm();

  return (
    <button data-testid='submit' disabled={state.isFormInvalid} type='submit'>
      {text}
    </button>
  );
};
