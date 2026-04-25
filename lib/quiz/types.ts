import type { DimensionKey } from "../../content/dimensions";

export type AnswerWeights = Partial<Record<DimensionKey, number>>;

export type QuizOption = {
  id: string;
  text: string;
  weights: AnswerWeights;
};

export type QuizQuestion = {
  id: string;
  prompt: string;
  options: QuizOption[];
};

export type AnswerMap = Record<string, string>;
export type TraitScores = Record<DimensionKey, number>;
