import { type UnionOfAllItemInPlayTypes } from "../../../model/ItemInPlay";
import { roomSpatialIndexKey, type RoomState } from "../../../model/RoomState";
import { type Xyz } from "../../../utils/vectors/vectors";

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
  spatialIndex.updateItemSpatialIndex(item);
};
