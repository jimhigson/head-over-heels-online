import { expectTypeOf, test } from "vitest";
import type { AnimatedTextureName, FrameNumbers } from "./spriteGenerators";
import { seriesOfAnimationFrameTextures } from "./spriteGenerators";

test("generating frame number types", () => {
  expectTypeOf<FrameNumbers<2>>().toEqualTypeOf<"1" | "2">();
  expectTypeOf<FrameNumbers<4>>().toEqualTypeOf<"1" | "2" | "3" | "4">();
  expectTypeOf<FrameNumbers<6>>().toEqualTypeOf<
    "1" | "2" | "3" | "4" | "5" | "6"
  >();
});

test("generating animation frame names with numbers", () => {
  expectTypeOf<AnimatedTextureName<"foo", 4>>().toEqualTypeOf<
    "foo.1" | "foo.2" | "foo.3" | "foo.4"
  >();

  expectTypeOf(
    seriesOfAnimationFrameTextures(
      "heels.walking.left",
      3,
      { x: 0, y: 0 },
      { w: 1, h: 1 },
    ),
  ).toMatchTypeOf<{
    "heels.walking.left.1": {
      frame: { x: number; y: number; w: number; h: number };
    };
    "heels.walking.left.2": {
      frame: { x: number; y: number; w: number; h: number };
    };
    "heels.walking.left.3": {
      frame: { x: number; y: number; w: number; h: number };
    };
  }>();
});
