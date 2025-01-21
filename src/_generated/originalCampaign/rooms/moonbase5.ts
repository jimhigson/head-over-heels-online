import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "green", shade: "basic" },
  floor: "moonbase",
  id: "moonbase5",
  items: {
    "door@1,0,0": {
      config: { direction: "towards", toRoom: "moonbase4" },
      position: { x: 1, y: 0, z: 0 },
      type: "door",
    },
    "door@1,8,0": {
      config: { direction: "away", toRoom: "moonbase6" },
      position: { x: 1, y: 8, z: 0 },
      type: "door",
    },
    "monster@0,4,0": {
      config: {
        activated: true,
        movement: "towards-tripped-on-axis-xy4",
        which: "homingBot",
      },
      position: { x: 0, y: 4, z: 0 },
      type: "monster",
    },
    "monster@3,2,0": {
      config: {
        activated: true,
        movement: "towards-tripped-on-axis-xy4",
        which: "homingBot",
      },
      position: { x: 3, y: 2, z: 0 },
      type: "monster",
    },
    "monster@3,6,0": {
      config: {
        activated: true,
        movement: "towards-tripped-on-axis-xy4",
        which: "homingBot",
      },
      position: { x: 3, y: 6, z: 0 },
      type: "monster",
    },
  },
  planet: "moonbase",
  size: { x: 4, y: 8 },
  walls: {
    away: ["window2", "none", "none", "window1"],
    left: [
      "window3",
      "window1",
      "coil",
      "window2",
      "window3",
      "coil",
      "window3",
      "window1",
    ],
  },
}) satisfies RoomJson<"moonbase", OriginalCampaignRoomId>;
