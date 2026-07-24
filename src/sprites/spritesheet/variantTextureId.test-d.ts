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
      "turtle.d6.1",
      runtimeBoolean,
      runtimeBoolean,
      runtimeBoolean,
      false,
    );
    const _animation: AnimationId = variantTextureId(
      "turtle.d6",
      runtimeBoolean,
      runtimeBoolean,
      runtimeBoolean,
      false,
    );
  });

  test("deactivatable non-monsters need doughnutted pinned to false", () => {
    const _hudIcon: TextureId = variantTextureId(
      "bag",
      runtimeBoolean,
      false,
      runtimeBoolean,
      false,
    );
    const _charles: TextureId = variantTextureId(
      "charles.d6",
      runtimeBoolean,
      false,
      runtimeBoolean,
      false,
    );
    const _conveyor: AnimationId = variantTextureId(
      "conveyor.d0",
      runtimeBoolean,
      false,
      runtimeBoolean,
      false,
    );
    // @ts-expect-error - a runtime boolean cannot be passed as doughnutted for
    // art that can never be doughnutted
    variantTextureId("bag", false, runtimeBoolean, false, false);
    // prettier-ignore
    // @ts-expect-error - the emperor's guardian is doughnut-immune
    variantTextureId("emperorsGuardian.1", false, runtimeBoolean, false, false);
  });

  test("reflection-only art takes no other state", () => {
    const _texture: TextureId = variantTextureId(
      "ball",
      runtimeBoolean,
      false,
      false,
      false,
    );
    const _animation: AnimationId = variantTextureId(
      "spring.bounce",
      runtimeBoolean,
      false,
      false,
      false,
    );
    // prettier-ignore
    // @ts-expect-error - room structure never renders in a reflection
    variantTextureId("moonbase.floor", runtimeBoolean, false, false, false);
    // @ts-expect-error - deactivated does not apply to reflection-only art
    variantTextureId("ball", false, false, runtimeBoolean, false);
  });

  test("sceneryPlayer recolour is only for playable frames", () => {
    const _texture: TextureId = variantTextureId(
      "head.walking.d6.2",
      runtimeBoolean,
      false,
      false,
      true,
    );
    const _animation: AnimationId = variantTextureId(
      "head.idle.d6",
      runtimeBoolean,
      false,
      false,
      true,
    );
    // @ts-expect-error - monsters never take the sceneryPlayer recolour
    variantTextureId("turtle.d6.1", false, false, false, true);
    // prettier-ignore
    // @ts-expect-error - doughnutted and sceneryPlayer are mutually exclusive
    variantTextureId("head.walking.d6.2", false, true, false, true);
  });
});
