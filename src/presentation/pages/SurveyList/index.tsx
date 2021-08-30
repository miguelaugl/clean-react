import React from 'react';

import { Footer, Header } from '@/presentation/components';

import styles from './styles.scss';

export const SurveyList = () => {
  return (
    <div className={styles.surveyListWrap}>
      <Header />

      <div className={styles.contentWrap}>
        <h2>Enquetes</h2>
        <ul>
          <li />
        </ul>
      </div>
      <Footer />
    </div>
  );
};
