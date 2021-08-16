import React from 'react';
import { LoginHeader } from '@/presentation/components/LoginHeader';
import { Input } from '@/presentation/components/Input';
import { FormStatus } from '@/presentation/components/FormStatus';
import styles from './styles.scss';

export const Login = () => (
  <div className={styles.login}>
    <LoginHeader />

    <form className={styles.form}>
      <h2>Login</h2>

      <Input type='email' name='email' placeholder='Digite seu e-mail' />
      <Input type='password' name='password' placeholder='Digite sua senha' />

      <button className={styles.submit} type='submit'>
        Entrar
      </button>

      <span className={styles.link}>Criar conta</span>

      <FormStatus label='Erro' />
    </form>
  </div>
);
