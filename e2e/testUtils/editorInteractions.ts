import { expect, type Page } from "@playwright/test";

import { type EditorRoomJson } from "../../src/editor/editorTypes";
import { type EditorE2eItem } from "../../src/editor/RoomEditingArea/useEditorE2eApi";
import { type EditorRootState } from "../../src/store/store";
import {
  type DirectionXy4,
  type Xy,
  type Xyz,
} from "../../src/utils/vectors/vectors";

/**
 * open the editor and wait until it is ready to be pointed at: the room is
 * loaded, rendered, and fitted in the pane
 */
export const openEditor = async (page: Page): Promise<void> => {
  await page.goto("./");
  // the e2e api appears once the (lazily loaded) room editing area has mounted,
  // and the room has items once it has loaded:
  await page.waitForFunction(
    () => (window._e2e_editor?.items().length ?? 0) > 0,
  );
  await fitRoomInView(page);
};

/** fit the room to the pane, so that all of it can be pointed at */
export const fitRoomInView = async (page: Page): Promise<void> => {
  await page.getByRole("button", { name: "Fit room in view" }).click();
};

export const rotateEditorViewTo = async (
  page: Page,
  /** where world "away" should appear on screen */
  awayAppearsAs: DirectionXy4,
): Promise<void> => {
  await page.evaluate((direction) => {
    window._e2e_store!.dispatch({
      type: "levelEditor/rotateViewTo",
      payload: direction,
    });
  }, awayAppearsAs);
};

const editorSliceState = (page: Page) =>
  page.evaluate(
    () => (window._e2e_store!.getState() as EditorRootState).levelEditor,
  );

export const editorCameraAngle = async (page: Page): Promise<Xy> =>
  (await editorSliceState(page)).cameraAngle;

/** the room json for the room being edited, as it would be saved */
export const editorCurrentRoomJson = async (
  page: Page,
): Promise<EditorRoomJson> => {
  const { campaignInProgress, cursorRoom } = await editorSliceState(page);
  return campaignInProgress.rooms[cursorRoom.roomId] as EditorRoomJson;
};

export const editorItems = async (page: Page): Promise<Array<EditorE2eItem>> =>
  page.evaluate(() => window._e2e_editor!.items());

/**
 * the one item in the room of the given type - fails the test if the room does
 * not hold exactly one
 */
export const soleEditorItemOfType = async (
  page: Page,
  type: EditorE2eItem["type"],
): Promise<EditorE2eItem> => {
  const matching = (await editorItems(page)).filter(
    (item) => item.type === type,
  );
  expect(matching, `expected exactly one ${type} in the room`).toHaveLength(1);
  return matching[0];
};

/** put the mouse over the given world position in the room */
export const pointAtWorldPosition = async (
  page: Page,
  worldPosition: Xyz,
): Promise<void> => {
  const clientXy = await page.evaluate(
    (position) => window._e2e_editor!.worldToClient(position),
    worldPosition,
  );
  await page.mouse.move(clientXy.x, clientXy.y);
};

/** choose a tool from the toolbar, by the tool button's accessible name */
export const selectTool = async (
  page: Page,
  toolButtonName: string,
): Promise<void> => {
  await page.getByRole("button", { name: toolButtonName, exact: true }).click();
};

/**
 * take the named item tool and click with it at a world position - the
 * position is pointed at first, as a user would, so the item is placed against
 * whatever is drawn there
 */
export const placeItemAtWorldPosition = async (
  page: Page,
  itemToolButtonName: string,
  worldPosition: Xyz,
): Promise<void> => {
  await selectTool(page, itemToolButtonName);
  await pointAtWorldPosition(page, worldPosition);
  await page.mouse.down();
  await page.mouse.up();
};

/** what the editor's pointer resolved to, as of the last mouse move */
export const editorPointingAt = async (page: Page) =>
  page.evaluate(() => window._e2e_editor!.pointingAt());

/** the world-space centre of one face (a unit ± axis normal) of an item */
export const faceCentreWorld = (
  { box }: Pick<EditorE2eItem, "box">,
  face: Xyz,
): Xyz => ({
  x:
    box.x +
    (face.x > 0 ? box.xd
    : face.x < 0 ? 0
    : box.xd / 2),
  y:
    box.y +
    (face.y > 0 ? box.yd
    : face.y < 0 ? 0
    : box.yd / 2),
  z:
    box.z +
    (face.z > 0 ? box.zd
    : face.z < 0 ? 0
    : box.zd / 2),
});
