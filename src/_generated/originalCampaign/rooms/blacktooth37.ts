import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "green", shade: "basic" },
  floor: "blacktooth",
  id: "blacktooth37",
  items: {
    "ball@0,1,0": { config: {}, position: { x: 0, y: 1, z: 0 }, type: "ball" },
    "door@1,0,0": {
      config: { direction: "towards", toRoom: "blacktooth36" },
      position: { x: 1, y: 0, z: 0 },
      type: "door",
    },
    "door@1,8,0": {
      config: { direction: "away", toRoom: "blacktooth38" },
      position: { x: 1, y: 8, z: 0 },
      type: "door",
    },
    "monster@0,5,0": {
      config: {
        activated: true,
        movement: "back-forth",
        startDirection: "right",
        style: "starsAndStripes",
        which: "skiHead",
      },
      position: { x: 0, y: 5, z: 0 },
      type: "monster",
    },
    "monster@2,4,0": {
      config: {
        activated: true,
        movement: "back-forth",
        startDirection: "right",
        style: "greenAndPink",
        which: "skiHead",
      },
      position: { x: 2, y: 4, z: 0 },
      type: "monster",
    },
    "monster@3,3,0": {
      config: {
        activated: true,
        movement: "back-forth",
        startDirection: "right",
        style: "starsAndStripes",
        which: "skiHead",
      },
      position: { x: 3, y: 3, z: 0 },
      type: "monster",
    },
    "switch@0,7,0": {
      config: {
        activates: {
          "monster@0,5,0": {
            left: { activated: true },
            right: { activated: false },
          },
          "monster@2,4,0": {
            left: { activated: true },
            right: { activated: false },
          },
          "monster@3,3,0": {
            left: { activated: true },
            right: { activated: false },
          },
        },
      },
      position: { x: 0, y: 7, z: 0 },
      type: "switch",
    },
  },
  planet: "blacktooth",
  size: { x: 4, y: 8 },
  walls: {
    away: ["shield", "none", "none", "shield"],
    left: [
      "plain",
      "armour",
      "plain",
      "shield",
      "shield",
      "plain",
      "armour",
      "plain",
    ],
  },
}) satisfies RoomJson<"blacktooth", OriginalCampaignRoomId>;
