import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "blacktooth",
  id: "blacktooth14",
  items: {
    "baddie@7,2,0:ZazYQL": {
      config: {
        activated: true,
        movement: "patrol-randomly-xy8",
        which: "helicopter-bug",
      },
      position: { x: 7, y: 2, z: 0 },
      type: "baddie",
    },
    "barrier@4,0,0:fbso8": {
      config: { axis: "y", disappearing: false },
      position: { x: 4, y: 0, z: 0 },
      type: "barrier",
    },
    "barrier@4,0,1:fbso8": {
      config: { axis: "y", disappearing: false },
      position: { x: 4, y: 0, z: 1 },
      type: "barrier",
    },
    "barrier@4,0,2:fbso8": {
      config: { axis: "y", disappearing: false },
      position: { x: 4, y: 0, z: 2 },
      type: "barrier",
    },
    "barrier@4,1,0:fbso8": {
      config: { axis: "y", disappearing: false },
      position: { x: 4, y: 1, z: 0 },
      type: "barrier",
    },
    "barrier@4,1,1:FtFCK": {
      config: { axis: "y", disappearing: true },
      position: { x: 4, y: 1, z: 1 },
      type: "barrier",
    },
    "barrier@4,1,2:fbso8": {
      config: { axis: "y", disappearing: false },
      position: { x: 4, y: 1, z: 2 },
      type: "barrier",
    },
    "barrier@4,2,0:fbso8": {
      config: { axis: "y", disappearing: false },
      position: { x: 4, y: 2, z: 0 },
      type: "barrier",
    },
    "barrier@4,2,1:fbso8": {
      config: { axis: "y", disappearing: false },
      position: { x: 4, y: 2, z: 1 },
      type: "barrier",
    },
    "barrier@4,2,2:fbso8": {
      config: { axis: "y", disappearing: false },
      position: { x: 4, y: 2, z: 2 },
      type: "barrier",
    },
    "barrier@4,3,0:fbso8": {
      config: { axis: "y", disappearing: false },
      position: { x: 4, y: 3, z: 0 },
      type: "barrier",
    },
    "barrier@4,3,1:fbso8": {
      config: { axis: "y", disappearing: false },
      position: { x: 4, y: 3, z: 1 },
      type: "barrier",
    },
    "barrier@4,3,2:fbso8": {
      config: { axis: "y", disappearing: false },
      position: { x: 4, y: 3, z: 2 },
      type: "barrier",
    },
    "barrier@4,4,0:fbso8": {
      config: { axis: "y", disappearing: false },
      position: { x: 4, y: 4, z: 0 },
      type: "barrier",
    },
    "barrier@4,4,1:fbso8": {
      config: { axis: "y", disappearing: false },
      position: { x: 4, y: 4, z: 1 },
      type: "barrier",
    },
    "barrier@4,4,2:fbso8": {
      config: { axis: "y", disappearing: false },
      position: { x: 4, y: 4, z: 2 },
      type: "barrier",
    },
    "barrier@4,5,0:fbso8": {
      config: { axis: "y", disappearing: false },
      position: { x: 4, y: 5, z: 0 },
      type: "barrier",
    },
    "barrier@4,5,1:fbso8": {
      config: { axis: "y", disappearing: false },
      position: { x: 4, y: 5, z: 1 },
      type: "barrier",
    },
    "barrier@4,5,2:fbso8": {
      config: { axis: "y", disappearing: false },
      position: { x: 4, y: 5, z: 2 },
      type: "barrier",
    },
    "door@0,2,0:uMsoG": {
      config: { direction: "right", toRoom: "blacktooth13" },
      position: { x: 0, y: 2, z: 0 },
      type: "door",
    },
    "pickup@7,1,0:Z2prF0G": {
      config: { gives: "donuts" },
      position: { x: 7, y: 1, z: 0 },
      type: "pickup",
    },
    "pickup@7,4,0:Zu0Fv": {
      config: { gives: "fast" },
      position: { x: 7, y: 4, z: 0 },
      type: "pickup",
    },
  },
  planet: "blacktooth",
  size: { x: 8, y: 6 },
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
    left: ["plain", "armour", "shield", "shield", "armour", "plain"],
  },
}) satisfies RoomJson<"blacktooth", OriginalCampaignRoomId>;
