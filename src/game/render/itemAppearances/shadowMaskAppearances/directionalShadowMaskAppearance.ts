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
  type DirectionXy4,
  type DirectionXy8,
  nonZeroVectorClosestDirectionXy4,
  nonZeroVectorClosestDirectionXy8,
} from "../../../../utils/vectors/vectors";
import { blockSizePx } from "../../../physics/mechanicsConstants";
import { createSprite } from "../../createSprite";
import { type ItemAppearance } from "../ItemAppearance";

type RenderPropsXy4 = {
  resolvedFacingXy4: DirectionXy4;
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
    const resolvedFacingXy4 = nonZeroVectorClosestDirectionXy4(
      rotateXy(facing, cameraAngle),
    );

    const render =
      currentlyRenderedProps === undefined ||
      resolvedFacingXy4 !== currentlyRenderedProps.resolvedFacingXy4;

    if (!render) {
      return "no-update";
    }
    const sprite: Sprite = createSprite({
      textureId:
        resolvedFacingXy4 === "left" || resolvedFacingXy4 === "away" ?
          `shadowMask.${shadowMaskBaseShadowId}.away`
        : `shadowMask.${shadowMaskBaseShadowId}.right`,
      spritesheet: spritesheets.shadowSpritesheet,
    });

    sprite.y = -(blockSizePx.z * (heightBlocks - 1));

    sprite.scale.x =
      resolvedFacingXy4 === "away" || resolvedFacingXy4 === "right" ? 1 : -1;

    return {
      output: sprite,
      renderProps: { resolvedFacingXy4 },
    };
  };

type PlayableShadowMaskRenderProps = {
  resolvedFacingXy8: DirectionXy8;
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
  spritesheet: AppSpritesheet,
): BaseTextureIdWithPrefix<`shadowMask.${IndividualCharacterName}`> => {
  if (!falling) {
    return `shadowMask.${playableName}.${direction}`;
  }

  // not every direction has falling art of its own:
  const fallingShadowMaskTextureId =
    `shadowMask.${playableName}.falling.${direction}` as const;

  return isTextureId(fallingShadowMaskTextureId, spritesheet.data) ?
      fallingShadowMaskTextureId
    : `shadowMask.${playableName}.${direction}`;
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
    const resolvedFacingXy8 = nonZeroVectorClosestDirectionXy8(
      rotateXy(
        item.type === "sceneryPlayer" ?
          item.config.startDirection
        : (item.state.visualFacingVector ?? item.state.facing),
        cameraAngle,
      ),
    );

    const falling = action === "falling";

    const render =
      currentlyRenderedProps === undefined ||
      resolvedFacingXy8 !== currentlyRenderedProps.resolvedFacingXy8 ||
      falling !== currentlyRenderedProps.falling;

    if (!render) {
      return "no-update";
    }

    const flippedDirection = flipXy8[resolvedFacingXy8];
    const shadowMaskDirection = flippedDirection ?? resolvedFacingXy8;

    const spritesheet = spritesheets.shadowSpritesheet;

    const textureId = getPlayableShadowMaskTextureId(
      shadowMaskBaseShadowTextureId,
      falling,
      shadowMaskDirection,
      spritesheet,
    );

    const sprite: Sprite = createSprite({
      textureId,
      spritesheet,
    });

    sprite.y = -(blockSizePx.z * (heightBlocks - 1));

    sprite.scale.x = flippedDirection === undefined ? 1 : -1;

    return {
      output: sprite,
      renderProps: { resolvedFacingXy8, falling },
    };
  };
