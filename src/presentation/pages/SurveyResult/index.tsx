import React from 'react';
import FlipMove from 'react-flip-move';

import { Calendar, Footer, Header, Loading } from '@/presentation/components';

import styles from './styles.scss';

export const SurveyResult = () => {
  return (
    <div className={styles.surveyResultWrap}>
      <Header />

      <div className={styles.contentWrap}>
        <hgroup>
          <Calendar date={new Date()} className={styles.calendarWrap} />
          <h2>Qual é seu framework web favorito?</h2>
        </hgroup>

        <FlipMove className={styles.answersList}>
          <li>
            <img src='http://fordevs.herokuapp.com/static/img/logo-react.png' alt='Logo React' />
            <span className={styles.answer}>ReactJS</span>
            <span className={styles.percent}>50%</span>
          </li>
          <li className={styles.active}>
            <img src='http://fordevs.herokuapp.com/static/img/logo-react.png' alt='Logo React' />
            <span className={styles.answer}>ReactJS</span>
            <span className={styles.percent}>50%</span>
          </li>
          <li>
            <img src='http://fordevs.herokuapp.com/static/img/logo-react.png' alt='Logo React' />
            <span className={styles.answer}>ReactJS</span>
            <span className={styles.percent}>50%</span>
          </li>
        </FlipMove>
        <button type='button'>Voltar</button>
        {false && <Loading />}
      </div>
      <Footer />
    </div>
  );
};
