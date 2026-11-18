import { expect, test } from "vitest";

import { roomItemsIterable } from "../../../model/roomItemsInPlayIterators";
import { type RoomJson } from "../../../model/RoomJson";
import { noPlanetsLiberated } from "../../../store/slices/gameInPlay/gameInPlaySlice";
import { unitVectors } from "../../../utils/vectors/unitVectors";
import { xyzEqual } from "../../../utils/vectors/vectors";
import { blockSizePx } from "../../physics/mechanicsConstants";
import { loadRoom } from "./loadRoom";

test("each sub-room leading to the room below has its own portal, covering just it, naming the sub-room it leads to", () => {
  const cell = (x: number, y: number) => ({
    gridPosition: { x, y },
    physicalPosition: {
      from: { x: x * 8, y: y * 8 },
      to: { x: (x + 1) * 8, y: (y + 1) * 8 },
    },
    below: { room: "roomBelow", subRoom: `${x},${y}` },
  });
  const roomJson: RoomJson<string, string> = {
    id: "dividedRoom",
    planet: "blacktooth",
    color: { hue: "cyan", shade: "basic" },
    items: {
      f: {
        type: "floor",
        position: { x: -8, y: -8, z: 0 },
        config: {
          floorType: "standable",
          scenery: "blacktooth",
          times: { x: 16, y: 16 },
        },
      },
    },
    meta: {
      subRooms: {
        a: cell(-1, -1),
        b: cell(0, 0),
      },
    },
  };

  const roomState = loadRoom({
    roomJson,
    scrollsRead: {},
    planetsLiberated: noPlanetsLiberated,
    roomPickupsCollected: {},
    isNewGame: false,
    userSettings: { soundSettings: {}, displaySettings: {}, pokesEnabled: {} },
  });

  const portalsBelow = roomItemsIterable(roomState.items)
    .filter((item) => item.type === "portal")
    .filter((portal) => xyzEqual(portal.config.direction, unitVectors.down))
    .map(({ config: { subRoom, toSubRoom }, state: { box } }) => ({
      subRoom,
      toSubRoom,
      x: box.x,
      y: box.y,
      xd: box.xd,
      yd: box.yd,
    }))
    .toArray();

  expect(portalsBelow).toEqual([
    {
      subRoom: "a",
      toSubRoom: "-1,-1",
      x: -8 * blockSizePx.x,
      y: -8 * blockSizePx.y,
      xd: 8 * blockSizePx.x,
      yd: 8 * blockSizePx.y,
    },
    {
      subRoom: "b",
      toSubRoom: "0,0",
      x: 0,
      y: 0,
      xd: 8 * blockSizePx.x,
      yd: 8 * blockSizePx.y,
    },
  ]);
});
