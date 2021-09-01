import React from 'react';

import { makeRemoteAuthentication } from '@/main/factories/usecases';
import { Login } from '@/presentation/pages';

import { makeLoginValidation } from './login-validation-factory';

export const makeLogin = () => {
  return <Login authentication={makeRemoteAuthentication()} validation={makeLoginValidation()} />;
};
