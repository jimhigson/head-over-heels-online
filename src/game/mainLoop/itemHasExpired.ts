import { type UnionOfAllItemInPlayTypes } from "../../model/ItemInPlayNarrowedUnions";
import { type RoomState } from "../../model/RoomState";

export const itemHasExpired = <
  RoomId extends string,
  RoomItemId extends string,
>(
  item: UnionOfAllItemInPlayTypes,
  room: RoomState<RoomId, RoomItemId>,
) => item.state.expires !== null && item.state.expires < room.roomTime;
