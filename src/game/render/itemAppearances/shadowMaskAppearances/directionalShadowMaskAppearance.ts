import type { Sprite } from "pixi.js";

import type {
  CharacterName,
  IndividualCharacterName,
} from "../../../../model/modelTypes";
import type { TextureId } from "../../../../sprites/spritesheet/spritesheetData/spriteSheetData";
import type { ItemAppearance } from "../ItemAppearance";

import {
  type DirectionXy4,
  type DirectionXy8,
  vectorClosestDirectionXy4,
  vectorClosestDirectionXy8,
} from "../../../../utils/vectors/vectors";
import { blockSizePx } from "../../../physics/mechanicsConstants";
import { createSprite } from "../../createSprite";

type RenderPropsXy4 = {
  facingXy4: DirectionXy4;
};

export const directionalShadowMaskAppearanceXy4 =
  <ShadowMaskBaseShadowId extends "charles" | "skiHead" | "turtle">(
    shadowMaskBaseShadowId: ShadowMaskBaseShadowId,
    heightBlocks: number = 1,
  ): ItemAppearance<"charles" | "monster", RenderPropsXy4, Sprite> =>
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
    const sprite: Sprite = createSprite({
      textureId:
        facingXy4 === "left" || facingXy4 === "away" ?
          `shadowMask.${shadowMaskBaseShadowId}.away`
        : `shadowMask.${shadowMaskBaseShadowId}.right`,
      spritesheetVariant: "original",
    });

    sprite.y = -(blockSizePx.z * (heightBlocks - 1));

    sprite.scale.x = facingXy4 === "away" || facingXy4 === "right" ? 1 : -1;

    return {
      output: sprite,
      renderProps: { facingXy4 },
    };
  };

type RenderPropsXy8 = {
  facingXy8: DirectionXy8;
};

const flipXy8: Partial<Record<DirectionXy8, DirectionXy8>> = {
  left: "away",
  towardsLeft: "awayRight",
  towards: "right",
};

export const directionalShadowMaskAppearanceXy8 =
  <ShadowMaskBaseShadowId extends IndividualCharacterName>(
    shadowMaskBaseShadowId: ShadowMaskBaseShadowId,
    heightBlocks: number = 1,
  ): ItemAppearance<CharacterName, RenderPropsXy8, Sprite> =>
  ({
    renderContext: {
      item: {
        state: { facing },
      },
    },
    currentRendering,
  }) => {
    const currentlyRenderedProps = currentRendering?.renderProps;
    const facingXy8 = vectorClosestDirectionXy8(facing) ?? "towards";

    const render =
      currentlyRenderedProps === undefined ||
      facingXy8 !== currentlyRenderedProps.facingXy8;

    if (!render) {
      return "no-update";
    }

    const flippedDirection = flipXy8[facingXy8];
    const shadowMaskDirection = flippedDirection ?? facingXy8;

    const sprite: Sprite = createSprite({
      textureId:
        `shadowMask.${shadowMaskBaseShadowId}.${shadowMaskDirection}` as TextureId,
      spritesheetVariant: "original",
    });

    sprite.y = -(blockSizePx.z * (heightBlocks - 1));

    sprite.scale.x = flippedDirection === undefined ? 1 : -1;

    return {
      output: sprite,
      renderProps: { facingXy8 },
    };
  };
