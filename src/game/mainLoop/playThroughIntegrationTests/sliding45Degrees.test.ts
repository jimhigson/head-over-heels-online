import { beforeEach, describe, expect, test } from "vitest";

import {
  basicRoomSize,
  type ItemsInTestRoomJson,
  setUpBasicGame,
} from "../../../_testUtils/basicRoom";
import { heelsState, itemState } from "../../../_testUtils/characterState";
import { describedForAllFrameRates } from "../../../_testUtils/describedForAllFrameRates";
import { resetStore } from "../../../_testUtils/initStoreForTests";
import type { GameStateWithMockInput } from "../../../_testUtils/MockInputStateTracker";
import {
  playGameThrough,
  type UntilFunction,
} from "../../../_testUtils/playGameThrough";
import {
  hasCollided,
  hasCollidedWithItemOfType,
} from "../../../_testUtils/playThroughUntilHelpers";
import {
  type AxisXy,
  lengthXyz,
  subXyz,
  type Xyz,
} from "../../../utils/vectors/vectors";

beforeEach(() => {
  resetStore();
});

/**
 * how a row of blocks along the wall is set up
 */
type BlockRowKind =
  "block-row" | "none" | "pushableBlock-row" | "pushableBlock-single";

type SlideAlongWallCase = {
  /**
   * on the floor, flush against the wall
   */
  wallRow: BlockRowKind;
  /**
   * on top of the wall row
   */
  stackedRow: BlockRowKind;
  /**
   * on the floor, flush against the wall row
   */
  secondRow: BlockRowKind;
  heelsStartsOn: "floor" | "secondRow" | "wallRow";
};

const wallAxes = ["x", "y"] as const satisfies AxisXy[];

const slideAlongWallWarmUpTime = 500;
const slideAlongWallTime = 500;
/**
 * heels' walking speed, scaled by √½ for the along-wall part of a diagonal walk
 */
const slideAlongWallSpeed = 0.035_36;
/**
 * a single block pushed along the floor against the wall - slower, from its
 * friction on the floor
 */
const pushSingleBlockAlongWallSpeed = 0.009_334;

/**
 * heels is smaller than a block, so starts centred in this cell with a gap
 * to her neighbours
 */
const heelsStartAlongWall = 0;
const singleBlockId = "single";

/**
 * positions are written for the far-y wall, and swapped x↔y for the far-x one
 */
const onWallAxis = (wallAxis: AxisXy, { x, y, z }: Xyz): Xyz =>
  wallAxis === "y" ? { x, y, z } : { x: y, y: x, z };

const blockRowItems = (
  wallAxis: AxisXy,
  rowName: string,
  rowKind: BlockRowKind,
  /**
   * the row's position across the wall, in blocks
   */
  across: number,
  z: number,
): ItemsInTestRoomJson => {
  switch (rowKind) {
    case "none":
      return {};
    case "pushableBlock-single":
      return {
        [singleBlockId]: {
          type: "pushableBlock",
          // in the next cell along the wall from heels:
          position: onWallAxis(wallAxis, {
            x: heelsStartAlongWall + 1,
            y: across,
            z,
          }),
          config: {},
        },
      };
    case "pushableBlock-row":
      return Object.fromEntries(
        Array.from({ length: basicRoomSize.x }, (_, along) => [
          `${rowName}${along}`,
          {
            type: "pushableBlock",
            position: onWallAxis(wallAxis, { x: along, y: across, z }),
            config: {},
          },
        ]),
      );
    case "block-row":
      return Object.fromEntries(
        Array.from({ length: basicRoomSize.x }, (_, along) => [
          `${rowName}${along}`,
          {
            type: "block",
            position: onWallAxis(wallAxis, { x: along, y: across, z }),
            config: { style: "organic" },
          },
        ]),
      );
    default:
      throw rowKind satisfies never;
  }
};

const wallLane = basicRoomSize.y - 1;
const secondLane = wallLane - 1;

const heelsZFor = ({ heelsStartsOn }: SlideAlongWallCase) =>
  heelsStartsOn === "floor" ? 0 : 1;

/**
 * the row in the wall lane at heels' height
 */
const rowNameAtHeelsHeight = (slideAlongWallCase: SlideAlongWallCase) =>
  heelsZFor(slideAlongWallCase) === 0 ? "wallRow" : "stackedRow";

const rowKindAtHeelsHeight = (slideAlongWallCase: SlideAlongWallCase) =>
  slideAlongWallCase[rowNameAtHeelsHeight(slideAlongWallCase)];

/**
 * heels has reached what she slides along, or started pushing the single block
 */
const hasReachedSlideTarget = (
  gameState: GameStateWithMockInput,
  slideAlongWallCase: SlideAlongWallCase,
): UntilFunction => {
  const rowKind = rowKindAtHeelsHeight(slideAlongWallCase);
  switch (rowKind) {
    case "pushableBlock-single": {
      // pushing doesn't always record a collision, so wait for the block to move:
      const singleBlockStart = itemState<"pushableBlock">(
        gameState,
        singleBlockId,
      ).box;
      return (gameState) =>
        itemState<"pushableBlock">(gameState, singleBlockId).box !==
        singleBlockStart;
    }
    case "pushableBlock-row":
    case "block-row":
      return hasCollided(
        "heels",
        `${rowNameAtHeelsHeight(slideAlongWallCase)}${heelsStartAlongWall}`,
      );
    case "none":
      return hasCollidedWithItemOfType("heels", "wall");
    default:
      throw rowKind satisfies never;
  }
};

