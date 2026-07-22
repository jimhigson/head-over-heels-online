/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, test } from "vitest";

import {
  type AnimationId,
  type TextureId,
} from "./spritesheetData/makeSpritesheetData";
import { variantTextureId } from "./variantTextureId";

const runtimeBoolean = {} as boolean;

describe("variantId accepts only eligible (id, states) combinations", () => {
  test("monsters take the full state set with runtime booleans", () => {
    const _texture: TextureId = variantTextureId(
      "turtle.towards.1",
      runtimeBoolean,
      runtimeBoolean,
      runtimeBoolean,
      false,
      undefined,
    );
    const _animation: AnimationId = variantTextureId(
      "turtle.towards",
      runtimeBoolean,
      runtimeBoolean,
      runtimeBoolean,
      false,
      undefined,
    );
  });

  test("deactivatable non-monsters need doughnutted pinned to false", () => {
    const _hudIcon: TextureId = variantTextureId(
      "bag",
      runtimeBoolean,
      false,
      runtimeBoolean,
      false,
      undefined,
    );
    const _charles: TextureId = variantTextureId(
      "charles.towards",
      runtimeBoolean,
      false,
      runtimeBoolean,
      false,
      undefined,
    );
    const _conveyor: AnimationId = variantTextureId(
      "conveyor.x",
      runtimeBoolean,
      false,
      runtimeBoolean,
      false,
      undefined,
    );
    // @ts-expect-error - a runtime boolean cannot be passed as doughnutted for
    // art that can never be doughnutted
    variantTextureId("bag", false, runtimeBoolean, false, false, undefined);
    // prettier-ignore
    // @ts-expect-error - the emperor's guardian is doughnut-immune
    variantTextureId("emperorsGuardian.1", false, runtimeBoolean, false, false, undefined);
  });

  test("reflection-only art takes no other state", () => {
    const _texture: TextureId = variantTextureId(
      "ball",
      runtimeBoolean,
      false,
      false,
      false,
      undefined,
    );
    const _animation: AnimationId = variantTextureId(
      "spring.bounce",
      runtimeBoolean,
      false,
      false,
      false,
      undefined,
    );
    // prettier-ignore
    // @ts-expect-error - room structure never renders in a reflection
    variantTextureId("moonbase.floor", runtimeBoolean, false, false, false, undefined);
    // @ts-expect-error - deactivated does not apply to reflection-only art
    variantTextureId("ball", false, false, runtimeBoolean, false, undefined);
  });

  test("sceneryPlayer recolour is only for playable frames", () => {
    const _texture: TextureId = variantTextureId(
      "head.walking.towards.2",
      runtimeBoolean,
      false,
      false,
      true,
      undefined,
    );
    const _animation: AnimationId = variantTextureId(
      "head.idle.towards",
      runtimeBoolean,
      false,
      false,
      true,
      undefined,
    );
    // @ts-expect-error - monsters never take the sceneryPlayer recolour
    variantTextureId("turtle.towards.1", false, false, false, true, undefined);
    // prettier-ignore
    // @ts-expect-error - doughnutted and sceneryPlayer are mutually exclusive
    variantTextureId("head.walking.towards.2", false, true, false, true, undefined);
  });

  test("destination hues are only for door frames", () => {
    const _door: TextureId = variantTextureId(
      "door.frame.generic.x.near",
      false,
      false,
      false,
      false,
      "cyan",
    );
    // @ts-expect-error - only door frames recolour to a destination hue
    variantTextureId("bag", false, false, false, false, "cyan");
    // prettier-ignore
    // @ts-expect-error - no other state may combine with a destination hue
    variantTextureId("door.frame.generic.x.near", false, false, false, true, "cyan");
  });
});
