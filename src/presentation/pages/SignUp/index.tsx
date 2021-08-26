import React, { useEffect, useState } from 'react';

import { LoginHeader, Footer, FormStatus, Input } from '@/presentation/components';
import { FormContextProvider } from '@/presentation/contexts/form';
import { Validation } from '@/presentation/protocols/validation';

import styles from './styles.scss';

type Props = {
  validation: Validation;
};

export const SignUp = ({ validation }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    name: '',
    nameError: '',
    emailError: 'Campo obrigatório',
    passwordError: 'Campo obrigatório',
    passwordConfirmationError: 'Campo obrigatório',
    mainError: '',
  });

  useEffect(() => {
    setState({
      ...state,
      nameError: validation.validate('name', state.name),
    });
  }, [state.name]);

  return (
    <div className={styles.signUp}>
      <LoginHeader />

      <FormContextProvider value={{ state, setState }}>
        <form className={styles.form}>
          <h2>Criar conta</h2>

          <Input type='text' name='name' placeholder='Digite seu nome' />
          <Input type='email' name='email' placeholder='Digite seu e-mail' />
          <Input type='password' name='password' placeholder='Digite sua senha' />
          <Input type='password' name='passwordConfirmation' placeholder='Repita sua senha' />

          <button data-testid='submit' disabled className={styles.submit} type='submit'>
            Criar
          </button>

          <span className={styles.link}>Voltar para Login</span>

          <FormStatus />
        </form>
      </FormContextProvider>

      <Footer />
    </div>
  );
};
