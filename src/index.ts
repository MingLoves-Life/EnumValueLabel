import { createEnum } from "./utils/createEnum";
import { addLabel } from "./utils/addLabel";
import { addFormat } from "./utils/addFormat";
import type { CreateEnumReturn } from "./utils/createEnum";
import type { EnumConfig } from "./types";

export type EnumValueLabelReturn<T extends EnumConfig> = CreateEnumReturn<T> & {
  _label: ReturnType<typeof addLabel<T>>;
  _format: ReturnType<typeof addFormat<T>>;
};

export function EnumValueLabel<T extends EnumConfig>(
  enumConfig: T
): EnumValueLabelReturn<T> {
  const newEnum = createEnum<T>(enumConfig);
  addLabel<T>(enumConfig, newEnum);
  addFormat<T>(enumConfig, newEnum);
  return newEnum as EnumValueLabelReturn<T>;
}

const testEnum = EnumValueLabel({
  STUDENT: [1, { zh: "学生" }],
  EXPERT: [2, "专家"],
  LECTURER: [3, "主讲"],
  HEAD_TEACHER: [4, "班主任"],
} as const);

const label = testEnum._label("EXPERT");
const format = testEnum._format("id", "name");

console.log(testEnum);
console.log(label);
console.log(format[0]);
