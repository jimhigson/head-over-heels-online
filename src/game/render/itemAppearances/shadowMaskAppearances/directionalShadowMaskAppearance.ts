import type { Sprite } from "pixi.js";

import type { ItemAppearance } from "../ItemAppearance";

import { blockSizePx } from "../../../../sprites/spritePivots";
import {
  type DirectionXy4,
  vectorClosestDirectionXy4,
} from "../../../../utils/vectors/vectors";
import { createSprite } from "../../createSprite";

type RenderProps = {
  facingXy4: DirectionXy4;
};

export const directionalShadowMaskAppearance =
  <ShadowMaskBaseShadowId extends "charles" | "skiHead" | "turtle">(
    shadowMaskBaseShadowId: ShadowMaskBaseShadowId,
    heightBlocks: number = 1,
  ): ItemAppearance<"charles" | "monster", RenderProps, Sprite> =>
  ({
    renderContext: {
      item: {
        state: { facing },
      },
    },
    currentRendering,
  }) => {
    const currentlyRenderedProps = currentRendering?.renderProps;
    const facingXy4 = vectorClosestDirectionXy4(facing) ?? "towards";

    const render =
      currentlyRenderedProps === undefined ||
      facingXy4 !== currentlyRenderedProps.facingXy4;

    if (!render) {
      return "no-update";
    }
    const sprite: Sprite = createSprite(
      facingXy4 === "left" || facingXy4 === "away" ?
        `shadowMask.${shadowMaskBaseShadowId}.away`
      : `shadowMask.${shadowMaskBaseShadowId}.right`,
    );

    sprite.y = -(blockSizePx.h * (heightBlocks - 1));

    sprite.scale.x = facingXy4 === "away" || facingXy4 === "right" ? 1 : -1;

    return {
      output: sprite,
      renderProps: { facingXy4 },
    };
  };
