import React, { useContext } from 'react';

import { SurveyListContext } from '../context';
import styles from './styles.scss';

export const Error = () => {
  const { state } = useContext(SurveyListContext);

  return (
    <div className={styles.errorWrap}>
      <span data-testid='error'>{state.error}</span>
      <button type='button'>Recarregar</button>
    </div>
  );
};
