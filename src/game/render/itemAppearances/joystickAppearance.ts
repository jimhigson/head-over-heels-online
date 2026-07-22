import { Container, type Sprite } from "pixi.js";

import { type AppSpritesheetWithVariants } from "../../../sprites/spritesheet/AppSpritesheet";
import { variantTextureId } from "../../../sprites/spritesheet/variantTextureId";
import { resolveCameraRelativeVectorXy4 } from "../../../utils/vectors/resolveCameraRelativeVector";
import {
  type DirectionXy4,
  originXy,
  type Xy,
} from "../../../utils/vectors/vectors";
import { createSprite } from "../createSprite";
import { type ItemAppearance } from "./ItemAppearance";

type PushDirection = DirectionXy4 | undefined;
type JoystickRenderProps = {
  /** the on-screen push direction the ball is nudged towards, resolved per
   * camera angle; undefined when the joystick is not being pushed */
  screenPushDirection: PushDirection;
};

const createContainerAndSprites = (
  spritesheet: AppSpritesheetWithVariants,
  isReflection: boolean,
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
      spritesheet,
    }),
  );
  return container;
};

const ballRenderPushOffsets: Map<PushDirection, Xy> = new Map([
  ["towards", { x: -1, y: 1 }],
  ["right", { x: 1, y: 1 }],
  ["left", { x: -1, y: 0 }],
  ["away", { x: 1, y: 0 }],
  [undefined, originXy],
]);

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
  const screenPushDirection =
    pushDirection === undefined ? undefined : (
      resolveCameraRelativeVectorXy4(pushDirection, cameraAngle, false)
    );

  const render =
    currentlyRenderedProps === undefined ||
    screenPushDirection !== currentlyRenderedProps.screenPushDirection;

  if (!render) {
    return "no-update";
  }

  const { spritesheetForCurrentRoom: spritesheet } = spritesheets;

  const output =
    currentRendering?.output ??
    createContainerAndSprites(spritesheet, isReflection);

  const ballSprite = output.getChildAt(1) as Sprite;
  ballSprite.texture =
    spritesheet.textures[
      variantTextureId(
        screenPushDirection === undefined ? "joystick.ball" : (
          `joystick.ball.active`
        ),
        isReflection,
        false,
        false,
        false,
      )
    ];
  const ballSpriteXy = ballRenderPushOffsets.get(screenPushDirection);

  ballSprite.x = ballSpriteXy?.x ?? 0;
  ballSprite.y = ballSpriteXy?.y ?? 0;

  return {
    output,
    renderProps: { screenPushDirection },
  };
};
