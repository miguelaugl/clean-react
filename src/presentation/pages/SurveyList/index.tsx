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
    error: '',
  });

  useEffect(() => {
    loadSurveyList
      .loadAll()
      .then((surveys) => setState((prevState) => ({ ...prevState, surveys })))
      .catch((error) => setState((prevState) => ({ ...prevState, error: error.message })));
  }, []);

  return (
    <div className={styles.surveyListWrap}>
      <Header />

      <div className={styles.contentWrap}>
        <h2>Enquetes</h2>
        {!!state.error && (
          <div>
            <span data-testid='error'>{state.error}</span>
            <button type='button'>Recarregar</button>
          </div>
        )}
        {!state.error && (
          <ul data-testid='survey-list'>
            {!!state.surveys.length &&
              state.surveys.map((survey) => <SurveyItem key={survey.id} survey={survey} />)}
            {!state.surveys.length && <SurveyItemEmpty />}
          </ul>
        )}
      </div>
      <Footer />
    </div>
  );
};
