import { Container, type Sprite } from "pixi.js";

import { type AppSpritesheetWithVariants } from "../../../sprites/spritesheet/AppSpritesheet";
import { variantTextureId } from "../../../sprites/spritesheet/variantTextureId";
import {
  resolveCameraRelativeIndexXy4,
  spriteFlipXAtAngle,
} from "../../../utils/vectors/resolveCameraRelativeVector";
import {
  type DirectionIndexXy4,
  directionIndexXy8,
  originXy,
  type Xy,
} from "../../../utils/vectors/vectors";
import { createSprite } from "../createSprite";
import { type ItemAppearance } from "./ItemAppearance";

type JoystickRenderProps = {
  /** the on-screen push direction ring index the ball is nudged towards,
   * resolved per camera angle; undefined when the joystick is not being pushed */
  pushIndex: DirectionIndexXy4 | undefined;
  /** whether the sprites are drawn horizontally flipped */
  flipX: boolean;
};

const createContainerAndSprites = (
  spritesheet: AppSpritesheetWithVariants,
  isReflection: boolean,
  /**
   * flipped on odd quarter turns so the painted highlights stay on the
   * joystick's world side (light source fixed in the world)
   */
  flipX: boolean,
) => {
  const container = new Container({ label: "joystick" });

  container.addChild(
    createSprite({
      textureId: variantTextureId(
        "joystick.stick",
        isReflection,
        false,
        false,
        false,
      ),
      flipX,
      spritesheet,
    }),
  );
  container.addChild(
    createSprite({
      textureId: variantTextureId(
        "joystick.ball",
        isReflection,
        false,
        false,
        false,
      ),
      flipX,
      spritesheet,
    }),
  );
  return container;
};

const ballRenderPushOffsets = {
  [directionIndexXy8.towards]: { x: -1, y: 1 },
  [directionIndexXy8.right]: { x: 1, y: 1 },
  [directionIndexXy8.left]: { x: -1, y: 0 },
  [directionIndexXy8.away]: { x: 1, y: 0 },
} as const satisfies Record<DirectionIndexXy4, Xy>;

export const joystickAppearance: ItemAppearance<
  "joystick",
  JoystickRenderProps
> = ({
  renderContext: {
    isReflection,
    item: {
      state: { actedOnAt, lastPushDirection },
    },
    room: { roomTime },
    general: { spritesheets, cameraAngle },
  },
  currentRendering,
}) => {
  const currentlyRenderedProps = currentRendering?.renderProps;

  const pushDirection =
    roomTime === actedOnAt.roomTime ? lastPushDirection : undefined;
  // the offsets nudge the ball the way it was pushed as seen on screen, so
  // rotate the world push direction into camera space - rounded only here, at
  // the offset lookup:
  const pushIndex =
    pushDirection === undefined ? undefined : (
      resolveCameraRelativeIndexXy4(pushDirection, cameraAngle, false)
    );
  const flipX = spriteFlipXAtAngle(cameraAngle);

  const render =
    currentlyRenderedProps === undefined ||
    pushIndex !== currentlyRenderedProps.pushIndex ||
    flipX !== currentlyRenderedProps.flipX;

  if (!render) {
    return "no-update";
  }

  const { spritesheetForCurrentRoom: spritesheet } = spritesheets;

  const output =
    flipX === currentlyRenderedProps?.flipX ?
      currentRendering!.output!
    : createContainerAndSprites(spritesheet, isReflection, flipX);

  const ballSprite = output.getChildAt(1) as Sprite;
  ballSprite.texture =
    spritesheet.textures[
      variantTextureId(
        pushIndex === undefined ? "joystick.ball" : `joystick.ball.active`,
        isReflection,
        false,
        false,
        false,
      )
    ];
  const ballSpriteXy =
    pushIndex === undefined ? originXy : ballRenderPushOffsets[pushIndex];

  ballSprite.x = ballSpriteXy.x;
  ballSprite.y = ballSpriteXy.y;

  return {
    output,
    renderProps: { pushIndex, flipX },
  };
};
