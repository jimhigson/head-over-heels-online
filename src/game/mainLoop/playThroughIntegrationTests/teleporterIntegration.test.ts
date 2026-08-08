import { beforeEach, expect, test, vi } from "vitest";
vi.mock("../../sprites/samplePalette", () => ({
  spritesheetPalette: vi.fn().mockReturnValue({}),
}));

import {
  firstRoomId,
  secondRoomId,
  setUpBasicGame,
} from "../../../_testUtils/basicRoom";
import { headState, heelsState } from "../../../_testUtils/characterState";
import { resetStore } from "../../../_testUtils/initStoreForTests";
import { playGameThrough } from "../../../_testUtils/playGameThrough";
import { roomItemsIterable } from "../../../model/RoomState";
import { selectCurrentRoomState } from "../../gameState/gameStateSelectors/selectCurrentRoomState";

beforeEach(() => {
  resetStore();
});

test("can teleport to the next room (with `config.toPosition`)", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      heels: {
        type: "player",
        position: { x: 0, y: 2, z: 1 },
        config: {
          which: "heels",
        },
      },
      teleporter: {
        type: "teleporter",
        position: { x: 0, y: 2, z: 0 },
        config: { toRoom: secondRoomId, toPosition: { x: 4, y: 4, z: 3 } },
      },
    },
    secondRoomItems: {
      teleporterLanding: {
        type: "block",
        position: { x: 4, y: 4, z: 2 },
        config: { style: "organic" },
      },
    },
  });

  playGameThrough(gameState, {
    frameRate: { fps: [15] }, // keep frame rate low to reduce computation

    setupInitialInput(mockInputStateTracker) {
      mockInputStateTracker.mockPressing("jump");
    },
    until(gameState) {
      if (heelsState(gameState).teleporting !== null) {
        gameState.inputStateTracker.mockNotPressing("jump");
      }
      return heelsState(gameState).standingOnItemId === "teleporterLanding";
    },
  });

  expect(heelsState(gameState).box).toMatchInlineSnapshot(`
    {
      "x": 65,
      "xd": 12,
      "y": 65,
      "yd": 12,
      "z": 36,
      "zd": 12,
    }
  `);
});

test("can teleport to the same room (with `config.toPosition`)", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      heels: {
        type: "player",
        position: { x: 0, y: 2, z: 1 },
        config: {
          which: "heels",
        },
      },
      teleporter: {
        type: "teleporter",
        position: { x: 0, y: 2, z: 0 },
        config: { toRoom: firstRoomId, toPosition: { x: 4, y: 4, z: 3 } },
      },
      teleporterLanding: {
        type: "block",
        position: { x: 4, y: 4, z: 2 },
        config: { style: "organic" },
      },
    },
  });

  playGameThrough(gameState, {
    frameRate: { fps: [15] }, // keep frame rate low to reduce computation

    setupInitialInput(mockInputStateTracker) {
      mockInputStateTracker.mockPressing("jump");
    },
    until(gameState) {
      if (heelsState(gameState).teleporting !== null) {
        gameState.inputStateTracker.mockNotPressing("jump");
      }
      return heelsState(gameState).standingOnItemId === "teleporterLanding";
    },
  });

  expect(heelsState(gameState).box).toMatchInlineSnapshot(`
    {
      "x": 65,
      "xd": 12,
      "y": 65,
      "yd": 12,
      "z": 36,
      "zd": 12,
    }
  `);
});

test("can teleport to the same room (with empty config`)", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      heels: {
        type: "player",
        position: { x: 0, y: 2, z: 1 },
        config: {
          which: "heels",
        },
      },
      teleporter: {
        type: "teleporter",
        position: { x: 0, y: 2, z: 0 },
        config: {},
      },
      destinationTeleporter: {
        type: "teleporter",
        position: { x: 4, y: 4, z: 2 },
        config: {},
      },
    },
  });

  playGameThrough(gameState, {
    frameRate: { fps: [15] }, // keep frame rate low to reduce computation

    setupInitialInput(mockInputStateTracker) {
      mockInputStateTracker.mockPressing("jump");
    },
    until(gameState) {
      if (heelsState(gameState).teleporting !== null) {
        gameState.inputStateTracker.mockNotPressing("jump");
      }
      return heelsState(gameState).standingOnItemId === "destinationTeleporter";
    },
  });

  expect(heelsState(gameState).box).toMatchInlineSnapshot(`
    {
      "x": 65,
      "xd": 12,
      "y": 65,
      "yd": 12,
      "z": 36,
      "zd": 12,
    }
  `);
});

