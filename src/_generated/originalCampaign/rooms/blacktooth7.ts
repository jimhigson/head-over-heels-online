import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "dimmed" },
  floor: "blacktooth",
  id: "blacktooth7",
  items: {
    "door@0,0,0": {
      config: { direction: "towards", toRoom: "blacktooth8fish" },
      position: { x: 0, y: 0, z: 0 },
      type: "door",
    },
    "door@0,8,0": {
      config: { direction: "away", toRoom: "blacktooth5" },
      position: { x: 0, y: 8, z: 0 },
      type: "door",
    },
    "door@2,3,0": {
      config: { direction: "left", toRoom: "blacktooth10" },
      position: { x: 2, y: 3, z: 0 },
      type: "door",
    },
    "wall@0,0,0": {
      config: { direction: "right", tiles: [], times: { y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@2,0,0": {
      config: {
        direction: "left",
        tiles: ["plain", "shield", "plain"],
        times: { y: 3 },
      },
      position: { x: 2, y: 0, z: 0 },
      type: "wall",
    },
    "wall@2,5,0": {
      config: {
        direction: "left",
        tiles: ["plain", "shield", "plain"],
        times: { y: 3 },
      },
      position: { x: 2, y: 5, z: 0 },
      type: "wall",
    },
  },
  planet: "blacktooth",
  size: { x: 2, y: 8 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "blacktooth">;
