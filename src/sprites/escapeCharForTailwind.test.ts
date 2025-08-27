import { expectTypeOf, test } from "vitest";

import { type EscapedForTailwind } from "./escapeCharForTailwind";

test("types", () => {
  expectTypeOf<EscapedForTailwind<"S">>().toEqualTypeOf<"S">();
  expectTypeOf<EscapedForTailwind<"A" | "B" | "S">>().toEqualTypeOf<
    "A" | "B" | "S"
  >();

  type Actual = EscapedForTailwind<":" | "<" | ">" | "🕹️" | "S">;
  type Expected = "🕹️" | "colon" | "gt" | "lt" | "S";

  expectTypeOf<Actual>().toEqualTypeOf<Expected>();
});
