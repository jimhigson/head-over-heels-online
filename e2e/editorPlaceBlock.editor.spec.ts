import { expect } from "@playwright/test";

import { blockSizePx } from "../src/game/physics/mechanicsConstants";
import { entries, keys } from "../src/utils/entries";
import {
  editorCurrentRoomJson,
  openEditor,
  placeItemAtWorldPosition,
} from "./testUtils/editorInteractions";
import { test } from "./testUtils/test";

/** the centre of the top of the starter room's floor tile at block (1, 1) */
const centreOfFloorTile1x1 = {
  x: 1.5 * blockSizePx.x,
  y: 1.5 * blockSizePx.y,
  z: 0,
};

test.describe("placing an item with the item tool", () => {
  test.beforeEach(async ({ page }) => {
    await openEditor(page);
  });

  test("clicking the floor at block (1,1) adds a block there to the room json", async ({
    page,
  }) => {
    const roomJsonBefore = await editorCurrentRoomJson(page);

    await placeItemAtWorldPosition(
      page,
      "Artificial block",
      centreOfFloorTile1x1,
    );

    const roomJsonAfter = await editorCurrentRoomJson(page);

    const addedIds = keys(roomJsonAfter.items).filter(
      (itemId) => roomJsonBefore.items[itemId] === undefined,
    );
    expect(addedIds, "exactly one item was added").toHaveLength(1);

    const [addedId] = addedIds;
    expect(roomJsonAfter.items[addedId]).toEqual({
      type: "block",
      config: { style: "artificial" },
      position: { x: 1, y: 1, z: 0 },
    });

    // the click added an item and changed nothing else:
    expect(
      Object.fromEntries(
        entries(roomJsonAfter.items).filter(([itemId]) => itemId !== addedId),
      ),
    ).toEqual(roomJsonBefore.items);
  });
});
