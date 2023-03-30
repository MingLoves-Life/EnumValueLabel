export type EnumKey = string;
export type EnumValue = string | number;
export type EnumConfig = Record<EnumKey, readonly [EnumValue, any]>;
export type ValueOf<T> = T[keyof T];
export type FirstValue<T> = T extends readonly [infer U, any] ? U : never;
export type SecondLabel<T> = T extends readonly [any, infer U] ? U : never;
