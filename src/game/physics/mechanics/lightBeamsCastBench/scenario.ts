import {
  type ItemsInTestRoomJson,
  setUpBasicGame,
  type TestRoomId,
} from "../../../../_testUtils/basicRoom";
import { resetStore } from "../../../../_testUtils/initStoreForTests";
import { type ItemInPlay } from "../../../../model/ItemInPlay";
import { roomItemsIterable, type RoomState } from "../../../../model/RoomState";
import { isLamp, isLightBeam } from "../../itemPredicates";
import { castBeamSegments, tickLampLightBeams } from "../lightBeams";

/**
 * A deliberately demanding room for benchmarking beam casting: a tall (2-row)
 * lamp whose beam reflects several times and is partially reflected (split) by
 * a single-height mirror, in a room crowded with monsters that sit OFF the
 * beam's path. The monsters are what the old all-items scan pays for on every
 * search but the cell-march skips - they drive the measured speedup.
 *
 * Geometry (block coords; away=+y, towards=-y, left=+x, right=-x):
 *  - lamp at (7,2) shines "away" (+y), 2 rows tall, up column x=7
 *  - m1 (7,12) awayRight, SINGLE height: the lower row reflects to "right"
 *    (-x) along y=12; the upper row is uncovered so it carries on "away" to
 *    the far wall -> a partial reflection / split
 *  - m2 (2,12) awayLeft: "right" -> "towards" (-y) down column x=2
 *  - m3 (2,4) awayRight: "towards" -> "left" (+x) along y=4 to the far wall
 *  - 48 turtles fill x in 9..14, y in 6..14 (minus 12) - none on the beam
 *    lines (cols x=2,7; rows y=4,12), so they only inflate the candidate set
 */

const monsters = (): ItemsInTestRoomJson => {
  const items: ItemsInTestRoomJson = {};
  for (let x = 9; x <= 14; x++) {
    for (let y = 6; y <= 14; y++) {
      if (y === 12) {
        continue;
      }
      items[`turtle_${x}_${y}`] = {
        type: "monster",
        position: { x, y, z: 0 },
        config: {
          which: "turtle",
          movement: "back-forth",
          startDirection: "left",
          activated: "off",
        },
      };
    }
  }
  return items;
};

const scenarioItems = (): ItemsInTestRoomJson => ({
  // a bigger floor than the 8x8 default - the perimeter walls size to it
  floor: {
    type: "floor",
    config: {
      floorType: "standable",
      scenery: "blacktooth",
      times: { x: 16, y: 16 },
    },
    position: { x: 0, y: 0, z: 0 },
  },
  lamp: {
    type: "lamp",
    position: { x: 7, y: 2, z: 0 },
    config: { direction: "away", activated: true, times: { z: 2 } },
  },
  // tall enough that both lamp rows reflect here (each as its own beam)
  m1: {
    type: "mirror",
    position: { x: 7, y: 12, z: 0 },
    config: { orientation: "awayRight", times: { z: 2 } },
  },
  // single height: the upper row sails over it, the lower row reflects - the
  // partial-reflection split
  m2: {
    type: "mirror",
    position: { x: 2, y: 12, z: 0 },
    config: { orientation: "awayLeft" },
  },
  m3: {
    type: "mirror",
    position: { x: 2, y: 4, z: 0 },
    config: { orientation: "awayRight", times: { z: 2 } },
  },
  // a head so the room is the current character's room; placed off the beam
  head: {
    type: "player",
    position: { x: 10, y: 7, z: 0 },
    config: { which: "head" },
  },
  ...monsters(),
});

export type BeamScenario = {
  room: RoomState<TestRoomId, string>;
  lamp: ItemInPlay<"lamp", TestRoomId, string>;
};

/** build the scenario once (resets the store first) */
export const buildBeamScenario = (): BeamScenario => {
  resetStore();
  const gameState = setUpBasicGame({ firstRoomItems: scenarioItems() });
  const room = gameState.characterRooms.head as RoomState<TestRoomId, string>;
  const lamp = roomItemsIterable(room.items).find(isLamp) as ItemInPlay<
    "lamp",
    TestRoomId,
    string
  >;
  return { room, lamp };
};

/** the pure cast being benchmarked - finds the whole beam path through the room */
export const castOnce = ({ room, lamp }: BeamScenario) =>
  castBeamSegments(lamp, room);

/**
 * the resulting in-play lightBeam items, reduced to stable fields and sorted
 * by id - for an identical-result snapshot before vs after the rewrite
 */
export const beamItemsSnapshot = ({ room, lamp }: BeamScenario) => {
  tickLampLightBeams(lamp, room);
  return roomItemsIterable(room.items)
    .filter(isLightBeam)
    .map((b) => ({
      id: b.id,
      box: b.state.box,
      direction: b.config.direction,
      end: b.state.end,
    }))
    .toArray()
    .sort((a, b) => a.id.localeCompare(b.id));
};
