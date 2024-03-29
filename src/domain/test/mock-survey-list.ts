import faker from 'faker';

import { LoadSurveyList } from '@/domain/usecases';

export const mockSurveyListModel = (): LoadSurveyList.Model[] => [mockSurveyModel(), mockSurveyModel(), mockSurveyModel(), mockSurveyModel()];

export const mockSurveyModel = (): LoadSurveyList.Model => ({
  id: faker.datatype.uuid(),
  question: faker.random.words(10),
  didAnswer: faker.datatype.boolean(),
  date: faker.date.recent(),
});
