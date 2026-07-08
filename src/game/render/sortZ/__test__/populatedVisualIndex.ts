import { cameraAngleBase } from "../../../../utils/vectors/rotateXy";
import { type Xy } from "../../../../utils/vectors/vectors";
import { type Indexable } from "../../../physics/gridSpace/CellIndex";
import {
  type RenderBoxableItem,
  type RenderBoxes,
} from "../../renderBox/makeItemRenderBoxAtCameraAngle";
import { VisualIndex } from "../VisualIndex";

/**
 * a VisualIndex pre-populated with items - test convenience for the
 * construct-then-update dance the room renderer does in-game
 */
export const populatedVisualIndex = <
  Item extends RenderBoxableItem & Indexable,
>(
  items: ReadonlySet<Item>,
  renderBoxes: RenderBoxes<Item> = new Map(),
  cameraAngle: Xy = cameraAngleBase,
): VisualIndex<Item> => {
  const index = new VisualIndex<Item>(cameraAngle);
  index.updateManyItems(items, items, renderBoxes);
  return index;
};
