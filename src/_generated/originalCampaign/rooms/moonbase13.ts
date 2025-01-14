import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "dimmed" },
  floor: "moonbase",
  id: "moonbase13",
  items: {
    "deadlyBlock@0,2,0": {
      config: { style: "toaster" },
      position: { x: 0, y: 2, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@0,3,0": {
      config: { style: "toaster" },
      position: { x: 0, y: 3, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@0,4,0": {
      config: { style: "toaster" },
      position: { x: 0, y: 4, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@0,5,0": {
      config: { style: "toaster" },
      position: { x: 0, y: 5, z: 0 },
      type: "deadlyBlock",
    },
    "door@1,0,0": {
      config: { direction: "towards", toRoom: "moonbase3" },
      position: { x: 1, y: 0, z: 0 },
      type: "door",
    },
    "door@1,8,0": {
      config: { direction: "away", toRoom: "moonbase14" },
      position: { x: 1, y: 8, z: 0 },
      type: "door",
    },
    "door@4,3,0": {
      config: { direction: "left", toRoom: "moonbase16" },
      position: { x: 4, y: 3, z: 0 },
      type: "door",
    },
    "monster@0,2,1": {
      config: {
        activated: false,
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "left",
        wakes: false,
        which: "cyberman",
      },
      position: { x: 0, y: 2, z: 1 },
      type: "monster",
    },
    "monster@0,3,1": {
      config: {
        activated: false,
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "left",
        wakes: false,
        which: "cyberman",
      },
      position: { x: 0, y: 3, z: 1 },
      type: "monster",
    },
    "monster@0,4,1": {
      config: {
        activated: false,
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "left",
        wakes: false,
        which: "cyberman",
      },
      position: { x: 0, y: 4, z: 1 },
      type: "monster",
    },
    "monster@0,5,1": {
      config: {
        activated: false,
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "left",
        wakes: false,
        which: "cyberman",
      },
      position: { x: 0, y: 5, z: 1 },
      type: "monster",
    },
  },
  planet: "moonbase",
  size: { x: 4, y: 8 },
  walls: {
    away: ["window2", "none", "none", "window1"],
    left: [
      "window3",
      "coil",
      "window2",
      "none",
      "none",
      "window2",
      "coil",
      "window1",
    ],
  },
}) satisfies RoomJson<"moonbase", OriginalCampaignRoomId>;
