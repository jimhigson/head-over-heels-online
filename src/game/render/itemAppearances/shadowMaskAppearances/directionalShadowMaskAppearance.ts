import type { Sprite } from "pixi.js";

import type {
  CharacterName,
  IndividualCharacterName,
} from "../../../../model/modelTypes";
import type { TextureId } from "../../../../sprites/spritesheet/spritesheetData/spriteSheetData";
import type { ItemAppearance } from "../ItemAppearance";

import { isTextureId } from "../../../../sprites/assertIsTextureId";
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

type PlayableShadowMaskRenderProps = {
  facingXy8: DirectionXy8;
  falling: boolean;
};

const flipXy8: Partial<Record<DirectionXy8, DirectionXy8>> = {
  left: "away",
  towardsLeft: "awayRight",
  towards: "right",
};

const getPlayableShadowMaskTextureId = (
  playableName: IndividualCharacterName,
  falling: boolean,
  direction: DirectionXy8,
): TextureId => {
  if (!falling) {
    return `shadowMask.${playableName}.${direction}` as TextureId;
  }

  const fallingShadowMaskTextureId =
    `shadowMask.${playableName}.falling.${direction}` as string;

  return isTextureId(fallingShadowMaskTextureId) ?
      fallingShadowMaskTextureId
    : (`shadowMask.${playableName}.${direction}` as TextureId);
};

export const playableShadowMaskAppearanceXy8 =
  <ShadowMaskBaseShadowTextureId extends IndividualCharacterName>(
    shadowMaskBaseShadowTextureId: ShadowMaskBaseShadowTextureId,
    heightBlocks: number = 1,
  ): ItemAppearance<
    "sceneryPlayer" | CharacterName,
    PlayableShadowMaskRenderProps,
    Sprite
  > =>
  ({ renderContext: { item }, currentRendering }) => {
    const action = item.type === "sceneryPlayer" ? "idle" : item.state.action;

    const currentlyRenderedProps = currentRendering?.renderProps;
    const facingXy8 =
      item.type === "sceneryPlayer" ?
        item.config.startDirection
      : (vectorClosestDirectionXy8(
          item.state.visualFacingVector ?? item.state.facing,
        ) ?? "towards");

    const falling = action === "falling";

    const render =
      currentlyRenderedProps === undefined ||
      facingXy8 !== currentlyRenderedProps.facingXy8 ||
      falling !== currentlyRenderedProps.falling;

    if (!render) {
      return "no-update";
    }

    const flippedDirection = flipXy8[facingXy8];
    const shadowMaskDirection = flippedDirection ?? facingXy8;

    const textureId = getPlayableShadowMaskTextureId(
      shadowMaskBaseShadowTextureId,
      falling,
      shadowMaskDirection,
    );

    const sprite: Sprite = createSprite({
      textureId,
      spritesheetVariant: "original",
    });

    sprite.y = -(blockSizePx.z * (heightBlocks - 1));

    sprite.scale.x = flippedDirection === undefined ? 1 : -1;

    return {
      output: sprite,
      renderProps: { facingXy8, falling },
    };
  };
