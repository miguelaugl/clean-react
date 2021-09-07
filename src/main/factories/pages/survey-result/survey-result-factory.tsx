import React from 'react';
import { useParams } from 'react-router-dom';

import { makeRemoteLoadSurveyResult } from '@/main/factories/usecases';
import { SurveyResult } from '@/presentation/pages';

type Params = {
  id: string;
};

export const makeSurveyResult = () => {
  const { id } = useParams<Params>();
  return <SurveyResult loadSurveyResult={makeRemoteLoadSurveyResult(id)} />;
};
