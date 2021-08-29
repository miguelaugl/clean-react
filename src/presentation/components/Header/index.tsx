import React, { useContext } from 'react';

import { Logo } from '@/presentation/components';
import { ApiContext } from '@/presentation/contexts';

import styles from './styles.scss';

export const Header = () => {
  const { getCurrentAccount } = useContext(ApiContext);

  const account = getCurrentAccount();

  return (
    <header className={styles.headerWrap}>
      <div className={styles.headerContent}>
        <Logo />
        <div className={styles.logoutWrap}>
          <span>{account.name}</span>
          <a href='/'>Sair</a>
        </div>
      </div>
    </header>
  );
};
