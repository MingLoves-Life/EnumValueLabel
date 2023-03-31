import { createEnum } from "./utils/createEnum";
import { addLabel } from "./utils/addLabel";
import { addArray } from "./utils/addArray";
import { addFormat } from "./utils/addFormat";

import type { CreateEnumReturn } from "./utils/createEnum";
import type { EnumConfig } from "./types";

type EnumValueLabelReturn<T extends EnumConfig> = CreateEnumReturn<T> & {
  _label: ReturnType<typeof addLabel<T>>;
  _l: ReturnType<typeof addLabel<T>>;
  _array: ReturnType<typeof addArray<T>>;
  _a: ReturnType<typeof addArray<T>>;
  _format: ReturnType<typeof addFormat<T>>;
  _f: ReturnType<typeof addFormat<T>>;
};

export function EnumValueLabel<T extends EnumConfig>(
  enumConfig: T
): EnumValueLabelReturn<T> {
  return {
    ...createEnum<T>(enumConfig),
    _label: addLabel<T>(enumConfig),
    _l: addLabel<T>(enumConfig),
    _array: addArray<T>(enumConfig),
    _a: addArray<T>(enumConfig),
    _format: addFormat<T>(enumConfig),
    _f: addFormat<T>(enumConfig),
  };
}
