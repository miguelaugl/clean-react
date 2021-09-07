import React, { useState, useEffect } from 'react';

import { LoadSurveyResult } from '@/domain/usecases';
import { Error, Footer, Header, Loading } from '@/presentation/components';
import { useErrorHandler } from '@/presentation/hooks';
import { Result } from '@/presentation/pages/SurveyResult/components';

import styles from './styles.scss';

type Props = {
  loadSurveyResult: LoadSurveyResult;
};

export const SurveyResult = ({ loadSurveyResult }: Props) => {
  const handleError = useErrorHandler((error) => {
    setState((prevState) => ({ ...prevState, surveyResult: null, error: error.message }));
  });

  const [state, setState] = useState({
    isLoading: false,
    error: '',
    surveyResult: null as LoadSurveyResult.Model,
    reload: false,
  });

  useEffect(() => {
    loadSurveyResult
      .load()
      .then((surveyResult) => setState((prevState) => ({ ...prevState, surveyResult })))
      .catch(handleError);
  }, [state.reload]);
  const reload = (): void => setState((old) => ({ surveyResult: null, error: '', isLoading: false, reload: !old.reload }));

  return (
    <div className={styles.surveyResultWrap}>
      <Header />

      <div data-testid='survey-result' className={styles.contentWrap}>
        {state.surveyResult && <Result surveyResult={state.surveyResult} />}
        {state.isLoading && <Loading />}
        {!!state.error && <Error error={state.error} reload={reload} />}
      </div>
      <Footer />
    </div>
  );
};
