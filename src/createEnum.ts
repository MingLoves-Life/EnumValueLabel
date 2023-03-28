import { EnumConfig, ValueOf } from "./types";
type CreateEnumReturn1<T> = {
  [P in keyof T]: T[P] extends readonly [infer U, any] ? U : never;
};
type CreateEnumReturn2<T> = {
  [P in Extract<
    ValueOf<T> extends readonly [infer U, any] ? U : never,
    string | number
  >]: {
    [K in keyof T]: T[K] extends readonly [P, any] ? K : never;
  }[keyof T];
};

export type CreateEnumReturn<T> = Readonly<
  CreateEnumReturn1<T> & CreateEnumReturn2<T>
>;

export const createEnum = <T>(enumConfig: EnumConfig): CreateEnumReturn<T> => {
  const enumKeys = Object.keys(enumConfig);
  const newEnum = {} as CreateEnumReturn<T>;
  enumKeys.forEach((key) => (newEnum[key] = enumConfig[key][0]));
  enumKeys.forEach((key) => (newEnum[`${enumConfig[key][0]}`] = key));
  return Object.freeze(newEnum);
};
