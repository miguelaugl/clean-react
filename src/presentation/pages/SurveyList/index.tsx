import React, { useEffect, useState } from 'react';

import { LoadSurveyList } from '@/domain/usecases';
import { Footer, Header, Error } from '@/presentation/components';
import { useErrorHandler } from '@/presentation/hooks';
import { SurveyListContext, List } from '@/presentation/pages/SurveyList/components';

import styles from './styles.scss';

type Props = {
  loadSurveyList: LoadSurveyList;
};

export const SurveyList = ({ loadSurveyList }: Props) => {
  const handleError = useErrorHandler((error) => {
    setState((prevState) => ({ ...prevState, error: error.message }));
  });

  const [state, setState] = useState({
    surveys: [] as LoadSurveyList.Model[],
    error: '',
    reload: false,
  });

  useEffect(() => {
    loadSurveyList
      .loadAll()
      .then((surveys) => setState((prevState) => ({ ...prevState, surveys })))
      .catch(handleError);
  }, [state.reload]);

  const reload = (): void => setState((old) => ({ surveys: [], error: '', reload: !old.reload }));

  return (
    <div className={styles.surveyListWrap}>
      <Header />

      <div className={styles.contentWrap}>
        <h2>Enquetes</h2>
        <SurveyListContext.Provider value={{ state, setState }}>
          {!!state.error && <Error error={state.error} reload={reload} />}
          {!state.error && <List />}
        </SurveyListContext.Provider>
      </div>
      <Footer />
    </div>
  );
};
