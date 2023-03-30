import { EnumValueLabel } from "../src/index";

const testEnum = EnumValueLabel({
  STUDENT: [1, { zh: "学生" }],
  EXPERT: [2, "专家"],
  LECTURER: [3, "主讲"],
  HEAD_TEACHER: [4, "班主任"],
} as const);

const EXPERT = testEnum.EXPERT;
const label1 = testEnum._label("HEAD_TEACHER");
const label2 = testEnum._l(4);
const format1 = testEnum._array();
const format2 = testEnum._a("id", "name");

console.log(EXPERT);
console.log(label1);
console.log(label2);
console.log(format1);
console.log(format2);
