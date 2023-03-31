import type { EnumConfig } from "../types";

export type FormatItem = Record<string, any>;

export const addArray = <T extends EnumConfig>(enumConfig: T) => {
  function _format(): { value: any; label: any }[];
  function _format<T extends string, U extends string>(
    newKeyName: T,
    newValueName: U
  ): { [K in T | U]: any }[];

  function _format(newKeyName?, newValueName?) {
    const formatList: FormatItem[] = [];
    const namesList = [newKeyName ?? "value", newValueName ?? "label"];
    Object.keys(enumConfig).forEach((key) => {
      const obj: FormatItem = {};
      namesList.forEach((name, i) => (obj[name] = enumConfig[key][i]));
      formatList.push(obj);
    });
    return formatList;
  }
  return _format;
};
