import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { Authentication, SaveAccessToken } from '@/domain/usecases';
import { LoginHeader, Footer, FormStatus, Input, SubmitButton } from '@/presentation/components';
import { FormContextProvider } from '@/presentation/contexts/form';
import { Validation } from '@/presentation/protocols/validation';

import styles from './styles.scss';

type Props = {
  validation: Validation;
  authentication: Authentication;
  saveAccessToken: SaveAccessToken;
};

export const Login = ({ validation, authentication, saveAccessToken }: Props) => {
  const history = useHistory();
  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    mainError: '',
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    try {
      if (state.isLoading || state.isFormInvalid) {
        return;
      }

      setState({ ...state, isLoading: true });
      const account = await authentication.auth({ email: state.email, password: state.password });
      await saveAccessToken.save(account.accessToken);
      history.replace('/');
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
        mainError: error.message,
      });
    }
  };

  useEffect(() => {
    const { email, password } = state;
    const formData = { email, password };
    const emailError = validation.validate('email', formData);
    const passwordError = validation.validate('password', formData);

    setState({
      ...state,
      emailError,
      passwordError,
      isFormInvalid: !!emailError || !!passwordError,
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

          <SubmitButton text='Entrar' />

          <Link to='/signup' data-testid='signup-link' className={styles.link}>
            Criar conta
          </Link>

          <FormStatus />
        </form>
      </FormContextProvider>

      <Footer />
    </div>
  );
};
