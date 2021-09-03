import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { Authentication } from '@/domain/usecases';
import { LoginHeader, Footer, FormStatus, Input, SubmitButton } from '@/presentation/components';
import { FormContextProvider, ApiContext } from '@/presentation/contexts';
import { Validation } from '@/presentation/protocols/validation';

import styles from './styles.scss';

type Props = {
  validation: Validation;
  authentication: Authentication;
};

export const Login = ({ validation, authentication }: Props) => {
  const { setCurrentAccount } = useContext(ApiContext);
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
      setCurrentAccount(account);
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
    validate('email');
  }, [state.email]);

  useEffect(() => {
    validate('password');
  }, [state.password]);

  const validate = (field: string): void => {
    const { email, password } = state;
    const formData = { email, password };

    setState((old) => ({
      ...old,
      [`${field}Error`]: validation.validate(field, formData),
    }));
    setState((old) => ({
      ...old,
      isFormInvalid: !!old.emailError || !!old.passwordError,
    }));
  };

  return (
    <div className={styles.loginWrap}>
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
