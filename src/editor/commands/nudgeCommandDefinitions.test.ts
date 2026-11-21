import { produce } from "immer";
import { expect, test } from "vitest";

import type { EditorRootState } from "../../store/store";
import type { EditorRoomItemId } from "../editorTypes";
import { existingLayoutNode } from "../slice/PaneLayout";
import {
  editorStateWithOneRoomWithNoItems,
  testOpenRoomId,
  testRoomId,
} from "../slice/reducers/__test__/storeStates";
import { nudgeCommandDefinitions } from "./nudgeCommandDefinitions";
import { selectCommandIsAvailable } from "./selectCommandIsAvailable";

test("moving down is available with only a lift's top editor ghost selected", () => {
  const levelEditorState = produce(
    editorStateWithOneRoomWithNoItems,
    (draft) => {
      draft.campaignInProgress.rooms[testRoomId].items[
        "lift" as EditorRoomItemId
      ] = {
        type: "lift",
        config: { bottom: 0, top: 4 },
        position: { x: 1, y: 1, z: 0 },
      };
      existingLayoutNode(draft.layout, testOpenRoomId).selection = [
        { jsonItemId: "lift" as EditorRoomItemId, whichEditorGhost: "liftTop" },
      ];
    },
  );

  expect(
    selectCommandIsAvailable(nudgeCommandDefinitions["move.down"], {
      levelEditor: levelEditorState,
    } as EditorRootState),
  ).toBe(true);
});

test("moving down is available with only an emitter's editor ghost selected", () => {
  const levelEditorState = produce(
    editorStateWithOneRoomWithNoItems,
    (draft) => {
      draft.campaignInProgress.rooms[testRoomId].items[
        "emitter" as EditorRoomItemId
      ] = {
        type: "emitter",
        config: {
          emits: { type: "portableBlock", config: { style: "cube" } },
          period: 1_000,
          maximum: null,
        },
        position: { x: 1, y: 1, z: 2 },
      };
      existingLayoutNode(draft.layout, testOpenRoomId).selection = [
        {
          jsonItemId: "emitter" as EditorRoomItemId,
          whichEditorGhost: "emittedItem",
        },
      ];
    },
  );

  expect(
    selectCommandIsAvailable(nudgeCommandDefinitions["move.down"], {
      levelEditor: levelEditorState,
    } as EditorRootState),
  ).toBe(true);
});
