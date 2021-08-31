import faker from 'faker';

import { SurveyModel } from '@/domain/models';

export const mockSurveyListModel = (): SurveyModel[] => [
  mockSurveyModel(),
  mockSurveyModel(),
  mockSurveyModel(),
  mockSurveyModel(),
];

export const mockSurveyModel = () => ({
  id: faker.datatype.uuid(),
  question: faker.random.words(10),
  answers: [
    {
      answer: faker.random.words(4),
      image: faker.internet.url(),
    },
    {
      answer: faker.random.words(5),
    },
    {
      answer: faker.random.words(4),
    },
  ],
  didAnswer: faker.datatype.boolean(),
  date: faker.date.recent(),
});
