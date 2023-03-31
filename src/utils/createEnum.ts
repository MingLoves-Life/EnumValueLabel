import { EnumConfig, ValueOf, FirstValue } from "../types";

type CreateEnumReturn1<T> = { [P in keyof T]: FirstValue<T[P]> };

type CreateEnumReturn2<T> = {
  [P in Extract<FirstValue<ValueOf<T>>, string | number>]: {
    [K in keyof T]: T[K] extends readonly [P, any] ? K : never;
  }[keyof T];
};
export type CreateEnumReturn<T> = CreateEnumReturn1<T> & CreateEnumReturn2<T>;

export const createEnum = <T>(enumConfig: EnumConfig): CreateEnumReturn<T> => {
  const enumKeys = Object.keys(enumConfig);
  const newEnum1 = {} as CreateEnumReturn1<T>;
  enumKeys.forEach((key) => (newEnum1[key] = enumConfig[key][0]));
  const newEnum2 = {} as CreateEnumReturn2<T>;
  enumKeys.forEach((key) => (newEnum2[`${enumConfig[key][0]}`] = key));
  return { ...newEnum1, ...newEnum2 };
};
