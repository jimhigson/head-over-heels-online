import type { Sprite } from "pixi.js";

import type { ItemAppearance } from "../ItemAppearance";

import { iterateStoodOnByItems } from "../../../../model/stoodOnItemsLookup";
import { maybeRenderContainerToSprite } from "../../../../utils/pixi/renderContainerToSprite";
import { renderMultipliedXy } from "../../../../utils/pixi/renderMultpliedXy";
import { isPlayableItem } from "../../../physics/itemPredicates";
import { teleporterIsActive } from "../../../physics/mechanics/teleporting";

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
    general: { pixiRenderer },
    item,
    room,
  },
  currentRendering,
}) => {
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
          spritesheetVariant: "original",
        },
        times,
      ),
    ),
    renderProps: { flashing, activated },
  };
};
