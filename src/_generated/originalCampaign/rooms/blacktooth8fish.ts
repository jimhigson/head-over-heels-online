import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "basic" },
  floor: "blacktooth",
  floorSkip: [],
  id: "blacktooth8fish",
  items: {
    "baddie@3,3,1:Z1rA6U9": {
      config: { activated: true, which: "dalek" },
      position: { x: 3, y: 3, z: 1 },
      type: "baddie",
    },
    "block@3,0,0:Z1V7JSA": {
      config: { disappearing: false, style: "tower" },
      position: { x: 3, y: 0, z: 0 },
      type: "block",
    },
    "block@3,0,1:Z1V7JSA": {
      config: { disappearing: false, style: "tower" },
      position: { x: 3, y: 0, z: 1 },
      type: "block",
    },
    "block@3,0,2:Z1V7JSA": {
      config: { disappearing: false, style: "tower" },
      position: { x: 3, y: 0, z: 2 },
      type: "block",
    },
    "door@0,3,0:b01b2": {
      config: { direction: "right", toRoom: "blacktooth9" },
      position: { x: 0, y: 3, z: 0 },
      type: "door",
    },
    "door@1,8,2:29aKWo": {
      config: { direction: "away", toRoom: "blacktooth7" },
      position: { x: 1, y: 8, z: 2 },
      type: "door",
    },
    "pickup@3,0,3:ZPJAGD": {
      config: { gives: "reincarnation" },
      position: { x: 3, y: 0, z: 3 },
      type: "pickup",
    },
    scroll: {
      config: {
        text: `
## REINCARNATION FISH

![](fish.1) The strangest animal in the known universe! This fish likes to be eaten! There
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

*Head Over Heels Manual*
`,
      },
      position: { x: 3, y: 7, z: 0 },
      type: "scroll",
    },
    "spring@3,3,0:13y": {
      config: {},
      position: { x: 3, y: 3, z: 0 },
      type: "spring",
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
