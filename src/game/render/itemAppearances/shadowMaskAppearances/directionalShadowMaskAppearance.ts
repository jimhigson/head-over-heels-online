import { type Sprite } from "pixi.js";

import {
  type CharacterName,
  type IndividualCharacterName,
} from "../../../../model/modelTypes";
import { isTextureId } from "../../../../sprites/assertIsTextureId";
import { type AppSpritesheet } from "../../../../sprites/spritesheet/AppSpritesheet";
import { type BaseTextureIdWithPrefix } from "../../../../sprites/spritesheet/spritesheetData/makeSpritesheetData";
import { rotateXy } from "../../../../utils/vectors/rotateXy";
import {
  type DirectionIndexXy4,
  type DirectionIndexXy8,
  directionIndexXy8,
  nonZeroClosestDirectionIndexXy4,
  nonZeroClosestDirectionIndexXy8,
} from "../../../../utils/vectors/vectors";
import { blockSizePx } from "../../../physics/mechanicsConstants";
import { createSprite } from "../../createSprite";
import { type ItemAppearance } from "../ItemAppearance";

type RenderPropsXy4 = {
  resolvedFacingIndexXy4: DirectionIndexXy4;
};

export const directionalShadowMaskAppearanceXy4 =
  <ShadowMaskBaseShadowId extends "charles" | "skiHead" | "turtle">(
    shadowMaskBaseShadowId: ShadowMaskBaseShadowId,
    heightBlocks: number = 1,
  ): ItemAppearance<"charles" | "monster", RenderPropsXy4, Sprite> =>
  ({
    renderContext: {
      general: { spritesheets, cameraAngle },
      item: {
        state: { facing },
      },
    },
    currentRendering,
  }) => {
    const currentlyRenderedProps = currentRendering?.renderProps;
    // rotate the facing by the continuous camera angle so the shadow matches
    // how the item appears once the camera has turned, stepping through
    // intermediate facings mid-turn in lockstep with the appearance it masks:
    const rotatedFacing = rotateXy(facing, cameraAngle);
    const resolvedFacingIndexXy4 = nonZeroClosestDirectionIndexXy4(
      rotatedFacing.x,
      rotatedFacing.y,
    );

    const render =
      currentlyRenderedProps === undefined ||
      resolvedFacingIndexXy4 !== currentlyRenderedProps.resolvedFacingIndexXy4;

    if (!render) {
      return "no-update";
    }
    const sprite: Sprite = createSprite({
      textureId:
        (
          resolvedFacingIndexXy4 === directionIndexXy8.left ||
          resolvedFacingIndexXy4 === directionIndexXy8.away
        ) ?
          `shadowMask.${shadowMaskBaseShadowId}.d${directionIndexXy8.away}`
        : `shadowMask.${shadowMaskBaseShadowId}.d${directionIndexXy8.right}`,
      spritesheet: spritesheets.shadowSpritesheet,
    });

    sprite.y = -(blockSizePx.z * (heightBlocks - 1));

    sprite.scale.x =
      (
        resolvedFacingIndexXy4 === directionIndexXy8.away ||
        resolvedFacingIndexXy4 === directionIndexXy8.right
      ) ?
        1
      : -1;

    return {
      output: sprite,
      renderProps: { resolvedFacingIndexXy4 },
    };
  };

type PlayableShadowMaskRenderProps = {
  resolvedFacingIndexXy8: DirectionIndexXy8;
  falling: boolean;
};

const flipXy8: Partial<Record<DirectionIndexXy8, DirectionIndexXy8>> = {
  [directionIndexXy8.left]: directionIndexXy8.away,
  [directionIndexXy8.towardsLeft]: directionIndexXy8.awayRight,
  [directionIndexXy8.towards]: directionIndexXy8.right,
};

const getPlayableShadowMaskTextureId = (
  playableName: IndividualCharacterName,
  falling: boolean,
  directionIndex: DirectionIndexXy8,
  spritesheet: AppSpritesheet,
): BaseTextureIdWithPrefix<`shadowMask.${IndividualCharacterName}`> => {
  if (!falling) {
    return `shadowMask.${playableName}.d${directionIndex}`;
  }

  // not every direction has falling art of its own:
  const fallingShadowMaskTextureId =
    `shadowMask.${playableName}.falling.d${directionIndex}` as const;

  return isTextureId(fallingShadowMaskTextureId, spritesheet.data) ?
      fallingShadowMaskTextureId
    : `shadowMask.${playableName}.d${directionIndex}`;
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
  ({
    renderContext: {
      general: { spritesheets, cameraAngle },
      item,
    },
    currentRendering,
  }) => {
    const action = item.type === "sceneryPlayer" ? "idle" : item.state.action;

    const currentlyRenderedProps = currentRendering?.renderProps;
    // rotate the facing by the continuous camera angle so the shadow matches
    // how the character appears once the camera has turned. During a
    // rotation the player steps through the intermediate facings along
    // θ(t), so its shadow does too:
    const rotatedFacing = rotateXy(
      item.type === "sceneryPlayer" ?
        item.config.startDirection
      : (item.state.visualFacingVector ?? item.state.facing),
      cameraAngle,
    );
    const resolvedFacingIndexXy8 = nonZeroClosestDirectionIndexXy8(
      rotatedFacing.x,
      rotatedFacing.y,
    );

    const falling = action === "falling";

    const render =
      currentlyRenderedProps === undefined ||
      resolvedFacingIndexXy8 !==
        currentlyRenderedProps.resolvedFacingIndexXy8 ||
      falling !== currentlyRenderedProps.falling;

    if (!render) {
      return "no-update";
    }

    const flippedDirectionIndex = flipXy8[resolvedFacingIndexXy8];
    const shadowMaskDirectionIndex =
      flippedDirectionIndex ?? resolvedFacingIndexXy8;

    const spritesheet = spritesheets.shadowSpritesheet;

    const textureId = getPlayableShadowMaskTextureId(
      shadowMaskBaseShadowTextureId,
      falling,
      shadowMaskDirectionIndex,
      spritesheet,
    );

    const sprite: Sprite = createSprite({
      textureId,
      spritesheet,
    });

    sprite.y = -(blockSizePx.z * (heightBlocks - 1));

    sprite.scale.x = flippedDirectionIndex === undefined ? 1 : -1;

    return {
      output: sprite,
      renderProps: { resolvedFacingIndexXy8, falling },
    };
  };
