import { render, screen } from '@testing-library/react';
import React from 'react';

import { mockSurveyModel } from '@/domain/test';
import { IconName } from '@/presentation/components';

import { SurveyItem } from '.';

const makeSut = (survey = mockSurveyModel()): void => {
  render(<SurveyItem survey={survey} />);
};

describe('SurveyItem Component', () => {
  it('should render with correct values', () => {
    const survey = Object.assign(mockSurveyModel(), {
      didAnswer: true,
    });
    makeSut(survey);
    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.THUMB_UP);
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question);
  });

  it('should render with correct values', () => {
    const survey = Object.assign(mockSurveyModel(), {
      didAnswer: false,
    });
    makeSut(survey);
    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.THUMB_DOWN);
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question);
  });
});
