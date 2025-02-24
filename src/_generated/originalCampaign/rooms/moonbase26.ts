import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "green", shade: "basic" },
  floor: "moonbase",
  id: "moonbase26",
  items: {
    "deadlyBlock@2,0,0": {
      config: { style: "toaster", times: { x: 4 } },
      position: { x: 2, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "door@0,0,0": {
      config: { direction: "right", toRoom: "moonbase23" },
      position: { x: 0, y: 0, z: 0 },
      type: "door",
    },
    "door@8,0,0": {
      config: { direction: "left", toRoom: "moonbase27" },
      position: { x: 8, y: 0, z: 0 },
      type: "door",
    },
    "monster@3,0,1": {
      config: {
        activated: false,
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "away",
        wakes: false,
        which: "cyberman",
      },
      position: { x: 3, y: 0, z: 1 },
      type: "monster",
    },
    "monster@4,0,1": {
      config: {
        activated: false,
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "away",
        wakes: false,
        which: "cyberman",
      },
      position: { x: 4, y: 0, z: 1 },
      type: "monster",
    },
    "monster@5,0,1": {
      config: {
        activated: false,
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "away",
        wakes: false,
        which: "cyberman",
      },
      position: { x: 5, y: 0, z: 1 },
      type: "monster",
    },
  },
  planet: "moonbase",
  size: { x: 8, y: 2 },
  walls: {
    away: [
      "window3",
      "window1",
      "coil",
      "window2",
      "window3",
      "coil",
      "window3",
      "window1",
    ],
    left: ["none", "none"],
  },
}) satisfies RoomJson<"moonbase", OriginalCampaignRoomId>;
