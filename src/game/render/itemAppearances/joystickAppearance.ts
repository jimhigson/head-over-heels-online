import { Container, type Sprite } from "pixi.js";

import { type AppSpritesheet } from "../../../sprites/spritesheet/variants/AppSpritesheet";
import {
  type DirectionXy4,
  originXy,
  rotateDirectionXy4ByCameraAngle,
  type Xy,
} from "../../../utils/vectors/vectors";
import { createSprite } from "../createSprite";
import { type ItemAppearance } from "./ItemAppearance";

type PushDirection = DirectionXy4 | undefined;
type JoystickRenderProps = {
  pushDirection: PushDirection;
};

const createContainerAndSprites = (spritesheet: AppSpritesheet) => {
  const container = new Container({ label: "joystick" });

  container.addChild(
    createSprite({ textureId: "joystick.stick", spritesheet }),
  );
  container.addChild(createSprite({ textureId: "joystick.ball", spritesheet }));
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
    general: { spritesheetVariants, cameraAngle },
  },
  currentRendering,
}) => {
  const currentlyRenderedProps = currentRendering?.renderProps;

  const pushDirection =
    roomTime === actedOnAt.roomTime ? lastPushDirection : undefined;
  const currentPushDirection = currentlyRenderedProps?.pushDirection;

  const render =
    currentlyRenderedProps === undefined ||
    pushDirection !== currentPushDirection;

  if (!render) {
    return "no-update";
  }

  const spritesheet = spritesheetVariants.currentMainSpritesheet(
    false,
    false,
    isReflection,
  );

  const output =
    currentRendering?.output ?? createContainerAndSprites(spritesheet);

  const ballSprite = output.getChildAt(1) as Sprite;
  ballSprite.texture =
    spritesheet.textures[
      pushDirection === undefined ? "joystick.ball" : `joystick.ball.active`
    ];
  // the offsets nudge the ball the way it was pushed as seen on screen, so rotate
  // the world push direction into camera space before looking the offset up:
  const screenPushDirection =
    pushDirection === undefined ? undefined : (
      rotateDirectionXy4ByCameraAngle(pushDirection, cameraAngle)
    );
  const ballSpriteXy = ballRenderPushOffsets.get(screenPushDirection);

  ballSprite.x = ballSpriteXy?.x ?? 0;
  ballSprite.y = ballSpriteXy?.y ?? 0;

  return {
    output,
    renderProps: { pushDirection },
  };
};
