import React, { useEffect, useState } from 'react';
import { LoginHeader, Footer, FormStatus, Input } from '@/presentation/components';
import { FormContextProvider } from '@/presentation/contexts/form';
import { Validation } from '@/presentation/protocols/validation';
import styles from './styles.scss';

type Props = {
  validation: Validation;
};

export const Login = ({ validation }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    password: '',
    emailError: 'Campo obrigatório',
    passwordError: 'Campo obrigatório',
    mainError: '',
  });

  useEffect(() => {
    validation.validate({ email: state.email });
  }, [state.email]);

  useEffect(() => {
    validation.validate({ password: state.password });
  }, [state.password]);

  return (
    <div className={styles.login}>
      <LoginHeader />

      <FormContextProvider value={{ state, setState }}>
        <form className={styles.form}>
          <h2>Login</h2>

          <Input type='email' name='email' placeholder='Digite seu e-mail' />
          <Input type='password' name='password' placeholder='Digite sua senha' />

          <button data-testid='submit-btn' disabled className={styles.submit} type='submit'>
            Entrar
          </button>

          <span className={styles.link}>Criar conta</span>

          <FormStatus label='Erro' />
        </form>
      </FormContextProvider>

      <Footer />
    </div>
  );
};
