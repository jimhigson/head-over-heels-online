import { test } from "vitest";
import { expectTypeOf } from "vitest";
import type { ItemInPlay, PlayableItem, UnknownItemInPlay } from "./ItemInPlay";
import type { Direction } from "@/utils/vectors";

test("heads and heels have the right state", () => {
  expectTypeOf<ItemInPlay<"head">["state"]>().toMatchTypeOf<{
    facing: Direction;
    action: "moving" | "idle" | "falling" | "death";
    standingOn: UnknownItemInPlay | null;
    jumpStartTime: number | null;
    lives: number;
    shield: number;
    hasHooter: boolean;
    /** how many big jumps we can do */
    // TODO: these properties should be recognised
    // by the type system as belonging only to head
    // or heels
    donuts: number;
    fast: number;
  }>();

  expectTypeOf<PlayableItem["state"]>().toMatchTypeOf<{
    facing: Direction;
    action: "moving" | "idle" | "falling" | "death";
    standingOn: UnknownItemInPlay | null;
    jumpStartTime: number | null;
    lives: number;
    shield: number;
  }>();
});
