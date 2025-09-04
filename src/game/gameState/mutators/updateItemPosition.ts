import type { UnionOfAllItemInPlayTypes } from "../../../model/ItemInPlay";
import type { Xyz } from "../../../utils/vectors/vectors";

import { roomSpatialIndexKey, type RoomState } from "../../../model/RoomState";

export const updateItemPosition = <
  RoomId extends string,
  RoomItemId extends string,
>(
  room: RoomState<RoomId, RoomItemId>,
  item: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
  newPosition: Xyz,
) => {
  const spatialIndex = room[roomSpatialIndexKey];

  item.state.position = newPosition;
  spatialIndex.updateItem(item);
};
