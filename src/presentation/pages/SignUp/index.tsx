import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { AddAccount } from '@/domain/usecases';
import { LoginHeader, Footer, FormStatus, Input, SubmitButton } from '@/presentation/components';
import { ApiContext, FormContextProvider } from '@/presentation/contexts';
import { Validation } from '@/presentation/protocols/validation';

import styles from './styles.scss';

type Props = {
  validation: Validation;
  addAccount: AddAccount;
};

export const SignUp = ({ validation, addAccount }: Props) => {
  const { setCurrentAccount } = useContext(ApiContext);

  const history = useHistory();

  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    nameError: '',
    emailError: '',
    passwordError: '',
    passwordConfirmationError: 'Campo obrigatório',
    mainError: '',
  });

  useEffect(() => {
    validate('name');
  }, [state.name]);

  useEffect(() => {
    validate('email');
  }, [state.email]);

  useEffect(() => {
    validate('password');
  }, [state.password]);

  useEffect(() => {
    validate('passwordConfirmation');
  }, [state.passwordConfirmation]);

  const validate = (field: string): void => {
    const { name, email, password, passwordConfirmation } = state;
    const formData = { name, email, password, passwordConfirmation };

    setState((old) => ({
      ...old,
      [`${field}Error`]: validation.validate(field, formData),
    }));
    setState((old) => ({
      ...old,
      isFormInvalid: !!old.nameError || !!old.emailError || !!old.passwordError || !!old.passwordConfirmationError,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    try {
      if (state.isLoading || state.isFormInvalid) {
        return;
      }

      setState((prevState) => ({ ...prevState, isLoading: true }));

      const account = await addAccount.add({
        name: state.name,
        email: state.email,
        password: state.password,
        passwordConfirmation: state.passwordConfirmation,
      });
      setCurrentAccount(account);
      history.replace('/');
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
        mainError: error.message,
      }));
    }
  };

  return (
    <div className={styles.signUpWrap}>
      <LoginHeader />

      <FormContextProvider value={{ state, setState }}>
        <form data-testid='form' className={styles.form} onSubmit={handleSubmit}>
          <h2>Criar conta</h2>

          <Input type='text' name='name' placeholder='Digite seu nome' />
          <Input type='email' name='email' placeholder='Digite seu e-mail' />
          <Input type='password' name='password' placeholder='Digite sua senha' />
          <Input type='password' name='passwordConfirmation' placeholder='Repita sua senha' />

          <SubmitButton text='Cadastrar' />

          <Link to='/login' data-testid='login-link' className={styles.link} replace>
            Voltar para Login
          </Link>

          <FormStatus />
        </form>
      </FormContextProvider>

      <Footer />
    </div>
  );
};
