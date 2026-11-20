import { beforeEach, expect, test } from "vitest";

import {
  type ItemsInTestRoomJson,
  setUpBasicGame,
  type TestRoomId,
} from "../../../_testUtils/basicRoom";
import { resetStore } from "../../../_testUtils/initStoreForTests";
import { playGameThrough } from "../../../_testUtils/playGameThrough";
import {
  isInRoom,
  isStandingOn,
} from "../../../_testUtils/playThroughUntilHelpers";
import type { Xyz } from "../../../utils/vectors/vectors";
import { defaultRoomHeightBlocks } from "../../physics/mechanicsConstants";

beforeEach(() => {
  resetStore();
});

type TwoCellsCase = {
  /**
   * how heels moves between the rooms
   */
  name: string;
  startRoom: TestRoomId;
  heelsPosition: Xyz;
  /**
   * the room heels should arrive in, and the item to come to rest on there
   */
  arrivesIn: TestRoomId;
  arrivesOn: string;
};

test.for<TwoCellsCase>([
  {
    name: "lifted from the room below, up through the ceiling on the seam",
    startRoom: "firstRoom",
    heelsPosition: { x: 7.5, y: 2, z: 1 },
    arrivesIn: "secondRoom",
    arrivesOn: "landing",
  },
  {
    name: "falling from the room above, down through the floor on the seam",
    startRoom: "secondRoom",
    heelsPosition: { x: 7.5, y: 5, z: 1 },
    arrivesIn: "firstRoom",
    arrivesOn: "floor",
  },
])(
  "two rooms of two cells side by side, one above the other: $name",
  ({ startRoom, heelsPosition, arrivesIn, arrivesOn }) => {
    const heels: ItemsInTestRoomJson = {
      heels: {
        type: "player",
        position: heelsPosition,
        config: { which: "heels" },
      },
    };
    const gameState = setUpBasicGame({
      // the room below: two cells of 8×8, both leading up to the room above
      firstRoomItems: {
        ...(startRoom === "firstRoom" ? heels : {}),
        floor: {
          type: "floor",
          config: {
            floorType: "standable",
            scenery: "blacktooth",
            times: { x: 16, y: 8 },
          },
          position: { x: 0, y: 0, z: 0 },
        },
        // a block wide, straddling the seam between the cells:
        lift: {
          type: "lift",
          position: { x: 7.5, y: 2, z: 0 },
          config: { bottom: 0, top: defaultRoomHeightBlocks },
        },
      },
      firstRoomProps: {
        meta: {
          subRooms: {
            left: {
              gridPosition: { x: 0, y: 0 },
              physicalPosition: { from: { x: 0, y: 0 }, to: { x: 8, y: 8 } },
              above: { room: "secondRoom", subRoom: "left" },
            },
            right: {
              gridPosition: { x: 1, y: 0 },
              physicalPosition: { from: { x: 8, y: 0 }, to: { x: 16, y: 8 } },
              above: { room: "secondRoom", subRoom: "right" },
            },
          },
        },
      },
      // the room above: the same two cells, with no floor, both leading down
      // to the room below
      secondRoomItems: {
        ...(startRoom === "secondRoom" ? heels : {}),
        floor: {
          type: "floor",
          config: { floorType: "none", times: { x: 16, y: 8 } },
          position: { x: 0, y: 0, z: 0 },
        },
        // to stand on, arriving from the lift:
        landing: {
          type: "block",
          config: { style: "organic" },
          position: { x: 7.5, y: 2, z: 0 },
        },
      },
      secondRoomProps: {
        meta: {
          subRooms: {
            left: {
              gridPosition: { x: 0, y: 0 },
              physicalPosition: { from: { x: 0, y: 0 }, to: { x: 8, y: 8 } },
              below: { room: "firstRoom", subRoom: "left" },
            },
            right: {
              gridPosition: { x: 1, y: 0 },
              physicalPosition: { from: { x: 8, y: 0 }, to: { x: 16, y: 8 } },
              below: { room: "firstRoom", subRoom: "right" },
            },
          },
        },
      },
    });

    playGameThrough(gameState, {
      until: (gameState) =>
        isInRoom("heels", arrivesIn)(gameState) &&
        isStandingOn("heels", arrivesOn)(gameState),
      failAfter: 10_000,
    });
  },
);