test("can teleport to the next room (with `config.toItemId`)", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      heels: {
        type: "player",
        position: { x: 0, y: 2, z: 1 },
        config: {
          which: "heels",
        },
      },
      teleporter: {
        type: "teleporter",
        position: { x: 0, y: 2, z: 0 },
        config: { toRoom: secondRoomId, toItemId: "teleporterLanding" },
      },
    },
    secondRoomItems: {
      teleporterLanding: {
        type: "block",
        position: { x: 4, y: 4, z: 2 },
        config: { style: "organic" },
      },
    },
  });

  playGameThrough(gameState, {
    frameRate: { fps: [15] }, // keep frame rate low to reduce computation

    setupInitialInput(mockInputStateTracker) {
      mockInputStateTracker.mockPressing("jump");
    },
    until(gameState) {
      if (heelsState(gameState).teleporting !== null) {
        gameState.inputStateTracker.mockNotPressing("jump");
      }
      return heelsState(gameState).standingOnItemId === "teleporterLanding";
    },
  });

  expect(heelsState(gameState).box).toMatchInlineSnapshot(`
    {
      "x": 65,
      "xd": 12,
      "y": 65,
      "yd": 12,
      "z": 36,
      "zd": 12,
    }
  `);
});

test("can teleport to the next room (with `config.toItemId`) to a taller item than the teleporter", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      heels: {
        type: "player",
        position: { x: 0, y: 2, z: 1 },
        config: {
          which: "heels",
        },
      },
      teleporter: {
        type: "teleporter",
        position: { x: 0, y: 2, z: 0 },
        config: { toRoom: secondRoomId, toItemId: "teleporterLanding" },
      },
    },
    secondRoomItems: {
      teleporterLanding: {
        type: "block",
        position: { x: 4, y: 4, z: 2 },
        config: { style: "organic", times: { z: 10 } },
      },
    },
  });

  playGameThrough(gameState, {
    frameRate: { fps: [15] }, // keep frame rate low to reduce computation

    setupInitialInput(mockInputStateTracker) {
      mockInputStateTracker.mockPressing("jump");
    },
    until(gameState) {
      if (heelsState(gameState).teleporting !== null) {
        gameState.inputStateTracker.mockNotPressing("jump");
      }
      return heelsState(gameState).standingOnItemId === "teleporterLanding";
    },
  });

  expect(heelsState(gameState).box).toMatchInlineSnapshot(`
    {
      "x": 65,
      "xd": 12,
      "y": 65,
      "yd": 12,
      "z": 144,
      "zd": 12,
    }
  `);
});

test("can teleport to the next room (with room specified only)", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      heels: {
        type: "player",
        position: { x: 0, y: 2, z: 1 },
        config: {
          which: "heels",
        },
      },
      teleporter: {
        type: "teleporter",
        position: { x: 0, y: 2, z: 0 },
        config: { toRoom: secondRoomId },
      },
    },
    secondRoomItems: {
      destinationTeleporter: {
        type: "teleporter",
        position: { x: 4, y: 4, z: 2 },
        config: { toRoom: "firstRoom" as const },
      },
    },
  });

  playGameThrough(gameState, {
    frameRate: { fps: [15] }, // keep frame rate low to reduce computation

    setupInitialInput(mockInputStateTracker) {
      mockInputStateTracker.mockPressing("jump");
    },
    until(gameState) {
      if (heelsState(gameState).teleporting !== null) {
        gameState.inputStateTracker.mockNotPressing("jump");
      }
      return (
        gameState.characterRooms.heels?.id === "secondRoom" &&
        heelsState(gameState).standingOnItemId === "destinationTeleporter"
      );
    },
  });

  expect(heelsState(gameState).box).toMatchInlineSnapshot(`
    {
      "x": 65,
      "xd": 12,
      "y": 65,
      "yd": 12,
      "z": 36,
      "zd": 12,
    }
  `);
});

