import React from 'react';

import { Logo } from '@/presentation/components';

import styles from './styles.scss';

export const Header = () => {
  return (
    <header className={styles.headerWrap}>
      <div className={styles.headerContent}>
        <Logo />
        <div className={styles.logoutWrap}>
          <span>Miguel</span>
          <a href='/'>Sair</a>
        </div>
      </div>
    </header>
  );
};
