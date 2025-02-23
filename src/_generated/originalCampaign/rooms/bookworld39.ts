import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  floor: "none",
  id: "bookworld39",
  items: {
    "conveyor@0,0,0": {
      config: { direction: "left", times: { x: 7 } },
      position: { x: 0, y: 0, z: 0 },
      type: "conveyor",
    },
    "conveyor@7,0,0": {
      config: { direction: "away", times: { y: 2 } },
      position: { x: 7, y: 0, z: 0 },
      type: "conveyor",
    },
    scroll: {
      config: { gives: "scroll", page: "teleportBack" },
      position: { x: 0, y: 0, z: 10 },
      type: "pickup",
    },
    "teleporter@7,3,0": {
      config: { toPosition: { x: 7, y: 3, z: 0 }, toRoom: "bookworld1" },
      position: { x: 7, y: 3, z: 0 },
      type: "teleporter",
    },
    "teleporter@7,4,0": {
      config: { toPosition: { x: 7, y: 4, z: 0 }, toRoom: "bookworld1" },
      position: { x: 7, y: 4, z: 0 },
      type: "teleporter",
    },
  },
  planet: "bookworld",
  roomAbove: "bookworld38",
  roomBelow: "bookworld40",
  size: { x: 8, y: 8 },
  walls: {
    away: ["book", "book", "cowboy", "book", "book", "cowboy", "book", "book"],
    left: ["book", "book", "cowboy", "book", "book", "cowboy", "book", "book"],
  },
}) satisfies RoomJson<"bookworld", OriginalCampaignRoomId>;
