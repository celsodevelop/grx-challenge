import { ObjectConstructor } from '../types/types';

export const extractKeysFromObject = <T>(obj: T) => (<ObjectConstructor>Object).keys(obj);

// https://bobbyhadz.com/blog/javascript-format-number-as-percent
export const formatAsPercent = (num: number) => new Intl.NumberFormat('default', {
  style: 'percent',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
}).format(num / 100);
