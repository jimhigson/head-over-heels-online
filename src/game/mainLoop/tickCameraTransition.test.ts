import { expect, test } from "vitest";

import { cameraAngleBase } from "../../utils/vectors/cameraAngleVectors";
import { crossProductXy, type Xy } from "../../utils/vectors/vectors";
import {
  type CameraRotationDirection,
  type CameraTransitionCarrier,
  cameraTransitionDurationMs,
  startCameraRotation,
  tickCameraTransition,
} from "./tickCameraTransition";
import { transitionCameraAngle } from "./transitionCameraAngle";

const base: Xy = { x: 1, y: 0 };
const anticlockwise: Xy = { x: 0, y: 1 };
const clockwise: Xy = { x: 0, y: -1 };

const baseCarrier = (): CameraTransitionCarrier => ({
  targetCameraAngle: cameraAngleBase,
});

/** the continuous angle a frame renders at - what the player actually sees */
const renderedAngle = (gs: CameraTransitionCarrier): Xy => {
  const t = gs.cameraTransition;
  return t === undefined ?
      gs.targetCameraAngle
    : transitionCameraAngle(t.fromAngle, t.arc, t.progress, t.startSlope);
};

/**
 * tap `direction` `taps` times, then play the whole transition out frame by
 * frame, asserting the rendered angle only ever winds in the tapped direction
 * (positive cross product between consecutive frames = anticlockwise motion).
 * This is the observable behaviour - stacked taps must always turn the way
 * the player pressed, never flip to the shorter path to the same endpoint
 */
const expectMonotonicWinding = (
  direction: CameraRotationDirection,
  taps: number,
) => {
  const gs = baseCarrier();
  for (let i = 0; i < taps; i++) {
    startCameraRotation(gs, direction);
  }
  const expectedSign = direction === "anticlockwise" ? 1 : -1;
  let prev = renderedAngle(gs);
  let sweptFrames = 0;
  while (tickCameraTransition(gs, 16)) {
    const current = renderedAngle(gs);
    const winding = crossProductXy(prev, current);
    if (winding !== 0) {
      expect(
        Math.sign(winding),
        `frame winding must stay ${direction} (cross ${winding})`,
      ).toBe(expectedSign);
      sweptFrames++;
    }
    prev = current;
  }
  // the loop genuinely moved (guards against a transition that never plays):
  expect(sweptFrames).toBeGreaterThan(0);
};

test("three clockwise taps rotate clockwise for the whole transition", () => {
  expectMonotonicWinding("clockwise", 3);
});

test("three anticlockwise taps rotate anticlockwise for the whole transition", () => {
  expectMonotonicWinding("anticlockwise", 3);
});

test("starting a rotation updates the discrete target angle immediately", () => {
  const gs = baseCarrier();
  startCameraRotation(gs, "clockwise");
  expect<Xy>(gs.targetCameraAngle).toEqual<Xy>(clockwise);
});

test("anticlockwise turns to the other side", () => {
  const gs = baseCarrier();
  startCameraRotation(gs, "anticlockwise");
  expect<Xy>(gs.targetCameraAngle).toEqual<Xy>(anticlockwise);
});

test("starting a rotation opens a transition from the previous angle at progress 0", () => {
  const gs = baseCarrier();
  startCameraRotation(gs, "clockwise");
  expect(gs.cameraTransition).toEqual({
    fromAngle: base,
    // a quarter turn clockwise (negative is clockwise):
    arc: -Math.PI / 2,
    progress: 0,
    durationMs: cameraTransitionDurationMs,
    startSlope: 0,
  });
});

test("advancing with no active transition is a no-op returning false", () => {
  const gs = baseCarrier();
  expect(tickCameraTransition(gs, 16)).toBe(false);
});

test("progress advances linearly by deltaMS / duration", () => {
  const gs = baseCarrier();
  startCameraRotation(gs, "clockwise");
  tickCameraTransition(gs, cameraTransitionDurationMs / 4);
  expect(gs.cameraTransition?.progress).toBeCloseTo(0.25);
});

