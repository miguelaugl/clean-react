import React from 'react';
import { useHistory } from 'react-router-dom';

import { LoadSurveyResult } from '@/domain/usecases';
import { Calendar } from '@/presentation/components';
import { Answer } from '@/presentation/pages/SurveyResult/components';

import styles from './styles.scss';

type Props = {
  surveyResult: LoadSurveyResult.Model;
};

export const Result = ({ surveyResult }: Props) => {
  const { goBack } = useHistory();
  return (
    <>
      <hgroup>
        <Calendar date={surveyResult.date} className={styles.calendarWrap} />
        <h2 data-testid='question'>{surveyResult.question}</h2>
      </hgroup>

      <ul data-testid='answers' className={styles.answersList}>
        {surveyResult.answers.map((answer) => (
          <Answer key={answer.answer} answer={answer} />
        ))}
      </ul>
      <button data-testid='back-button' className={styles.button} type='button' onClick={goBack}>
        Voltar
      </button>
    </>
  );
};
