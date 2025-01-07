import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "dimmed" },
  floor: "safari",
  id: "safari34",
  items: {
    "block@4,0,3": {
      config: { disappearing: false, style: "organic" },
      position: { x: 4, y: 0, z: 3 },
      type: "block",
    },
    "block@4,1,3": {
      config: { disappearing: false, style: "organic" },
      position: { x: 4, y: 1, z: 3 },
      type: "block",
    },
    "block@4,2,3": {
      config: { disappearing: false, style: "organic" },
      position: { x: 4, y: 2, z: 3 },
      type: "block",
    },
    "block@4,3,3": {
      config: { disappearing: false, style: "organic" },
      position: { x: 4, y: 3, z: 3 },
      type: "block",
    },
    "block@4,4,3": {
      config: { disappearing: false, style: "organic" },
      position: { x: 4, y: 4, z: 3 },
      type: "block",
    },
    "block@4,5,3": {
      config: { disappearing: false, style: "organic" },
      position: { x: 4, y: 5, z: 3 },
      type: "block",
    },
    "block@4,6,3": {
      config: { disappearing: false, style: "organic" },
      position: { x: 4, y: 6, z: 3 },
      type: "block",
    },
    "block@4,7,3": {
      config: { disappearing: false, style: "organic" },
      position: { x: 4, y: 7, z: 3 },
      type: "block",
    },
    "deadlyBlock@4,0,0": {
      config: { style: "volcano" },
      position: { x: 4, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@4,1,0": {
      config: { style: "volcano" },
      position: { x: 4, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@4,2,0": {
      config: { style: "volcano" },
      position: { x: 4, y: 2, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@4,3,0": {
      config: { style: "volcano" },
      position: { x: 4, y: 3, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@4,4,0": {
      config: { style: "volcano" },
      position: { x: 4, y: 4, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@4,5,0": {
      config: { style: "volcano" },
      position: { x: 4, y: 5, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@4,6,0": {
      config: { style: "volcano" },
      position: { x: 4, y: 6, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@4,7,0": {
      config: { style: "volcano" },
      position: { x: 4, y: 7, z: 0 },
      type: "deadlyBlock",
    },
    "door@0,3,0": {
      config: { direction: "right", toRoom: "safari33" },
      position: { x: 0, y: 3, z: 0 },
      type: "door",
    },
    "lift@7,7,0": {
      config: { bottom: 0, top: 11 },
      position: { x: 7, y: 7, z: 0 },
      type: "lift",
    },
    "portableBlock@1,0,0": {
      config: { style: "drum" },
      position: { x: 1, y: 0, z: 0 },
      type: "portableBlock",
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
      position: { x: 3, y: 6, z: 0 },
      type: "pickup",
    },
    "teleporter@3,3,0": {
      config: { toRoom: "safari1" },
      position: { x: 3, y: 3, z: 0 },
      type: "teleporter",
    },
    "teleporter@3,4,0": {
      config: { toRoom: "safari1" },
      position: { x: 3, y: 4, z: 0 },
      type: "teleporter",
    },
  },
  planet: "safari",
  roomAbove: "safari35",
  size: { x: 8, y: 8 },
  walls: {
    away: [
      "wall",
      "window",
      "wall",
      "shield",
      "shield",
      "wall",
      "window",
      "wall",
    ],
    left: [
      "wall",
      "window",
      "wall",
      "shield",
      "shield",
      "wall",
      "window",
      "wall",
    ],
  },
}) satisfies RoomJson<"safari", OriginalCampaignRoomId>;
