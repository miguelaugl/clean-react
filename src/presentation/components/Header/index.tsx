import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { Logo } from '@/presentation/components';
import { ApiContext } from '@/presentation/contexts';

import styles from './styles.scss';

export const Header = () => {
  const history = useHistory();

  const { setCurrentAccount, getCurrentAccount } = useContext(ApiContext);

  const logout = (event: React.MouseEvent<HTMLAnchorElement>): void => {
    event.preventDefault();
    setCurrentAccount(undefined);
    history.replace('/login');
  };

  const account = getCurrentAccount();

  return (
    <header className={styles.headerWrap}>
      <div className={styles.headerContent}>
        <Logo />
        <div className={styles.logoutWrap}>
          <span data-testid='username'>{account.name}</span>
          <a data-testid='logout' href='/' onClick={logout}>
            Sair
          </a>
        </div>
      </div>
    </header>
  );
};
