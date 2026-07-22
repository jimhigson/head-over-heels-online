import { iterateStoodOnByItems } from "../../../model/stoodOnItemsLookup";
import { variantTextureId } from "../../../sprites/spritesheet/variantTextureId";
import {
  asReuseSprite,
  maybeRenderContainerToSprite,
} from "../../../utils/pixi/renderContainerToSprite";
import { nearestQuarterAngle } from "../../../utils/vectors/rotateXy";
import { type Xy } from "../../../utils/vectors/vectors";
import { isPlayableItem } from "../../physics/itemPredicates";
import { teleporterIsActive } from "../../physics/mechanics/teleporting";
import { createSprite } from "../createSprite";
import {
  cameraQuarterAngleEqual,
  type ItemAppearance,
  multipliedLayoutAngle,
} from "./ItemAppearance";

type TeleporterRenderProps = {
  flashing: boolean;
  activated: boolean;
  /** the multiplied tiling resolves per camera angle; null when single */
  multipliedAtAngle: null | Xy;
};

export const teleporterAppearance: ItemAppearance<
  "portableTeleporter" | "teleporter",
  TeleporterRenderProps
> = ({
  renderContext: {
    isReflection,
    item,
    room,
    general: { paused, pixiRenderer, spritesheets, cameraAngle },
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
    activated && iterateStoodOnByItems(stoodOnBy, room).some(isPlayableItem);

  const multipliedAtAngle = multipliedLayoutAngle(item, cameraQuarterAngle);
  const render =
    currentlyRenderedProps === undefined ||
    activated !== currentlyRenderedProps.activated ||
    flashing !== currentlyRenderedProps.flashing ||
    !cameraQuarterAngleEqual(
      multipliedAtAngle,
      currentlyRenderedProps.multipliedAtAngle,
    );

  if (!render) {
    return "no-update";
  }

  const { spritesheetForCurrentRoom: spritesheet } = spritesheets;

  return {
    output:
      flashing ?
        // animated, so can't be baked to a single static sprite:
        createSprite({
          animationId: variantTextureId(
            `${type}.flashing`,
            isReflection,
            false,
            false,
            false,
            undefined,
          ),
          times,
          cameraQuarterAngle,
          paused,
          spritesheet,
        })
        // reduce the multiple sprites down to one baked sprite; camera-angle
        // re-renders bake into the previous render texture (the multiplied
        // bake is the same size at every quarter turn). asReuseSprite rejects
        // the previous rendering when it was the flashing (unbaked) container:
      : maybeRenderContainerToSprite(
          pixiRenderer,
          createSprite({
            textureId: variantTextureId(
              activated ? type : "block.artificial",
              isReflection,
              false,
              false,
              false,
              undefined,
            ),
            times,
            cameraQuarterAngle,
            spritesheet,
          }),
          asReuseSprite(currentRendering?.output),
        ),
    renderProps: { flashing, activated, multipliedAtAngle },
  };
};
