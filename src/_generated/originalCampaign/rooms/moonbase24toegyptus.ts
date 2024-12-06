import type { RoomJson } from "../../../model/modelTypes.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = {
  color: { hue: "cyan", shade: "basic" },
  floor: "moonbase",
  floorSkip: [],
  id: "moonbase24toegyptus",
  items: {
    "baddie@0,0,1:Z1xC3bd": {
      config: { activated: false, startDirection: "away", which: "cyberman" },
      position: { x: 0, y: 0, z: 1 },
      type: "baddie",
    },
    "baddie@0,7,1:1AulfA": {
      config: {
        activated: false,
        startDirection: "towards",
        which: "cyberman",
      },
      position: { x: 0, y: 7, z: 1 },
      type: "baddie",
    },
    "baddie@1,0,1:Z1xC3bd": {
      config: { activated: false, startDirection: "away", which: "cyberman" },
      position: { x: 1, y: 0, z: 1 },
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
    "baddie@2,0,1:Z1xC3bd": {
      config: { activated: false, startDirection: "away", which: "cyberman" },
      position: { x: 2, y: 0, z: 1 },
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
    "baddie@5,0,1:Z1xC3bd": {
      config: { activated: false, startDirection: "away", which: "cyberman" },
      position: { x: 5, y: 0, z: 1 },
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
    "baddie@6,0,1:Z1xC3bd": {
      config: { activated: false, startDirection: "away", which: "cyberman" },
      position: { x: 6, y: 0, z: 1 },
      type: "baddie",
    },
    "baddie@6,7,1:1AulfA": {
      config: {
        activated: false,
        startDirection: "towards",
        which: "cyberman",
      },
      position: { x: 6, y: 7, z: 1 },
      type: "baddie",
    },
    "baddie@7,0,1:Z1xC3bd": {
      config: { activated: false, startDirection: "away", which: "cyberman" },
      position: { x: 7, y: 0, z: 1 },
      type: "baddie",
    },
    "baddie@7,7,1:1AulfA": {
      config: {
        activated: false,
        startDirection: "towards",
        which: "cyberman",
      },
      position: { x: 7, y: 7, z: 1 },
      type: "baddie",
    },
    "deadlyBlock@0,0,0:2u1uHB": {
      config: { style: "toaster" },
      position: { x: 0, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@0,7,0:2u1uHB": {
      config: { style: "toaster" },
      position: { x: 0, y: 7, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@1,0,0:2u1uHB": {
      config: { style: "toaster" },
      position: { x: 1, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@1,7,0:2u1uHB": {
      config: { style: "toaster" },
      position: { x: 1, y: 7, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@2,0,0:2u1uHB": {
      config: { style: "toaster" },
      position: { x: 2, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@2,7,0:2u1uHB": {
      config: { style: "toaster" },
      position: { x: 2, y: 7, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@5,0,0:2u1uHB": {
      config: { style: "toaster" },
      position: { x: 5, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@5,7,0:2u1uHB": {
      config: { style: "toaster" },
      position: { x: 5, y: 7, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@6,0,0:2u1uHB": {
      config: { style: "toaster" },
      position: { x: 6, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@6,7,0:2u1uHB": {
      config: { style: "toaster" },
      position: { x: 6, y: 7, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@7,0,0:2u1uHB": {
      config: { style: "toaster" },
      position: { x: 7, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@7,7,0:2u1uHB": {
      config: { style: "toaster" },
      position: { x: 7, y: 7, z: 0 },
      type: "deadlyBlock",
    },
    "door@3,0,0:5CB53": {
      config: { direction: "towards", toRoom: "moonbase23" },
      position: { x: 3, y: 0, z: 0 },
      type: "door",
    },
    "teleporter@3,3,0:1ropAr": {
      config: { toRoom: "egyptus1" },
      position: { x: 3, y: 3, z: 0 },
      type: "teleporter",
    },
    "teleporter@3,4,0:1ropAr": {
      config: { toRoom: "egyptus1" },
      position: { x: 3, y: 4, z: 0 },
      type: "teleporter",
    },
    "teleporter@4,3,0:1ropAr": {
      config: { toRoom: "egyptus1" },
      position: { x: 4, y: 3, z: 0 },
      type: "teleporter",
    },
    "teleporter@4,4,0:1ropAr": {
      config: { toRoom: "egyptus1" },
      position: { x: 4, y: 4, z: 0 },
      type: "teleporter",
    },
    scroll: {
      type: "scroll",
      position: { x: 2, y: 3, z: 0 },
      config: {
        text: `
## EGYPTUS

Once, a long time ago, a craft from Blacktooth got a bit lost while doing a
hyperspace jump and landed on an unknown planet. Here the crew found a primitive
animal forming a sort of civilization that appeared to revolve around wrapping
corpses in lots of bandages and putting them into huge stone pyramids. When they
returned to Blacktooth their emperor liked the sound of it so much that he
rebuilt the capital city of one of the slave planets to resemble the story.

*Head Over Heels Manual*
`,
      }
    }
  },
  planet: "moonbase",
  size: { x: 8, y: 8 },
  walls: {
    away: [
      "window2",
      "window1",
      "coil",
      "window3",
      "window2",
      "coil",
      "window2",
      "window1",
    ],
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
