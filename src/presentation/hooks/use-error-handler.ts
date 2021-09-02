import { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { AccessDeniedError } from '@/domain/errors';
import { ApiContext } from '@/presentation/contexts';

type CallbackType = (error: Error) => void;
type ReturnType = CallbackType;

export const useErrorHandler = (callback: CallbackType): ReturnType => {
  const history = useHistory();
  const { setCurrentAccount } = useContext(ApiContext);

  return (error: Error): void => {
    if (error instanceof AccessDeniedError) {
      setCurrentAccount(undefined);
      history.replace('/login');

      return;
    }

    callback(error);
  };
};
