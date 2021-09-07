import { render, screen, waitFor } from '@testing-library/react';
import { createMemoryHistory, MemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router';

import { AccessDeniedError, UnexpectedError } from '@/domain/errors';
import { AccountModel } from '@/domain/models';
import { LoadSurveyResultSpy, mockAccountModel, mockSurveyResultModel } from '@/domain/test';
import { ApiContext } from '@/presentation/contexts';
import { SurveyResult } from '@/presentation/pages/SurveyResult';

type SutTypes = {
  loadSurveyResultSpy: LoadSurveyResultSpy;
  history: MemoryHistory;
  setCurrentAccountMock: (account: AccountModel) => void;
};

const makeSut = (loadSurveyResultSpy = new LoadSurveyResultSpy()): SutTypes => {
  const history = createMemoryHistory();
  const setCurrentAccountMock = jest.fn();
  render(
    <Router history={history}>
      <ApiContext.Provider
        value={{
          setCurrentAccount: setCurrentAccountMock,
          getCurrentAccount: () => mockAccountModel(),
        }}
      >
        <SurveyResult loadSurveyResult={loadSurveyResultSpy} />
      </ApiContext.Provider>
    </Router>,
  );
  return {
    loadSurveyResultSpy,
    history,
    setCurrentAccountMock,
  };
};

describe('SurveyResult Component', () => {
  it('should present correct initial state', async () => {
    makeSut();
    const surveyResult = screen.getByTestId('survey-result');
    expect(surveyResult.childElementCount).toBe(0);
    expect(screen.queryByTestId('error')).not.toBeInTheDocument();
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    await waitFor(() => surveyResult);
  });

  it('should call LoadSurveyResult', async () => {
    const { loadSurveyResultSpy } = makeSut();
    await waitFor(() => screen.getByTestId('survey-result'));
    expect(loadSurveyResultSpy.callsCount).toBe(1);
  });

  it('should present SurveyResult data on success', async () => {
    const loadSurveyResultSpy = new LoadSurveyResultSpy();
    const surveyResult = {
      ...mockSurveyResultModel(),
      date: new Date('2020-01-10T00:00:00'),
    };
    loadSurveyResultSpy.surveyResult = surveyResult;
    makeSut(loadSurveyResultSpy);
    await waitFor(() => screen.getByTestId('survey-result'));
    expect(screen.getByTestId('day')).toHaveTextContent('10');
    expect(screen.getByTestId('month')).toHaveTextContent('jan');
    expect(screen.getByTestId('year')).toHaveTextContent('2020');
    expect(screen.getByTestId('question')).toHaveTextContent(surveyResult.question);
    expect(screen.getByTestId('answers').childElementCount).toBe(2);
    const answersWrap = screen.queryAllByTestId('answer-wrap');
    expect(answersWrap[0]).toHaveClass('active');
    expect(answersWrap[1]).not.toHaveClass('active');
    const images = screen.queryAllByTestId('image');
    expect(images[0]).toHaveAttribute('src', surveyResult.answers[0].image);
    expect(images[0]).toHaveAttribute('alt', surveyResult.answers[0].answer);
    expect(images[1]).toBeFalsy();
    const answers = screen.queryAllByTestId('answer');
    expect(answers[0]).toHaveTextContent(surveyResult.answers[0].answer);
    expect(answers[1]).toHaveTextContent(surveyResult.answers[1].answer);
    const percents = screen.queryAllByTestId('percent');
    expect(percents[0]).toHaveTextContent(`${surveyResult.answers[0].percent}%`);
    expect(percents[1]).toHaveTextContent(`${surveyResult.answers[1].percent}%`);
  });

  it('should render error on UnexpectedError', async () => {
    const loadSurveyResultSpy = new LoadSurveyResultSpy();
    const error = new UnexpectedError();
    jest.spyOn(loadSurveyResultSpy, 'load').mockRejectedValueOnce(error);
    makeSut(loadSurveyResultSpy);
    await waitFor(() => screen.getByTestId('survey-result'));
    expect(screen.queryByTestId('question')).not.toBeInTheDocument();
    expect(screen.getByTestId('error')).toHaveTextContent(error.message);
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
  });

  it('should logout on AccessDeniedError', async () => {
    const loadSurveyResultSpy = new LoadSurveyResultSpy();
    const error = new AccessDeniedError();
    jest.spyOn(loadSurveyResultSpy, 'load').mockRejectedValueOnce(error);
    const { setCurrentAccountMock, history } = makeSut(loadSurveyResultSpy);
    await waitFor(() => screen.getByTestId('survey-result'));
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined);
    expect(history.location.pathname).toBe('/login');
  });
});
