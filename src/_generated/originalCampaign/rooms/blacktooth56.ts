import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "dimmed" },
  id: "blacktooth56",
  items: {
    b: {
      config: { style: "organic", times: { y: 2, z: 2 } },
      position: { x: 3, y: 0, z: 0 },
      type: "block",
    },
    b1: {
      config: { style: "organic", times: { y: 2 } },
      position: { x: 3, y: 0, z: 3 },
      type: "block",
    },
    b2: {
      config: { style: "organic" },
      position: { x: 3, y: 1, z: 2 },
      type: "block",
    },
    d: {
      config: { direction: "right", toRoom: "blacktooth57" },
      position: { x: 0, y: 0, z: 4 },
      type: "door",
    },
    d1: {
      config: { direction: "left", toRoom: "blacktooth55" },
      position: { x: 8, y: 0, z: 0 },
      type: "door",
    },
    f: {
      config: {
        floorType: "standable",
        scenery: "market",
        times: { x: 8, y: 2 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    sk: {
      config: { times: { y: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "spikes",
    },
    w: {
      config: { direction: "towards", times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: {
        direction: "away",
        tiles: ["bars", "bars", "bars", "bars", "bars", "bars", "bars", "bars"],
      },
      position: { x: 0, y: 2, z: 0 },
      type: "wall",
    },
  },
  planet: "jail",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "jail">;
