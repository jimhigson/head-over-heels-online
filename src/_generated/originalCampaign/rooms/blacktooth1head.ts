import type { RoomJson } from "../../../model/modelTypes.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = {
  color: { hue: "yellow", shade: "basic" },
  floor: "jail",
  floorSkip: [],
  id: "blacktooth1head",
  items: {
    "barrier@5,0,0:fbso8": {
      config: { axis: "y", disappearing: false },
      position: { x: 5, y: 0, z: 0 },
      type: "barrier",
    },
    "barrier@5,0,2:fbso8": {
      config: { axis: "y", disappearing: false },
      position: { x: 5, y: 0, z: 2 },
      type: "barrier",
    },
    "barrier@5,0,4:fbso8": {
      config: { axis: "y", disappearing: false },
      position: { x: 5, y: 0, z: 4 },
      type: "barrier",
    },
    "barrier@5,0,6:fbso8": {
      config: { axis: "y", disappearing: false },
      position: { x: 5, y: 0, z: 6 },
      type: "barrier",
    },
    "door@0,3,0:vSkOv": {
      config: { direction: "right", toRoom: "blacktooth23heels" },
      position: { x: 0, y: 3, z: 0 },
      type: "door",
    },
    head: {
      config: { which: "head" },
      position: { x: 3.5, y: 3.5, z: 0 },
      type: "player",
    },
    "pickup@5,0,7:1MkQY2": {
      config: { gives: "extra-life" },
      position: { x: 5, y: 0, z: 7 },
      type: "pickup",
    },
    "teleporter@5,7,0:Z12mRwL": {
      config: { toRoom: "blacktooth2" },
      position: { x: 5, y: 7, z: 0 },
      type: "teleporter",
    },
    "scroll": {
      config: { text: "I'm in jail!", sprites: ["head.walking.towards.2"] },
      position: { x: 3, y: 7, z: 0 },
      type: "scroll",
    },
  },
  planet: "jail",
  size: { x: 6, y: 8 },
  walls: {
    away: ["bars", "bars", "bars", "bars", "bars", "bars"],
    left: ["bars", "bars", "bars", "bars", "bars", "bars", "bars", "bars"],
  },
} satisfies RoomJson<"jail", OriginalCampaignRoomId>;
