import { createEnum } from "./createEnum";
import type { CreateEnumReturn } from "./createEnum";
import { EnumConfig } from "./types";

export type EnumValueLabelReturn<T> = CreateEnumReturn<T>;

export function EnumValueLabel<T>(
  enumConfig: T extends EnumConfig ? T : never
): EnumValueLabelReturn<T> {
  const newEnum = createEnum<T>(enumConfig);
  console.log(newEnum);
  return newEnum;
}

const obj = {
  STUDENT: [1, "学生"],
  EXPERT: [2, "专家"],
  LECTURER: [3, "主讲"],
  HEAD_TEACHER: [4, "班主任"],
} as const;

const testEnum1 = EnumValueLabel<typeof obj>(obj);
