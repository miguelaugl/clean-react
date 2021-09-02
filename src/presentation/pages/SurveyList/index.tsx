import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { AccessDeniedError } from '@/domain/errors';
import { LoadSurveyList } from '@/domain/usecases';
import { Footer, Header } from '@/presentation/components';
import { ApiContext } from '@/presentation/contexts';

import { SurveyListContext, List, Error } from './components';
import styles from './styles.scss';

type Props = {
  loadSurveyList: LoadSurveyList;
};

export const SurveyList = ({ loadSurveyList }: Props) => {
  const history = useHistory();

  const { setCurrentAccount } = useContext(ApiContext);

  const [state, setState] = useState({
    surveys: [] as LoadSurveyList.Model[],
    error: '',
    reload: false,
  });

  useEffect(() => {
    loadSurveyList
      .loadAll()
      .then((surveys) => setState((prevState) => ({ ...prevState, surveys })))
      .catch((error) => {
        if (error instanceof AccessDeniedError) {
          setCurrentAccount(undefined);
          history.replace('/login');

          return;
        }

        setState((prevState) => ({ ...prevState, error: error.message }));
      });
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
