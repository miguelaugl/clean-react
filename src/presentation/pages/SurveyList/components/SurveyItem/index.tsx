import React from 'react';
import { Link } from 'react-router-dom';

import { LoadSurveyList } from '@/domain/usecases';
import { Calendar, Icon, IconName } from '@/presentation/components';

import styles from './styles.scss';

type Props = {
  survey: LoadSurveyList.Model;
};

export const SurveyItem = ({ survey }: Props) => {
  const iconName = survey.didAnswer ? IconName.THUMB_UP : IconName.THUMB_DOWN;

  return (
    <li className={styles.surveyItemWrap}>
      <div className={styles.surveyContent}>
        <Icon className={styles.iconWrap} iconName={iconName} />

        <Calendar className={styles.calendarWrap} date={survey.date} />

        <p data-testid='question'>{survey.question}</p>
      </div>
      <footer>
        <Link data-testid='link' to={`/surveys/${survey.id}`}>
          Ver resultado
        </Link>
      </footer>
    </li>
  );
};
