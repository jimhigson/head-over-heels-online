import { expect, test } from "vitest";

import {
  fitEditorRoomView,
  panEditorRoomView,
  zoomEditorRoomView,
} from "./EditorRoomView";

test("zooming twice multiplies the zoom", () => {
  expect(
    zoomEditorRoomView(
      zoomEditorRoomView({ zoom: 2, pan: { x: 0, y: 0 } }, 3, { x: 0, y: 0 }),
      6,
      { x: 0, y: 0 },
    ).zoom,
  ).toBeCloseTo(6);
});

test("zoom clamps to the maximum", () => {
  expect(
    zoomEditorRoomView({ zoom: 2, pan: { x: 0, y: 0 } }, 1_000, { x: 0, y: 0 })
      .zoom,
  ).toBe(16);
});

test("zoom clamps to the minimum", () => {
  expect(
    zoomEditorRoomView({ zoom: 4, pan: { x: 0, y: 0 } }, 0.01, { x: 0, y: 0 })
      .zoom,
  ).toBe(2);
});

test("panning moves the pan by the delta", () => {
  expect(
    panEditorRoomView({ zoom: 3, pan: { x: 5, y: 6 } }, { x: 1.5, y: -2 }),
  ).toEqual({ zoom: 3, pan: { x: 6.5, y: 4 } });
});

test("fitting floors the zoom to a whole number", () => {
  expect(
    fitEditorRoomView({ l: 0, t: 0, w: 160, h: 100 }, { x: 820, y: 620 }, 0.1)
      .zoom,
  ).toBe(4);
});

test("fitting fills the pane in the tighter axis", () => {
  expect(
    fitEditorRoomView({ l: 0, t: 0, w: 100, h: 200 }, { x: 1_000, y: 1_000 }, 0)
      .zoom,
  ).toBe(5);
});

test("fitting does not zoom in past the maximum zoom for tiny rooms", () => {
  expect(
    fitEditorRoomView({ l: 0, t: 0, w: 10, h: 10 }, { x: 1_000, y: 1_000 }, 0)
      .zoom,
  ).toBe(16);
});
