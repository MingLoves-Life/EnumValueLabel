import type { EnumConfig } from "../types";
import type { CreateEnumReturn } from "./createEnum";

export type FormatItem = Record<string, any>;

export const addFormat = <T extends EnumConfig>(
  enumConfig: T,
  enumItem: CreateEnumReturn<T>
) => {
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
  Object.setPrototypeOf(enumItem, { _format });
  return _format;
};
