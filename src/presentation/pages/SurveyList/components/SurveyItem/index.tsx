import React from 'react';

import { Icon, IconName } from '@/presentation/components';

import styles from './styles.scss';

export const SurveyItem = () => {
  return (
    <li>
      <div className={styles.surveyContent}>
        <Icon className={styles.iconWrap} iconName={IconName.THUMB_UP} />

        <time>
          <span className={styles.day}>28</span>
          <span className={styles.month}>08</span>
          <span className={styles.year}>2021</span>
        </time>
        <p>Qual é seu framework web favorito?</p>
      </div>
      <footer>Ver resultado</footer>
    </li>
  );
};
