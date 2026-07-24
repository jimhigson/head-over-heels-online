import { type Sprite } from "pixi.js";

import { iterateStoodOnByItems } from "../../../../model/stoodOnItemsLookup";
import { maybeRenderContainerToSprite } from "../../../../utils/pixi/renderContainerToSprite";
import { renderMultipliedXy } from "../../../../utils/pixi/renderMultipliedXy";
import { nearestQuarterAngle } from "../../../../utils/vectors/rotateXy";
import { isPlayableItem } from "../../../physics/itemPredicates";
import { teleporterIsActive } from "../../../physics/mechanics/teleporting";
import { type ItemAppearance } from "../ItemAppearance";

type RenderProps = {
  flashing: boolean;
  activated: boolean;
};

export const teleporterShadowMaskAppearance: ItemAppearance<
  "portableTeleporter" | "teleporter",
  RenderProps,
  Sprite
> = ({
  renderContext: {
    general: { pixiRenderer, spritesheets, cameraAngle },
    item,
    room,
  },
  currentRendering,
}) => {
  const cameraQuarterAngle = nearestQuarterAngle(cameraAngle);
  const {
    type,
    state: { stoodOnBy },
    config: { times },
  } = item;

  const currentlyRenderedProps = currentRendering?.renderProps;

  const activated = teleporterIsActive(item);

  const flashing =
    activated &&
    iterateStoodOnByItems(stoodOnBy, room).find(isPlayableItem) !== undefined;

  const render =
    currentlyRenderedProps === undefined ||
    activated !== currentlyRenderedProps.activated ||
    flashing !== currentlyRenderedProps.flashing;

  if (!render) {
    return "no-update";
  }

  return {
    output: maybeRenderContainerToSprite(
      pixiRenderer,
      renderMultipliedXy(
        {
          textureId:
            flashing ? `shadowMask.${type}.flashing`
            : activated ? `shadowMask.${type}`
            : "shadowMask.artificial",
          // multiplied masks tile along their world axes, which the projection
          // rotates on screen:
          cameraQuarterAngle,
          spritesheet: spritesheets.shadowSpritesheet,
        },
        times,
      ),
    ),
    renderProps: { flashing, activated },
  };
};
