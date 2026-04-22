import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "basic" },
  id: "blacktooth26",
  items: {
    co: {
      config: { direction: "right", times: { x: 4 } },
      position: { x: 2, y: 5, z: 0 },
      type: "conveyor",
    },
    co1: {
      config: { direction: "away", times: { y: 3 } },
      position: { x: 5, y: 2, z: 0 },
      type: "conveyor",
    },
    d: {
      config: { direction: "away", toRoom: "blacktooth27fish" },
      position: { x: 2, y: 6, z: 2 },
      type: "door",
    },
    f: {
      config: { floorType: "none", times: { x: 6, y: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    l: {
      config: { bottom: 0, top: 7 },
      position: { x: 5, y: 0, z: 0 },
      type: "lift",
    },
    w: {
      config: { direction: "right", times: { y: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "towards", times: { x: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w2: {
      config: { direction: "away", tiles: ["bars", "bars"] },
      position: { x: 0, y: 6, z: 0 },
      type: "wall",
    },
    w3: {
      config: { direction: "away", tiles: ["bars", "bars"] },
      position: { x: 4, y: 6, z: 0 },
      type: "wall",
    },
    w4: {
      config: {
        direction: "left",
        tiles: ["bars", "bars", "bars", "bars", "bars", "bars"],
      },
      position: { x: 6, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "jail",
  roomBelow: "blacktooth25",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "jail">;