test("teleporter can be inactive based on a store value", () => {
  // set
  const gameState = setUpBasicGame({
    firstRoomItems: {
      heels: {
        type: "player",
        position: { x: 0, y: 2, z: 1 },
        config: {
          which: "heels",
        },
      },
      teleporter: {
        type: "teleporter",
        position: { x: 0, y: 2, z: 0 },
        config: {
          toRoom: secondRoomId,
          toPosition: { x: 4, y: 4, z: 2 },
          activatedOnStoreValue: "planetsLiberated.egyptus",
        },
      },
    },
    secondRoomItems: {
      teleporterLanding: {
        type: "block",
        position: { x: 4, y: 4, z: 2 },
        config: { style: "organic" },
      },
    },
  });

  playGameThrough(gameState, {
    frameRate: { fps: [15] }, // keep frame rate low to reduce computation

    setupInitialInput(mockInputStateTracker) {
      mockInputStateTracker.mockPressing("jump");
    },
    until(gameState) {
      // give it 5 seconds to try to use the teleporter
      return gameState.gameTime > 5_000;
    },
  });

  // should not have teleported - we don't have the crown
  expect(gameState.characterRooms.heels?.id).toEqual("firstRoom");
  expect(heelsState(gameState).box).toMatchInlineSnapshot(`
    {
      "x": 1,
      "xd": 12,
      "y": 0,
      "yd": 12,
      "z": 12.958333333333348,
      "zd": 12,
    }
  `);
});
test("teleporter can be activated based on a store value", () => {
  // set
  const gameState = setUpBasicGame({
    firstRoomItems: {
      heels: {
        type: "player",
        position: { x: 0, y: 2, z: 1 },
        config: {
          which: "heels",
        },
      },
      crown: {
        type: "pickup",
        position: { x: 0, y: 2, z: 3 },
        config: {
          gives: "crown",
          planet: "egyptus",
        },
      },
      teleporter: {
        type: "teleporter",
        position: { x: 0, y: 2, z: 0 },
        config: {
          toRoom: secondRoomId,
          toPosition: { x: 4, y: 4, z: 2 },
          activatedOnStoreValue: "planetsLiberated.egyptus",
        },
      },
    },
    secondRoomItems: {
      teleporterLanding: {
        type: "block",
        position: { x: 4, y: 4, z: 2 },
        config: { style: "organic" },
      },
    },
  });

  playGameThrough(gameState, {
    frameRate: { fps: [15] }, // keep frame rate low to reduce computation

    until(gameState) {
      if (gameState.characterRooms.heels?.items["crown"] === undefined) {
        gameState.inputStateTracker.mockPressing("jump");
      }
      return gameState.gameTime > 5_000;
    },
  });

  // should have teleported
  expect(gameState.characterRooms.heels?.id).toEqual("secondRoom");
  expect(heelsState(gameState).box).toMatchInlineSnapshot(`
    {
      "x": 65,
      "xd": 12,
      "y": 0,
      "yd": 12,
      "z": 11.42777777777782,
      "zd": 12,
    }
  `);
});

