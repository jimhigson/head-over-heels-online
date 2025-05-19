import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "basic" },
  floor: "bookworld",
  id: "blacktooth63",
  items: {
    "block@6,0,3": {
      config: { style: "artificial", times: { y: 2 } },
      position: { x: 7, y: 0, z: 3 },
      type: "block",
    },
    "block@7,0,3": {
      config: { disappearing: "onStand", style: "artificial" },
      position: { x: 6, y: 0, z: 3 },
      type: "block",
    },
    "block@7,1,3": {
      config: { disappearing: "onStand", style: "artificial" },
      position: { x: 6, y: 1, z: 3 },
      type: "block",
    },
    "door@0,0,0": {
      config: { direction: "right", toRoom: "blacktooth59" },
      position: { x: 0, y: 0, z: 0 },
      type: "door",
    },
    "door@8,0,5": {
      config: {
        direction: "left",
        meta: { toSubRoom: "right" },
        toRoom: "blacktooth62fish",
      },
      position: { x: 8, y: 0, z: 5 },
      type: "door",
    },
    "hushPuppy@3,0,0": {
      config: { times: { y: 2 } },
      position: { x: 3, y: 0, z: 0 },
      type: "hushPuppy",
    },
    "hushPuppy@4,0,1": {
      config: { times: { y: 2 } },
      position: { x: 4, y: 0, z: 1 },
      type: "hushPuppy",
    },
    "hushPuppy@5,0,2": {
      config: { times: { y: 2 } },
      position: { x: 5, y: 0, z: 2 },
      type: "hushPuppy",
    },
    "monster@4,1,0": {
      config: {
        activated: "while-player-near",
        movement: "towards-analogue",
        which: "helicopterBug",
      },
      position: { x: 4, y: 1, z: 0 },
      type: "monster",
    },
    "pickup@5,1,3": {
      config: { gives: "jumps" },
      position: { x: 5, y: 1, z: 3 },
      type: "pickup",
    },
    "wall@0,0,0": {
      config: { direction: "towards", times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,2,0": {
      config: {
        direction: "away",
        tiles: ["bars", "bars", "bars", "bars", "bars", "bars", "bars", "bars"],
        times: { x: 8 },
      },
      position: { x: 0, y: 2, z: 0 },
      type: "wall",
    },
  },
  planet: "jail",
  size: { x: 8, y: 2 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "jail">;
