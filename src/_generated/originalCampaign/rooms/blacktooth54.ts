import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "dimmed" },
  id: "blacktooth54",
  items: {
    "block@3,0,0": {
      config: { style: "organic", times: { x: 2 } },
      position: { x: 3, y: 0, z: 0 },
      type: "block",
    },
    "door@3,0,1": {
      config: { direction: "towards", toRoom: "blacktooth53market" },
      position: { x: 3, y: 0, z: 1 },
      type: "door",
    },
    "floor@0,0,0": {
      config: { floorType: "none", times: { x: 8, y: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    "wall(right)@0,0,0": {
      config: { direction: "right", times: { y: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall(towards)@0,0,0": {
      config: { direction: "towards", times: { x: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,6,0": {
      config: {
        direction: "away",
        tiles: ["bars", "bars", "bars", "bars", "bars", "bars", "bars", "bars"],
        times: { x: 8 },
      },
      position: { x: 0, y: 6, z: 0 },
      type: "wall",
    },
    "wall@5,0,0": {
      config: { direction: "towards", times: { x: 3 } },
      position: { x: 5, y: 0, z: 0 },
      type: "wall",
    },
    "wall@8,0,0": {
      config: {
        direction: "left",
        tiles: ["bars", "bars", "bars", "bars", "bars", "bars"],
        times: { y: 6 },
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "jail",
  roomBelow: "blacktooth55",
  size: { x: 8, y: 6 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "jail">;
