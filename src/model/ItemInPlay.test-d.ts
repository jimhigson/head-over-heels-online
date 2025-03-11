import { expectTypeOf, test } from "vitest";
import type { ItemInPlay } from "./ItemInPlay";

test("portals to lead to room ids", () => {
  type A = ItemInPlay<
    "portal",
    "livingRoom" | "kitchen",
    "ball" | "bat"
  >["config"]["toRoom"];

  expectTypeOf<A>().toEqualTypeOf<"livingRoom" | "kitchen">();
});

test("doorframes to lead to room ids", () => {
  type A = ItemInPlay<
    "doorFrame",
    "livingRoom" | "kitchen",
    "ball" | "bat"
  >["config"]["toRoom"];

  expectTypeOf<A>().toEqualTypeOf<"livingRoom" | "kitchen">();
});
