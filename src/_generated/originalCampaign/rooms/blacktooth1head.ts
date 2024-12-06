import type { RoomJson } from "../../../model/modelTypes.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = {
  color: { hue: "yellow", shade: "basic" },
  floor: "jail",
  floorSkip: [],
  id: "blacktooth1head",
  items: {
    "barrier@5,0,0:fbso8": {
      config: { axis: "y", disappearing: false },
      position: { x: 5, y: 0, z: 0 },
      type: "barrier",
    },
    "barrier@5,0,2:fbso8": {
      config: { axis: "y", disappearing: false },
      position: { x: 5, y: 0, z: 2 },
      type: "barrier",
    },
    "barrier@5,0,4:fbso8": {
      config: { axis: "y", disappearing: false },
      position: { x: 5, y: 0, z: 4 },
      type: "barrier",
    },
    "barrier@5,0,6:fbso8": {
      config: { axis: "y", disappearing: false },
      position: { x: 5, y: 0, z: 6 },
      type: "barrier",
    },
    "door@0,3,0:vSkOv": {
      config: { direction: "right", toRoom: "blacktooth23heels" },
      position: { x: 0, y: 3, z: 0 },
      type: "door",
    },
    head: {
      config: { which: "head" },
      position: { x: 3.5, y: 3.5, z: 0 },
      type: "player",
    },
    "pickup@5,0,7:1MkQY2": {
      config: { gives: "extra-life" },
      position: { x: 5, y: 0, z: 7 },
      type: "pickup",
    },
    "teleporter@5,7,0:Z12mRwL": {
      config: { toRoom: "blacktooth2" },
      position: { x: 5, y: 7, z: 0 },
      type: "teleporter",
    },
    scrollTheGame: {
      config: {
        text: `
## THE GAME

![](head.walking.towards.2)![](heels.walking.right.2) Head and Heels have been captured, separated and imprisoned in the castle
headquarters of Blacktooth. Their cells contain 'keep fit' equipment, including
a wall ladder that Head really must learn to climb. Your job is to get them both
out of the castle and into the marketplace so they can join up again. From
there, the journey leads to Moonbase Headquarters, where you will have to decide
either to try to escape back to Freedom or to be a true hero and teleport to one
of the slave planets to search for its lost crown!

![](crown)To overthrow the dictatorship on any of the slave planets would be a major blow
to Blacktooth and you could return to Freedom in glory. Of course, Blacktooth
would probably enslave them again eventually but it would slow down any
expansion plans for now. The populace of Blacktooth are so heavily oppressed
that they would have to see all four of the slave planets revolt before the
Blacktooth crown could cause an uprising. This of course would be the ultimate
accolade, and unfortunately, almost certain suicide.

*Head Over Heels Manual*
`,
      },
      position: { x: 3, y: 7, z: 0 },
      type: "scroll",
    },
    scrollRabbit: {
      config: {
        text: `
## CUDDLY STUFFED WHITE RABBITS

![](bunny)The cute toy bunnies magically enhance your powers. The status display at the
bottom of the screen will keep you informed as to which powers are temporarily
enhanced. If Head and Heels are connected when they pick up a Life or Iron pill,
they will both get the enhanced power.

There are four types:

1. **Two extra lives**
2. **Iron Pills** [ to make you invulnerable ] ![](hud.shield)
3. **Jump higher bunny** [ only works on Heels ] ![](hud.bigJumps)
4. **Go faster bunny** [ only works on slow-moving Head ] ![](hud.fastSteps)

*Head Over Heels Manual*
`,
      },
      position: { x: 3, y: 0, z: 0 },
      type: "scroll",
    },
  },
  planet: "jail",
  size: { x: 6, y: 8 },
  walls: {
    away: ["bars", "bars", "bars", "bars", "bars", "bars"],
    left: ["bars", "bars", "bars", "bars", "bars", "bars", "bars", "bars"],
  },
} satisfies RoomJson<"jail", OriginalCampaignRoomId>;
