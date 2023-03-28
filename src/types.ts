export type EnumKey = string;
export type EnumValue = EnumKey | number;
export type EnumConfig = Record<EnumKey, readonly [EnumValue, any]>;
export type ValueOf<T> = T[keyof T];
