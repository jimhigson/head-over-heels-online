import { expect } from "@playwright/test";

import { blockSizePx } from "../src/game/physics/mechanicsConstants";
import {
  openEditor,
  paintEditorFrame,
  placeItemAtWorldPosition,
  selectTool,
} from "./testUtils/editorInteractions";
import { test } from "./testUtils/test";

test("a placed lift and emitter are drawn with their editor ghosts", async ({
  page,
}) => {
  await openEditor(page);

  await placeItemAtWorldPosition(page, "Lift", {
    x: 1.5 * blockSizePx.x,
    y: 1.5 * blockSizePx.y,
    z: 0,
  });
  await placeItemAtWorldPosition(page, "Emitter", {
    x: 3.5 * blockSizePx.x,
    y: 1.5 * blockSizePx.y,
    z: 0,
  });
  // put the item tool down, so its preview under the pointer isn't drawn:
  await selectTool(page, "Pointer tool");
  await paintEditorFrame(page);

  const roomPane = page.locator(
    '[aria-description^="Room preview area showing"]',
  );
  await expect(roomPane.locator("canvas")).toHaveScreenshot(
    "lift-and-emitter-with-editor-ghosts.png",
    {
      // the html drawn over the room (tabs, zoom buttons) renders its font
      // differently between OSes - only the room's own drawing is compared:
      mask: [roomPane.locator(":scope > div:not(:has(canvas))")],
    },
  );
});
