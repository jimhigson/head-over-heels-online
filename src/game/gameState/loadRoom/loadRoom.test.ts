import { afterAll, beforeAll, describe, expect, test } from "vitest";

import {
  roomItemsIterable,
  roomSpatialIndexKey,
  type RoomState,
} from "../../../model/RoomState";
import {
  type DirectionXy4,
  type Xy,
  type Xyz,
} from "../../../utils/vectors/vectors";
import { hasCollisionItemWithIndex } from "../../collision/aabbCollision";
import { makeRoomJsonWithDoors } from "./__testUtils/makeRoomJsonWithDoors";
import { loadRoom } from "./loadRoom";

type TestRoomState = RoomState<string, string>;

const loadTestRoom = (roomJson: Parameters<typeof loadRoom>[0]["roomJson"]) =>
  loadRoom({
    roomJson,
    scrollsRead: {},
    roomPickupsCollected: {},
    isNewGame: false,
    userSettings: { soundSettings: {}, displaySettings: {}, pokesEnabled: {} },
  }) as TestRoomState;

const roomOrigins: Xyz[] = [
  { x: 0, y: 0, z: 0 },
  { x: -2, y: -2, z: 0 },
  { x: 2, y: 2, z: 2 },
];

const doorCombinations: { doorDirections: DirectionXy4[] }[] = [
  { doorDirections: ["right"] },
  { doorDirections: ["towards"] },
  { doorDirections: ["left"] },
  { doorDirections: ["away"] },
  { doorDirections: ["right", "towards"] },
  { doorDirections: ["right", "away"] },
  { doorDirections: ["right", "left"] },
  { doorDirections: ["towards", "away"] },
  { doorDirections: ["towards", "left"] },
  { doorDirections: ["away", "left"] },
];

const doorZValues = [0, 2, -2];

const roomSizes: Xy[] = [
  { x: 8, y: 8 },
  { x: 2, y: 8 },
  { x: 8, y: 2 },
];

describe.for(roomOrigins)("loadRoom with doors (origin %j)", (origin) => {
  describe.for(roomSizes)("room size %j", (size) => {
    describe.for(doorZValues)("doorZ relative: %i", (doorZRelative) => {
      describe.for(doorCombinations)("doors: %j", ({ doorDirections }) => {
        let roomState: TestRoomState;

        beforeAll(() => {
          roomState = loadTestRoom(
            makeRoomJsonWithDoors(origin, size, doorDirections, doorZRelative),
          );
        });

        afterAll(() => {
          roomState = undefined!;
        });

        test("has one portal per door", () => {
          const portalCount = roomItemsIterable(roomState.items)
            .filter((item) => item.type === "portal")
            .toArray().length;

          expect(portalCount).toBe(doorDirections.length);
        });

        test("has one stopAutowalk per door", () => {
          const stopAutowalkCount = roomItemsIterable(roomState.items)
            .filter((item) => item.type === "stopAutowalk")
            .toArray().length;

          expect(stopAutowalkCount).toBe(doorDirections.length);
        });

        test("doorFrames are marked as on the floor edge", () => {
          // all doors in these generated rooms sit on the room boundary, so
          // every frame is on a floor edge (whether the wall is hidden is an
          // angle question answered at render time):
          for (const item of roomItemsIterable(roomState.items)) {
            if (item.type === "doorFrame") {
              expect(item.config).toHaveProperty("onFloorEdge", true);
            }
          }
        });

        test("doors have legs iff elevated above their wall", () => {
          const doorLegsCount = roomItemsIterable(roomState.items)
            .filter((item) => item.type === "doorLegs")
            .toArray().length;

          expect(doorLegsCount).toBe(
            doorZRelative === 0 ? 0 : doorDirections.length,
          );
        });

        test("has 3 doorFrames per door", () => {
          const doorFrameCount = roomItemsIterable(roomState.items)
            .filter((item) => item.type === "doorFrame")
            .toArray().length;

          expect(doorFrameCount).toBe(doorDirections.length * 3);
        });

        test("no doorFrame collides with a wall", () => {
          const spatialIndex = roomState[roomSpatialIndexKey];

          for (const doorFrame of roomItemsIterable(roomState.items).filter(
            (item) => item.type === "doorFrame",
          )) {
            const collidesWithWall = hasCollisionItemWithIndex(
              doorFrame,
              spatialIndex,
              (item) => item.type === "wall",
            );
            expect(collidesWithWall).toBe(false);
          }
        });

        test("corner shadow blockers load at every corner with doors on both sides", () => {
          // a corner qualifies when the doors are on adjacent sides (sharing
          // a corner) - opposite-side pairs share none. Rooms only 2 blocks
          // across have their short walls entirely consumed by the door, so
          // no wall touches the corner:
          const xSidesWithDoor = (["right", "left"] as const).filter((side) =>
            doorDirections.includes(side),
          ).length;
          const ySidesWithDoor = (["towards", "away"] as const).filter((side) =>
            doorDirections.includes(side),
          ).length;
          const adjacentPairs =
            size.x > 2 && size.y > 2 ? xSidesWithDoor * ySidesWithDoor : 0;

          const cornerShadows = roomItemsIterable(roomState.items)
            .filter(
              (item) =>
                item.type === "blocker" &&
                item.id.startsWith("extraCornerShadow-"),
            )
            .toArray();

          expect(cornerShadows.length).toBe(adjacentPairs);
        });
      });
    });
  });
});
