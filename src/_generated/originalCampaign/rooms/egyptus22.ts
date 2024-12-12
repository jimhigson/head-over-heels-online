import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "magenta", shade: "basic" },
  floor: "egyptus",
  floorSkip: [],
  id: "egyptus22",
  items: {
    "baddie@4,0,0:Z1rA6U9": {
      config: { activated: true, which: "dalek" },
      position: { x: 4, y: 0, z: 0 },
      type: "baddie",
    },
    "baddie@4,2,0:ZVblgD": {
      config: { activated: true, which: "helicopter-bug" },
      position: { x: 4, y: 2, z: 0 },
      type: "baddie",
    },
    "barrier@2,2,0:fbso8": {
      config: { axis: "y", disappearing: false },
      position: { x: 2, y: 2, z: 0 },
      type: "barrier",
    },
    "barrier@2,2,1:fbso8": {
      config: { axis: "y", disappearing: false },
      position: { x: 2, y: 2, z: 1 },
      type: "barrier",
    },
    "barrier@2,2,2:fbso8": {
      config: { axis: "y", disappearing: false },
      position: { x: 2, y: 2, z: 2 },
      type: "barrier",
    },
    "barrier@2,3,0:fbso8": {
      config: { axis: "y", disappearing: false },
      position: { x: 2, y: 3, z: 0 },
      type: "barrier",
    },
    "barrier@2,3,1:fbso8": {
      config: { axis: "y", disappearing: false },
      position: { x: 2, y: 3, z: 1 },
      type: "barrier",
    },
    "barrier@2,3,2:fbso8": {
      config: { axis: "y", disappearing: false },
      position: { x: 2, y: 3, z: 2 },
      type: "barrier",
    },
    "barrier@2,4,0:fbso8": {
      config: { axis: "y", disappearing: false },
      position: { x: 2, y: 4, z: 0 },
      type: "barrier",
    },
    "barrier@2,4,1:fbso8": {
      config: { axis: "y", disappearing: false },
      position: { x: 2, y: 4, z: 1 },
      type: "barrier",
    },
    "barrier@2,4,2:fbso8": {
      config: { axis: "y", disappearing: false },
      position: { x: 2, y: 4, z: 2 },
      type: "barrier",
    },
    "barrier@2,5,0:fbso8": {
      config: { axis: "y", disappearing: false },
      position: { x: 2, y: 5, z: 0 },
      type: "barrier",
    },
    "barrier@2,5,1:fbso8": {
      config: { axis: "y", disappearing: false },
      position: { x: 2, y: 5, z: 1 },
      type: "barrier",
    },
    "barrier@2,5,2:fbso8": {
      config: { axis: "y", disappearing: false },
      position: { x: 2, y: 5, z: 2 },
      type: "barrier",
    },
    "door@0,2,0:2rMvvu": {
      config: { direction: "right", toRoom: "egyptus21" },
      position: { x: 0, y: 2, z: 0 },
      type: "door",
    },
    "door@3,6,0:Z1yHXKU": {
      config: { direction: "away", toRoom: "egyptus23" },
      position: { x: 3, y: 6, z: 0 },
      type: "door",
    },
  },
  planet: "egyptus",
  size: { x: 8, y: 6 },
  walls: {
    away: [
      "hieroglyphics",
      "sarcophagus",
      "hieroglyphics",
      "none",
      "none",
      "hieroglyphics",
      "sarcophagus",
      "hieroglyphics",
    ],
    left: [
      "hieroglyphics",
      "sarcophagus",
      "hieroglyphics",
      "hieroglyphics",
      "sarcophagus",
      "hieroglyphics",
    ],
  },
}) satisfies RoomJson<"egyptus", OriginalCampaignRoomId>;
