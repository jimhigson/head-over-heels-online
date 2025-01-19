import { expectTypeOf, test } from "vitest";
import { type EscapedForTailwind } from "./escapeCharForTailwind";

test("types", () => {
  expectTypeOf<EscapedForTailwind<"S">>().toEqualTypeOf<"S">();
  expectTypeOf<EscapedForTailwind<"S" | "A" | "B">>().toEqualTypeOf<
    "S" | "A" | "B"
  >();

  type Actual = EscapedForTailwind<"S" | ">" | "<" | ":" | "🕹️">;
  type Expected = "S" | "gt" | "lt" | "colon" | "🕹️";

  expectTypeOf<Actual>().toEqualTypeOf<Expected>();
});
