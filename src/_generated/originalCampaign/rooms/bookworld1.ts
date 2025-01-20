import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "bookworld",
  id: "bookworld1",
  items: {
    "block@0,3,0": {
      config: { style: "book" },
      position: { x: 0, y: 3, z: 0 },
      type: "block",
    },
    "block@0,3,1": {
      config: { style: "book" },
      position: { x: 0, y: 3, z: 1 },
      type: "block",
    },
    "block@0,3,3": {
      config: { style: "book" },
      position: { x: 0, y: 3, z: 3 },
      type: "block",
    },
    "door@0,3,4": {
      config: { direction: "right", toRoom: "bookworld2" },
      position: { x: 0, y: 3, z: 4 },
      type: "door",
    },
    "door@3,0,0": {
      config: { direction: "towards", toRoom: "bookworld7" },
      position: { x: 3, y: 0, z: 0 },
      type: "door",
    },
    "teleporter@6,3,0": {
      config: {
        toPosition: { x: 6, y: 3, z: 0 },
        toRoom: "moonbase25tobookworld",
      },
      position: { x: 6, y: 3, z: 0 },
      type: "teleporter",
    },
    "teleporter@6,4,0": {
      config: {
        toPosition: { x: 6, y: 4, z: 0 },
        toRoom: "moonbase25tobookworld",
      },
      position: { x: 6, y: 4, z: 0 },
      type: "teleporter",
    },
    "teleporter@7,3,0": {
      config: {
        toPosition: { x: 7, y: 3, z: 0 },
        toRoom: "moonbase25tobookworld",
      },
      position: { x: 7, y: 3, z: 0 },
      type: "teleporter",
    },
    "teleporter@7,4,0": {
      config: {
        toPosition: { x: 7, y: 4, z: 0 },
        toRoom: "moonbase25tobookworld",
      },
      position: { x: 7, y: 4, z: 0 },
      type: "teleporter",
    },
  },
  planet: "bookworld",
  size: { x: 8, y: 8 },
  walls: {
    away: ["book", "book", "cowboy", "book", "book", "cowboy", "book", "book"],
    left: ["book", "book", "cowboy", "book", "book", "cowboy", "book", "book"],
  },
}) satisfies RoomJson<"bookworld", OriginalCampaignRoomId>;
