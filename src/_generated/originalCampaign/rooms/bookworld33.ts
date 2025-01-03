import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "dimmed" },
  floor: "bookworld",
  id: "bookworld33",
  items: {
    "door@0,3,0:286Ck6": {
      config: { direction: "right", toRoom: "bookworld35" },
      position: { x: 0, y: 3, z: 0 },
      type: "door",
    },
    "door@3,8,4:ZXTKrI": {
      config: { direction: "away", toRoom: "bookworld34" },
      position: { x: 3, y: 8, z: 4 },
      type: "door",
    },
    "hushPuppy@1,7,0:13y": {
      config: {},
      position: { x: 1, y: 7, z: 0 },
      type: "hushPuppy",
    },
    "hushPuppy@2,7,1:13y": {
      config: {},
      position: { x: 2, y: 7, z: 1 },
      type: "hushPuppy",
    },
    "hushPuppy@3,7,2:13y": {
      config: {},
      position: { x: 3, y: 7, z: 2 },
      type: "hushPuppy",
    },
  },
  planet: "bookworld",
  roomAbove: "bookworld32",
  size: { x: 8, y: 8 },
  walls: {
    away: ["book", "book", "person", "none", "none", "person", "book", "book"],
    left: ["book", "book", "person", "book", "book", "person", "book", "book"],
  },
}) satisfies RoomJson<"bookworld", OriginalCampaignRoomId>;
