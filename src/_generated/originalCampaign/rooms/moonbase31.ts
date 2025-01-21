import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "moonbase",
  id: "moonbase31",
  items: {
    "door@0,2,0": {
      config: { direction: "right", toRoom: "moonbase30" },
      position: { x: 0, y: 2, z: 0 },
      type: "door",
    },
    "teleporter@2,2,0": {
      config: { toPosition: { x: 2, y: 2, z: 0 }, toRoom: "blacktooth64" },
      position: { x: 2, y: 2, z: 0 },
      type: "teleporter",
    },
    "teleporter@2,3,0": {
      config: { toPosition: { x: 2, y: 3, z: 0 }, toRoom: "blacktooth64" },
      position: { x: 2, y: 3, z: 0 },
      type: "teleporter",
    },
    "teleporter@3,2,0": {
      config: { toPosition: { x: 3, y: 2, z: 0 }, toRoom: "blacktooth64" },
      position: { x: 3, y: 2, z: 0 },
      type: "teleporter",
    },
    "teleporter@3,3,0": {
      config: { toPosition: { x: 3, y: 3, z: 0 }, toRoom: "blacktooth64" },
      position: { x: 3, y: 3, z: 0 },
      type: "teleporter",
    },
  },
  planet: "moonbase",
  size: { x: 6, y: 6 },
  walls: {
    away: ["window1", "coil", "window2", "window3", "coil", "window1"],
    left: ["window1", "coil", "window2", "window3", "coil", "window1"],
  },
}) satisfies RoomJson<"moonbase", OriginalCampaignRoomId>;
