import { test } from "vitest";
import { expectTypeOf } from "vitest";
import type { ItemInPlay, PlayableItem, UnknownItemInPlay } from "./ItemInPlay";
import type { DirectionXy } from "@/utils/vectors/vectors";

test("heads and heels have the right state", () => {
  expectTypeOf<ItemInPlay<"head">["state"]>().toMatchTypeOf<{
    facing: DirectionXy;
    action: "moving" | "idle" | "falling" | "death";
    standingOn: UnknownItemInPlay | null;
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
    facing: DirectionXy;
    action: "moving" | "idle" | "falling" | "death";
    standingOn: UnknownItemInPlay | null;
    lives: number;
    shield: number;
  }>();
});
