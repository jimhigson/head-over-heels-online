import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  floor: "moonbase",
  id: "moonbase30",
  items: {
    "door@2,6,0": {
      config: { direction: "away", toRoom: "moonbase27" },
      position: { x: 2, y: 6, z: 0 },
      type: "door",
    },
    "door@6,2,0": {
      config: { direction: "left", toRoom: "moonbase31" },
      position: { x: 6, y: 2, z: 0 },
      type: "door",
    },
  },
  planet: "moonbase",
  size: { x: 6, y: 6 },
  walls: {
    away: ["window2", "window3", "none", "none", "window3", "window1"],
    left: ["window2", "window3", "none", "none", "window3", "window1"],
  },
}) satisfies RoomJson<"moonbase", OriginalCampaignRoomId>;
