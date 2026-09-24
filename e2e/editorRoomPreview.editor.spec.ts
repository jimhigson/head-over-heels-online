import { expect } from "@playwright/test";

import {
  clickMapRoomButton,
  hoverMapRoom,
  openEditor,
} from "./testUtils/editorInteractions";
import { test } from "./testUtils/test";

test("hovering another room on the map shows a preview image of it", async ({
  page,
}) => {
  await openEditor(page);
  // the room being edited has no preview, so move to a new room above it
  await clickMapRoomButton(page, "up", "add");

  await hoverMapRoom(page, "room_0");

  const preview = page.getByRole("img", { name: "preview of room room_0" });
  await expect(preview).toBeVisible();
  await expect(page.locator("[popover]", { has: preview })).toHaveScreenshot(
    "room_0-preview-tooltip.png",
    // the room name's font renders slightly differently between OSes
    { maxDiffPixelRatio: 0.01 },
  );
});
