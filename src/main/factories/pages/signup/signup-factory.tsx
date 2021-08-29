import React from 'react';

import { SignUp } from '@/presentation/pages';

import { makeRemoteAddAccount } from '../../usecases/add-account/remote-add-account-factory';
import { makeSignUpValidation } from './signup-validation-factory';

export const makeSignup = () => {
  return <SignUp validation={makeSignUpValidation()} addAccount={makeRemoteAddAccount()} />;
};
