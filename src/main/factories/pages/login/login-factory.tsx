import React from 'react';

import { makeRemoteAuthentication } from '@/main/factories/usecases/authentication/remote-authentication-factory';
import { Login } from '@/presentation/pages';

import { makeLoginValidation } from './login-validation-factory';

export const makeLogin = () => {
  return <Login authentication={makeRemoteAuthentication()} validation={makeLoginValidation()} />;
};
