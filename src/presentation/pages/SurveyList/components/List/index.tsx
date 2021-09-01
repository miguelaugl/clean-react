import React, { useContext } from 'react';

import { SurveyModel } from '@/domain/models';
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
        state.surveys.map((survey: SurveyModel) => <SurveyItem key={survey.id} survey={survey} />)}
      {!state.surveys.length && <SurveyItemEmpty />}
    </ul>
  );
};
