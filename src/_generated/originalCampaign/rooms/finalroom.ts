import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  id: "finalroom",
  items: {
    b: {
      config: { style: "artificial", times: { x: 2 } },
      position: { x: 0, y: 2, z: 1 },
      type: "block",
    },
    b1: {
      config: { style: "organic", times: { x: 8 } },
      position: { x: 0, y: 7, z: 0 },
      type: "block",
    },
    b2: {
      config: { style: "organic", times: { y: 3 } },
      position: { x: 7, y: 1, z: 0 },
      type: "block",
    },
    b3: {
      config: { style: "organic" },
      position: { x: 7, y: 2, z: 1 },
      type: "block",
    },
    d: {
      config: { direction: "away", toRoom: "$$final" },
      position: { x: 10, y: 8, z: 0 },
      type: "door",
    },
    e: {
      config: {
        emits: { config: { direction: "left" }, type: "firedDoughnut" },
        maximum: 10,
        period: 4000,
      },
      position: { x: 2, y: 2, z: 1.5 },
      type: "emitter",
    },
    f: {
      config: {
        floorType: "standable",
        scenery: "penitentiary",
        times: { x: 12, y: 8 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    pi: {
      config: {
        gives: "scroll",
        markdown:
          "## Congratulations!\n\nYou have returned to *freedom*!\n\nExit this room to **finish the game**.\n\nFor a **100%** score:\n\n* Collect **all the crowns**\n\n* Explore **all rooms**\n\n* Both players must be free\n\nMaybe try **‘38 years later’** next",
        source: "inline",
      },
      position: { x: 5, y: 1, z: 1.5 },
      type: "pickup",
    },
    pu: { config: {}, position: { x: 0, y: 2, z: 0 }, type: "pushableBlock" },
    sc: {
      config: { planet: "blacktooth" },
      position: { x: 7, y: 2, z: 8 },
      type: "sceneryCrown",
    },
    sc1: {
      config: { planet: "bookworld" },
      position: { x: 7, y: 1, z: 1 },
      type: "sceneryCrown",
    },
    sc2: {
      config: { planet: "egyptus" },
      position: { x: 7, y: 4, z: 0 },
      type: "sceneryCrown",
    },
    sc3: {
      config: { planet: "penitentiary" },
      position: { x: 7, y: 0, z: 0 },
      type: "sceneryCrown",
    },
    sc4: {
      config: { planet: "safari" },
      position: { x: 7, y: 3, z: 1 },
      type: "sceneryCrown",
    },
    sp: {
      config: { startDirection: "towards", which: "headOverHeels" },
      position: { x: 0, y: 3, z: 0 },
      type: "sceneryPlayer",
    },
    sp1: {
      config: { startDirection: "towardsLeft", which: "heels" },
      position: { x: 0, y: 6, z: 0 },
      type: "sceneryPlayer",
    },
    sp10: {
      config: { startDirection: "towardsRight", which: "headOverHeels" },
      position: { x: 11, y: 5, z: 0 },
      type: "sceneryPlayer",
    },
    sp11: {
      config: { startDirection: "towards", which: "heels" },
      position: { x: 2, y: 6, z: 0 },
      type: "sceneryPlayer",
    },
    sp12: {
      config: { startDirection: "towards", which: "heels" },
      position: { x: 2, y: 7, z: 1 },
      type: "sceneryPlayer",
    },
    sp13: {
      config: { startDirection: "towards", which: "head" },
      position: { x: 3, y: 6, z: 0 },
      type: "sceneryPlayer",
    },
    sp14: {
      config: { startDirection: "towards", which: "heels" },
      position: { x: 3, y: 7, z: 1 },
      type: "sceneryPlayer",
    },
    sp15: {
      config: { startDirection: "towards", which: "heels" },
      position: { x: 4, y: 6, z: 0 },
      type: "sceneryPlayer",
    },
    sp16: {
      config: { startDirection: "towards", which: "head" },
      position: { x: 4, y: 7, z: 1 },
      type: "sceneryPlayer",
    },
    sp17: {
      config: { startDirection: "towards", which: "head" },
      position: { x: 5, y: 6, z: 0 },
      type: "sceneryPlayer",
    },
    sp18: {
      config: { startDirection: "towards", which: "head" },
      position: { x: 5, y: 7, z: 1 },
      type: "sceneryPlayer",
    },
    sp19: {
      config: { startDirection: "towards", which: "heels" },
      position: { x: 6, y: 6, z: 0 },
      type: "sceneryPlayer",
    },
    sp2: {
      config: { startDirection: "towardsLeft", which: "head" },
      position: { x: 0, y: 7, z: 1 },
      type: "sceneryPlayer",
    },
    sp20: {
      config: { startDirection: "towards", which: "heels" },
      position: { x: 6, y: 7, z: 1 },
      type: "sceneryPlayer",
    },
    sp21: {
      config: { startDirection: "towards", which: "head" },
      position: { x: 7, y: 6, z: 0 },
      type: "sceneryPlayer",
    },
    sp22: {
      config: { startDirection: "towards", which: "heels" },
      position: { x: 7, y: 7, z: 1 },
      type: "sceneryPlayer",
    },
    sp23: {
      config: { startDirection: "towards", which: "headOverHeels" },
      position: { x: 8, y: 7, z: 0 },
      type: "sceneryPlayer",
    },
    sp24: {
      config: { startDirection: "towardsRight", which: "headOverHeels" },
      position: { x: 9, y: 7, z: 0 },
      type: "sceneryPlayer",
    },
    sp3: {
      config: { startDirection: "towardsLeft", which: "head" },
      position: { x: 1, y: 6, z: 0 },
      type: "sceneryPlayer",
    },
    sp4: {
      config: { startDirection: "towardsLeft", which: "head" },
      position: { x: 1, y: 7, z: 1 },
      type: "sceneryPlayer",
    },
    sp5: {
      config: { startDirection: "awayRight", which: "headOverHeels" },
      position: { x: 11, y: 0, z: 0 },
      type: "sceneryPlayer",
    },
    sp6: {
      config: { startDirection: "right", which: "headOverHeels" },
      position: { x: 11, y: 1, z: 0 },
      type: "sceneryPlayer",
    },
    sp7: {
      config: { startDirection: "right", which: "headOverHeels" },
      position: { x: 11, y: 2, z: 0 },
      type: "sceneryPlayer",
    },
    sp8: {
      config: { startDirection: "right", which: "headOverHeels" },
      position: { x: 11, y: 3, z: 0 },
      type: "sceneryPlayer",
    },
    sp9: {
      config: { startDirection: "right", which: "headOverHeels" },
      position: { x: 11, y: 4, z: 0 },
      type: "sceneryPlayer",
    },
    w: {
      config: { direction: "right", times: { y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "towards", times: { x: 12 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w2: {
      config: {
        direction: "away",
        tiles: [
          "bars",
          "bars",
          "bars",
          "bars",
          "bars",
          "bars",
          "bars",
          "bars",
          "bars",
          "bars",
        ],
      },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    w3: {
      config: {
        direction: "left",
        tiles: ["bars", "bars", "bars", "bars", "bars", "bars", "bars", "bars"],
      },
      position: { x: 12, y: 0, z: 0 },
      type: "wall",
    },
  },
  meta: {
    nonContiguousRelationship: {
      gridOffset: { x: -7, y: -5, z: 0 },
      with: { room: "blacktooth83tofreedom" },
    },
  },
  planet: "jail",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "jail">;
