import React from 'react';

import styles from './styles.scss';

export const SurveyItemEmpty = () => {
  return (
    <>
      <li className={styles.surveyItemEmpty} />
      <li className={styles.surveyItemEmpty} />
      <li className={styles.surveyItemEmpty} />
      <li className={styles.surveyItemEmpty} />
    </>
  );
};
