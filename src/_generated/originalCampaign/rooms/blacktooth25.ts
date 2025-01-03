import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "basic" },
  floor: "blacktooth",
  id: "blacktooth25",
  items: {
    "conveyor@1,5,1:cVr4l": {
      config: { direction: "right" },
      position: { x: 1, y: 5, z: 1 },
      type: "conveyor",
    },
    "deadlyBlock@0,5,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 0, y: 5, z: 0 },
      type: "deadlyBlock",
    },
    "door@0,2,0:uMAEO": {
      config: { direction: "right", toRoom: "blacktooth24" },
      position: { x: 0, y: 2, z: 0 },
      type: "door",
    },
    "lift@5,0,7:ZTwqnv": {
      config: { bottom: 0, top: 11 },
      position: { x: 5, y: 0, z: 7 },
      type: "lift",
    },
    scroll: {
      config: {
        gives: "scroll",
        markdown: `
## CONVEYOR BELTS

![](conveyor.x.1) The rollers on the conveyor simply push you along it. If you wish to go the
opposite direction you have to jump along.

*> head over heels manual*
`,
      },
      position: { x: 3, y: 5, z: 0 },
      type: "pickup",
    },
  },
  planet: "blacktooth",
  roomAbove: "blacktooth26",
  size: { x: 6, y: 6 },
  walls: {
    away: ["plain", "armour", "shield", "shield", "armour", "plain"],
    left: ["plain", "armour", "shield", "shield", "armour", "plain"],
  },
}) satisfies RoomJson<"blacktooth", OriginalCampaignRoomId>;
