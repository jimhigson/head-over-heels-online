import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "green", shade: "basic" },
  id: "bookworld27",
  items: {
    "block@0,0,0": {
      config: { style: "book", times: { z: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "block",
    },
    "block@0,0,3": {
      config: { style: "book" },
      position: { x: 0, y: 0, z: 3 },
      type: "block",
    },
    "door@0,0,4": {
      config: {
        direction: "towards",
        meta: { toSubRoom: "right" },
        toRoom: "bookworld28",
      },
      position: { x: 0, y: 0, z: 4 },
      type: "door",
    },
    "door@0,8,0": {
      config: { direction: "away", toRoom: "bookworld23" },
      position: { x: 0, y: 8, z: 0 },
      type: "door",
    },
    "floor@0,0,0": {
      config: {
        floorType: "standable",
        scenery: "bookworld",
        times: { x: 2, y: 8 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    "wall@0,0,0": {
      config: { direction: "right", times: { y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@2,0,0": {
      config: {
        direction: "left",
        tiles: [
          "book",
          "book",
          "cowboy",
          "book",
          "book",
          "cowboy",
          "book",
          "book",
        ],
        times: { y: 8 },
      },
      position: { x: 2, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "bookworld",
  size: { x: 2, y: 8 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "bookworld">;
