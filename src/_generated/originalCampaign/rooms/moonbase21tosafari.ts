import type { RoomJson } from "../../../model/modelTypes.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = {
  color: { hue: "white", shade: "dimmed" },
  floor: "moonbase",
  floorSkip: [],
  id: "moonbase21tosafari",
  items: {
    "baddie@0,7,1:1AulfA": {
      config: {
        activated: false,
        startDirection: "towards",
        which: "cyberman",
      },
      position: { x: 0, y: 7, z: 1 },
      type: "baddie",
    },
    "baddie@1,7,1:1AulfA": {
      config: {
        activated: false,
        startDirection: "towards",
        which: "cyberman",
      },
      position: { x: 1, y: 7, z: 1 },
      type: "baddie",
    },
    "baddie@2,7,1:1AulfA": {
      config: {
        activated: false,
        startDirection: "towards",
        which: "cyberman",
      },
      position: { x: 2, y: 7, z: 1 },
      type: "baddie",
    },
    "baddie@3,7,1:1AulfA": {
      config: {
        activated: false,
        startDirection: "towards",
        which: "cyberman",
      },
      position: { x: 3, y: 7, z: 1 },
      type: "baddie",
    },
    "baddie@4,7,1:1AulfA": {
      config: {
        activated: false,
        startDirection: "towards",
        which: "cyberman",
      },
      position: { x: 4, y: 7, z: 1 },
      type: "baddie",
    },
    "baddie@5,7,1:1AulfA": {
      config: {
        activated: false,
        startDirection: "towards",
        which: "cyberman",
      },
      position: { x: 5, y: 7, z: 1 },
      type: "baddie",
    },
    "deadlyBlock@0,7,0:2u1uHB": {
      config: { style: "toaster" },
      position: { x: 0, y: 7, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@1,7,0:2u1uHB": {
      config: { style: "toaster" },
      position: { x: 1, y: 7, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@2,7,0:2u1uHB": {
      config: { style: "toaster" },
      position: { x: 2, y: 7, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@3,7,0:2u1uHB": {
      config: { style: "toaster" },
      position: { x: 3, y: 7, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@4,7,0:2u1uHB": {
      config: { style: "toaster" },
      position: { x: 4, y: 7, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@5,7,0:2u1uHB": {
      config: { style: "toaster" },
      position: { x: 5, y: 7, z: 0 },
      type: "deadlyBlock",
    },
    "door@2,0,0:5CAiM": {
      config: { direction: "towards", toRoom: "moonbase20" },
      position: { x: 2, y: 0, z: 0 },
      type: "door",
    },
    "teleporter@2,3,0:1mtSsV": {
      config: { toRoom: "safari1" },
      position: { x: 2, y: 3, z: 0 },
      type: "teleporter",
    },
    "teleporter@2,4,0:1mtSsV": {
      config: { toRoom: "safari1" },
      position: { x: 2, y: 4, z: 0 },
      type: "teleporter",
    },
    "teleporter@3,3,0:1mtSsV": {
      config: { toRoom: "safari1" },
      position: { x: 3, y: 3, z: 0 },
      type: "teleporter",
    },
    "teleporter@3,4,0:1mtSsV": {
      config: { toRoom: "safari1" },
      position: { x: 3, y: 4, z: 0 },
      type: "teleporter",
    },
    scroll: {
      type: "scroll",
      position: { x: 1, y: 3, z: 0 },
      config: {
        text: `
## SAFARI

A densely vegetated planet, mainly used for hunting. The natives live in wooden
forts in the jungle, beware traps!

*Head Over Heels Manual*
`,
      }
    }
  },
  planet: "moonbase",
  size: { x: 6, y: 8 },
  walls: {
    away: ["window1", "coil", "window3", "window2", "coil", "window1"],
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
} satisfies RoomJson<"moonbase", OriginalCampaignRoomId>;
