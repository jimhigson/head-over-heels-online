import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  floor: "moonbase",
  id: "moonbase22topenitentiary",
  items: {
    "deadlyBlock@0,0,0": {
      config: { style: "toaster" },
      position: { x: 0, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@1,0,0": {
      config: { style: "toaster" },
      position: { x: 1, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@2,0,0": {
      config: { style: "toaster" },
      position: { x: 2, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@3,0,0": {
      config: { style: "toaster" },
      position: { x: 3, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@4,0,0": {
      config: { style: "toaster" },
      position: { x: 4, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@5,0,0": {
      config: { style: "toaster" },
      position: { x: 5, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "door@2,8,0": {
      config: { direction: "away", toRoom: "moonbase20" },
      position: { x: 2, y: 8, z: 0 },
      type: "door",
    },
    "monster@0,0,1": {
      config: {
        activated: false,
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "away",
        wakes: false,
        which: "cyberman",
      },
      position: { x: 0, y: 0, z: 1 },
      type: "monster",
    },
    "monster@1,0,1": {
      config: {
        activated: false,
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "away",
        wakes: false,
        which: "cyberman",
      },
      position: { x: 1, y: 0, z: 1 },
      type: "monster",
    },
    "monster@2,0,1": {
      config: {
        activated: false,
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "away",
        wakes: false,
        which: "cyberman",
      },
      position: { x: 2, y: 0, z: 1 },
      type: "monster",
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
    scroll: {
      config: {
        gives: "scroll",
        markdown: `
## PENITENTIARY
### The empire's prison planet

![](texture-penitentiary.wall.skeleton.left)Millions are imprisoned here. A harsh planet, very mountainous, much climbing,
skill required. The worst place is The Pit, try not to fall into it!

*> Head Over Heels Manual*
`,
      },
      position: { x: 1, y: 4, z: 0 },
      type: "pickup",
    },
    "teleporter@2,3,0": {
      config: { toPosition: { x: 2, y: 3, z: 0 }, toRoom: "penitentiary1" },
      position: { x: 2, y: 3, z: 0 },
      type: "teleporter",
    },
    "teleporter@2,4,0": {
      config: { toPosition: { x: 2, y: 4, z: 0 }, toRoom: "penitentiary1" },
      position: { x: 2, y: 4, z: 0 },
      type: "teleporter",
    },
    "teleporter@3,3,0": {
      config: { toPosition: { x: 3, y: 3, z: 0 }, toRoom: "penitentiary1" },
      position: { x: 3, y: 3, z: 0 },
      type: "teleporter",
    },
    "teleporter@3,4,0": {
      config: { toPosition: { x: 3, y: 4, z: 0 }, toRoom: "penitentiary1" },
      position: { x: 3, y: 4, z: 0 },
      type: "teleporter",
    },
  },
  planet: "moonbase",
  size: { x: 6, y: 8 },
  walls: {
    away: ["window2", "window3", "none", "none", "window3", "window1"],
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
