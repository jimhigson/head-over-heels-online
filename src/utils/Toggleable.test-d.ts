import { expectTypeOf, test } from "vitest";

import type { ToggleablePaths } from "./Toggleable";

test("Toggleable", () => {
  type Test = {
    string: string;
    number: number;
    boolean: boolean;
    maybeBoolean?: boolean;
    requiredObject: {
      string: string;
      number: number;
      boolean: boolean;
      maybeBoolean?: boolean;
    };
    maybeObject?: {
      string: string;
      number: number;
      boolean: boolean;
      maybeBoolean?: boolean;
    };
  };
  type Result = ToggleablePaths<Test>;

  expectTypeOf<Result>().toMatchTypeOf<
    | "boolean"
    | "maybeBoolean"
    | "requiredObject.boolean"
    | "requiredObject.maybeBoolean"
    | "requiredObject" // < - this is wrong!
  >();
});
