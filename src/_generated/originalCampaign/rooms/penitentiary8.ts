import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "penitentiary",
  id: "penitentiary8",
  items: {
    "block@0,4,7:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 0, y: 4, z: 7 },
      type: "block",
    },
    "block@0,5,6:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 0, y: 5, z: 6 },
      type: "block",
    },
    "block@0,6,4:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 0, y: 6, z: 4 },
      type: "block",
    },
    "block@0,7,4:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 0, y: 7, z: 4 },
      type: "block",
    },
    "block@1,2,2:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 1, y: 2, z: 2 },
      type: "block",
    },
    "door@0,0,0:1sSJ8O": {
      config: { direction: "towards", toRoom: "penitentiary7" },
      position: { x: 0, y: 0, z: 0 },
      type: "door",
    },
    "portableBlock@1,2,0:Z1SKpmn": {
      config: { style: "drum" },
      position: { x: 1, y: 2, z: 0 },
      type: "portableBlock",
    },
    "portableBlock@1,2,1:Z1SKpmn": {
      config: { style: "drum" },
      position: { x: 1, y: 2, z: 1 },
      type: "portableBlock",
    },
    "portableBlock@1,2,3:Z1SKpmn": {
      config: { style: "drum" },
      position: { x: 1, y: 2, z: 3 },
      type: "portableBlock",
    },
  },
  planet: "penitentiary",
  roomAbove: "penitentiary9",
  size: { x: 2, y: 8 },
  walls: {
    away: ["loop", "loop"],
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
