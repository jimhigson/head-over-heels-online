import { iterateStoodOnByItems } from "../../../model/stoodOnItemsLookup";
import { isPlayableItem } from "../../physics/itemPredicates";
import { teleporterIsActive } from "../../physics/mechanics/teleporting";
import { createSprite } from "../createSprite";
import { type ItemAppearance } from "./ItemAppearance";

type TeleporterRenderProps = {
  flashing: boolean;
  activated: boolean;
};

export const teleporterAppearance: ItemAppearance<
  "portableTeleporter" | "teleporter",
  TeleporterRenderProps
> = ({
  renderContext: {
    isReflection,
    item,
    room,
    general: { paused, spritesheetVariants },
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
    activated && iterateStoodOnByItems(stoodOnBy, room).some(isPlayableItem);

  const render =
    currentlyRenderedProps === undefined ||
    activated !== currentlyRenderedProps.activated ||
    flashing !== currentlyRenderedProps.flashing;

  if (!render) {
    return "no-update";
  }

  const spritesheet = spritesheetVariants.currentMainSpritesheet(
    false,
    false,
    isReflection,
  );

  return {
    output:
      flashing ?
        createSprite({
          animationId: `${type}.flashing`,
          times,
          paused,
          spritesheet,
        })
      : createSprite({
          textureId: activated ? type : "block.artificial",
          times,
          spritesheet,
        }),
    renderProps: { flashing, activated },
  };
};