test("teleporting to a portable teleporter while Heels is holding it brings Head on top of Heels", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      heels: {
        type: "player",
        position: { x: 0, y: 2, z: 3 },
        config: {
          which: "heels",
        },
      },
      bag: {
        type: "pickup",
        position: { x: 0, y: 2, z: 2 },
        config: {
          gives: "bag",
        },
      },
      heelsTeleporter: {
        type: "portableTeleporter",
        position: { x: 0, y: 2, z: 0 },
        config: { toRoom: firstRoomId, toItemId: "headTeleporter" },
      },

      head: {
        type: "player",
        position: { x: 4, y: 4, z: 0 },
        config: {
          which: "head",
        },
      },
      headTeleporter: {
        type: "portableTeleporter",
        position: { x: 4, y: 4, z: 0 },
        config: { toRoom: firstRoomId, toItemId: "heelsTeleporter" },
      },
    },
  });

  playGameThrough(gameState, {
    frameRate: { fps: [15] }, // keep frame rate low to reduce computation

    setupInitialInput(mockInputStateTracker) {
      mockInputStateTracker.mockPressing("swop");
    },
    until(gameState) {
      const heelIsCurrent = gameState.currentCharacterName === "heels";
      if (heelIsCurrent) {
        // stop pressing jump/teleporter once teleporting has
        gameState.inputStateTracker.mockNotPressing("swop");
      }
      return heelIsCurrent;
    },
  });

  expect(gameState.currentCharacterName).toEqual("heels");

  // now have heels selected - pick up the portable teleporter
  playGameThrough(gameState, {
    frameRate: { fps: [15] }, // keep frame rate low to reduce computation

    setupInitialInput(mockInputStateTracker) {
      mockInputStateTracker.mockPressing("carry");
    },
    until(gameState) {
      const isCarrying = heelsState(gameState).carrying !== null;
      if (isCarrying) {
        // stop pressing jump/teleporter once teleporting has
        gameState.inputStateTracker.mockNotPressing("carry");
      }
      return isCarrying;
    },
  });

  const { carrying } = heelsState(gameState);
  expect(carrying).toMatchObject<Partial<NonNullable<typeof carrying>>>({
    id: "heelsTeleporter",
    type: "portableTeleporter",
  });

  // switch back to Head:
  playGameThrough(gameState, {
    frameRate: { fps: [15] }, // keep frame rate low to reduce computation

    setupInitialInput(mockInputStateTracker) {
      mockInputStateTracker.mockPressing("swop");
    },
    until(gameState) {
      const headIsCurrent = gameState.currentCharacterName === "head";
      if (headIsCurrent) {
        // stop pressing jump/teleporter once teleporting has
        gameState.inputStateTracker.mockNotPressing("swop");
      }
      return headIsCurrent;
    },
  });

  expect(gameState.currentCharacterName).toEqual("head");

  // use the teleporter
  playGameThrough(gameState, {
    frameRate: { fps: [15] }, // keep frame rate low to reduce computation

    setupInitialInput(mockInputStateTracker) {
      mockInputStateTracker.mockPressing("jump");
    },
    until(gameState) {
      const headIsTeleporting = headState(gameState).teleporting !== null;
      if (headIsTeleporting) {
        // stop pressing jump/teleporter once teleporting has
        gameState.inputStateTracker.mockNotPressing("jump");
      }
      return headIsTeleporting;
    },
  });

  // wait until teleported on top of Heels:
  playGameThrough(gameState, {
    frameRate: { fps: [15] }, // keep frame rate low to reduce computation
    until(gameState) {
      return headState(gameState).standingOnItemId === "heels";
    },
  });

  expect(headState(gameState).box).toMatchInlineSnapshot(`
    {
      "x": 1,
      "xd": 12,
      "y": 33,
      "yd": 12,
      "z": 12,
      "zd": 12,
    }
  `);
  expect(heelsState(gameState).box).toMatchInlineSnapshot(`
    {
      "x": 1,
      "xd": 12,
      "y": 33,
      "yd": 12,
      "z": 0,
      "zd": 12,
    }
  `);
});

test("Heels can carry a teleporter through a same-room teleporter", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      heels: {
        type: "player",
        position: { x: 0, y: 2, z: 3 },
        config: {
          which: "heels",
        },
      },
      bag: {
        type: "pickup",
        position: { x: 0, y: 2, z: 2 },
        config: {
          gives: "bag",
        },
      },
      portableTeleporter: {
        type: "portableTeleporter",
        position: { x: 0, y: 2, z: 1 },
        config: { toRoom: firstRoomId, toItemId: "nowhere" },
      },
      sendingTeleporter: {
        type: "teleporter",
        position: { x: 0, y: 2, z: 0 },
        config: { toRoom: firstRoomId, toItemId: "receivingTeleporter" },
      },
      receivingTeleporter: {
        type: "teleporter",
        position: { x: 4, y: 4, z: 0 },
        config: { toRoom: firstRoomId, toItemId: "sendingTeleporter" },
      },
    },
  });

  // pick up the portable teleporter
  playGameThrough(gameState, {
    frameRate: { fps: [15] }, // keep frame rate low to reduce computation

    setupInitialInput(mockInputStateTracker) {
      mockInputStateTracker.mockPressing("carry");
    },
    until(gameState) {
      const isCarrying = heelsState(gameState).carrying !== null;
      if (isCarrying) {
        // stop pressing jump/teleporter once teleporting has
        gameState.inputStateTracker.mockNotPressing("carry");
      }
      return isCarrying;
    },
  });

  // use the teleporter by pressing jump
  playGameThrough(gameState, {
    frameRate: { fps: [15] },

    setupInitialInput(mockInputStateTracker) {
      mockInputStateTracker.mockPressing("jump");
    },
    until(gameState) {
      if (heelsState(gameState).teleporting !== null) {
        gameState.inputStateTracker.mockNotPressing("jump");
      }
      return heelsState(gameState).standingOnItemId === "receivingTeleporter";
    },
  });

  // should be on the receiving teleporter and still carrying the portable teleporter
  expect(heelsState(gameState).standingOnItemId).toEqual("receivingTeleporter");
  const { carrying } = heelsState(gameState);
  expect(carrying).toMatchObject<Partial<NonNullable<typeof carrying>>>({
    id: "portableTeleporter",
    type: "portableTeleporter",
  });

  expect(heelsState(gameState).box).toMatchInlineSnapshot(`
    {
      "x": 65,
      "xd": 12,
      "y": 65,
      "yd": 12,
      "z": 12,
      "zd": 12,
    }
  `);
});

