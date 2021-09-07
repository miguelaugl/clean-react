export interface LoadSurveyResult {
  load(): Promise<LoadSurveyResult.Model>;
}

export namespace LoadSurveyResult {
  export type Model = {
    question: string;
    answers: Answer[];
    date: Date;
    didAnswer: boolean;
  };

  type Answer = {
    image?: string;
    answer: string;
    count: number;
  };
}
