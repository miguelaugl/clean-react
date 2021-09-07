import React, { useState, useEffect } from 'react';
import FlipMove from 'react-flip-move';

import { LoadSurveyResult } from '@/domain/usecases';
import { Calendar, Error, Footer, Header, Loading } from '@/presentation/components';

import styles from './styles.scss';

type Props = {
  loadSurveyResult: LoadSurveyResult;
};

export const SurveyResult = ({ loadSurveyResult }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    error: '',
    surveyResult: null as LoadSurveyResult.Model,
  });

  useEffect(() => {
    loadSurveyResult.load().then((surveyResult) => setState((prevState) => ({ ...prevState, surveyResult })));
  }, []);

  return (
    <div className={styles.surveyResultWrap}>
      <Header />

      <div data-testid='survey-result' className={styles.contentWrap}>
        {state.surveyResult && (
          <>
            <hgroup>
              <Calendar date={state.surveyResult.date} className={styles.calendarWrap} />
              <h2 data-testid='question'>{state.surveyResult.question}</h2>
            </hgroup>

            <FlipMove data-testid='answers' className={styles.answersList}>
              {state.surveyResult.answers.map((answer) => (
                <li data-testid='answer-wrap' key={answer.answer} className={answer.isCurrentAccountAnswer ? styles.active : ''}>
                  {answer.image && <img data-testid='image' src={answer.image} alt={answer.answer} />}
                  <span data-testid='answer' className={styles.answer}>
                    {answer.answer}
                  </span>
                  <span data-testid='percent' className={styles.percent}>
                    {`${answer.percent}%`}
                  </span>
                </li>
              ))}
            </FlipMove>
            <button type='button'>Voltar</button>
          </>
        )}

        {state.isLoading && <Loading />}
        {!!state.error && <Error error={state.error} reload={() => {}} />}
      </div>
      <Footer />
    </div>
  );
};
