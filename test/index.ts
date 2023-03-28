import { EnumValueLabel } from "../src/index";

const testEnum = EnumValueLabel({
  STUDENT: [1, "学生"],
  EXPERT: [2, "专家"],
  LECTURER: [3, "主讲"],
  HEAD_TEACHER: [4, "班主任"],
});

console.log(testEnum);
