import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  floor: "none",
  id: "bookworld39",
  items: {
    "conveyor@0,0,0": {
      config: { direction: "left" },
      position: { x: 0, y: 0, z: 0 },
      type: "conveyor",
    },
    "conveyor@1,0,0": {
      config: { direction: "left" },
      position: { x: 1, y: 0, z: 0 },
      type: "conveyor",
    },
    "conveyor@2,0,0": {
      config: { direction: "left" },
      position: { x: 2, y: 0, z: 0 },
      type: "conveyor",
    },
    "conveyor@3,0,0": {
      config: { direction: "left" },
      position: { x: 3, y: 0, z: 0 },
      type: "conveyor",
    },
    "conveyor@4,0,0": {
      config: { direction: "left" },
      position: { x: 4, y: 0, z: 0 },
      type: "conveyor",
    },
    "conveyor@5,0,0": {
      config: { direction: "left" },
      position: { x: 5, y: 0, z: 0 },
      type: "conveyor",
    },
    "conveyor@6,0,0": {
      config: { direction: "left" },
      position: { x: 6, y: 0, z: 0 },
      type: "conveyor",
    },
    "conveyor@7,0,0": {
      config: { direction: "away" },
      position: { x: 7, y: 0, z: 0 },
      type: "conveyor",
    },
    "conveyor@7,1,0": {
      config: { direction: "away" },
      position: { x: 7, y: 1, z: 0 },
      type: "conveyor",
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
      position: { x: 0, y: 0, z: 10 },
      type: "pickup",
    },
    "teleporter@7,3,0": {
      config: { toRoom: "bookworld1" },
      position: { x: 7, y: 3, z: 0 },
      type: "teleporter",
    },
    "teleporter@7,4,0": {
      config: { toRoom: "bookworld1" },
      position: { x: 7, y: 4, z: 0 },
      type: "teleporter",
    },
  },
  planet: "bookworld",
  roomAbove: "bookworld38",
  roomBelow: "bookworld40",
  size: { x: 8, y: 8 },
  walls: {
    away: ["book", "book", "person", "book", "book", "person", "book", "book"],
    left: ["book", "book", "person", "book", "book", "person", "book", "book"],
  },
}) satisfies RoomJson<"bookworld", OriginalCampaignRoomId>;
