import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "dimmed" },
  floor: "penitentiary",
  id: "penitentiary33",
  items: {
    "ball@1,1,3": { config: {}, position: { x: 1, y: 1, z: 3 }, type: "ball" },
    "ball@1,6,3": { config: {}, position: { x: 1, y: 6, z: 3 }, type: "ball" },
    "ball@6,1,3": { config: {}, position: { x: 6, y: 1, z: 3 }, type: "ball" },
    "ball@6,6,3": { config: {}, position: { x: 6, y: 6, z: 3 }, type: "ball" },
    "block@1,1,0": {
      config: { disappearing: false, style: "tower" },
      position: { x: 1, y: 1, z: 0 },
      type: "block",
    },
    "block@1,1,1": {
      config: { disappearing: false, style: "tower" },
      position: { x: 1, y: 1, z: 1 },
      type: "block",
    },
    "block@1,1,2": {
      config: { disappearing: false, style: "tower" },
      position: { x: 1, y: 1, z: 2 },
      type: "block",
    },
    "block@1,6,0": {
      config: { disappearing: false, style: "tower" },
      position: { x: 1, y: 6, z: 0 },
      type: "block",
    },
    "block@1,6,1": {
      config: { disappearing: false, style: "tower" },
      position: { x: 1, y: 6, z: 1 },
      type: "block",
    },
    "block@1,6,2": {
      config: { disappearing: false, style: "tower" },
      position: { x: 1, y: 6, z: 2 },
      type: "block",
    },
    "block@6,1,0": {
      config: { disappearing: false, style: "tower" },
      position: { x: 6, y: 1, z: 0 },
      type: "block",
    },
    "block@6,1,1": {
      config: { disappearing: false, style: "tower" },
      position: { x: 6, y: 1, z: 1 },
      type: "block",
    },
    "block@6,1,2": {
      config: { disappearing: false, style: "tower" },
      position: { x: 6, y: 1, z: 2 },
      type: "block",
    },
    "block@6,6,0": {
      config: { disappearing: false, style: "tower" },
      position: { x: 6, y: 6, z: 0 },
      type: "block",
    },
    "block@6,6,1": {
      config: { disappearing: false, style: "tower" },
      position: { x: 6, y: 6, z: 1 },
      type: "block",
    },
    "block@6,6,2": {
      config: { disappearing: false, style: "tower" },
      position: { x: 6, y: 6, z: 2 },
      type: "block",
    },
    "door@3,0,0": {
      config: { direction: "towards", toRoom: "penitentiary34crown" },
      position: { x: 3, y: 0, z: 0 },
      type: "door",
    },
    "door@3,8,0": {
      config: { direction: "away", toRoom: "penitentiary32" },
      position: { x: 3, y: 8, z: 0 },
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
      position: { x: 5, y: 6, z: 2 },
      type: "pickup",
    },
    "teleporter@0,3,0": {
      config: { toRoom: "penitentiary2" },
      position: { x: 0, y: 3, z: 0 },
      type: "teleporter",
    },
    "teleporter@0,4,0": {
      config: { toRoom: "penitentiary2" },
      position: { x: 0, y: 4, z: 0 },
      type: "teleporter",
    },
    "teleporter@1,3,0": {
      config: { toRoom: "penitentiary2" },
      position: { x: 1, y: 3, z: 0 },
      type: "teleporter",
    },
    "teleporter@1,4,0": {
      config: { toRoom: "penitentiary2" },
      position: { x: 1, y: 4, z: 0 },
      type: "teleporter",
    },
  },
  planet: "penitentiary",
  size: { x: 8, y: 8 },
  walls: {
    away: [
      "loop",
      "skeleton",
      "loop",
      "none",
      "none",
      "loop",
      "skeleton",
      "loop",
    ],
    left: [
      "loop",
      "loop",
      "skeleton",
      "loop",
      "loop",
      "skeleton",
      "loop",
      "loop",
    ],
  },
}) satisfies RoomJson<"penitentiary", OriginalCampaignRoomId>;
