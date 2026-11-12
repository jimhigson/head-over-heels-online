import { type RoomJson } from "../../../model/RoomJson";

export const firstSubRoomId = (roomJson: RoomJson<string, string>): string => {
  const subRoomKeys =
    roomJson.meta?.subRooms && Object.keys(roomJson.meta.subRooms);
  return subRoomKeys?.[0] ?? "*";
};
