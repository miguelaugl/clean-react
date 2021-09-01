import React from 'react';

import { makeRemoteLoadSurveyList } from '@/main/factories/usecases';
import { SurveyList } from '@/presentation/pages';

export const makeSurveyList = () => {
  return <SurveyList loadSurveyList={makeRemoteLoadSurveyList()} />;
};
