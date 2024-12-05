import { test } from "vitest";
import { expectTypeOf } from "vitest";
import type { PlayableItem, UnknownItemInPlay } from "./ItemInPlay";
import type { DirectionXy4 } from "@/utils/vectors/vectors";

test("heads and heels have the right state", () => {
  /*
  expectTypeOf<ItemInPlay<"head">["state"]>().toMatchTypeOf<{
    facing: DirectionXy4;
    action: "moving" | "idle" | "falling" | "death";
    standingOn: UnknownItemInPlay[];
    stoodOnBy: UnknownItemInPlay[];
    lives: number;
    shield: number;
    hasHooter: boolean;    
    donuts: number;
    fast: number;
    position: Xyz;
    expires: number | null;
  }>();*/

  expectTypeOf<PlayableItem["state"]>().toMatchTypeOf<{
    facing: DirectionXy4;
    action: "moving" | "idle" | "falling" | "death";
    standingOn: UnknownItemInPlay | null;
    stoodOnBy: Set<UnknownItemInPlay>;
    lives: number;
    shield: number;
  }>();
});
