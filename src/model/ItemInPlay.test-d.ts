import { test } from "vitest";
import { expectTypeOf } from "vitest";
import { ItemInPlay, PlayableItem, UnknownItemInPlay } from "./ItemInPlay";
import { Direction } from "@/utils/vectors";

test("heads and heels have the right state", () => {
  expectTypeOf<ItemInPlay<"head">["state"]>().toMatchTypeOf<{
    facing: Direction;
    movement: "moving" | "idle" | "falling";
    standingOn: UnknownItemInPlay | null;
    jumpRemaining: number;
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
    movement: "moving" | "idle" | "falling";
    standingOn: UnknownItemInPlay | null;
    jumpRemaining: number;
    lives: number;
    shield: number;
  }>();
});