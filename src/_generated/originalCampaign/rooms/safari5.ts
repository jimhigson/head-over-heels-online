import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "dimmed" },
  floor: "safari",
  id: "safari5",
  items: {
    "door@0,1,0": {
      config: { direction: "right", toRoom: "safari4" },
      position: { x: 0, y: 1, z: 0 },
      type: "door",
    },
    "door@8,1,4": {
      config: { direction: "left", toRoom: "safari6triple" },
      position: { x: 8, y: 1, z: 4 },
      type: "door",
    },
    "hushPuppy@5,1,0": {
      config: {},
      position: { x: 5, y: 1, z: 0 },
      type: "hushPuppy",
    },
    "hushPuppy@5,2,0": {
      config: {},
      position: { x: 5, y: 2, z: 0 },
      type: "hushPuppy",
    },
    "hushPuppy@6,1,1": {
      config: {},
      position: { x: 6, y: 1, z: 1 },
      type: "hushPuppy",
    },
    "hushPuppy@6,2,1": {
      config: {},
      position: { x: 6, y: 2, z: 1 },
      type: "hushPuppy",
    },
    "hushPuppy@7,1,2": {
      config: {},
      position: { x: 7, y: 1, z: 2 },
      type: "hushPuppy",
    },
    "hushPuppy@7,2,2": {
      config: {},
      position: { x: 7, y: 2, z: 2 },
      type: "hushPuppy",
    },
  },
  planet: "safari",
  size: { x: 8, y: 4 },
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
    left: ["wall", "none", "none", "wall"],
  },
}) satisfies RoomJson<"safari", OriginalCampaignRoomId>;
