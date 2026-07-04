import { type JsonItemUnion } from "../../../model/json/JsonItem";
import { roomJsonItemsIterable } from "../../../model/RoomJson";
import {
  roomItemsIterable,
  roomSpatialIndexKey,
  type RoomState,
} from "../../../model/RoomState";
import { emptyObject } from "../../../utils/empty";
import { type Xy } from "../../../utils/vectors/vectors";
import { isSpatial } from "../../physics/itemPredicates";
import { buildRoomJsonDirectionalIndex } from "./buildRoomJsonDirectionalIndex";
import { loadItems } from "./loadItems";
import { maybeLoadExtraCornerShadow } from "./maybeLoadExtraCornerShadow";

/**
 * camera-relative structure (walls, doors, floors and their derived items) bakes
 * the camera angle into its geometry at load time - which side is near/hidden, the
 * setbacks, the floor expansion etc. When the camera is rotated this geometry has
 * to be re-derived, while the live runtime state of every item (eg a floor's
 * stoodOnBy) is preserved.
 *
 * Re-derivation uses the same deterministic ids at every angle, so a re-loaded item
 * matches its predecessor by id and cross-item links (eg standingOnItemId) stay
 * intact. `position` is the only camera-sensitive field in an item's state, so the
 * preserved state takes the re-derived position and keeps everything else.
 *
 * This runs once per rotation (a cold path), so allocation here is fine.
 */
export const reloadStructureForCamera = <RoomId extends string>(
  /** mutated in place: its structural items + spatial index are rebuilt */
  room: RoomState<RoomId, string>,
  cameraAngle: Xy,
): void => {
  const { roomJson } = room;
  const spatialIndex = room[roomSpatialIndexKey];
  const directionalIndex = buildRoomJsonDirectionalIndex(
    roomJsonItemsIterable(roomJson),
  );

  const isStructural = (item: JsonItemUnion<RoomId, string>): boolean =>
    item.type === "wall" || item.type === "door" || item.type === "floor";

  // the structural filter excludes pickups/scrolls/crowns/players, so the
  // pickups-collected / scrolls-read / liberated / pokes inputs are irrelevant here:
  const reloadedItems = loadItems(
    roomJson,
    directionalIndex,
    emptyObject,
    emptyObject,
    emptyObject,
    emptyObject,
    false,
    isStructural,
    cameraAngle,
  );

  for (const reloaded of reloadedItems) {
    const old = room.items[reloaded.id];
    if (old !== undefined) {
      // keep the live runtime state, but take the re-derived (camera-correct)
      // position - the rest of the camera-correct structure rides on the item's
      // non-state fields (aabb / renderAabb / fixedZIndex / setback):
      reloaded.state = {
        ...old.state,
        position: reloaded.state.position,
      } as typeof reloaded.state;
      if (isSpatial(old)) {
        spatialIndex.removeItem(old);
      }
    }
    room.items[reloaded.id] = reloaded;
    if (isSpatial(reloaded)) {
      spatialIndex.addItem(reloaded);
    }
  }

  // the decorative extra corner shadow lives at the camera-near corner, so it
  // is re-derived too. Its id encodes which world corner it is at, which
  // changes with the angle, so stale ones are removed rather than overwritten:
  const staleCornerShadows = roomItemsIterable(room.items)
    .filter(
      (item) =>
        item.type === "blocker" && item.id.startsWith("extraCornerShadow-"),
    )
    .toArray();
  for (const stale of staleCornerShadows) {
    if (isSpatial(stale)) {
      spatialIndex.removeItem(stale);
    }
    delete room.items[stale.id];
  }
  for (const cornerShadow of maybeLoadExtraCornerShadow(
    directionalIndex,
    cameraAngle,
  )) {
    room.items[cornerShadow.id] = cornerShadow;
    if (isSpatial(cornerShadow)) {
      spatialIndex.addItem(cornerShadow);
    }
  }
};
