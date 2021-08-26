import React from 'react';

import { makeLocalSaveAccessToken } from '@/main/factories/usecases/save-access-token/local-save-access-token-factory';
import { SignUp } from '@/presentation/pages';

import { makeRemoteAddAccount } from '../../usecases/add-account/remote-add-account-factory';
import { makeSignUpValidation } from './signup-validation-factory';

export const makeSignup = () => {
  return (
    <SignUp
      validation={makeSignUpValidation()}
      addAccount={makeRemoteAddAccount()}
      saveAccessToken={makeLocalSaveAccessToken()}
    />
  );
};
