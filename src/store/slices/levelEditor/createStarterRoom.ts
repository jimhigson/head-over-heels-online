import type { RoomJson, RoomJsonItems } from "../../../model/RoomJson";
import type {
  EditorRoomId,
  EditorRoomItemId,
  EditorRoomJsonItems,
} from "./EditorRoomId";

const starterRoomItems: RoomJsonItems<string, EditorRoomItemId> = {
  awayWall: {
    type: "wall",
    config: {
      direction: "away",
      times: { x: 8 },
      tiles: [
        "plain",
        "plain",
        "plain",
        "plain",
        "plain",
        "plain",
        "plain",
        "plain",
      ],
    },
    position: { x: 0, y: 8, z: 0 },
  },
  leftWall: {
    type: "wall",
    config: {
      direction: "left",
      times: { y: 8 },
      tiles: [
        "plain",
        "plain",
        "plain",
        "plain",
        "plain",
        "plain",
        "plain",
        "plain",
      ],
    },
    position: { x: 8, y: 0, z: 0 },
  },
  towardsWall: {
    type: "wall",
    config: {
      direction: "towards",
      times: { x: 8 },
    },
    position: { x: 0, y: 0, z: 0 },
  },
  rightWall: {
    type: "wall",
    config: {
      direction: "right",
      times: { y: 8 },
    },
    position: { x: 0, y: 0, z: 0 },
  },
};

export const createStarterRoom = (): RoomJson<
  EditorRoomId,
  EditorRoomItemId
> => ({
  id: "currentRoom" as EditorRoomId,
  planet: "blacktooth",
  color: { hue: "cyan", shade: "basic" },
  floor: "blacktooth",
  items: starterRoomItems as EditorRoomJsonItems,
  size: { x: 8, y: 8 },
});
