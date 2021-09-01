import React, { useEffect, useState } from 'react';

import { LoadSurveyList } from '@/domain/usecases';
import { Footer, Header } from '@/presentation/components';

import { SurveyListContext, List, Error } from './components';
import styles from './styles.scss';

type Props = {
  loadSurveyList: LoadSurveyList;
};

export const SurveyList = ({ loadSurveyList }: Props) => {
  const [state, setState] = useState({
    surveys: [] as LoadSurveyList.Model[],
    error: '',
    reload: false,
  });

  useEffect(() => {
    loadSurveyList
      .loadAll()
      .then((surveys) => setState((prevState) => ({ ...prevState, surveys })))
      .catch((error) => setState((prevState) => ({ ...prevState, error: error.message })));
  }, [state.reload]);

  return (
    <div className={styles.surveyListWrap}>
      <Header />

      <div className={styles.contentWrap}>
        <h2>Enquetes</h2>
        <SurveyListContext.Provider value={{ state, setState }}>
          {!!state.error && <Error />}
          {!state.error && <List />}
        </SurveyListContext.Provider>
      </div>
      <Footer />
    </div>
  );
};
