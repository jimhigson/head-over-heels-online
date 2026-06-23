import { expect, test } from "vitest";

import { cameraAngleBase, rotateXy, rotateXyz } from "./rotateXy";
import { type Xy, type Xyz } from "./vectors";

const quarterTurnAnticlockwise: Xy = { x: 0, y: 1 };
const quarterTurnClockwise: Xy = { x: 0, y: -1 };

test("the base angle leaves a vector unchanged", () => {
  expect<Xy>(rotateXy({ x: 3, y: 7 }, cameraAngleBase)).toEqual<Xy>({
    x: 3,
    y: 7,
  });
});

test("a quarter-turn anticlockwise maps (1,0) to (0,1)", () => {
  expect<Xy>(rotateXy({ x: 1, y: 0 }, quarterTurnAnticlockwise)).toEqual<Xy>({
    x: 0,
    y: 1,
  });
});

test("a quarter-turn clockwise maps (1,0) to (0,-1)", () => {
  expect<Xy>(rotateXy({ x: 1, y: 0 }, quarterTurnClockwise)).toEqual<Xy>({
    x: 0,
    y: -1,
  });
});

test("four quarter-turns return to the start", () => {
  const turned = [0, 1, 2, 3].reduce<Xy>(
    (v) => rotateXy(v, quarterTurnAnticlockwise),
    { x: 1, y: 0 },
  );
  // === treats -0 as 0 (the arithmetic can yield a harmless -0):
  expect(turned.x === 1 && turned.y === 0).toBe(true);
});

test("rotateXyz turns x and y but leaves z", () => {
  expect<Xyz>(
    rotateXyz({ x: 1, y: 0, z: 5 }, quarterTurnAnticlockwise),
  ).toEqual<Xyz>({ x: 0, y: 1, z: 5 });
});
