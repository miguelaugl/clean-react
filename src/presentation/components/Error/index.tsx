import React from 'react';

import styles from './styles.scss';

type Props = {
  error: string;
  reload: () => void;
};

export const Error = ({ error, reload }: Props) => {
  return (
    <div className={styles.errorWrap}>
      <span data-testid='error'>{error}</span>
      <button data-testid='reload' type='button' onClick={reload}>
        Tentar novamente
      </button>
    </div>
  );
};
