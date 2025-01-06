import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "dimmed" },
  floor: "deadly",
  id: "blacktooth6",
  items: {
    "baddie@3,0,1:Z2awALk": {
      config: {
        activated: true,
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 3, y: 0, z: 1 },
      type: "baddie",
    },
    "block@0,0,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 0, y: 0, z: 0 },
      type: "block",
    },
    "block@0,3,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 0, y: 3, z: 0 },
      type: "block",
    },
    "block@0,4,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 0, y: 4, z: 0 },
      type: "block",
    },
    "block@0,7,0:Z1AdJxh": {
      config: { disappearing: true, style: "organic" },
      position: { x: 0, y: 7, z: 0 },
      type: "block",
    },
    "block@3,0,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 3, y: 0, z: 0 },
      type: "block",
    },
    "block@3,7,0:Z1AdJxh": {
      config: { disappearing: true, style: "organic" },
      position: { x: 3, y: 7, z: 0 },
      type: "block",
    },
    "block@6,0,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 6, y: 0, z: 0 },
      type: "block",
    },
    "block@7,7,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 7, y: 7, z: 0 },
      type: "block",
    },
    "door@0,3,1:b0091": {
      config: { direction: "right", toRoom: "blacktooth5" },
      position: { x: 0, y: 3, z: 1 },
      type: "door",
    },
    "pickup@7,7,1:Z2prF0G": {
      config: { gives: "donuts" },
      position: { x: 7, y: 7, z: 1 },
      type: "pickup",
    },
    scroll: {
      config: {
        gives: "scroll",
        markdown: `
## DOUGHNUTS

![](donuts)Trays of six doughnuts are few and far between, so don’t waste shots. Only Head
may pick up doughnuts. The number of remaining doughnuts will be displayed above
the doughnut icon at the bottom left of the screen.

*> Head Over Heels Manual*
`,
      },
      position: { x: 2, y: 3, z: 1 },
      type: "pickup",
    },
    scrollBlock: {
      config: { disappearing: false, style: "organic" },
      position: { x: 2, y: 3, z: 0 },
      type: "block",
    },
    "switch@6,0,1:V4krG": {
      config: {
        activates: {
          "baddie@3,0,1:Z2awALk": {
            left: { activated: true },
            right: { activated: false },
          },
          "block@0,7,0:Z1AdJxh": {
            left: { disappear: "onStand" },
            right: { disappear: null },
          },
          "block@3,7,0:Z1AdJxh": {
            left: { disappear: "onStand" },
            right: { disappear: null },
          },
        },
      },
      position: { x: 6, y: 0, z: 1 },
      type: "switch",
    },
  },
  planet: "blacktooth",
  size: { x: 8, y: 8 },
  walls: {
    away: [
      "plain",
      "armour",
      "plain",
      "shield",
      "shield",
      "plain",
      "armour",
      "plain",
    ],
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
}) satisfies RoomJson<"blacktooth", OriginalCampaignRoomId>;
