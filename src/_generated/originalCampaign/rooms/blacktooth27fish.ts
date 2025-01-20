import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "dimmed" },
  floor: "blacktooth",
  id: "blacktooth27fish",
  items: {
    "door@0,3,0": {
      config: { direction: "right", toRoom: "blacktooth28" },
      position: { x: 0, y: 3, z: 0 },
      type: "door",
    },
    "door@1,0,0": {
      config: { direction: "towards", toRoom: "blacktooth26" },
      position: { x: 1, y: 0, z: 0 },
      type: "door",
    },
    "door@1,8,3": {
      config: { direction: "away", toRoom: "blacktooth29" },
      position: { x: 1, y: 8, z: 3 },
      type: "door",
    },
    "movableBlock@2,3,0": {
      config: { movement: "free", style: "stepStool" },
      position: { x: 2, y: 3, z: 0 },
      type: "movableBlock",
    },
    "pickup@2,3,1": {
      config: { gives: "reincarnation" },
      position: { x: 2, y: 3, z: 1 },
      type: "pickup",
    },
    "portableBlock@0,0,0": {
      config: { style: "drum" },
      position: { x: 0, y: 0, z: 0 },
      type: "portableBlock",
    },
    scroll: {
      config: {
        gives: "scroll",
        markdown: `
## REINCARNATION FISH

![](texture-fish.1)The strangest animal in the known universe! This fish likes to be eaten! There
have been cases of it jumping onto plates! But there is more: when you eat one,
its prodigious memory remembers everything about you. Its memory is so good that
if you die at some later date, you will be reincarnated at the very place you
ate the fish, and you will even have its taste still in your mouth! How a fish
can remember anything when it's been eaten has never been successfully
explained.

You must be very careful to check that the fish is
alive and wriggling as dead fish decompose very quickly and it rapidly
turns so poisonous that a single lick can kill.

### WARNING:

Even living reincarnation fish taste horrible!

*> head over heels manual*
`,
      },
      position: { x: 0, y: 7, z: 0 },
      type: "pickup",
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
