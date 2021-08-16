import React from 'react';
import { Spinner } from '@/presentation/components/Spinner';
import { useForm } from '@/presentation/contexts/form';
import styles from './styles.scss';

type Props = {
  label: string;
};

export const FormStatus = ({ label }: Props) => {
  const { isLoading, errorMessage } = useForm();

  return (
    <div data-testid='error-wrap' className={styles.errorWrap}>
      {isLoading && <Spinner className={styles.spinner} />}
      {errorMessage && <span className={styles.error}>{label}</span>}
    </div>
  );
};
