import React, { useContext } from 'react';

import { Logo } from '@/presentation/components';
import { ApiContext } from '@/presentation/contexts';
import { useLogout } from '@/presentation/hooks';

import styles from './styles.scss';

export const Header = () => {
  const logout = useLogout();

  const { getCurrentAccount } = useContext(ApiContext);

  const logoutClick = (event: React.MouseEvent<HTMLAnchorElement>): void => {
    event.preventDefault();
    logout();
  };

  const account = getCurrentAccount();

  return (
    <header className={styles.headerWrap}>
      <div className={styles.headerContent}>
        <Logo />
        <div className={styles.logoutWrap}>
          {account && <span data-testid='username'>{account?.name}</span>}
          <a data-testid='logout' href='/' onClick={logoutClick}>
            Sair
          </a>
        </div>
      </div>
    </header>
  );
};
