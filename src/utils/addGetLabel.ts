import type { CreateEnumReturn } from "./createEnum";
import type { EnumConfig, FirstValue, SecondValue } from "../types";

type KeyOrValue<T> = keyof T | { [P in keyof T]: FirstValue<T[P]> }[keyof T];
type LabelReturn<T> = { [P in keyof T]: SecondValue<T[P]> }[keyof T];

export const addGetLabel = <T>(
  enumConfig: T extends EnumConfig ? T : never,
  enumItem: CreateEnumReturn<T>
) => {
  const label = (keyOrValue: KeyOrValue<T>): LabelReturn<T> => {
    const keys = Object.keys(enumConfig);
    if (keys.includes(String(keyOrValue))) {
      return enumConfig[keyOrValue as keyof T][1];
    } else {
      const curAttr = keys.find((key) => enumConfig[key][0] === keyOrValue);
      return curAttr ? enumConfig[curAttr][1] : undefined;
    }
  };

  Object.setPrototypeOf(enumItem, { label });
  return label;
};
