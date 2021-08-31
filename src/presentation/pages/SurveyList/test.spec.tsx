import { render, screen } from '@testing-library/react';
import React from 'react';

import { SurveyList } from '.';

const makeSut = (): void => {
  render(<SurveyList />);
};

describe('SurveyList Component', () => {
  it('should present 4 empty items on start', () => {
    makeSut();
    const surveyList = screen.getByTestId('survey-list');
    expect(surveyList.querySelectorAll('li:empty').length).toBe(4);
  });
});
