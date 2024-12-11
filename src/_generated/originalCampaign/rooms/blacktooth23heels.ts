import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "basic" },
  floor: "jail",
  floorSkip: [],
  id: "blacktooth23heels",
  items: {

    heels: {
      type: "player",
      position: { x: 0, y: 0, z: 1 },
      config: {
        which: "heels",
      },
    },
    disappearingBlock0: {
      type: "block",
      position: { x: 0, y: 0, z: 0 },
      config: {
        style: "organic",
        disappearing: true,
      },
    },
    disappearingBlock1: {
      type: "block",
      position: { x: 0, y: 1, z: 0 },
      config: {
        style: "organic",
        disappearing: true,
      },
    },
    disappearingBlock2: {
      type: "block",
      position: { x: 0, y: 2, z: 0 },
      config: {
        style: "organic",
        disappearing: true,
      },
    },
    disappearingBlock3: {
      type: "block",
      position: { x: 0, y: 3, z: 0 },
      config: {
        style: "organic",
        disappearing: true,
      },
    },
    pickup: {
      type: "pickup",
      position: { x: 0, y: 4, z: 2 },
      config: {
        gives: "extra-life",
      },
    },

  },
  planet: "jail",
  size: { x: 8, y: 8 },
  walls: {
    away: ["bars", "bars", "bars", "bars", "bars", "bars", "bars", "bars"],
    left: ["bars", "bars", "bars", "none", "none", "bars", "bars", "bars"],
  },
}) satisfies RoomJson<"jail", OriginalCampaignRoomId>;
