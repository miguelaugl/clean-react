import React, { useEffect, useState } from 'react';

import { SurveyModel } from '@/domain/models';
import { LoadSurveyList } from '@/domain/usecases';
import { Footer, Header } from '@/presentation/components';

import { SurveyItem, SurveyItemEmpty } from './components';
import styles from './styles.scss';

type Props = {
  loadSurveyList: LoadSurveyList;
};

export const SurveyList = ({ loadSurveyList }: Props) => {
  const [state, setState] = useState({
    surveys: [] as SurveyModel[],
  });

  useEffect(() => {
    loadSurveyList.loadAll().then((surveys) => setState({ surveys }));
  }, []);

  return (
    <div className={styles.surveyListWrap}>
      <Header />

      <div className={styles.contentWrap}>
        <h2>Enquetes</h2>
        <ul data-testid='survey-list'>
          {state.surveys.length ? (
            state.surveys.map((survey) => <SurveyItem key={survey.id} survey={survey} />)
          ) : (
            <SurveyItemEmpty />
          )}
        </ul>
      </div>
      <Footer />
    </div>
  );
};
