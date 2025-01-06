import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  floor: "blacktooth",
  id: "blacktooth42",
  items: {
    "baddie@3,1,0:Z1feWja": {
      config: {
        activated: true,
        movement: "back-forth",
        startDirection: "towards",
        style: "greenAndPink",
        which: "american-football-head",
      },
      position: { x: 3, y: 1, z: 0 },
      type: "baddie",
    },
    "door@0,0,0:uMPTj": {
      config: { direction: "right", toRoom: "blacktooth41" },
      position: { x: 0, y: 0, z: 0 },
      type: "door",
    },
    "door@8,0,0:ZUCFnC": {
      config: { direction: "left", toRoom: "blacktooth43" },
      position: { x: 8, y: 0, z: 0 },
      type: "door",
    },
    "spring@1,1,0:13y": {
      config: {},
      position: { x: 1, y: 1, z: 0 },
      type: "spring",
    },
  },
  planet: "blacktooth",
  size: { x: 8, y: 2 },
  walls: {
    away: [
      "plain",
      "armour",
      "plain",
      "shield",
      "shield",
      "plain",
      "armour",
      "plain",
    ],
    left: ["none", "none"],
  },
}) satisfies RoomJson<"blacktooth", OriginalCampaignRoomId>;
