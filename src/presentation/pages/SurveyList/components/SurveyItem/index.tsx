import React from 'react';

import { SurveyModel } from '@/domain/models';
import { Icon, IconName } from '@/presentation/components';

import styles from './styles.scss';

type Props = {
  survey: SurveyModel;
};

export const SurveyItem = ({ survey }: Props) => {
  return (
    <li>
      <div className={styles.surveyContent}>
        <Icon
          className={styles.iconWrap}
          iconName={survey.didAnswer ? IconName.THUMB_UP : IconName.THUMB_DOWN}
        />

        <time>
          <span data-testid='day' className={styles.day}>
            {survey.date.getDate()}
          </span>
          <span data-testid='month' className={styles.month}>
            {survey.date
              .toLocaleDateString('pt-BR', {
                month: 'short',
              })
              .replace('.', '')}
          </span>
          <span data-testid='year' className={styles.year}>
            {survey.date.getFullYear()}
          </span>
        </time>

        <p data-testid='question'>{survey.question}</p>
      </div>
      <footer>Ver resultado</footer>
    </li>
  );
};
