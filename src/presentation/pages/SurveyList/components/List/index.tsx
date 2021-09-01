import React, { useContext } from 'react';

import { LoadSurveyList } from '@/domain/usecases';
import {
  SurveyListContext,
  SurveyItem,
  SurveyItemEmpty,
} from '@/presentation/pages/SurveyList/components';

import styles from './styles.scss';

export const List = () => {
  const { state } = useContext(SurveyListContext);

  return (
    <ul className={styles.listWrap} data-testid='survey-list'>
      {!!state.surveys.length &&
        state.surveys.map((survey: LoadSurveyList.Model) => (
          <SurveyItem key={survey.id} survey={survey} />
        ))}
      {!state.surveys.length && <SurveyItemEmpty />}
    </ul>
  );
};
