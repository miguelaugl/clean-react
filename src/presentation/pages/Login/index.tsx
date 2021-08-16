import React, { useState } from 'react';
import { LoginHeader, Footer, FormStatus, Input } from '@/presentation/components';
import { FormContextProvider } from '@/presentation/contexts/form';
import styles from './styles.scss';

export const Login = () => {
  const [state] = useState({
    isLoading: false,
  });

  const [errorState] = useState({
    email: 'Campo obrigatório',
    password: 'Campo obrigatório',
    main: '',
  });

  return (
    <div className={styles.login}>
      <LoginHeader />

      <FormContextProvider value={{ state, errorState }}>
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
