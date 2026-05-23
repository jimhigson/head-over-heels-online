import { Container, type Sprite } from "pixi.js";

import { type AppSpritesheet } from "../../../sprites/spritesheet/variants/SpritesheetVariants";
import {
  type DirectionXy4,
  originXy,
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
    item: {
      state: { actedOnAt, lastPushDirection },
    },
    room: { roomTime },
    general: { spritesheetVariants },
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

  const spritesheet = spritesheetVariants.currentMainSpritesheet();

  const output =
    currentRendering?.output ?? createContainerAndSprites(spritesheet);

  const ballSprite = output.getChildAt(1) as Sprite;
  ballSprite.texture =
    spritesheet.textures[
      pushDirection === undefined ? "joystick.ball" : `joystick.ball.active`
    ];
  const ballSpriteXy = ballRenderPushOffsets.get(pushDirection);

  ballSprite.x = ballSpriteXy?.x ?? 0;
  ballSprite.y = ballSpriteXy?.y ?? 0;

  return {
    output,
    renderProps: { pushDirection },
  };
};
