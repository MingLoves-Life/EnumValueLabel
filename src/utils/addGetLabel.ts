import type { CreateEnumReturn } from "./createEnum";
import type { EnumConfig, FirstValue, SecondValue } from "../types";

type KeyOrValue<T> = keyof T | { [P in keyof T]: FirstValue<T[P]> }[keyof T];

type LabelReturn<T, K> = K extends keyof T
  ? SecondValue<T[K]>
  : {
      [P in keyof T]: FirstValue<T[P]> extends K ? SecondValue<T[P]> : never;
    }[keyof T];

export const addGetLabel = <T>(
  enumConfig: T extends EnumConfig ? T : never,
  enumItem: CreateEnumReturn<T>
) => {
  const _label = (keyOrValue: KeyOrValue<T>): LabelReturn<T, KeyOrValue<T>> => {
    const keys = Object.keys(enumConfig);
    if (keys.includes(String(keyOrValue))) {
      return enumConfig[keyOrValue as keyof T][1];
    } else {
      const curAttr = keys.find((key) => enumConfig[key][0] === keyOrValue);
      return curAttr ? enumConfig[curAttr][1] : undefined;
    }
  };

  Object.setPrototypeOf(enumItem, { _label });
  return _label;
};
