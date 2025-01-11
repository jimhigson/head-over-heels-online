import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "basic" },
  floor: "blacktooth",
  id: "blacktooth2",
  items: {
    "door@2,0,0": {
      config: { direction: "towards", toRoom: "blacktooth3" },
      position: { x: 2, y: 0, z: 0 },
      type: "door",
    },
    extra: {
      config: { movement: "free", style: "stepStool" },
      position: { x: 1, y: 1, z: 0 },
      type: "movableBlock",
    },
    extra2: {
      config: { movement: "free", style: "stepStool" },
      position: { x: 1, y: 4, z: 0 },
      type: "movableBlock",
    },
    extra3: {
      config: { movement: "free", style: "stepStool" },
      position: { x: 1, y: 3.5, z: 1 },
      type: "movableBlock",
    },
    extra4: {
      config: { movement: "free", style: "stepStool" },
      position: { x: 1, y: 1.5, z: 1 },
      type: "movableBlock",
    },
    extra5: {
      config: { movement: "free", style: "stepStool" },
      position: { x: 1, y: 2, z: 2 },
      type: "movableBlock",
    },
    extra6: {
      config: { movement: "free", style: "stepStool" },
      position: { x: 1, y: 3, z: 2 },
      type: "movableBlock",
    },
    extra7: {
      config: { movement: "free", style: "stepStool" },
      position: { x: 1, y: 2.5, z: 3 },
      type: "movableBlock",
    },
    scroll: {
      config: {
        gives: "scroll",
        markdown: `
## HISTORY OF THE BLACKTOOTH EMPIRE

![](crown)Far, far away from our star Sol lies the Blacktooth empire, an evil empire, four
worlds enslaved by the planet Blacktooth. All of the slave worlds bubble with
unrest, but due to the oppressive nature of their rulers they never reach
boiling point, they all lack a leader to draw the masses of population together.

Blacktooth itself is not any better, a world rigidly controlled by its dynastic
leaders for so long that the populace do not ever think about revolution. The
peoples of the neighbouring stars are getting very worried about signs of
military expansion from Blacktooth and have sent a spy from the planet Freedom
to see if he can push the slave planets into full rebellion by finding the
crowns lost when Blacktooth took over.

The creatures of Freedom are very strange in that they are formed from a pair of
symbiotic animals that have adapted to operate either independently or, to their
mutual advantage, join together as one - Head saddled on Heels, and indeed these
ARE their names and both are highly trained spies.

*> head over heels manual*
`,
      },
      position: { x: 1, y: 2.5, z: 4 },
      type: "pickup",
    },
    "teleporter@5,7,0": {
      config: { toPosition: { x: 5, y: 7, z: 0 }, toRoom: "blacktooth1head" },
      position: { x: 5, y: 7, z: 0 },
      type: "teleporter",
    },
  },
  planet: "blacktooth",
  size: { x: 6, y: 8 },
  walls: {
    away: ["plain", "armour", "shield", "shield", "armour", "plain"],
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
