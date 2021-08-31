import React, { useEffect } from 'react';

import { LoadSurveyList } from '@/domain/usecases';
import { Footer, Header } from '@/presentation/components';

import { SurveyItemEmpty } from './components';
import styles from './styles.scss';

type Props = {
  loadSurveyList: LoadSurveyList;
};

export const SurveyList = ({ loadSurveyList }: Props) => {
  useEffect(() => {
    loadSurveyList.loadAll();
  }, []);

  return (
    <div className={styles.surveyListWrap}>
      <Header />

      <div className={styles.contentWrap}>
        <h2>Enquetes</h2>
        <ul data-testid='survey-list'>
          <SurveyItemEmpty />
        </ul>
      </div>
      <Footer />
    </div>
  );
};
