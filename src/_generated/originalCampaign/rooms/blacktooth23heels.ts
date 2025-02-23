import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "basic" },
  floor: "jail",
  id: "blacktooth23heels",
  items: {
    "barrier@4,0,0": {
      config: { axis: "y", times: { y: 8, z: 3 } },
      position: { x: 4, y: 0, z: 0 },
      type: "barrier",
    },
    "conveyor@0,1,0": {
      config: { direction: "away", times: { y: 6 } },
      position: { x: 0, y: 1, z: 0 },
      type: "conveyor",
    },
    "deadlyBlock@0,7,0": {
      config: { style: "volcano" },
      position: { x: 0, y: 7, z: 0 },
      type: "deadlyBlock",
    },
    "door@8,3,0": {
      config: { direction: "left", toRoom: "blacktooth1head" },
      position: { x: 8, y: 3, z: 0 },
      type: "door",
    },
    heels: {
      config: { which: "heels" },
      position: { x: 3, y: 3.5, z: 0 },
      type: "player",
    },
    scroll: {
      config: { gives: "scroll", page: "head" },
      isExtra: true,
      position: { x: 7, y: 1, z: 0 },
      type: "pickup",
    },
    scroll2: {
      config: { gives: "scroll", page: "heels" },
      isExtra: true,
      position: { x: 3, y: 7, z: 0 },
      type: "pickup",
    },
    "teleporter@0,0,0": {
      config: { toPosition: { x: 0, y: 0, z: 0 }, toRoom: "blacktooth24" },
      position: { x: 0, y: 0, z: 0 },
      type: "teleporter",
    },
  },
  planet: "jail",
  size: { x: 8, y: 8 },
  walls: {
    away: ["bars", "bars", "bars", "bars", "bars", "bars", "bars", "bars"],
    left: ["bars", "bars", "bars", "none", "none", "bars", "bars", "bars"],
  },
}) satisfies RoomJson<"jail", OriginalCampaignRoomId>;
