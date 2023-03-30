import typescript from "rollup-plugin-typescript";
import dts from "rollup-plugin-dts";
import del from "rollup-plugin-delete";
import pkg from "./package.json";

console.log(dts.default);

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: pkg.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: pkg.module,
        format: "es",
        sourcemap: true,
      },
      {
        name: "FileUploadSDK",
        file: pkg.umd,
        format: "umd",
        sourcemap: true,
      },
    ],
    plugins: [typescript()],
  },
  {
    input: "./dist/dts/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "es" }],
    plugins: [dts.default(), del({ hook: "buildEnd", targets: "./dist/dts" })],
  },
];
