import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  floor: "jail",
  id: "blacktooth1head",
  items: {
    "barrier@5,0,0": {
      config: { axis: "y" },
      position: { x: 5, y: 0, z: 0 },
      type: "barrier",
    },
    "barrier@5,0,2": {
      config: { axis: "y" },
      position: { x: 5, y: 0, z: 2 },
      type: "barrier",
    },
    "barrier@5,0,4": {
      config: { axis: "y" },
      position: { x: 5, y: 0, z: 4 },
      type: "barrier",
    },
    "barrier@5,0,6": {
      config: { axis: "y" },
      position: { x: 5, y: 0, z: 6 },
      type: "barrier",
    },
    colouriseSwitch: {
      config: { activates: {} },
      position: { x: 5, y: 3, z: 0 },
      type: "switch",
    },
    "door@0,3,0": {
      config: { direction: "right", toRoom: "blacktooth23heels" },
      position: { x: 0, y: 3, z: 0 },
      type: "door",
    },
    head: {
      config: { which: "head" },
      position: { x: 2.5, y: 2.5, z: 0 },
      type: "player",
    },
    "pickup@5,0,7": {
      config: { gives: "extra-life" },
      position: { x: 5, y: 0, z: 7 },
      type: "pickup",
    },
    scrollRabbit: {
      config: {
        gives: "scroll",
        markdown: `
## CUDDLY STUFFED WHITE RABBITS

![](texture-bunny)The cute toy bunnies magically enhance your powers. The status display at the
bottom of the screen will keep you informed as to which powers are temporarily
enhanced. If Head and Heels are connected when they pick up a *Life* or *Iron pill*,
they will both get the enhanced power.

There are four types:

1. ![](texture-hud.char.2)**Two extra lives**
2. ![](texture-hud.shield)**Iron Pills** (to make you invulnerable)
3. ![](texture-hud.bigJumps)**Jump higher bunny** (only works on Heels)
4. ![](texture-hud.fastSteps)**Go faster bunny** (only works on slow-moving Head)

*> Head Over Heels Manual*
`,
      },
      position: { x: 3, y: 0, z: 0 },
      type: "pickup",
    },
    scrollTheGame: {
      config: {
        gives: "scroll",
        markdown: `
## THE GAME

![](texture-head.walking.towards.2)![](texture-heels.walking.right.2)Head and Heels have been captured, separated and imprisoned in the castle
headquarters of Blacktooth. Their cells contain ‘keep fit’ equipment, including
a wall ladder that Head really must learn to climb. Your job is to get them both
out of the castle and into the *marketplace* so they can join up again. From
there, the journey leads to *Moonbase Headquarters*, where you will have to decide
either to try to escape back to Freedom or to be a true hero and teleport to one
of the slave planets to search for its lost crown!

![](texture-crown)To overthrow the dictatorship on any of the slave planets would be a major blow
to Blacktooth and you could return to Freedom in glory. Of course, Blacktooth
would probably enslave them again eventually but it would slow down any
expansion plans for now. The populace of Blacktooth are so heavily oppressed
that they would have to see all four of the slave planets revolt before the
Blacktooth crown could cause an uprising. This of course would be the ultimate
accolade, and unfortunately, almost certain suicide.

*> Head Over Heels Manual*
`,
      },
      position: { x: 3, y: 7, z: 0 },
      type: "pickup",
    },
    "teleporter@5,7,0": {
      config: { toPosition: { x: 5, y: 7, z: 0 }, toRoom: "blacktooth2" },
      position: { x: 5, y: 7, z: 0 },
      type: "teleporter",
    },
  },
  planet: "jail",
  size: { x: 6, y: 8 },
  walls: {
    away: ["bars", "bars", "bars", "bars", "bars", "bars"],
    left: ["bars", "bars", "bars", "bars", "bars", "bars", "bars", "bars"],
  },
}) satisfies RoomJson<"jail", OriginalCampaignRoomId>;
