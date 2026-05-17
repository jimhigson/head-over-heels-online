import { afterAll, beforeAll, describe, expect, test } from "vitest";

import {
  roomItemsIterable,
  roomSpatialIndexKey,
  type RoomState,
} from "../../../model/RoomState";
import { epsilon } from "../../../utils/epsilon";
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

        test("doors have correct inHiddenWall/inHidden flags", () => {
          for (const item of roomItemsIterable(roomState.items)) {
            if (item.type === "doorFrame") {
              expect(item.config).toHaveProperty(
                "inHiddenWall",
                item.config.direction === "right" ||
                  item.config.direction === "towards",
              );
            }
            if (item.type === "portal") {
              expect(item.config).toHaveProperty(
                "inHidden",
                item.config.direction.x < -epsilon ||
                  item.config.direction.y < -epsilon,
              );
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

        test("corner shadow blocker only loads if room has hidden doors on two sides", () => {
          const hasRightAndTowards =
            size.x > 2 &&
            size.y > 2 &&
            doorDirections.includes("right") &&
            doorDirections.includes("towards");

          const cornerShadows = roomItemsIterable(roomState.items)
            .filter(
              (item) =>
                item.type === "blocker" &&
                item.id.startsWith("extraCornerShadow-"),
            )
            .toArray();

          expect(cornerShadows.length).toBe(hasRightAndTowards ? 1 : 0);
        });
      });
    });
  });
});