type LShapeCase = {
  /**
   * which cell the lift is in
   */
  name: string;
  liftPosition: Xyz;
  /**
   * where heels should be once the lift has carried them up
   */
  endsIn: TestRoomId;
};

test.for<LShapeCase>([
  {
    name: "a cell leading up to the room above carries heels into it",
    liftPosition: { x: 12, y: 4, z: 0 },
    endsIn: "secondRoom",
  },
  {
    name: "the corner cell, which leads nowhere, keeps heels in its room",
    liftPosition: { x: 12, y: 12, z: 0 },
    endsIn: "firstRoom",
  },
])(
  "two rooms of 2×2 cells, three of each leading to the other in an L shape - a lift in $name",
  ({ liftPosition, endsIn }) => {
    const gameState = setUpBasicGame({
      // the room below: 2×2 cells of 8×8, all but the far corner leading up
      firstRoomItems: {
        heels: {
          type: "player",
          position: { ...liftPosition, z: 1 },
          config: { which: "heels" },
        },
        floor: {
          type: "floor",
          config: {
            floorType: "standable",
            scenery: "blacktooth",
            times: { x: 16, y: 16 },
          },
          position: { x: 0, y: 0, z: 0 },
        },
        lift: {
          type: "lift",
          position: liftPosition,
          config: { bottom: 0, top: defaultRoomHeightBlocks },
        },
      },
      firstRoomProps: {
        meta: {
          subRooms: {
            nearLeft: {
              gridPosition: { x: 0, y: 0 },
              physicalPosition: { from: { x: 0, y: 0 }, to: { x: 8, y: 8 } },
              above: { room: "secondRoom", subRoom: "nearLeft" },
            },
            nearRight: {
              gridPosition: { x: 1, y: 0 },
              physicalPosition: { from: { x: 8, y: 0 }, to: { x: 16, y: 8 } },
              above: { room: "secondRoom", subRoom: "nearRight" },
            },
            farLeft: {
              gridPosition: { x: 0, y: 1 },
              physicalPosition: { from: { x: 0, y: 8 }, to: { x: 8, y: 16 } },
              above: { room: "secondRoom", subRoom: "farLeft" },
            },
            farRight: {
              gridPosition: { x: 1, y: 1 },
              physicalPosition: { from: { x: 8, y: 8 }, to: { x: 16, y: 16 } },
            },
          },
        },
      },
      // the room above: the same cells, with no floor, all but the far corner
      // leading down
      secondRoomItems: {
        floor: {
          type: "floor",
          config: { floorType: "none", times: { x: 16, y: 16 } },
          position: { x: 0, y: 0, z: 0 },
        },
        // to stand on, arriving from the lift:
        landing: {
          type: "block",
          config: { style: "organic" },
          position: liftPosition,
        },
      },
      secondRoomProps: {
        meta: {
          subRooms: {
            nearLeft: {
              gridPosition: { x: 0, y: 0 },
              physicalPosition: { from: { x: 0, y: 0 }, to: { x: 8, y: 8 } },
              below: { room: "firstRoom", subRoom: "nearLeft" },
            },
            nearRight: {
              gridPosition: { x: 1, y: 0 },
              physicalPosition: { from: { x: 8, y: 0 }, to: { x: 16, y: 8 } },
              below: { room: "firstRoom", subRoom: "nearRight" },
            },
            farLeft: {
              gridPosition: { x: 0, y: 1 },
              physicalPosition: { from: { x: 0, y: 8 }, to: { x: 8, y: 16 } },
              below: { room: "firstRoom", subRoom: "farLeft" },
            },
            farRight: {
              gridPosition: { x: 1, y: 1 },
              physicalPosition: { from: { x: 8, y: 8 }, to: { x: 16, y: 16 } },
            },
          },
        },
      },
    });

    // long enough for the lift to have reached its top, and come back down:
    playGameThrough(gameState, { until: 8_000 });

    expect(gameState.characterRooms.heels?.id).toBe(endsIn);
  },
);
