import type { JsonItemUnion } from "../../../../../../model/json/JsonItem";
import type { RoomJson } from "../../../../../../model/RoomJson";
import { jsonItemIsInSubRoom } from "./itemIsInSubRoom";
import type { NotableItem } from "./NotableItem";

/** should the item be rendered on the map? */
export const jsonItemIsNotable = <RoomId extends string>(
  item: JsonItemUnion<RoomId, string>,
  subRoomId: string,
  room: RoomJson<RoomId, string>,
): item is NotableItem<RoomId> =>
  // TODO: don't include if already collected!
  jsonItemIsInSubRoom(item, subRoomId, room) &&
  (item.type === "teleporter" ||
    item.type === "hushPuppy" ||
    (item.type === "pickup" && item.config.gives !== "scroll"));
