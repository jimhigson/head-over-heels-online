import { blockStackSpritesheetMeta } from "../../../../../gfx/spritesheetMeta/blockStackSpritesheetMeta";
import { type RoomJson } from "../../../../model/RoomJson";
import { roomItemsIterable, type RoomState } from "../../../../model/RoomState";
import { type Xy } from "../../../../utils/vectors/vectors";
import { loadRoom } from "../../../gameState/loadRoom/loadRoom";
import { isSpatial } from "../../../physics/itemPredicates";
import {
  makeItemRenderBoxAtCameraAngle,
  type RenderBox,
} from "../../renderBox/makeItemRenderBoxAtCameraAngle";
import { DrawOrderBroadPhase } from "../DrawOrderBroadPhase";
import { updateZEdges } from "../updateZEdges";
import { ZOrderGraph } from "../ZOrderGraph";

/**
 * loads a room and builds its whole draw-order graph exactly as the room
 * renderer does mid-transition: participation and render boxes quantised to
 * the settled `quarterAngle`, draw-order geometry projected at the
 * continuous `geometryAngle`
 */
export const roomZGraphAt = (
  roomJson: RoomJson<string, string>,
  quarterAngle: Xy,
  geometryAngle: Xy,
) => {
  const roomState = loadRoom({
    roomJson,
    scrollsRead: {},
    roomPickupsCollected: {},
    isNewGame: false,
    userSettings: {
      soundSettings: {},
      displaySettings: {},
      pokesEnabled: {},
    },
  }) as RoomState<string, string>;

  const spatial = new Set(
    [...roomItemsIterable(roomState.items)].filter(isSpatial),
  );
  type Item = typeof spatial extends Set<infer I> ? I : never;
  const renderBoxes = new Map<Item, null | RenderBox>();
  for (const item of spatial) {
    renderBoxes.set(
      item,
      makeItemRenderBoxAtCameraAngle(
        item,
        quarterAngle,
        blockStackSpritesheetMeta,
      ) ?? null,
    );
  }
  const broadPhase = new DrawOrderBroadPhase(quarterAngle);
  broadPhase.updateManyItems(spatial, renderBoxes, geometryAngle);
  const graph = new ZOrderGraph<Item>();
  updateZEdges(spatial, broadPhase, graph, renderBoxes);
  const byId = new Map([...spatial].map((item) => [item.id, item] as const));
  return { graph, byId };
};
