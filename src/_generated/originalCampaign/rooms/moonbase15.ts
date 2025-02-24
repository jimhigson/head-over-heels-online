import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "dimmed" },
  floor: "moonbase",
  id: "moonbase15",
  items: {
    "door@0,0,0": {
      config: { direction: "right", toRoom: "moonbase7" },
      position: { x: 0, y: 0, z: 0 },
      type: "door",
    },
    "door@8,0,4": {
      config: { direction: "left", toRoom: "moonbase14" },
      position: { x: 8, y: 0, z: 4 },
      type: "door",
    },
    "hushPuppy@5,0,0": {
      config: { times: { y: 2 } },
      position: { x: 5, y: 0, z: 0 },
      type: "hushPuppy",
    },
    "hushPuppy@6,0,1": {
      config: { times: { y: 2 } },
      position: { x: 6, y: 0, z: 1 },
      type: "hushPuppy",
    },
    "hushPuppy@7,0,2": {
      config: { times: { y: 2 } },
      position: { x: 7, y: 0, z: 2 },
      type: "hushPuppy",
    },
    scroll: {
      config: { gives: "scroll", page: "hushPuppies" },
      position: { x: 3, y: 1, z: 0 },
      type: "pickup",
    },
    "wall@0,0,0": {
      config: { direction: "towards", tiles: [], times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,2,0": {
      config: {
        direction: "away",
        tiles: [
          "window3",
          "window1",
          "coil",
          "window2",
          "window3",
          "coil",
          "window3",
          "window1",
        ],
        times: { x: 8 },
      },
      position: { x: 0, y: 2, z: 0 },
      type: "wall",
    },
  },
  planet: "moonbase",
  size: { x: 8, y: 2 },
}) satisfies RoomJson<"moonbase", OriginalCampaignRoomId>;
