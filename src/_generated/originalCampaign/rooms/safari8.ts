import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "green", shade: "basic" },
  floor: "safari",
  id: "safari8",
  items: {
    "door@0,0,1": {
      config: { direction: "right", toRoom: "safari7" },
      position: { x: 0, y: 0, z: 1 },
      type: "door",
    },
    "door@8,0,1": {
      config: { direction: "left", toRoom: "safari9" },
      position: { x: 8, y: 0, z: 1 },
      type: "door",
    },
    "wall@0,0,0": {
      config: { direction: "towards", tiles: [], times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,2,0": {
      config: {
        direction: "away",
        tiles: [
          "wall",
          "window",
          "wall",
          "shield",
          "shield",
          "wall",
          "window",
          "wall",
        ],
        times: { x: 8 },
      },
      position: { x: 0, y: 2, z: 0 },
      type: "wall",
    },
  },
  planet: "safari",
  size: { x: 8, y: 2 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "safari">;
