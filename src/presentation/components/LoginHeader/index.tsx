import React, { memo } from 'react';
import { Logo } from '@/presentation/components/Logo';
import styles from './styles.scss';

const LoginHeaderComponent = () => (
  <header className={styles.header}>
    <Logo />
    <h1>4DEV - Enquetes para Programadores</h1>
  </header>
);

export const LoginHeader = memo(LoginHeaderComponent);