test("teleporting when destination teleporter is missing leaves player in the same place in the same room", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      heels: {
        type: "player",
        position: { x: 0, y: 2, z: 1 },
        config: {
          which: "heels",
        },
      },
      teleporter: {
        type: "teleporter",
        position: { x: 0, y: 2, z: 0 },
        config: { toRoom: secondRoomId },
      },
    },
    // no teleporters in destination room
    secondRoomItems: {},
  });

  const originalPosition = heelsState(gameState).box;

  playGameThrough(gameState, {
    frameRate: { fps: [15] }, // keep frame rate low to reduce computation

    setupInitialInput(mockInputStateTracker) {
      mockInputStateTracker.mockPressing("jump");
    },
    until(gameState) {
      return gameState.gameTime > 5_000;
    },
  });

  // game should not have crashed; heels stays in the original room
  expect(gameState.characterRooms.heels?.id).toEqual("firstRoom");
  expect(heelsState(gameState).box).toEqual(originalPosition);
});

test("intra-room teleport does not overwrite door entry state, so respawn after death is near the door", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      heels: {
        type: "player",
        position: { x: 3.5, y: 7, z: 0 },
        config: { which: "heels" },
      },
      doorToSecondRoom: {
        type: "door",
        position: { x: 3, y: 8, z: 0 },
        config: { direction: "away", toRoom: secondRoomId },
      },
    },
    secondRoomItems: {
      doorToFirstRoom: {
        type: "door",
        position: { x: 3, y: 0, z: 1 },
        config: { direction: "towards", toRoom: firstRoomId },
      },
      bridge: {
        type: "block",
        position: { x: 3, y: 0, z: 0 },
        config: { style: "organic", times: { x: 2, y: 4 } },
      },
      teleporter: {
        type: "teleporter",
        position: { x: 3.5, y: 4, z: 0 },
        config: { toItemId: "deadlyBlock" },
      },
      deadlyBlock: {
        type: "deadlyBlock",
        position: { x: 0, y: 7, z: 0 },
        config: { style: "volcano" },
      },
    },
  });

  // walk heels through the door into room 2
  playGameThrough(gameState, {
    frameRate: { fps: [15] },
    setupInitialInput(mockInputStateTracker) {
      mockInputStateTracker.mockDirectionPressed = "away";
    },
    until(gameState) {
      return gameState.characterRooms.heels?.id === "secondRoom";
    },
  });

  // heels entered room 2 near the door (low y). The teleport destination is at high y.
  const entryY = heelsState(gameState).box.y;
  const startingLives = heelsState(gameState).lives as number;

  // walk away from the door onto the teleporter, teleport to deadly block, die
  playGameThrough(gameState, {
    frameRate: { fps: [15] },
    until(gameState) {
      if (heelsState(gameState).standingOnItemId === "teleporter") {
        gameState.inputStateTracker.mockDirectionPressed = undefined;
        gameState.inputStateTracker.mockPressing("jump");
      }
      if (heelsState(gameState).teleporting !== null) {
        gameState.inputStateTracker.mockNotPressing("jump");
      }
      return heelsState(gameState).lives === startingLives - 1;
    },
  });

  // heels should have respawned at the door entry position, not the teleport destination
  expect(heelsState(gameState).box.y).toBeLessThan(entryY + 1);
});

