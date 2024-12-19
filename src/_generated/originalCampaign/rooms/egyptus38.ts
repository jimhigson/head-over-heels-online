import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "dimmed" },
  floor: "egyptus",
  id: "egyptus38",
  items: {
    "ball@1,1,3:13y": {
      config: {},
      position: { x: 1, y: 1, z: 3 },
      type: "ball",
    },
    "ball@1,6,3:13y": {
      config: {},
      position: { x: 1, y: 6, z: 3 },
      type: "ball",
    },
    "ball@6,1,3:13y": {
      config: {},
      position: { x: 6, y: 1, z: 3 },
      type: "ball",
    },
    "ball@6,6,3:13y": {
      config: {},
      position: { x: 6, y: 6, z: 3 },
      type: "ball",
    },
    "block@1,1,0:Z1V7JSA": {
      config: { disappearing: false, style: "tower" },
      position: { x: 1, y: 1, z: 0 },
      type: "block",
    },
    "block@1,1,1:Z1V7JSA": {
      config: { disappearing: false, style: "tower" },
      position: { x: 1, y: 1, z: 1 },
      type: "block",
    },
    "block@1,1,2:Z1V7JSA": {
      config: { disappearing: false, style: "tower" },
      position: { x: 1, y: 1, z: 2 },
      type: "block",
    },
    "block@1,6,0:Z1V7JSA": {
      config: { disappearing: false, style: "tower" },
      position: { x: 1, y: 6, z: 0 },
      type: "block",
    },
    "block@1,6,1:Z1V7JSA": {
      config: { disappearing: false, style: "tower" },
      position: { x: 1, y: 6, z: 1 },
      type: "block",
    },
    "block@1,6,2:Z1V7JSA": {
      config: { disappearing: false, style: "tower" },
      position: { x: 1, y: 6, z: 2 },
      type: "block",
    },
    "block@6,1,0:Z1V7JSA": {
      config: { disappearing: false, style: "tower" },
      position: { x: 6, y: 1, z: 0 },
      type: "block",
    },
    "block@6,1,1:Z1V7JSA": {
      config: { disappearing: false, style: "tower" },
      position: { x: 6, y: 1, z: 1 },
      type: "block",
    },
    "block@6,1,2:Z1V7JSA": {
      config: { disappearing: false, style: "tower" },
      position: { x: 6, y: 1, z: 2 },
      type: "block",
    },
    "block@6,6,0:Z1V7JSA": {
      config: { disappearing: false, style: "tower" },
      position: { x: 6, y: 6, z: 0 },
      type: "block",
    },
    "block@6,6,1:Z1V7JSA": {
      config: { disappearing: false, style: "tower" },
      position: { x: 6, y: 6, z: 1 },
      type: "block",
    },
    "block@6,6,2:Z1V7JSA": {
      config: { disappearing: false, style: "tower" },
      position: { x: 6, y: 6, z: 2 },
      type: "block",
    },
    "door@0,3,0:2rMF4o": {
      config: { direction: "right", toRoom: "egyptus37" },
      position: { x: 0, y: 3, z: 0 },
      type: "door",
    },
    "door@8,3,0:t6z6k": {
      config: { direction: "left", toRoom: "egyptus39crown" },
      position: { x: 8, y: 3, z: 0 },
      type: "door",
    },
    scroll: {
      config: {
        gives: "scroll",
        markdown: `
## Exalted Emperor:

![](teleporter)Sire, I took the liberty of installing this teleporter 
to aid your magnificent return to the moonbase after the daily crown inspections.

![](cyberman.towards) Supplies are running short of teleporters, so I set it up one-way
until more come in.
May I humbly suggest you teleport after inspecting the crown or his grace
will have a long walk (well, ride on a minion’s back) to get back here.

Of course, those two spies we threw in jail might try to use it to grab the crown and escape.
Just kidding, they’ll never get this far!

*> Your humble minion*
`,
      },
      position: { x: 5, y: 6, z: 6 },
      type: "pickup",
    },
    "teleporter@3,3,0:1roqmH": {
      config: { toRoom: "egyptus4" },
      position: { x: 3, y: 3, z: 0 },
      type: "teleporter",
    },
    "teleporter@3,4,0:1roqmH": {
      config: { toRoom: "egyptus4" },
      position: { x: 3, y: 4, z: 0 },
      type: "teleporter",
    },
    "teleporter@4,3,0:1roqmH": {
      config: { toRoom: "egyptus4" },
      position: { x: 4, y: 3, z: 0 },
      type: "teleporter",
    },
    "teleporter@4,4,0:1roqmH": {
      config: { toRoom: "egyptus4" },
      position: { x: 4, y: 4, z: 0 },
      type: "teleporter",
    },
  },
  planet: "egyptus",
  size: { x: 8, y: 8 },
  walls: {
    away: [
      "hieroglyphics",
      "hieroglyphics",
      "sarcophagus",
      "hieroglyphics",
      "hieroglyphics",
      "sarcophagus",
      "hieroglyphics",
      "hieroglyphics",
    ],
    left: [
      "hieroglyphics",
      "sarcophagus",
      "hieroglyphics",
      "none",
      "none",
      "hieroglyphics",
      "sarcophagus",
      "hieroglyphics",
    ],
  },
}) satisfies RoomJson<"egyptus", OriginalCampaignRoomId>;
