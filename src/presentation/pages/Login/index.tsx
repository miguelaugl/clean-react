import React, { useState } from 'react';
import { LoginHeader, Footer, FormStatus, Input } from '@/presentation/components';
import { FormContextProvider } from '@/presentation/contexts/form';
import styles from './styles.scss';

type StateProps = {
  isLoading: boolean;
  errorMessage: string;
};

export const Login = () => {
  const [state] = useState<StateProps>({
    isLoading: false,
    errorMessage: '',
  });

  return (
    <div className={styles.login}>
      <LoginHeader />

      <FormContextProvider value={state}>
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
