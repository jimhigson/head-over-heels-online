import type { Sprite } from "pixi.js";

import { isStoodOnByPlayable } from "../../../../model/stoodOnItemsLookup";
import { maybeRenderContainerToSprite } from "../../../../utils/pixi/bakeContainerToSprite";
import { nearestQuarterAngle } from "../../../../utils/vectors/cameraAngleVectors";
import { teleporterIsActive } from "../../../physics/mechanics/teleporterIsActive";
import { createSprite } from "../../createSprite";
import type { ItemAppearance } from "../ItemAppearance";

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
    general: {
      pixiRenderer,
      spritesheets,
      spritesheetMeta,
      cameraAngle,
      planetsLiberated,
    },
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

  const activated = teleporterIsActive(item, planetsLiberated);

  const flashing = activated && isStoodOnByPlayable(stoodOnBy, room);

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
      createSprite({
        textureId:
          flashing ? `shadowMask.${type}.flashing`
            // an inactive pad is drawn as a block only uncolourised, where
            // greying can't show - its mask matches what is drawn:
          : !activated && spritesheetMeta.isUncolourisedOf !== undefined ?
            "shadowMask.artificial"
          : `shadowMask.${type}`,
        // multiplied masks tile along their world axes, which the projection
        // rotates on screen:
        cameraQuarterAngle,
        spritesheet: spritesheets.shadowSpritesheet,
        // repeated in x and y only:
        times: { ...times, z: 1 },
      }),
    ),
    renderProps: { flashing, activated },
  };
};
