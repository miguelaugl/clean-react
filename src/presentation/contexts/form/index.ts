import { createContext, useContext } from 'react';

export const FormContext = createContext(null);

export const FormContextProvider = FormContext.Provider;

export const useForm = () => {
  const ctx = useContext(FormContext);

  if (!ctx) {
    return new Error('FormContext not found.');
  }

  return ctx;
};
