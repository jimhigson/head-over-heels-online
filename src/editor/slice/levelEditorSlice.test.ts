import { describe, expect, test } from "vitest";

import type {
  LevelEditorSliceAction,
  LevelEditorState,
} from "./levelEditorSlice";

import { iterateRoomJsonItemsWithIds } from "../../model/RoomJson";
import { initialLevelEditorSliceState } from "./initialLevelEditorSliceState";
import {
  applyItemTool,
  levelEditorSlice,
  selectCurrentEditingRoomJson,
  setSelectedItemsInRoom,
  setTool,
  undo,
} from "./levelEditorSlice";

const reduce = (state: LevelEditorState, action: LevelEditorSliceAction) => {
  return levelEditorSlice.reducer(state, action);
};

describe(// concerns of the slice that don't fit into any particular *Reducers.test.ts file
"cross-cutting concerns", () => {
  // but that was found - test confirms the fix
  test("can create a block, select it, and undo without errors", () => {
    const state0 = initialLevelEditorSliceState;

    const a0 = setTool({
      type: "item",
      item: {
        type: "block",
        config: { style: "organic" },
      },
    });

    const state1 = reduce(state0, a0);

    expect(state1.history.undo.length).toBe(0);

    const a1 = applyItemTool({
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
    });

    const state2 = reduce(state1, a1);

    // should now have something to undo:
    expect(state2.history.undo.length).toBe(1);

    // find the item we just added:
    const [addedBlockId] = iterateRoomJsonItemsWithIds(
      selectCurrentEditingRoomJson({ levelEditor: state2 }).items,
    ).find(([, item]) => item.type === "block")!;

    const a2 = setSelectedItemsInRoom({
      jsonItemIds: [addedBlockId],
    });

    const state3 = reduce(state2, a2);

    // should have selected that item:
    expect(state3.selectedJsonItemIds).toEqual([addedBlockId]);

    const a3 = undo();

    const state4 = reduce(state3, a3);

    const state4HasBlock = iterateRoomJsonItemsWithIds(
      selectCurrentEditingRoomJson({ levelEditor: state4 }).items,
    ).some(([, item]) => item.type === "block")!;

    expect(state4HasBlock).toBe(false);

    expect(state4.selectedJsonItemIds).toEqual([]);
  });
});