const slideAlongWallItems = (
  wallAxis: AxisXy,
  slideAlongWallCase: SlideAlongWallCase,
): ItemsInTestRoomJson => {
  const { wallRow, stackedRow, secondRow } = slideAlongWallCase;
  const rowKind = rowKindAtHeelsHeight(slideAlongWallCase);
  // heels is in the wall lane unless a full row there blocks her:
  const heelsAcross =
    rowKind === "pushableBlock-row" || rowKind === "block-row" ?
      secondLane
    : wallLane;

  return {
    heels: {
      type: "player",
      position: onWallAxis(wallAxis, {
        x: heelsStartAlongWall,
        y: heelsAcross,
        z: heelsZFor(slideAlongWallCase),
      }),
      config: { which: "heels" },
    },
    ...blockRowItems(wallAxis, "wallRow", wallRow, wallLane, 0),
    ...blockRowItems(wallAxis, "stackedRow", stackedRow, wallLane, 1),
    ...blockRowItems(wallAxis, "secondRow", secondRow, secondLane, 0),
  };
};

const hasSingleBlock = ({
  wallRow,
  stackedRow,
  secondRow,
}: SlideAlongWallCase) =>
  [wallRow, stackedRow, secondRow].includes("pushableBlock-single");

describedForAllFrameRates((frameRate) => {
  describe.for(wallAxes)("against the far-%s wall", (wallAxis) => {
    test.for<SlideAlongWallCase>([
      {
        wallRow: "none",
        stackedRow: "none",
        secondRow: "none",
        heelsStartsOn: "floor",
      },
      {
        wallRow: "block-row",
        stackedRow: "none",
        secondRow: "none",
        heelsStartsOn: "floor",
      },
      {
        wallRow: "block-row",
        stackedRow: "none",
        secondRow: "none",
        heelsStartsOn: "wallRow",
      },
      {
        wallRow: "pushableBlock-row",
        stackedRow: "none",
        secondRow: "none",
        heelsStartsOn: "floor",
      },
      {
        wallRow: "pushableBlock-single",
        stackedRow: "none",
        secondRow: "none",
        heelsStartsOn: "floor",
      },
      {
        wallRow: "pushableBlock-row",
        stackedRow: "none",
        secondRow: "none",
        heelsStartsOn: "wallRow",
      },
      {
        wallRow: "pushableBlock-row",
        stackedRow: "pushableBlock-row",
        secondRow: "pushableBlock-row",
        heelsStartsOn: "secondRow",
      },
      {
        wallRow: "pushableBlock-row",
        stackedRow: "pushableBlock-single",
        secondRow: "pushableBlock-row",
        heelsStartsOn: "wallRow",
      },
    ])(
      "heels walking diagonally slides along the wall at the expected speed, wallRow: $wallRow, stackedRow: $stackedRow, secondRow: $secondRow, heels starts on: $heelsStartsOn",
      (slideAlongWallCase) => {
        const gameState = setUpBasicGame({
          firstRoomItems: slideAlongWallItems(wallAxis, slideAlongWallCase),
        });
        const singleBlockBox = () =>
          itemState<"pushableBlock">(gameState, singleBlockId).box;
        const withSingleBlock = hasSingleBlock(slideAlongWallCase);
        const expectedSpeed =
          withSingleBlock ? pushSingleBlockAlongWallSpeed : slideAlongWallSpeed;

        playGameThrough(gameState, {
          setupInitialInput(mockInputStateTracker) {
            mockInputStateTracker.mockDirectionPressed = "awayLeft";
          },
          frameRate,
          until: hasReachedSlideTarget(gameState, slideAlongWallCase),
          failAfter: 1_000,
        });
        // get up to speed against it before measuring:
        playGameThrough(gameState, {
          frameRate,
          forTime: slideAlongWallWarmUpTime,
        });

        const heelsStart = heelsState(gameState).box;
        const singleBlockStart = withSingleBlock ? singleBlockBox() : undefined;
        const startTime = gameState.gameTime;

        playGameThrough(gameState, {
          frameRate,
          forTime: slideAlongWallTime,
        });

        const elapsed = gameState.gameTime - startTime;
        const speedSince = (start: Xyz, end: Xyz) =>
          lengthXyz(subXyz(end, start)) / elapsed;

        expect({
          heelsSpeed: speedSince(heelsStart, heelsState(gameState).box),
          singleBlockSpeed:
            singleBlockStart === undefined ? undefined : (
              speedSince(singleBlockStart, singleBlockBox())
            ),
        }).toEqual({
          heelsSpeed: expect.closeTo(expectedSpeed, 4),
          singleBlockSpeed:
            withSingleBlock ? expect.closeTo(expectedSpeed, 4) : undefined,
        });
      },
    );
  });
});
