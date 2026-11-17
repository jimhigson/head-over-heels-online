import { expect, test } from "vitest";

import {
  setClickableAnnotationHovered,
  setHoveredItemInRoom,
} from "../levelEditorSlice";
import { type OpenRoomId } from "../OpenRoom";
import {
  editorStateWithOneRoomWithNoItems,
  reduceLevelEditorActions,
} from "./__test__/storeStates";

// an open room that has since been closed (or replaced, as a preview tab's is):
const closedOpenRoomId = "closedOpenRoom" as OpenRoomId;

test("an annotation's hover reported for an open room that has closed changes nothing", () => {
  expect(
    reduceLevelEditorActions(
      editorStateWithOneRoomWithNoItems,
      setClickableAnnotationHovered({
        openRoomId: closedOpenRoomId,
        hovered: false,
      }),
    ),
  ).toEqual(editorStateWithOneRoomWithNoItems);
});

test("an item's hover reported for an open room that has closed changes nothing", () => {
  expect(
    reduceLevelEditorActions(
      editorStateWithOneRoomWithNoItems,
      setHoveredItemInRoom({
        openRoomId: closedOpenRoomId,
        hoveredItem: undefined,
      }),
    ),
  ).toEqual(editorStateWithOneRoomWithNoItems);
});
