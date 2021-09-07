import React from 'react';

import { Spinner } from '@/presentation/components';

import styles from './styles.scss';

export const Loading = () => {
  return (
    <div data-testid='loading' className={styles.loadingWrap}>
      <div className={styles.loading}>
        <span>Aguarde...</span>
        <Spinner isNegative />
      </div>
    </div>
  );
};