test("progress accumulates across frames", () => {
  const gs = baseCarrier();
  startCameraRotation(gs, "clockwise");
  tickCameraTransition(gs, cameraTransitionDurationMs / 4);
  tickCameraTransition(gs, cameraTransitionDurationMs / 4);
  expect(gs.cameraTransition?.progress).toBeCloseTo(0.5);
});

test("a transition still running returns true", () => {
  const gs = baseCarrier();
  startCameraRotation(gs, "clockwise");
  expect(tickCameraTransition(gs, cameraTransitionDurationMs / 2)).toBe(true);
});

test("reaching the duration completes the transition (cleared)", () => {
  const gs = baseCarrier();
  startCameraRotation(gs, "clockwise");
  tickCameraTransition(gs, cameraTransitionDurationMs);
  expect(gs.cameraTransition).toBeUndefined();
});

test("completing returns false", () => {
  const gs = baseCarrier();
  startCameraRotation(gs, "clockwise");
  expect(tickCameraTransition(gs, cameraTransitionDurationMs)).toBe(false);
});

test("the target angle persists after the transition completes", () => {
  const gs = baseCarrier();
  startCameraRotation(gs, "clockwise");
  tickCameraTransition(gs, cameraTransitionDurationMs);
  expect<Xy>(gs.targetCameraAngle).toEqual<Xy>(clockwise);
});

test("a zero delta leaves the progress where it was set, without completing", () => {
  const gs = baseCarrier();
  startCameraRotation(gs, "clockwise");
  gs.cameraTransition!.progress = 0.7;
  // the transition advances on the game-speed-scaled clock, so at zero game
  // speed it stays put - which is how tests pin the camera mid-turn:
  const stillActive = tickCameraTransition(gs, 0);
  expect({ stillActive, progress: gs.cameraTransition?.progress }).toEqual({
    stillActive: true,
    progress: 0.7,
  });
});

test("a second same-direction tap mid-turn retargets a further quarter on", () => {
  const gs = baseCarrier();
  startCameraRotation(gs, "clockwise"); // base -> clockwise (0,-1)
  tickCameraTransition(gs, cameraTransitionDurationMs / 2);
  startCameraRotation(gs, "clockwise"); // retarget to the half turn (-1,0)
  // (rotateXy yields a -0 y component, hence the abs):
  expect({
    angleX: gs.targetCameraAngle.x,
    angleY: Math.abs(gs.targetCameraAngle.y),
    progress: gs.cameraTransition?.progress,
  }).toEqual({ angleX: -1, angleY: 0, progress: 0 });
});

test("retargeting re-anchors fromAngle at the current interpolated angle", () => {
  const gs = baseCarrier();
  startCameraRotation(gs, "clockwise");
  tickCameraTransition(gs, cameraTransitionDurationMs / 2);
  startCameraRotation(gs, "clockwise");
  // half linear progress is half the eased 90° arc = 45° clockwise from base:
  const invSqrt2 = Math.SQRT1_2;
  expect({
    fromX: gs.cameraTransition?.fromAngle.x,
    fromY: gs.cameraTransition?.fromAngle.y,
  }).toEqual({
    fromX: expect.closeTo(invSqrt2),
    fromY: expect.closeTo(-invSqrt2),
  });
});

test("a retargeted transition's duration is proportional to its arc, capped at the full duration", () => {
  const gs = baseCarrier();
  startCameraRotation(gs, "clockwise");
  tickCameraTransition(gs, cameraTransitionDurationMs / 2);
  startCameraRotation(gs, "clockwise");
  // remaining arc is 45° (eased midpoint) + 90° = 135°, over the 90° cap:
  expect(gs.cameraTransition?.durationMs).toBe(cameraTransitionDurationMs);
});

test("an opposite tap mid-turn cancels, rotating back over a shortened duration", () => {
  const gs = baseCarrier();
  startCameraRotation(gs, "clockwise");
  tickCameraTransition(gs, cameraTransitionDurationMs / 2);
  startCameraRotation(gs, "anticlockwise");
  // back to base, over the 45° already travelled: half the full duration
  expect({
    target: gs.targetCameraAngle,
    durationMs: gs.cameraTransition?.durationMs,
    progress: gs.cameraTransition?.progress,
  }).toEqual({
    target: base,
    durationMs: expect.closeTo(cameraTransitionDurationMs / 2),
    progress: 0,
  });
});

