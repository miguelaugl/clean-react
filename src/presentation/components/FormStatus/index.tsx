import React from 'react';

import { Spinner } from '@/presentation/components/Spinner';
import { useForm } from '@/presentation/contexts';

import styles from './styles.scss';

export const FormStatus = () => {
  const { state } = useForm();
  const { isLoading, mainError } = state;

  return (
    <div data-testid='error-wrap' className={styles.errorWrap}>
      {isLoading && <Spinner className={styles.spinner} />}
      {mainError && (
        <span data-testid='main-error' className={styles.error}>
          {mainError}
        </span>
      )}
    </div>
  );
};
