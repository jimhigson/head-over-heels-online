import type { Sprite } from "pixi.js";
import type { ItemAppearance } from "../ItemAppearance";
import { teleporterIsActive } from "../../../physics/mechanics/teleporting";
import { iterateStoodOnByItems } from "../../../../model/stoodOnItemsLookup";
import { isPlayableItem } from "../../../physics/itemPredicates";
import { renderMultipliedXy } from "../../../../utils/pixi/renderMultpliedXy";

type RenderProps = {
  flashing: boolean;
  activated: boolean;
};

export const teleporterShadowMaskAppearance: ItemAppearance<
  "teleporter",
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
    output: renderMultipliedXy(
      pixiRenderer,
      {
        textureId:
          flashing ? "shadowMask.teleporter.flashing"
          : activated ? "shadowMask.teleporter"
          : "shadowMask.fullBlock",
      },
      times,
    ),
    renderProps: { flashing, activated },
  };
};
