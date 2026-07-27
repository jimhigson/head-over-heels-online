import { type SpritesheetMetadata } from "../../../sprites/spritesheet/spritesheetData/spritesheetMetaData";
import { quarterCameraAngles } from "../../../utils/vectors/cameraAngleVectors";
import { originXyz, type Xy } from "../../../utils/vectors/vectors";
import { boxProjectedExtent } from "../item/itemRender/cuboidTransitionMesh";
import {
  makeItemRenderBoxAtCameraAngle,
  type RenderBoxableItem,
} from "./makeItemRenderBoxAtCameraAngle";

/**
 * the largest screen extent the item's drawn (render) box projects to across
 * the four quarter-turn camera angles.
 *
 * Used to size baked render textures so they are guaranteed reusable at every
 * angle: a re-render at another quarter turn can differ from the current
 * bake's bounds only by the render box's change (eg a floor's cosmetic
 * back-edge overhang moving to different world edges), since the art's
 * margins around the box are angle-invariant. So a texture allocated to
 * `currentBakeBounds + (this - currentBoxExtent)` never needs reallocating
 * for a camera rotation.
 */
export const maxRenderBoxScreenExtentAtAnyQuarterAngle = (
  item: RenderBoxableItem,
  spritesheetMeta: SpritesheetMetadata,
): Xy => {
  let width = 0;
  let height = 0;
  for (const angle of quarterCameraAngles) {
    const box = makeItemRenderBoxAtCameraAngle(item, angle, spritesheetMeta);
    const { min, max } = boxProjectedExtent(
      box?.renderAabb ?? item.aabb,
      box?.renderAabbOffset ?? originXyz,
      angle,
    );
    width = Math.max(width, max.x - min.x);
    height = Math.max(height, max.y - min.y);
  }
  return { x: Math.ceil(width), y: Math.ceil(height) };
};
