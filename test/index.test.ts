import { EnumValueLabel } from "../src/index";
import { describe, expect, test } from "vitest";

const studentInfo = { zh: "学生", en: "student" };
const testEnum = EnumValueLabel({
  STUDENT: [1, studentInfo],
  TEACHER: [2, "老师"],
} as const);

describe("EnumValueLabel", () => {
  test("createEnum", () => {
    expect(testEnum.STUDENT).toBe(1);
    expect(testEnum[1]).toBe("STUDENT");
    expect(testEnum.TEACHER).toBe(2);
    expect(testEnum[2]).toBe("TEACHER");
  });
  test("addLabel", () => {
    expect(testEnum._label("STUDENT")).toEqual(studentInfo);
    expect(testEnum._label(1)).toEqual(studentInfo);
    expect(testEnum._label("TEACHER")).toEqual("老师");
    expect(testEnum._label(2)).toEqual("老师");

    expect(testEnum._l("STUDENT")).toEqual(studentInfo);
    expect(testEnum._l(1)).toEqual(studentInfo);
    expect(testEnum._l("TEACHER")).toEqual("老师");
    expect(testEnum._l(2)).toEqual("老师");
  });
  test("addArray", () => {
    expect(testEnum._array()).toContainEqual({ value: 1, label: studentInfo });
    expect(testEnum._array()).not.toContainEqual({ id: 2, name: "老师" });

    expect(testEnum._array("id", "name")).toContainEqual({
      id: 2,
      name: "老师",
    });
    expect(testEnum._array("id", "name")).not.toContainEqual({
      value: 1,
      label: studentInfo,
    });

    expect(testEnum._a()).toContainEqual({ value: 1, label: studentInfo });
    expect(testEnum._a()).not.toContainEqual({ id: 2, name: "老师" });

    expect(testEnum._a("id", "name")).toContainEqual({
      id: 2,
      name: "老师",
    });
    expect(testEnum._a("id", "name")).not.toContainEqual({
      value: 1,
      label: studentInfo,
    });
  });

  test("addFormat", () => {
    const testFn = (value, label) => ({ value: label, label: value });
    const fnRes = testEnum._f(testFn);
    expect(fnRes).toEqual([
      { value: { zh: "学生", en: "student" }, label: 1 },
      { value: "老师", label: 2 },
    ]);
  });
});
