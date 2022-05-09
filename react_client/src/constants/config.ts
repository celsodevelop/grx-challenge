export const POST_ANSWERS_ENDPOINT = '/answer';
export const Y_OR_N_SERVER_SIDE_VALUES = /yes|no/;
export const Y_OR_N_IDK_NOW_SERVER_SIDE_VALUES = new RegExp(
  `${Y_OR_N_SERVER_SIDE_VALUES.source}|${/idk|now/.source}`,
);
export const MIN_LENGTH = 15;
export const MIN_PROPERTY: [number, string] = [
  MIN_LENGTH,
  `Por favor, o texto deve ser maior que ${MIN_LENGTH} caracteres`,
];
export const MAX_LENGTH = 200;
export const MAX_PROPERTY: [number, string] = [
  MAX_LENGTH,
  `Por favor, o texto deve ser menor que ${MAX_LENGTH} caracteres`,
];
export const SELECT_OPTION_LABEL = 'Selecione uma opção';
export const INVALID_QUESTION_MSG = 'Tipo de questão inválida, ver estrutura do JSON';
