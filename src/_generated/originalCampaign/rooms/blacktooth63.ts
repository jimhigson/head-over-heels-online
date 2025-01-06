import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "basic" },
  floor: "bookworld",
  id: "blacktooth63",
  items: {
    "baddie@4,1,0:ZazYQL": {
      config: {
        activated: true,
        movement: "patrol-randomly-xy8",
        which: "helicopter-bug",
      },
      position: { x: 4, y: 1, z: 0 },
      type: "baddie",
    },
    "block@6,0,3:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 6, y: 0, z: 3 },
      type: "block",
    },
    "block@6,1,3:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 6, y: 1, z: 3 },
      type: "block",
    },
    "block@7,0,3:8iyRr": {
      config: { disappearing: true, style: "artificial" },
      position: { x: 7, y: 0, z: 3 },
      type: "block",
    },
    "block@7,1,3:8iyRr": {
      config: { disappearing: true, style: "artificial" },
      position: { x: 7, y: 1, z: 3 },
      type: "block",
    },
    "door@0,0,0:uN0XI": {
      config: { direction: "right", toRoom: "blacktooth59" },
      position: { x: 0, y: 0, z: 0 },
      type: "door",
    },
    "door@8,0,5:Z19nuqW": {
      config: { direction: "left", toRoom: "blacktooth62fish" },
      position: { x: 8, y: 0, z: 5 },
      type: "door",
    },
    "hushPuppy@3,0,0:13y": {
      config: {},
      position: { x: 3, y: 0, z: 0 },
      type: "hushPuppy",
    },
    "hushPuppy@3,1,0:13y": {
      config: {},
      position: { x: 3, y: 1, z: 0 },
      type: "hushPuppy",
    },
    "hushPuppy@4,0,1:13y": {
      config: {},
      position: { x: 4, y: 0, z: 1 },
      type: "hushPuppy",
    },
    "hushPuppy@4,1,1:13y": {
      config: {},
      position: { x: 4, y: 1, z: 1 },
      type: "hushPuppy",
    },
    "hushPuppy@5,0,2:13y": {
      config: {},
      position: { x: 5, y: 0, z: 2 },
      type: "hushPuppy",
    },
    "hushPuppy@5,1,2:13y": {
      config: {},
      position: { x: 5, y: 1, z: 2 },
      type: "hushPuppy",
    },
    "pickup@5,1,3:Zs6lvR": {
      config: { gives: "jumps" },
      position: { x: 5, y: 1, z: 3 },
      type: "pickup",
    },
  },
  planet: "jail",
  size: { x: 8, y: 2 },
  walls: {
    away: ["bars", "bars", "bars", "bars", "bars", "bars", "bars", "bars"],
    left: ["none", "none"],
  },
}) satisfies RoomJson<"jail", OriginalCampaignRoomId>;
