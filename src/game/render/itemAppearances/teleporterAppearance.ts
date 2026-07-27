import { iterateStoodOnByItems } from "../../../model/stoodOnItemsLookup";
import { variantTextureId } from "../../../sprites/spritesheet/variantTextureId";
import {
  asReuseSprite,
  maybeRenderContainerToSprite,
} from "../../../utils/pixi/renderContainerToSprite";
import { nearestQuarterAngle } from "../../../utils/vectors/cameraAngleVectors";
import { spriteFlipXAtAngle } from "../../../utils/vectors/resolveCameraRelativeVector";
import { type Xy } from "../../../utils/vectors/vectors";
import { isPlayableItem } from "../../physics/itemPredicates";
import { teleporterIsActive } from "../../physics/mechanics/teleporting";
import { createSprite } from "../createSprite";
import { cameraQuarterAngleEqual, type ItemAppearance } from "./ItemAppearance";

type TeleporterRenderProps = {
  flashing: boolean;
  activated: boolean;
  /** the flip (and any multiplied tiling) resolves per camera angle */
  renderedAtAngle: Xy;
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

  const render =
    currentlyRenderedProps === undefined ||
    activated !== currentlyRenderedProps.activated ||
    flashing !== currentlyRenderedProps.flashing ||
    !cameraQuarterAngleEqual(
      cameraQuarterAngle,
      currentlyRenderedProps.renderedAtAngle,
    );

  if (!render) {
    return "no-update";
  }

  const { spritesheetForCurrentRoom: spritesheet } = spritesheets;
  // teleporters flip on odd quarter turns so their painted shading stays on
  // their world faces (light source fixed in the world); each sub-sprite of a
  // multiplied pad flips individually before any bake:
  const flipX = spriteFlipXAtAngle(cameraQuarterAngle);

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
          ),
          flipX,
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
            ),
            flipX,
            times,
            cameraQuarterAngle,
            spritesheet,
          }),
          asReuseSprite(currentRendering?.output),
        ),
    renderProps: { flashing, activated, renderedAtAngle: cameraQuarterAngle },
  };
};
