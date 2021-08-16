import React from 'react';
import { Spinner } from '@/presentation/components/Spinner';
import styles from './styles.scss';

type Props = {
  label: string;
};

export const FormStatus = ({ label }: Props) => (
  <div className={styles.errorWrap}>
    <Spinner className={styles.spinner} />
    <span className={styles.error}>{label}</span>
  </div>
);
