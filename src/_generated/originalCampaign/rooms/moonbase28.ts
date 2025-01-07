import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "dimmed" },
  floor: "moonbase",
  id: "moonbase28",
  items: {
    "door@2,0,0": {
      config: { direction: "towards", toRoom: "moonbase27" },
      position: { x: 2, y: 0, z: 0 },
      type: "door",
    },
    "door@6,2,4": {
      config: { direction: "left", toRoom: "moonbase29" },
      position: { x: 6, y: 2, z: 4 },
      type: "door",
    },
    "hushPuppy@3,3,0": {
      config: {},
      position: { x: 3, y: 3, z: 0 },
      type: "hushPuppy",
    },
    "hushPuppy@4,3,1": {
      config: {},
      position: { x: 4, y: 3, z: 1 },
      type: "hushPuppy",
    },
    "hushPuppy@5,3,2": {
      config: {},
      position: { x: 5, y: 3, z: 2 },
      type: "hushPuppy",
    },
    "monster@0,5,0": {
      config: {
        activated: true,
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "towards",
        which: "cyberman",
      },
      position: { x: 0, y: 5, z: 0 },
      type: "monster",
    },
  },
  planet: "moonbase",
  size: { x: 6, y: 6 },
  walls: {
    away: ["window1", "coil", "window3", "window2", "coil", "window1"],
    left: ["window3", "window2", "none", "none", "window2", "window1"],
  },
}) satisfies RoomJson<"moonbase", OriginalCampaignRoomId>;
