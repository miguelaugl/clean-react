import React from 'react';
import { Link } from 'react-router-dom';

import { LoginHeader, Footer, FormStatus, Input } from '@/presentation/components';
import { FormContextProvider } from '@/presentation/contexts/form';

import styles from './styles.scss';

export const SignUp = () => {
  return (
    <div className={styles.signUp}>
      <LoginHeader />

      <FormContextProvider value={{ state: {} }}>
        <form className={styles.form}>
          <h2>Criar conta</h2>

          <Input type='text' name='name' placeholder='Digite seu nome' />
          <Input type='email' name='email' placeholder='Digite seu e-mail' />
          <Input type='password' name='password' placeholder='Digite sua senha' />
          <Input type='password' name='passwordConfirmation' placeholder='Repita sua senha' />

          <button className={styles.submit} type='submit'>
            Criar
          </button>

          <Link to='/login' className={styles.link}>
            Voltar para Login
          </Link>

          <FormStatus />
        </form>
      </FormContextProvider>

      <Footer />
    </div>
  );
};
