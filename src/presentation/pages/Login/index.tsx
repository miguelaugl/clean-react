import React, { useEffect, useState } from 'react';
import { LoginHeader, Footer, FormStatus, Input } from '@/presentation/components';
import { FormContextProvider } from '@/presentation/contexts/form';
import { Validation } from '@/presentation/protocols/validation';
import { Authentication } from '@/domain/usecases';
import styles from './styles.scss';

type Props = {
  validation: Validation;
  authentication: Authentication;
};

export const Login = ({ validation, authentication }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    mainError: '',
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    try {
      if (state.isLoading || state.emailError || state.passwordError) {
        return;
      }

      setState({ ...state, isLoading: true });
      const account = await authentication.auth({ email: state.email, password: state.password });
      localStorage.setItem('accessToken', account.accessToken);
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
        mainError: error.message,
      });
    }
  };

  useEffect(() => {
    setState({
      ...state,
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password),
    });
  }, [state.email, state.password]);

  return (
    <div className={styles.login}>
      <LoginHeader />

      <FormContextProvider value={{ state, setState }}>
        <form data-testid='form' className={styles.form} onSubmit={handleSubmit}>
          <h2>Login</h2>

          <Input type='email' name='email' placeholder='Digite seu e-mail' />
          <Input type='password' name='password' placeholder='Digite sua senha' />

          <button
            data-testid='submit-btn'
            disabled={!!state.emailError || !!state.passwordError}
            className={styles.submit}
            type='submit'
          >
            Entrar
          </button>

          <span className={styles.link}>Criar conta</span>

          <FormStatus />
        </form>
      </FormContextProvider>

      <Footer />
    </div>
  );
};
