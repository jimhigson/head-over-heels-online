import { Container } from "pixi.js";

import type { ItemAppearance } from "./ItemAppearance";

import { iterateStoodOnByItems } from "../../../model/stoodOnItemsLookup";
import { isPlayableItem } from "../../physics/itemPredicates";
import { teleporterIsActive } from "../../physics/mechanics/teleporting";
import { createSprite } from "../createSprite";

type TeleporterRenderProps = {
  flashing: boolean;
  activated: boolean;
};

export const teleporterAppearance: ItemAppearance<
  "teleporter",
  TeleporterRenderProps
> = ({
  renderContext: {
    item,
    room,
    general: { paused },
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
    activated && iterateStoodOnByItems(stoodOnBy, room).some(isPlayableItem);

  const render =
    currentlyRenderedProps === undefined ||
    activated !== currentlyRenderedProps.activated ||
    flashing !== currentlyRenderedProps.flashing;

  if (!render) {
    return "no-update";
  }

  return {
    output:
      flashing ?
        new Container({
          children: [
            createSprite({ textureId: "teleporter", times }),
            createSprite({
              animationId: "teleporter.flashing",
              times,
              paused,
            }),
          ],
        })
      : createSprite({
          textureId: activated ? "teleporter" : "block.artificial",
          times,
        }),
    renderProps: { flashing, activated },
  };
};
