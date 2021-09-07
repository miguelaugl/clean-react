import React from 'react';

import { LoadSurveyList } from '@/domain/usecases';
import { SurveyItem, SurveyItemEmpty } from '@/presentation/pages/SurveyList/components';

import styles from './styles.scss';

type Props = {
  surveys: LoadSurveyList.Model[];
};

export const List = ({ surveys }: Props) => {
  return (
    <ul className={styles.listWrap} data-testid='survey-list'>
      {!!surveys.length && surveys.map((survey: LoadSurveyList.Model) => <SurveyItem key={survey.id} survey={survey} />)}
      {!surveys.length && <SurveyItemEmpty />}
    </ul>
  );
};
