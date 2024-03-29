import { AccessDeniedError } from '@/domain/errors';

import { useLogout } from './use-logout';

type CallbackType = (error: Error) => void;
type ReturnType = CallbackType;

export const useErrorHandler = (callback: CallbackType): ReturnType => {
  const logout = useLogout();

  return (error: Error): void => {
    if (error instanceof AccessDeniedError) {
      logout();

      return;
    }

    callback(error);
  };
};
