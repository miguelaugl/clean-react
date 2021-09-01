import React, { useContext } from 'react';

import { SurveyListContext } from '../context';
import styles from './styles.scss';

export const Error = () => {
  const { state, setState } = useContext(SurveyListContext);

  const reload = (): void => {
    setState((prevState) => ({ surveys: [], error: '', reload: !prevState.reload }));
  };

  return (
    <div className={styles.errorWrap}>
      <span data-testid='error'>{state.error}</span>
      <button data-testid='reload' type='button' onClick={reload}>
        Tentar novamente
      </button>
    </div>
  );
};
