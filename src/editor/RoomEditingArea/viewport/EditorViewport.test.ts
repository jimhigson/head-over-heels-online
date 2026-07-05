import { describe, expect, test } from "vitest";

import { type Xy } from "../../../utils/vectors/vectors";
import { EditorViewport } from "./EditorViewport";

describe("coordinate mapping", () => {
  test("identity transform maps pane coords straight to world", () => {
    const viewport = new EditorViewport();
    expect(viewport.toWorld({ x: 10, y: 20 })).toEqual<Xy>({ x: 10, y: 20 });
  });

  test("toWorld inverts toScreen", () => {
    const viewport = new EditorViewport();
    viewport.setZoom(3, { x: 100, y: 50 });
    viewport.panBy({ x: 7, y: -13 });

    const world = { x: 42, y: -17 };
    expect(viewport.toWorld(viewport.toScreen(world))).toEqual({
      x: expect.closeTo(world.x),
      y: expect.closeTo(world.y),
    });
  });
});

describe("zooming", () => {
  test("setZoom keeps the fixed pane point over the same world position (within the half-game-pixel grid snap)", () => {
    const viewport = new EditorViewport();
    viewport.panBy({ x: 30, y: 40 });
    const panePoint = { x: 120, y: 80 };
    const worldBefore = viewport.toWorld(panePoint);

    viewport.setZoom(4, panePoint);

    const worldAfter = viewport.toWorld(panePoint);
    expect(Math.abs(worldAfter.x - worldBefore.x)).toBeLessThanOrEqual(0.5);
    expect(Math.abs(worldAfter.y - worldBefore.y)).toBeLessThanOrEqual(0.5);
  });

  test("zoomAtPoint multiplies the zoom", () => {
    const viewport = new EditorViewport();
    viewport.setZoom(2, { x: 0, y: 0 });
    viewport.zoomAtPoint(1.5, { x: 0, y: 0 });
    expect(viewport.zoom).toBeCloseTo(3);
  });

  test("zoom clamps to the maximum", () => {
    const viewport = new EditorViewport();
    viewport.setZoom(1_000, { x: 0, y: 0 });
    expect(viewport.zoom).toBe(16);
  });

  test("zoom clamps to the minimum", () => {
    const viewport = new EditorViewport();
    viewport.setZoom(0.01, { x: 0, y: 0 });
    expect(viewport.zoom).toBe(2);
  });
});

describe("fitTo", () => {
  test("centres the rect in the pane", () => {
    const viewport = new EditorViewport();
    const rect = { l: -50, t: 10, w: 100, h: 60 };
    const paneSize = { x: 800, y: 600 };

    viewport.fitTo(rect, paneSize, 0.1);

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

  test("the rect (with margin) fits inside the pane at a whole-number zoom", () => {
    const viewport = new EditorViewport();
    const rect = { l: 0, t: 0, w: 160, h: 100 };
    const paneSize = { x: 820, y: 620 };

    viewport.fitTo(rect, paneSize, 0.1);

    const topLeft = viewport.toScreen({ x: rect.l, y: rect.t });
    const bottomRight = viewport.toScreen({
      x: rect.l + rect.w,
      y: rect.t + rect.h,
    });
    // 10% margin per side leaves 80% of the 820px pane = 656px, so the ideal
    // zoom of 4.1 floors to 4, rendering the rect 640px wide:
    expect(viewport.zoom).toBe(4);
    expect(bottomRight.x - topLeft.x).toBeCloseTo(640);
    expect(Math.abs(topLeft.x - 90)).toBeLessThanOrEqual(viewport.zoom / 2);
  });

  test("fills the pane in the tighter axis", () => {
    const viewport = new EditorViewport();
    viewport.fitTo({ l: 0, t: 0, w: 100, h: 200 }, { x: 1_000, y: 1_000 }, 0);
    expect(viewport.zoom).toBe(5);
  });

  test("does not zoom in past the maximum zoom for tiny rooms", () => {
    const viewport = new EditorViewport();
    viewport.fitTo({ l: 0, t: 0, w: 10, h: 10 }, { x: 1_000, y: 1_000 }, 0);
    expect(viewport.zoom).toBe(16);
  });
});

describe("game-pixel grid alignment", () => {
  test("the rendered translation is always a whole number of game pixels", () => {
    const viewport = new EditorViewport();
    viewport.setZoom(3, { x: 17, y: 23 });
    viewport.panBy({ x: 7.3, y: -2.9 });
    viewport.fitTo({ l: -13, t: 7, w: 101, h: 57 }, { x: 803, y: 601 }, 0.1);
    viewport.panBy({ x: 1.1, y: 0.7 });

    expect(viewport.container.x / viewport.zoom).toBeCloseTo(
      Math.round(viewport.container.x / viewport.zoom),
    );
    expect(viewport.container.y / viewport.zoom).toBeCloseTo(
      Math.round(viewport.container.y / viewport.zoom),
    );
  });

  test("small pans at high zoom accumulate instead of rounding away", () => {
    const viewport = new EditorViewport();
    viewport.setZoom(16, { x: 0, y: 0 });
    for (let i = 0; i < 16; i++) {
      viewport.panBy({ x: 1, y: 0 });
    }
    expect(viewport.container.x).toBe(16);
  });
});
