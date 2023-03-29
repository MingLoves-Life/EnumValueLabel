import { EnumConfig, ValueOf, FirstValue } from "../types";

type CreateEnumReturn1<T> = { [P in keyof T]: FirstValue<T[P]> };
// type CreateEnumReturn1<T> = keyof T;
type CreateEnumReturn2<T> = {
  [P in Extract<FirstValue<ValueOf<T>>, string | number>]: {
    [K in keyof T]: T[K] extends readonly [P, any] ? K : never;
  }[keyof T];
};
export type CreateEnumReturn<T> = CreateEnumReturn1<T> & CreateEnumReturn2<T>;

export const createEnum = <T>(
  enumConfig: T extends EnumConfig ? T : never
): CreateEnumReturn<T> => {
  const enumKeys = Object.keys(enumConfig);
  const newEnum = {} as CreateEnumReturn<T>;
  enumKeys.forEach((key) => (newEnum[key] = enumConfig[key][0]));
  enumKeys.forEach((key) => (newEnum[`${enumConfig[key][0]}`] = key));
  return newEnum;
};
