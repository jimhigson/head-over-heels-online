// @vitest-environment happy-dom
import { afterEach, beforeEach, expect, test } from "vitest";

import { setUpBasicGame } from "../../../_testUtils/basicRoom";
import { itemState } from "../../../_testUtils/characterState";
import { describedForAllFrameRates } from "../../../_testUtils/describedForAllFrameRates";
import { resetStore } from "../../../_testUtils/initStoreForTests";
import { makeCollisionCounter } from "../../../_testUtils/makeCollisionCounter";
import { makeTestRenderState } from "../../../_testUtils/makeTestRenderState";
import { playGameThrough } from "../../../_testUtils/playGameThrough";
import {
  enoughTimeForSoundsToFade,
  loadSoundsForTest,
  makeSoundStartCounter,
  playingSourcesOf,
  resetSoundsForTest,
  soundPlayback,
} from "../../../_testUtils/sounds/soundTestUtils";
import { roomItemsIterable } from "../../../model/roomItemsInPlayIterators";
import { epsilon } from "../../../utils/epsilon";
import {
  boxIntersection,
  lengthXyz,
  type XyzBox,
} from "../../../utils/vectors/vectors";
import { selectCurrentRoomState } from "../../gameState/gameStateSelectors/selectCurrentRoomState";
import { moveSpeedPixPerMs } from "../../physics/mechanicsConstants";

beforeEach(async () => {
  resetStore();
  await loadSoundsForTest();
});

afterEach(() => {
  resetSoundsForTest();
});

/**
 * how long the ski heads knock the ball back and forth for - long enough for
 * many bumps and rolls
 */
const playTime = 20_000;

/**
 * how far one box is from another along x, or 0 if they meet or overlap
 */
const gapAlongX = (a: Readonly<XyzBox>, b: Readonly<XyzBox>): number =>
  Math.max(0, b.x - (a.x + a.xd), a.x - (b.x + b.xd));

/**
 * how deep two boxes overlap - 0 if they only meet, or don't touch at all
 */
const overlapDepth = (a: Readonly<XyzBox>, b: Readonly<XyzBox>): number => {
  const { xd, yd, zd } = boxIntersection(a, b);
  return Math.max(0, Math.min(xd, yd, zd));
};

type ViolationSummary = {
  count: number;
  firstAtGameTime: number;
  firstDetail: unknown;
};

