import { expect, test } from "vitest";

import { roomItemsIterable } from "../../../model/roomItemsInPlayIterators";
import { type RoomJson } from "../../../model/RoomJson";
import { unitVectors } from "../../../utils/vectors/unitVectors";
import { xyzEqual } from "../../../utils/vectors/vectors";
import { blockSizePx } from "../../physics/mechanicsConstants";
import { loadRoom } from "./loadRoom";

test("sub-rooms that all lead to the same room below share one portal covering them all", () => {
  const cell = (x: number, y: number) => ({
    gridPosition: { x, y },
    physicalPosition: {
      from: { x: x * 8, y: y * 8 },
      to: { x: (x + 1) * 8, y: (y + 1) * 8 },
    },
    below: { room: "roomBelow" },
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
        b: cell(0, -1),
        c: cell(-1, 0),
        d: cell(0, 0),
      },
    },
  };

  const roomState = loadRoom({
    roomJson,
    scrollsRead: {},
    roomPickupsCollected: {},
    isNewGame: false,
    userSettings: { soundSettings: {}, displaySettings: {}, pokesEnabled: {} },
  });

  const portalsBelow = roomItemsIterable(roomState.items)
    .filter((item) => item.type === "portal")
    .filter((portal) => xyzEqual(portal.config.direction, unitVectors.down))
    .map(({ state: { box } }) => ({
      x: box.x,
      y: box.y,
      xd: box.xd,
      yd: box.yd,
    }))
    .toArray();

  expect(portalsBelow).toEqual([
    {
      x: -8 * blockSizePx.x,
      y: -8 * blockSizePx.y,
      xd: 16 * blockSizePx.x,
      yd: 16 * blockSizePx.y,
    },
  ]);
});
