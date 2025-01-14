import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  floor: "deadly",
  id: "moonbase10",
  items: {
    "block@0,3,3": {
      config: { style: "artificial" },
      position: { x: 0, y: 3, z: 3 },
      type: "block",
    },
    "block@0,7,3": {
      config: { style: "artificial" },
      position: { x: 0, y: 7, z: 3 },
      type: "block",
    },
    "block@0,7,5": {
      config: { style: "artificial" },
      position: { x: 0, y: 7, z: 5 },
      type: "block",
    },
    "block@4,7,3": {
      config: { style: "artificial" },
      position: { x: 4, y: 7, z: 3 },
      type: "block",
    },
    "deadlyBlock@0,7,6": {
      config: { style: "toaster" },
      position: { x: 0, y: 7, z: 6 },
      type: "deadlyBlock",
    },
    "door@0,3,5": {
      config: { direction: "right", toRoom: "moonbase9" },
      position: { x: 0, y: 3, z: 5 },
      type: "door",
    },
    "door@3,8,5": {
      config: { direction: "away", toRoom: "moonbase11" },
      position: { x: 3, y: 8, z: 5 },
      type: "door",
    },
  },
  planet: "moonbase",
  size: { x: 8, y: 8 },
  walls: {
    away: [
      "window3",
      "coil",
      "window2",
      "none",
      "none",
      "window2",
      "coil",
      "window1",
    ],
    left: [
      "window3",
      "window1",
      "coil",
      "window2",
      "window3",
      "coil",
      "window3",
      "window1",
    ],
  },
}) satisfies RoomJson<"moonbase", OriginalCampaignRoomId>;
