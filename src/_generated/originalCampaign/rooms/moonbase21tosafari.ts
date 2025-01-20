import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "dimmed" },
  floor: "moonbase",
  id: "moonbase21tosafari",
  items: {
    "deadlyBlock@0,7,0": {
      config: { style: "toaster" },
      position: { x: 0, y: 7, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@1,7,0": {
      config: { style: "toaster" },
      position: { x: 1, y: 7, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@2,7,0": {
      config: { style: "toaster" },
      position: { x: 2, y: 7, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@3,7,0": {
      config: { style: "toaster" },
      position: { x: 3, y: 7, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@4,7,0": {
      config: { style: "toaster" },
      position: { x: 4, y: 7, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@5,7,0": {
      config: { style: "toaster" },
      position: { x: 5, y: 7, z: 0 },
      type: "deadlyBlock",
    },
    "door@2,0,0": {
      config: { direction: "towards", toRoom: "moonbase20" },
      position: { x: 2, y: 0, z: 0 },
      type: "door",
    },
    "monster@0,7,1": {
      config: {
        activated: false,
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "towards",
        wakes: false,
        which: "cyberman",
      },
      position: { x: 0, y: 7, z: 1 },
      type: "monster",
    },
    "monster@1,7,1": {
      config: {
        activated: false,
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "towards",
        wakes: false,
        which: "cyberman",
      },
      position: { x: 1, y: 7, z: 1 },
      type: "monster",
    },
    "monster@2,7,1": {
      config: {
        activated: false,
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "towards",
        wakes: false,
        which: "cyberman",
      },
      position: { x: 2, y: 7, z: 1 },
      type: "monster",
    },
    "monster@3,7,1": {
      config: {
        activated: false,
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "towards",
        wakes: false,
        which: "cyberman",
      },
      position: { x: 3, y: 7, z: 1 },
      type: "monster",
    },
    "monster@4,7,1": {
      config: {
        activated: false,
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "towards",
        wakes: false,
        which: "cyberman",
      },
      position: { x: 4, y: 7, z: 1 },
      type: "monster",
    },
    "monster@5,7,1": {
      config: {
        activated: false,
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "towards",
        wakes: false,
        which: "cyberman",
      },
      position: { x: 5, y: 7, z: 1 },
      type: "monster",
    },
    scroll: {
      config: {
        gives: "scroll",
        markdown: `
## SAFARI

![](texture-safari.wall.shield.left)A densely vegetated planet, mainly used for hunting. The natives live in wooden
forts in the jungle, beware traps!

*> Head Over Heels Manual*
`,
      },
      position: { x: 1, y: 3, z: 0 },
      type: "pickup",
    },
    "teleporter@2,3,0": {
      config: { toPosition: { x: 2, y: 3, z: 0 }, toRoom: "safari1" },
      position: { x: 2, y: 3, z: 0 },
      type: "teleporter",
    },
    "teleporter@2,4,0": {
      config: { toPosition: { x: 2, y: 4, z: 0 }, toRoom: "safari1" },
      position: { x: 2, y: 4, z: 0 },
      type: "teleporter",
    },
    "teleporter@3,3,0": {
      config: { toPosition: { x: 3, y: 3, z: 0 }, toRoom: "safari1" },
      position: { x: 3, y: 3, z: 0 },
      type: "teleporter",
    },
    "teleporter@3,4,0": {
      config: { toPosition: { x: 3, y: 4, z: 0 }, toRoom: "safari1" },
      position: { x: 3, y: 4, z: 0 },
      type: "teleporter",
    },
  },
  planet: "moonbase",
  size: { x: 6, y: 8 },
  walls: {
    away: ["window1", "coil", "window2", "window3", "coil", "window1"],
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