test.for([{ otherCharacterPresent: false }, { otherCharacterPresent: true }])(
  "cross-room teleport respawn replays fade-in with restamped roomTime (other character present: $otherCharacterPresent)",
  ({ otherCharacterPresent }) => {
    const gameState = setUpBasicGame({
      firstRoomItems: {
        head: {
          type: "player",
          position: { x: 0, y: 2, z: 1 },
          config: { which: "head" },
        },
        teleporter: {
          type: "teleporter",
          position: { x: 0, y: 2, z: 0 },
          config: { toRoom: secondRoomId, toItemId: "landingBlock" },
        },
      },
      secondRoomItems: {
        landingBlock: {
          type: "block",
          position: { x: 0, y: 2, z: 0 },
          config: { style: "organic" },
        },
        toaster: {
          type: "deadlyBlock",
          position: { x: 2, y: 2, z: 0 },
          config: { style: "toaster" },
        },
        ...(otherCharacterPresent ?
          {
            heels: {
              type: "player" as "player",
              position: { x: 4, y: 4, z: 0 },
              config: { which: "heels" as "heels" },
            },
          }
        : {}),
      },
    });

    const startingLives = headState(gameState).lives as number;

    // teleport to the second room
    playGameThrough(gameState, {
      setupInitialInput(mockInputStateTracker) {
        mockInputStateTracker.mockPressing("jump");
      },
      until(gameState) {
        if (headState(gameState).teleporting !== null) {
          gameState.inputStateTracker.mockNotPressing("jump");
        }
        return (
          gameState.characterRooms.head?.id === "secondRoom" &&
          headState(gameState).standingOnItemId === "landingBlock"
        );
      },
    });

    // entry state should have captured the teleport-in phase
    expect(gameState.entryState.head?.teleporting?.phase).toEqual("in");

    // walk onto the toaster to die
    playGameThrough(gameState, {
      setupInitialInput(mockInputStateTracker) {
        mockInputStateTracker.mockDirectionPressed = "left";
      },
      until(gameState) {
        return headState(gameState).lives === startingLives - 1;
      },
    });

    // after respawn, should be fading in (not out)
    expect<string | undefined>(headState(gameState).teleporting?.phase).toEqual(
      "in",
    );

    // teleporting.startRoomTime should be restamped to the current room time
    const room = gameState.characterRooms.head!;
    // comparing in seconds at 1dp means the test passes if a few frames happened since
    expect(
      (headState(gameState).teleporting?.startRoomTime ?? 0) / 1_000,
    ).toBeCloseTo(room.roomTime / 1_000, 1);
  },
);

test("teleporting clamps position so player doesn't overhang destination", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      heels: {
        type: "player",
        // fractional position puts heels off-centre on the source teleporter,
        // so relative offset will cause overhang at the destination:
        position: { x: 0.4, y: 0.4, z: 1 },
        config: {
          which: "heels",
        },
      },
      teleporter: {
        type: "teleporter",
        position: { x: 0, y: 0, z: 0 },
        config: { toRoom: secondRoomId, toItemId: "destinationTeleporter" },
      },
    },
    secondRoomItems: {
      destinationTeleporter: {
        type: "teleporter",
        position: { x: 4, y: 4, z: 0 },
        config: {},
      },
    },
  });

  playGameThrough(gameState, {
    frameRate: { fps: [15] },

    setupInitialInput(mockInputStateTracker) {
      mockInputStateTracker.mockPressing("jump");
    },
    until(gameState) {
      if (heelsState(gameState).teleporting !== null) {
        gameState.inputStateTracker.mockNotPressing("jump");
      }
      return heelsState(gameState).standingOnItemId === "destinationTeleporter";
    },
  });

  expect(heelsState(gameState).box).toMatchInlineSnapshot(`
    {
      "x": 68,
      "xd": 12,
      "y": 68,
      "yd": 12,
      "z": 12,
      "zd": 12,
    }
  `);
});

test("teleporter generates a companion help-text emitter", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      heels: {
        type: "player",
        position: { x: 4, y: 4, z: 1 },
        config: { which: "heels" },
      },
      teleporter: {
        type: "teleporter",
        position: { x: 0, y: 2, z: 0 },
        config: {},
      },
    },
  });

  const room = selectCurrentRoomState(gameState)!;
  const emitter = roomItemsIterable(room.items)
    .filter((item) => item.type === "emitter")
    .toArray();

  expect(emitter).toHaveLength(1);
  const [helpEmitter] = emitter;

  expect(helpEmitter.id).toBe("teleporter-help");
  expect(helpEmitter.config.whenPlayerInside).toBe(true);
  expect(helpEmitter.state.emits).toEqual({
    type: "floatingText",
    config: { textLines: ["Press jump", "to teleport"], sway: true },
  });
  expect(helpEmitter.state.box).toEqual({
    x: 0,
    y: 32,
    z: 12,
    xd: expect.closeTo(16),
    yd: expect.closeTo(16),
    zd: expect.closeTo(1.2),
  });
});
