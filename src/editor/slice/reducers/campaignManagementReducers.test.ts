import { expect, test } from "vitest";

import { setCampaignVersion } from "../levelEditorSlice";
import {
  editorStateWithOneRoomWithNoItems,
  reduceLevelEditorActions,
} from "./__test__/storeStates";

test("setCampaignVersion sets the working copy's locator version", () => {
  const state = reduceLevelEditorActions(
    editorStateWithOneRoomWithNoItems,
    setCampaignVersion(7),
  );

  expect(state.campaignInProgress.locator.version).toBe(7);
});

test("setCampaignVersion leaves the rest of the locator untouched", () => {
  const state = reduceLevelEditorActions(
    editorStateWithOneRoomWithNoItems,
    setCampaignVersion(7),
  );

  expect(state.campaignInProgress.locator).toEqual({
    ...editorStateWithOneRoomWithNoItems.campaignInProgress.locator,
    version: 7,
  });
});
