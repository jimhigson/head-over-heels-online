import type { SpritesheetVariant } from "../../../sprites/spritesheet/variants/SpritesheetVariant";
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
    general: { paused, colourised },
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

  const spritesheetVariant: SpritesheetVariant =
    colourised ? "for-current-room" : "uncolourised";

  return {
    output:
      flashing ?
        createSprite({
          animationId: "teleporter.flashing",
          times,
          paused,
          spritesheetVariant,
        })
      : createSprite({
          textureId: activated ? "teleporter" : "block.artificial",
          times,
          spritesheetVariant,
        }),
    renderProps: { flashing, activated },
  };
};
