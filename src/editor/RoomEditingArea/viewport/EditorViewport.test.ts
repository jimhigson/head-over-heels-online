import { expect, test } from "vitest";

import { type Xy } from "../../../utils/vectors/vectors";
import {
  fitEditorRoomView,
  panEditorRoomView,
  zoomEditorRoomView,
} from "../../slice/EditorRoomView";
import { EditorViewport } from "./EditorViewport";

test("identity transform maps pane coords straight to world", () => {
  const viewport = new EditorViewport();
  expect(viewport.toWorld({ x: 10, y: 20 })).toEqual<Xy>({ x: 10, y: 20 });
});

test("toWorld inverts toScreen", () => {
  const viewport = new EditorViewport();
  viewport.show({ zoom: 3, pan: { x: 7, y: -13 } });

  const world = { x: 42, y: -17 };
  expect(viewport.toWorld(viewport.toScreen(world))).toEqual({
    x: expect.closeTo(world.x),
    y: expect.closeTo(world.y),
  });
});

test("the rendered translation is always a whole number of game pixels", () => {
  const viewport = new EditorViewport();
  viewport.show(
    panEditorRoomView(
      fitEditorRoomView(
        { l: -13, t: 7, w: 101, h: 57 },
        { x: 803, y: 601 },
        0.1,
      ),
      { x: 1.1, y: 0.7 },
    ),
  );

  expect(viewport.container.x / viewport.zoom).toBeCloseTo(
    Math.round(viewport.container.x / viewport.zoom),
  );
  expect(viewport.container.y / viewport.zoom).toBeCloseTo(
    Math.round(viewport.container.y / viewport.zoom),
  );
});

test("small pans at high zoom accumulate instead of rounding away", () => {
  const viewport = new EditorViewport();
  let view = { zoom: 16, pan: { x: 0, y: 0 } };
  for (let i = 0; i < 16; i++) {
    view = panEditorRoomView(view, { x: 1, y: 0 });
  }
  viewport.show(view);
  expect(viewport.container.x).toBe(16);
});

test("zooming keeps the fixed pane point over the same world position (within the half-game-pixel grid snap)", () => {
  const viewport = new EditorViewport();
  const view = { zoom: 2, pan: { x: 30, y: 40 } };
  viewport.show(view);
  const panePoint = { x: 120, y: 80 };
  const worldBefore = viewport.toWorld(panePoint);

  viewport.show(zoomEditorRoomView(view, 4, panePoint));

  const worldAfter = viewport.toWorld(panePoint);
  expect(Math.abs(worldAfter.x - worldBefore.x)).toBeLessThanOrEqual(0.5);
  expect(Math.abs(worldAfter.y - worldBefore.y)).toBeLessThanOrEqual(0.5);
});

test("a fitted view centres the rect in the pane", () => {
  const viewport = new EditorViewport();
  const rect = { l: -50, t: 10, w: 100, h: 60 };

  viewport.show(fitEditorRoomView(rect, { x: 800, y: 600 }, 0.1));

  // centred to within the half-game-pixel grid snap (rounding to the grid
  // can land exactly on the half-pixel boundary, so allow fp noise there):
  const halfGamePixelSnap = viewport.zoom / 2 + 1e-6;
  const rectCentreOnPane = viewport.toScreen({
    x: rect.l + rect.w / 2,
    y: rect.t + rect.h / 2,
  });
  expect(Math.abs(rectCentreOnPane.x - 400)).toBeLessThanOrEqual(
    halfGamePixelSnap,
  );
  expect(Math.abs(rectCentreOnPane.y - 300)).toBeLessThanOrEqual(
    halfGamePixelSnap,
  );
});

test("a fitted rect (with margin) fits inside the pane", () => {
  const viewport = new EditorViewport();
  const rect = { l: 0, t: 0, w: 160, h: 100 };

  viewport.show(fitEditorRoomView(rect, { x: 820, y: 620 }, 0.1));

  const topLeft = viewport.toScreen({ x: rect.l, y: rect.t });
  const bottomRight = viewport.toScreen({
    x: rect.l + rect.w,
    y: rect.t + rect.h,
  });
  // 10% margin per side leaves 80% of the 820px pane = 656px, so the ideal
  // zoom of 4.1 floors to 4, rendering the rect 640px wide:
  expect(bottomRight.x - topLeft.x).toBeCloseTo(640);
  expect(Math.abs(topLeft.x - 90)).toBeLessThanOrEqual(viewport.zoom / 2);
});
