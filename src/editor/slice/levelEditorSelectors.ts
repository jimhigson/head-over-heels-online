import { createSelector } from "@reduxjs/toolkit";
import { selectorHook } from "../../utils/react/selectorHook";
import type { RootStateWithLevelEditorSlice } from "./levelEditorSlice";
import { selectCurrentEditingRoomJson } from "./levelEditorSlice";
import type {
  EditorRoomItemId,
  EditorRoomJson,
  EditorRoomState,
} from "../editorTypes";
import { objectEntries } from "iter-tools";
import { produce } from "immer";
import type { ValueOf } from "type-fest";
import { loadRoom } from "../../game/gameState/loadRoom/loadRoom";
import { emptyObject } from "../../utils/empty";
import { floorsRenderExtent } from "../../game/render/floorsExtent";

export const useCurrentEditingRoomJson = selectorHook(
  selectCurrentEditingRoomJson,
);

/**
 * gets the current editing room json with temporary previews applied on
 * top of it
 */
export const selectCurrentEditingRoomJsonWithPreviews = createSelector(
  [
    selectCurrentEditingRoomJson,
    (state: RootStateWithLevelEditorSlice) => state.levelEditor.previewedEdits,
  ],
  (roomJson, previewedEdits): EditorRoomJson => {
    // apply previews on top of the current room:
    return produce(roomJson, (draftRoomJson) => {
      const previewedEditsEntryIter = objectEntries(previewedEdits) as Iterable<
        [EditorRoomItemId, ValueOf<typeof previewedEdits>]
      >;

      for (const [itemId, itemPreview] of previewedEditsEntryIter) {
        if (itemPreview === null) {
          delete draftRoomJson.items[itemId];
        } else {
          draftRoomJson.items[itemId] = itemPreview;
        }
      }
    });
  },
);

/**
 * Selector that loads the current room state from the JSON.
 * Memoized so it only recomputes when the room JSON changes.
 */
export const selectEditorRoomState = createSelector(
  [selectCurrentEditingRoomJson],
  (roomJson): EditorRoomState => {
    return loadRoom({
      roomJson,
      roomPickupsCollected: emptyObject,
      scrollsRead: emptyObject,
      // display heads and heels in their starting rooms:
      isNewGame: true,
    });
  },
);

/**
 * Selector that loads the room state with preview edits applied.
 * Memoized so it only recomputes when the room JSON or previews change.
 */
export const selectEditorRoomStateWithPreviews = createSelector(
  [selectCurrentEditingRoomJsonWithPreviews],
  (roomJsonWithPreviews): EditorRoomState => {
    return loadRoom({
      roomJson: roomJsonWithPreviews,
      roomPickupsCollected: emptyObject,
      scrollsRead: emptyObject,
      // display heads and heels in their starting rooms:
      isNewGame: true,
    });
  },
);

export type RenderedRoomDimensions = {
  l: number;
  r: number;
  t: number;
  b: number;
  w: number;
  h: number;
};

export const selectEditorRoomRenderDimensions = createSelector(
  [selectEditorRoomState],
  (editorRoomStateWithPreviews): RenderedRoomDimensions => {
    const {
      floors: { edgeLeftX: l, edgeRightX: r, bottomEdgeY: b },
      allItems: { topEdgeY: t },
    } = floorsRenderExtent(editorRoomStateWithPreviews);
    // simplify to the x/y/w/h rectangle to inform the editor where the rendering is:
    return {
      l,
      r,
      w: r - l,
      b,
      t,
      h: b - t,
    };
  },
);

/**
 * Hook to get the current room state (without preview edits)
 */
export const useEditorRoomState = selectorHook(selectEditorRoomState);

/**
 * Hook to get the current room state with preview edits applied
 */
export const useEditorRoomStateWithPreviews = selectorHook(
  selectEditorRoomStateWithPreviews,
);

/**
 * Hook to get the current room state with preview edits applied
 */
export const useEditorRoomRenderDimensions = selectorHook(
  selectEditorRoomRenderDimensions,
);
