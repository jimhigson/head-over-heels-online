import { describe, expect, test } from "vitest";

import { iterateRoomJsonItemsWithIds } from "../../model/RoomJsonItemIterators";
import type { EditorRoomId } from "../editorTypes";
import { initialLevelEditorSliceState } from "./initialLevelEditorSliceState";
import {
  selectCursorRoomIdFromLevelEditorState,
  selectCursorRoomSelectionJsonItemIdsWithoutEditorGhostSelectionsFromLevelEditorState,
} from "./levelEditorSelectors";
import {
  addRoom,
  applyItemTool,
  changeRoomColour,
  changeToRoom,
  deleteSelected,
  levelEditorSlice,
  type LevelEditorSliceAction,
  type LevelEditorState,
  redo,
  renameRoom,
  selectCurrentCommittedRoomJson,
  setSelectedItemsInRoom,
  setTool,
  undo,
} from "./levelEditorSlice";
import { reduceLevelEditorActions } from "./reducers/__test__/storeStates";

const reduce = (state: LevelEditorState, action: LevelEditorSliceAction) => {
  return levelEditorSlice.reducer(state, action);
};

const roomUndo = (state: LevelEditorState) =>
  state.history[selectCursorRoomIdFromLevelEditorState(state)]?.undo ?? [];
const roomRedo = (state: LevelEditorState) =>
  state.history[selectCursorRoomIdFromLevelEditorState(state)]?.redo ?? [];

