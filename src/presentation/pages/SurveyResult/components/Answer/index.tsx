import React, { useContext } from 'react';

import { SurveyResultAnswerModel } from '@/domain/models';
import { SurveyResultContext } from '@/presentation/pages/SurveyResult/components';

import styles from './styles.scss';

type Props = {
  answer: SurveyResultAnswerModel;
};

export const Answer = ({ answer }: Props) => {
  const { onAnswer } = useContext(SurveyResultContext);
  const activeClassName = answer.isCurrentAccountAnswer ? styles.active : '';
  const answerClick = (event: React.MouseEvent): void => {
    if (event.currentTarget.classList.contains(styles.active)) {
      return;
    }
    onAnswer(answer.answer);
  };
  return (
    <li data-testid='answer-wrap' key={answer.answer} className={[styles.answerWrap, activeClassName].join(' ')} onClick={answerClick}>
      {answer.image && <img data-testid='image' src={answer.image} alt={answer.answer} />}
      <span data-testid='answer' className={styles.answer}>
        {answer.answer}
      </span>
      <span data-testid='percent' className={styles.percent}>
        {`${answer.percent}%`}
      </span>
    </li>
  );
};
