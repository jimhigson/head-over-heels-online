import { cameraAngleBase } from "../../../../utils/vectors/cameraAngleVectors";
import { type Xy } from "../../../../utils/vectors/vectors";
import { type Indexable } from "../../../physics/gridSpace/CellIndex";
import {
  type RenderBoxableItem,
  type RenderBoxes,
} from "../../renderBox/makeItemRenderBoxAtCameraAngle";
import { DrawOrderBroadPhase } from "../DrawOrderBroadPhase";

/**
 * a DrawOrderBroadPhase pre-populated with items - test convenience for the
 * construct-then-update dance the room renderer does in-game
 */
export const populatedBroadPhase = <Item extends RenderBoxableItem & Indexable>(
  items: ReadonlySet<Item>,
  renderBoxes: RenderBoxes<Item> = new Map(),
  quarterAngle: Xy = cameraAngleBase,
  /** the continuous render angle θ to project at; the quarter angle when settled */
  geometryAngle: Xy = quarterAngle,
): DrawOrderBroadPhase<Item> => {
  const broadPhase = new DrawOrderBroadPhase<Item>(quarterAngle);
  broadPhase.updateManyItems(items, renderBoxes, geometryAngle);
  return broadPhase;
};
