import type { EnumConfig, FirstValue, SecondLabel } from "../types";

type FormatFnValue<T> = { [P in keyof T]: FirstValue<T[P]> }[keyof T];
type FormatFnLabel<T> = { [P in keyof T]: SecondLabel<T[P]> }[keyof T];
export type FormatFn<T> = (
  value: FormatFnValue<T>,
  label: FormatFnLabel<T>
) => any;

export const addFormat = <T extends EnumConfig>(enumConfig: EnumConfig) => {
  const _format = <U extends FormatFn<T>>(fn: U): ReturnType<U>[] => {
    const keys: (keyof EnumConfig)[] = Object.keys(enumConfig);
    const rArray = [] as ReturnType<U>[];
    keys.forEach((key) =>
      rArray.push(
        fn(enumConfig[key][0] as FormatFnValue<T>, enumConfig[key][1])
      )
    );
    return rArray;
  };

  return _format;
};
