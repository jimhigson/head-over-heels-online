import type { Sprite } from "pixi.js";

import { Container } from "pixi.js";

import type { ItemAppearance } from "./ItemAppearance";

import {
  type DirectionXy4,
  originXy,
  type Xy,
} from "../../../utils/vectors/vectors";
import { createSprite } from "../createSprite";

type PushDirection = DirectionXy4 | undefined;
type JoystickRenderProps = {
  pushDirection: PushDirection;
};

const createContainerAndSprites = () => {
  const container = new Container({ label: "joystick" });

  container.addChild(createSprite(`joystick.stick`));
  container.addChild(createSprite(`joystick.ball`));
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

  const output = currentRendering?.output ?? createContainerAndSprites();

  const ballSprite = output.getChildAt(1) as Sprite;
  const ballSpriteXy = ballRenderPushOffsets.get(pushDirection);
  ballSprite.x = ballSpriteXy?.x ?? 0;
  ballSprite.y = ballSpriteXy?.y ?? 0;

  return {
    output,
    renderProps: { pushDirection },
  };
};