describe(
  // concerns of the slice that don't fit into any particular *Reducers.test.ts file
  "cross-cutting concerns",
  () => {
    // but that was found - test confirms the fix
    test("can create a block, select it, and undo without errors", () => {
      const state0 = initialLevelEditorSliceState;

      const a0 = setTool({
        type: "item",
        items: [
          {
            type: "block",
            config: { style: "organic" },
          },
        ],
      });

      const state1 = reduce(state0, a0);

      expect(roomUndo(state1).length).toBe(0);

      const a1 = applyItemTool({
        roomId: selectCursorRoomIdFromLevelEditorState(state0),
        blockPosition: { x: 4, y: 4, z: 4 },
        pointedAtItemJson: {
          type: "floor",
          // middle of the floor:
          position: { x: 4, y: 4, z: 4 },
          config: {
            floorType: "standable",
            scenery: "blacktooth",
            times: { x: 8, y: 8 },
          },
        },
        preview: false,
        timestamp: 0,
      });

      const state2 = reduce(state1, a1);

      // should now have something to undo:
      expect(roomUndo(state2).length).toBe(1);

      // find the item we just added:
      const [addedBlockId] = iterateRoomJsonItemsWithIds(
        selectCurrentCommittedRoomJson({ levelEditor: state2 }).items,
      ).find(([, item]) => item.type === "block")!;

      const a2 = setSelectedItemsInRoom({
        selection: [{ jsonItemId: addedBlockId, whichEditorGhost: undefined }],
      });

      const state3 = reduce(state2, a2);

      // should have selected that item:
      expect(
        selectCursorRoomSelectionJsonItemIdsWithoutEditorGhostSelectionsFromLevelEditorState(
          state3,
        ),
      ).toEqual([addedBlockId]);

      const a3 = undo();

      const state4 = reduce(state3, a3);

      const state4HasBlock = iterateRoomJsonItemsWithIds(
        selectCurrentCommittedRoomJson({ levelEditor: state4 }).items,
      ).some(([, item]) => item.type === "block")!;

      expect(state4HasBlock).toBe(false);

      expect(
        selectCursorRoomSelectionJsonItemIdsWithoutEditorGhostSelectionsFromLevelEditorState(
          state4,
        ),
      ).toEqual([]);
    });

    test("undo entry has a label describing the action", () => {
      const state0 = initialLevelEditorSliceState;

      const state1 = reduce(
        state0,
        setTool({
          type: "item",
          items: [
            {
              type: "block",
              config: { style: "organic" },
            },
          ],
        }),
      );

      const state2 = reduce(
        state1,
        applyItemTool({
          roomId: selectCursorRoomIdFromLevelEditorState(state0),
          blockPosition: { x: 4, y: 4, z: 4 },
          pointedAtItemJson: {
            type: "floor",
            position: { x: 0, y: 0, z: 0 },
            config: {
              floorType: "standable",
              scenery: "blacktooth",
              times: { x: 8, y: 8 },
            },
          },
          preview: false,
          timestamp: 0,
        }),
      );

      expect(roomUndo(state2)).toHaveLength(1);
      const [{ description }] = roomUndo(state2);
      expect(description.kind).toBe("itemAction");
      if (description.kind === "itemAction") {
        expect(description.verb).toBe("Add");
        expect(description.items).toHaveLength(1);
        const [[, addedItem]] = description.items;
        expect(addedItem.type).toBe("block");
      }
    });

    test("multi-step undo pops multiple entries", () => {
      const state0 = initialLevelEditorSliceState;

      const state1 = reduce(
        state0,
        changeRoomColour({ colour: { hue: "magenta" }, timestamp: 0 }),
      );
      const state2 = reduce(
        state1,
        changeRoomColour({ colour: { hue: "cyan" }, timestamp: 0 }),
      );
      const state3 = reduce(
        state2,
        changeRoomColour({ colour: { shade: "dimmed" }, timestamp: 0 }),
      );

      expect(roomUndo(state3)).toHaveLength(3);

      const state4 = reduce(state3, undo({ steps: 2 }));

      expect(roomUndo(state4)).toHaveLength(1);
      expect(roomRedo(state4)).toHaveLength(2);
    });

    test("multi-step redo pops multiple entries", () => {
      const state0 = initialLevelEditorSliceState;

      const state1 = reduce(
        state0,
        changeRoomColour({ colour: { hue: "magenta" }, timestamp: 0 }),
      );
      const state2 = reduce(
        state1,
        changeRoomColour({ colour: { hue: "cyan" }, timestamp: 0 }),
      );
      const state3 = reduce(state2, undo({ steps: 2 }));

      expect(roomRedo(state3)).toHaveLength(2);

      const state4 = reduce(state3, redo({ steps: 2 }));

      expect(roomUndo(state4)).toHaveLength(2);
      expect(roomRedo(state4)).toHaveLength(0);
    });

    test("delete generates label with item type and id", () => {
      const state0 = initialLevelEditorSliceState;

      const state1 = reduce(
        state0,
        setTool({
          type: "item",
          items: [
            {
              type: "block",
              config: { style: "organic" },
            },
          ],
        }),
      );

      const state2 = reduce(
        state1,
        applyItemTool({
          roomId: selectCursorRoomIdFromLevelEditorState(state0),
          blockPosition: { x: 4, y: 4, z: 4 },
          pointedAtItemJson: {
            type: "floor",
            position: { x: 0, y: 0, z: 0 },
            config: {
              floorType: "standable",
              scenery: "blacktooth",
              times: { x: 8, y: 8 },
            },
          },
          preview: false,
          timestamp: 0,
        }),
      );

      const [addedBlockId] = iterateRoomJsonItemsWithIds(
        selectCurrentCommittedRoomJson({ levelEditor: state2 }).items,
      ).find(([, item]) => item.type === "block")!;

      const state3 = reduce(
        state2,
        setSelectedItemsInRoom({
          selection: [
            { jsonItemId: addedBlockId, whichEditorGhost: undefined },
          ],
        }),
      );
      const state4 = reduce(state3, deleteSelected({ timestamp: 0 }));

      expect(roomUndo(state4)).toHaveLength(2);
      const desc = roomUndo(state4)[1].description;
      expect(desc.kind).toBe("itemAction");
      if (desc.kind === "itemAction") {
        expect(desc.verb).toBe("Delete");
        expect(desc.items).toHaveLength(1);
        const [[{ jsonItemId: deletedId }, deletedItem]] = desc.items;
        expect(deletedId).toBe(addedBlockId);
        expect(deletedItem.type).toBe("block");
      }
    });

    test("renaming a room can be undone", () => {
      const state0 = initialLevelEditorSliceState;
      const originalRoomId = selectCursorRoomIdFromLevelEditorState(state0);
      const newRoomId = "renamedRoom" as EditorRoomId;

      const state1 = reduce(
        state0,
        renameRoom({
          fromRoomId: originalRoomId,
          toRoomId: newRoomId,
          timestamp: 0,
        }),
      );

      expect(selectCursorRoomIdFromLevelEditorState(state1)).toBe(newRoomId);
      expect(state1.campaignInProgress.rooms[newRoomId]).toBeDefined();
      expect(state1.campaignInProgress.rooms[originalRoomId]).toBeUndefined();

      const state2 = reduce(state1, undo());

      expect(selectCursorRoomIdFromLevelEditorState(state2)).toBe(
        originalRoomId,
      );
      expect(state2.campaignInProgress.rooms[originalRoomId]).toBeDefined();
      expect(state2.campaignInProgress.rooms[newRoomId]).toBeUndefined();

      const state3 = reduce(state2, redo());

      expect(selectCursorRoomIdFromLevelEditorState(state3)).toBe(newRoomId);
      expect(state3.campaignInProgress.rooms[newRoomId]).toBeDefined();
      expect(state3.campaignInProgress.rooms[originalRoomId]).toBeUndefined();
    });

    test("undoing a rename back to a name another room has since taken keeps both rooms", () => {
      const state0Initial = initialLevelEditorSliceState;
      const firstRoomId = selectCursorRoomIdFromLevelEditorState(state0Initial);
      const renamedRoomId = "renamedRoom" as EditorRoomId;

      // the first room renamed, then a second room added - which is given
      // the first room's old id, as the first that is free:
      const state1SecondRoomTookOldName = reduceLevelEditorActions(
        state0Initial,
        renameRoom({
          fromRoomId: firstRoomId,
          toRoomId: renamedRoomId,
          timestamp: 0,
        }),
        addRoom({}),
      );
      expect(
        selectCursorRoomIdFromLevelEditorState(state1SecondRoomTookOldName),
      ).toBe(firstRoomId);

      // back in the first room, its rename undone:
      const state2RenameUndone = reduceLevelEditorActions(
        state1SecondRoomTookOldName,
        changeToRoom(renamedRoomId),
        undo(),
      );

      expect(
        Object.keys(state2RenameUndone.campaignInProgress.rooms),
      ).toHaveLength(2);
    });
  },
);
