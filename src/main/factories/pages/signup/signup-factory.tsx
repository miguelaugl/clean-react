import React from 'react';

import { makeRemoteAddAccount } from '@/main/factories/usecases';
import { SignUp } from '@/presentation/pages';

import { makeSignUpValidation } from './signup-validation-factory';

export const makeSignup = () => {
  return <SignUp validation={makeSignUpValidation()} addAccount={makeRemoteAddAccount()} />;
};
