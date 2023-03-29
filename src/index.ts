import { createEnum } from "./utils/createEnum";
import { addGetLabel } from "./utils/addGetLabel";
import type { CreateEnumReturn } from "./utils/createEnum";
import type { EnumConfig } from "./types";

export type EnumValueLabelReturn<T> = CreateEnumReturn<T> & {
  _label: ReturnType<typeof addGetLabel<T>>;
};

export function EnumValueLabel<T>(
  enumConfig: T extends EnumConfig ? T : never
): EnumValueLabelReturn<T> {
  const newEnum = createEnum<T>(enumConfig);
  addGetLabel<T>(enumConfig, newEnum);
  return newEnum as EnumValueLabelReturn<T>;
}

const obj = {
  STUDENT: [1, { zh: "学生" }],
  EXPERT: [2, "专家"],
  LECTURER: [3, "主讲"],
  HEAD_TEACHER: [4, "班主任"],
} as const;

const testEnum = EnumValueLabel<typeof obj>(obj);
const res = testEnum._label(1);
console.log(testEnum);
console.log(res);
