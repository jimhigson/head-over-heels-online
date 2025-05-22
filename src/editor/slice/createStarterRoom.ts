import type { JsonItem } from "../../model/json/JsonItem";
import type { RoomJson } from "../../model/RoomJson";
import type {
  EditorRoomId,
  EditorRoomItemId,
  EditorRoomJsonItems,
} from "../EditorRoomId";

const starterRoomWallItems: EditorRoomJsonItems = {
  ["awayWall" as EditorRoomItemId]: {
    type: "wall",
    config: {
      direction: "away",
      times: { x: 8 },
      tiles: [
        "plain",
        "shield",
        "plain",
        "plain",
        "armour",
        "shield",
        "armour",
        "plain",
      ],
    },
    position: { x: 0, y: 8, z: 0 },
  } satisfies JsonItem<"wall", EditorRoomId, EditorRoomItemId, "blacktooth">,
  ["leftWall" as EditorRoomItemId]: {
    type: "wall",
    config: {
      direction: "left",
      times: { y: 8 },
      tiles: [
        "plain",
        "armour",
        "shield",
        "armour",
        "plain",
        "plain",
        "shield",
        "plain",
      ],
    },
    position: { x: 8, y: 0, z: 0 },
  },
  ["towardsWall" as EditorRoomItemId]: {
    type: "wall",
    config: {
      direction: "towards",
      times: { x: 8 },
    },
    position: { x: 0, y: 0, z: 0 },
  },
  ["rightWall" as EditorRoomItemId]: {
    type: "wall",
    config: {
      direction: "right",
      times: { y: 8 },
    },
    position: { x: 0, y: 0, z: 0 },
  },
};

/**
 * the room that you start from when you create a room in the editor
 */
export const starterRoom: Omit<
  RoomJson<EditorRoomId, EditorRoomItemId>,
  "id"
> = {
  planet: "blacktooth",
  color: { hue: "cyan", shade: "basic" },
  floor: "blacktooth",
  items: {
    ...starterRoomWallItems,
    ["testBlockRemoveMe" as EditorRoomItemId]: {
      type: "block",
      config: { style: "organic" },
      position: { x: 2, y: 2, z: 0 },
    },
    ["testBlockRemoveMe2" as EditorRoomItemId]: {
      type: "block",
      config: { style: "organic" },
      position: { x: 1, y: 2, z: 0 },
    },
  },
  size: { x: 8, y: 8 },
};
