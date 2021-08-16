import React from 'react';
import styles from './styles.scss';

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const Input = (props: Props) => (
  <div className={styles.inputWrap}>
    <input {...props} />
    <span className={styles.status}>🔴</span>
  </div>
);