test("a same-direction retarget carries the angular velocity into the new curve's start slope", () => {
  const gs = baseCarrier();
  startCameraRotation(gs, "clockwise");
  tickCameraTransition(gs, cameraTransitionDurationMs / 2);
  startCameraRotation(gs, "clockwise");
  // at the smoothstep midpoint the slope is 1.5; the retargeted 135° arc at
  // the capped full duration reproduces the same angular velocity with a
  // start slope of (1.5 · 90°/500ms) · 500ms / 135° = 1:
  expect(gs.cameraTransition?.startSlope).toBeCloseTo(1);
});

test("a cancel's start slope is negative - still moving towards the old target", () => {
  const gs = baseCarrier();
  startCameraRotation(gs, "clockwise");
  tickCameraTransition(gs, cameraTransitionDurationMs / 2);
  startCameraRotation(gs, "anticlockwise");
  // same speed, but the 45° arc back is against it: (1.5 · 90°/500ms) ·
  // 250ms / -45° = -1.5:
  expect(gs.cameraTransition?.startSlope).toBeCloseTo(-1.5);
});

test("an opposite tap before any movement cancels with no transition", () => {
  const gs = baseCarrier();
  startCameraRotation(gs, "clockwise");
  startCameraRotation(gs, "anticlockwise");
  expect({
    target: gs.targetCameraAngle,
    transition: gs.cameraTransition,
  }).toEqual({ target: base, transition: undefined });
});

test("a same-direction double-tap before any movement is a 180° at full duration", () => {
  const gs = baseCarrier();
  startCameraRotation(gs, "clockwise");
  startCameraRotation(gs, "clockwise");
  expect({
    angleX: gs.targetCameraAngle.x,
    angleY: Math.abs(gs.targetCameraAngle.y),
    fromAngle: gs.cameraTransition?.fromAngle,
    durationMs: gs.cameraTransition?.durationMs,
    startSlope: gs.cameraTransition?.startSlope,
  }).toEqual({
    angleX: -1,
    angleY: 0,
    fromAngle: base,
    durationMs: cameraTransitionDurationMs,
    startSlope: expect.closeTo(0),
  });
});

test("a triple same-direction tap sweeps 270° the pressed way, never the shorter 90° opposite", () => {
  const gs = baseCarrier();
  startCameraRotation(gs, "anticlockwise");
  startCameraRotation(gs, "anticlockwise");
  startCameraRotation(gs, "anticlockwise");
  // the endpoint is one quarter clockwise of base, but the sweep must be the
  // three anticlockwise quarters the player asked for (positive arc):
  expect({
    target: { x: gs.targetCameraAngle.x, y: gs.targetCameraAngle.y },
    arc: gs.cameraTransition?.arc,
  }).toEqual({
    target: { x: expect.closeTo(0), y: expect.closeTo(-1) },
    arc: expect.closeTo((3 * Math.PI) / 2),
  });
});

test("a full circle of taps sweeps a whole revolution rather than standing still", () => {
  const gs = baseCarrier();
  startCameraRotation(gs, "clockwise");
  startCameraRotation(gs, "clockwise");
  startCameraRotation(gs, "clockwise");
  startCameraRotation(gs, "clockwise");
  // back to the base target, via a full clockwise revolution:
  expect({
    targetX: gs.targetCameraAngle.x,
    arc: gs.cameraTransition?.arc,
  }).toEqual({
    targetX: expect.closeTo(1),
    arc: expect.closeTo(-2 * Math.PI),
  });
});

test("stacked taps mid-turn accumulate the remaining arc in the pressed direction", () => {
  const gs = baseCarrier();
  startCameraRotation(gs, "anticlockwise");
  tickCameraTransition(gs, cameraTransitionDurationMs / 2);
  // 45° travelled (eased midpoint), 45° remaining; two more taps stack two
  // further quarters on the remainder:
  startCameraRotation(gs, "anticlockwise");
  startCameraRotation(gs, "anticlockwise");
  expect(gs.cameraTransition?.arc).toBeCloseTo(
    Math.PI / 4 + Math.PI / 2 + Math.PI / 2,
  );
});
