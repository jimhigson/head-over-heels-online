import type { RoomJson } from "../../../model/modelTypes.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = {
  color: { hue: "green", shade: "basic" },
  floor: "blacktooth",
  floorSkip: [],
  id: "blacktooth37",
  items: {
    "baddie@0,5,0:Z2jz06D": {
      config: {
        activated: true,
        startDirection: "right",
        style: "starsAndStripes",
        which: "american-football-head",
      },
      position: { x: 0, y: 5, z: 0 },
      type: "baddie",
    },
    "baddie@2,4,0:ZiWCzO": {
      config: {
        activated: true,
        startDirection: "right",
        style: "greenAndPink",
        which: "american-football-head",
      },
      position: { x: 2, y: 4, z: 0 },
      type: "baddie",
    },
    "baddie@3,3,0:Z2jz06D": {
      config: {
        activated: true,
        startDirection: "right",
        style: "starsAndStripes",
        which: "american-football-head",
      },
      position: { x: 3, y: 3, z: 0 },
      type: "baddie",
    },
    "ball@0,1,0:13y": {
      config: {},
      position: { x: 0, y: 1, z: 0 },
      type: "ball",
    },
    "door@1,0,0:Z1V7TCt": {
      config: { direction: "towards", toRoom: "blacktooth36" },
      position: { x: 1, y: 0, z: 0 },
      type: "door",
    },
    "door@1,8,0:xRwWV": {
      config: { direction: "away", toRoom: "blacktooth38" },
      position: { x: 1, y: 8, z: 0 },
      type: "door",
    },
    "switch@0,7,0:V4krG": {
      config: {
        activates: {
          "baddie@0,5,0:Z2jz06D": {
            left: { activated: true },
            right: { activated: false },
          },
          "baddie@2,4,0:ZiWCzO": {
            left: { activated: true },
            right: { activated: false },
          },
          "baddie@3,3,0:Z2jz06D": {
            left: { activated: true },
            right: { activated: false },
          },
        },
      },
      position: { x: 0, y: 7, z: 0 },
      type: "switch",
    },
  },
  planet: "blacktooth",
  size: { x: 4, y: 8 },
  walls: {
    away: ["shield", "none", "none", "shield"],
    left: [
      "plain",
      "armour",
      "plain",
      "shield",
      "shield",
      "plain",
      "armour",
      "plain",
    ],
  },
} satisfies RoomJson<"blacktooth", OriginalCampaignRoomId>;
