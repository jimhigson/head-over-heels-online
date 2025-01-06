import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  floor: "moonbase",
  id: "moonbase22topenitentiary",
  items: {
    "baddie@0,0,1:ZfJWcr": {
      config: {
        activated: false,
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "away",
        wakes: false,
        which: "cyberman",
      },
      position: { x: 0, y: 0, z: 1 },
      type: "baddie",
    },
    "baddie@1,0,1:ZfJWcr": {
      config: {
        activated: false,
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "away",
        wakes: false,
        which: "cyberman",
      },
      position: { x: 1, y: 0, z: 1 },
      type: "baddie",
    },
    "baddie@2,0,1:ZfJWcr": {
      config: {
        activated: false,
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "away",
        wakes: false,
        which: "cyberman",
      },
      position: { x: 2, y: 0, z: 1 },
      type: "baddie",
    },
    "baddie@3,0,1:ZfJWcr": {
      config: {
        activated: false,
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "away",
        wakes: false,
        which: "cyberman",
      },
      position: { x: 3, y: 0, z: 1 },
      type: "baddie",
    },
    "baddie@4,0,1:ZfJWcr": {
      config: {
        activated: false,
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "away",
        wakes: false,
        which: "cyberman",
      },
      position: { x: 4, y: 0, z: 1 },
      type: "baddie",
    },
    "baddie@5,0,1:ZfJWcr": {
      config: {
        activated: false,
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "away",
        wakes: false,
        which: "cyberman",
      },
      position: { x: 5, y: 0, z: 1 },
      type: "baddie",
    },
    "deadlyBlock@0,0,0:2u1uHB": {
      config: { style: "toaster" },
      position: { x: 0, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@1,0,0:2u1uHB": {
      config: { style: "toaster" },
      position: { x: 1, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@2,0,0:2u1uHB": {
      config: { style: "toaster" },
      position: { x: 2, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@3,0,0:2u1uHB": {
      config: { style: "toaster" },
      position: { x: 3, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@4,0,0:2u1uHB": {
      config: { style: "toaster" },
      position: { x: 4, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@5,0,0:2u1uHB": {
      config: { style: "toaster" },
      position: { x: 5, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "door@2,8,0:11h0eu": {
      config: { direction: "away", toRoom: "moonbase20" },
      position: { x: 2, y: 8, z: 0 },
      type: "door",
    },
    scroll: {
      config: {
        gives: "scroll",
        markdown: `
## PENITENTIARY
### The empire's prison planet

![](penitentiary.wall.skeleton.left) Millions are imprisoned here. A harsh planet, very mountainous, much climbing,
skill required. The worst place is The Pit, try not to fall into it!

*> Head Over Heels Manual*
`,
      },
      position: { x: 1, y: 4, z: 0 },
      type: "pickup",
    },
    "teleporter@2,3,0:Z1dKvDl": {
      config: { toRoom: "penitentiary1" },
      position: { x: 2, y: 3, z: 0 },
      type: "teleporter",
    },
    "teleporter@2,4,0:Z1dKvDl": {
      config: { toRoom: "penitentiary1" },
      position: { x: 2, y: 4, z: 0 },
      type: "teleporter",
    },
    "teleporter@3,3,0:Z1dKvDl": {
      config: { toRoom: "penitentiary1" },
      position: { x: 3, y: 3, z: 0 },
      type: "teleporter",
    },
    "teleporter@3,4,0:Z1dKvDl": {
      config: { toRoom: "penitentiary1" },
      position: { x: 3, y: 4, z: 0 },
      type: "teleporter",
    },
  },
  planet: "moonbase",
  size: { x: 6, y: 8 },
  walls: {
    away: ["window3", "window2", "none", "none", "window2", "window1"],
    left: [
      "window2",
      "window1",
      "coil",
      "window3",
      "window2",
      "coil",
      "window2",
      "window1",
    ],
  },
}) satisfies RoomJson<"moonbase", OriginalCampaignRoomId>;