describedForAllFrameRates((frameRate) => {
  test("two ski heads knocking a ball back and forth: its sliding, rolling sound and bump sounds stay consistent", () => {
    const gameState = setUpBasicGame({
      firstRoomItems: {
        heels: {
          type: "player",
          position: { x: 4, y: 4, z: 0 },
          config: { which: "heels" },
        },
        // the ball, and a ski head either side of it, all in the same row so
        // they only ever move along x:
        ball: {
          type: "ball",
          position: { x: 4, y: 0, z: 0 },
          config: {},
        },
        skiHeadHeadingLeft: {
          type: "monster",
          position: { x: 2, y: 0, z: 0 },
          config: {
            which: "skiHead",
            style: "greenAndPink",
            activated: "on",
            movement: "back-forth",
            startDirection: "left",
          },
        },
        skiHeadHeadingRight: {
          type: "monster",
          position: { x: 7, y: 0, z: 0 },
          config: {
            which: "skiHead",
            style: "greenAndPink",
            activated: "on",
            movement: "back-forth",
            startDirection: "right",
          },
        },
      },
    });
    const renderState = makeTestRenderState();
    const ballHits = makeSoundStartCounter(renderState, "ballHit");
    const bumpsWithSkiHeadHeadingLeft = makeCollisionCounter(
      "ball",
      "skiHeadHeadingLeft",
    );
    const bumpsWithSkiHeadHeadingRight = makeCollisionCounter(
      "ball",
      "skiHeadHeadingRight",
    );

    const violations = new Map<string, ViolationSummary>();
    const violated = (invariant: string, detail: unknown) => {
      violations.getOrInsertComputed(invariant, () => ({
        count: 0,
        firstAtGameTime: gameState.gameTime,
        firstDetail: detail,
      })).count++;
    };

    const ballStartBox = itemState<"ball">(gameState, "ball").box;
    let previousGameTime = gameState.gameTime;
    let wasSliding = false;
    let wasRolling = false;
    let wasPushed = false;
    let wasCollided = false;
    let hitStartedOnPreviousFrame = false;
    let rolledAtAll = false;
    // the latest time the ball's rolling or being pushed - the two things
    // its rolling sound plays for - started or stopped:
    let rollingOrPushedChangedAtGameTime = gameState.gameTime;
    let lastRollingOrPushedAtGameTime = Number.NEGATIVE_INFINITY;

    playGameThrough(gameState, renderState, {
      frameRate,
      forTime: playTime,
      frameCallbacks(gameState) {
        const hitsBefore = ballHits.count;
        ballHits.frameCallback();
        const hitStartedThisFrame = ballHits.count > hitsBefore;
        bumpsWithSkiHeadHeadingLeft.frameCallback(gameState);
        bumpsWithSkiHeadHeadingRight.frameCallback(gameState);

        const room = selectCurrentRoomState(gameState)!;
        const ball = itemState<"ball">(gameState, "ball");
        const frameDeltaMs = gameState.gameTime - previousGameTime;
        const slidingSpeed = lengthXyz(ball.vels.sliding);
        const sliding = slidingSpeed !== 0;
        const rolling = sliding && ball.standingOnItemId !== null;
        const pushed =
          ball.actedOnAt.roomTime > room.roomFrameStartTime &&
          ball.actedOnAt.actedInXY;
        const collidedThisFrame =
          ball.collidedWith.roomTime > room.roomFrameStartTime;
        rolledAtAll ||= rolling;

        if (
          sliding &&
          Math.abs(slidingSpeed - moveSpeedPixPerMs.ball) >= epsilon
        ) {
          violated("slides at a speed other than a ball's", slidingSpeed);
        }

        if (ball.box.y !== ballStartBox.y || ball.box.z !== ballStartBox.z) {
          violated("leaves its row", ball.box);
        }

        for (const item of roomItemsIterable(room.items)) {
          if (
            (item.type === "wall" || item.type === "monster") &&
            overlapDepth(ball.box, item.state.box) > epsilon
          ) {
            violated("overlaps a ski head or wall", item.id);
          }
        }

        if (sliding && !wasSliding) {
          const nearestSkiHeadGap = Math.min(
            gapAlongX(
              ball.box,
              itemState<"monster">(gameState, "skiHeadHeadingLeft").box,
            ),
            gapAlongX(
              ball.box,
              itemState<"monster">(gameState, "skiHeadHeadingRight").box,
            ),
          );
          // since being pushed, the ball and its pusher can only have moved
          // apart at their speeds combined, for at most this frame:
          if (
            nearestSkiHeadGap >
            (moveSpeedPixPerMs.ball + moveSpeedPixPerMs.skiHead) *
              frameDeltaMs +
              epsilon
          ) {
            violated(
              "starts sliding with no ski head near enough to have pushed it",
              nearestSkiHeadGap,
            );
          }
        }

        if (!sliding && wasSliding && !collidedThisFrame) {
          violated("stops sliding without colliding", ball.box);
        }

        if (
          rolling &&
          soundPlayback(renderState, "rollingBallLoop") !== "loop"
        ) {
          violated("rolls without its rolling sound", ball.box);
        }

        if (rolling || pushed) {
          lastRollingOrPushedAtGameTime = gameState.gameTime;
        }
        if (rolling !== wasRolling || pushed !== wasPushed) {
          rollingOrPushedChangedAtGameTime = gameState.gameTime;
        }
        const quietForLongerThanAFade =
          gameState.gameTime - lastRollingOrPushedAtGameTime >
          enoughTimeForSoundsToFade;
        if (
          quietForLongerThanAFade &&
          soundPlayback(renderState, "rollingBallLoop") !== "notPlaying"
        ) {
          violated("its rolling sound plays on while it is still", ball.box);
        }

        if (
          wasRolling &&
          !rolling &&
          !hitStartedThisFrame &&
          // a collision on the frame straight after a heard bump, with the same
          // items, is part of that bump:
          !hitStartedOnPreviousFrame
        ) {
          violated(
            "stops rolling without a bump sound on this frame or the one before",
            {
              collidedWith: Object.keys(ball.collidedWith.by),
              collidedThisFrame,
              collidedOnPreviousFrame: wasCollided,
              frameDeltaMs,
            },
          );
        }

        if (hitStartedThisFrame && !collidedThisFrame) {
          violated("plays a bump sound without colliding", ball.box);
        }

        // any rolling sound left over from before has had time to fade out:
        const settledForLongerThanAFade =
          gameState.gameTime - rollingOrPushedChangedAtGameTime >
          enoughTimeForSoundsToFade;
        const rollingSounds = playingSourcesOf(renderState, "rollingBallLoop");
        if (settledForLongerThanAFade && rollingSounds > 1) {
          violated(
            "plays its rolling sound more than once at a time",
            rollingSounds,
          );
        }

        previousGameTime = gameState.gameTime;
        wasSliding = sliding;
        wasRolling = rolling;
        wasPushed = pushed;
        wasCollided = collidedThisFrame;
        hitStartedOnPreviousFrame = hitStartedThisFrame;
      },
    });

    const bumps =
      bumpsWithSkiHeadHeadingLeft.count + bumpsWithSkiHeadHeadingRight.count;
    expect(
      bumps > 0 && rolledAtAll,
      "the ball was knocked about, so the invariants were tested",
    ).toBe(true);
    expect(Object.fromEntries(violations)).toEqual({});
    expect(
      ballHits.count,
      "bump sounds - at most one for each bump",
    ).toBeLessThanOrEqual(bumps);
  });
});
