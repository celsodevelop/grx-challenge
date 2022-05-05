// CONFIG GRX DATA COLLECT TYPES

type PositionOfScoredQuestions = 1 | 2 | 3;
type PositionOfUnscoredQuestions = 4;
type PositiveAnswers = 'yes' | 'now';
type NegativeAnswers = 'no';
type NotAvaliatedAnswers = 'idk';
type Classifications = 'positives' | 'negatives' | 'not_avaliated';
type PrefixQuestions = 'question';

// DOMAIN TYPES

export type UserAnswers = ScoredUserAnswers & UnscoredUserAnswers;
export type Statistics = {
  [key in Classifications]: number;
};
export type ScoredUserAnswers = AddPrefixToObject<AcceptedScoredAnswers, PrefixQuestions>;
export type PointsByAnswerJSON = {
  [question in keyof ScoredUserAnswers]: {
    [classification in Classifications]: {
      [answer in PositiveAnswers | NegativeAnswers | NotAvaliatedAnswers]: number;
    };
  };
};

// AUX DOMAIN TYPES

type UnscoredUserAnswers = AddPrefixToObject<AcceptedUnscoredAnswers, PrefixQuestions>;
type AcceptedScoredAnswers = {
  [key in PositionOfScoredQuestions]:
    | PositiveAnswers
    | NegativeAnswers
    | NotAvaliatedAnswers;
};

type AcceptedUnscoredAnswers = {
  [key in PositionOfUnscoredQuestions]: string | number | boolean;
};

// TYPE UTILS

type AddPrefixToObject<T, P extends string> = {
  [K in keyof T as K extends number ? `${P}${K}` : never]: T[K];
};

type ObjectKeys<T> = T extends object
  ? (keyof T)[]
  : T extends number
  ? []
  : T extends Array<T> | string
  ? string[]
  : never;

export interface ObjectConstructor {
  keys<T>(o: T): ObjectKeys<T>;
}

export const extractKeysFromObject = <T>(obj: T) => (<ObjectConstructor>Object).keys(obj);
