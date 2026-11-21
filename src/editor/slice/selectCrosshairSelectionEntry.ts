import type { EditorRootState } from "../../store/store";
import { selectPreviewOnlyJsonItemIds } from "./levelEditorSelectors";
import type { OpenRoomId } from "./OpenRoom";
import { maybeLayoutNode } from "./PaneLayout";
import type { SelectionEntry } from "./SelectionEntry";

/**
 * the one thing in a list, or undefined if it holds none or several
 */
const onlyOne = <T>(items: Iterable<T>): T | undefined => {
  const [first, second] = Iterator.from(items).take(2).toArray();
  return second === undefined ? first : undefined;
};

/**
 * the item (or editor ghost) an open room shows its crosshair on, to show where it is in 3d -
 * by priority, the single item:
 *
 * 1. being dragged in (or into) it
 * 2. the item tool is previewing in it - nothing else, while the item tool is
 *    in use
 * 3. pointed at in it
 * 4. selected in it
 *
 * undefined if none of these applies
 */
export const selectCrosshairSelectionEntry = (
  state: EditorRootState,
  openRoomId: OpenRoomId,
): SelectionEntry | undefined => {
  const openRoom = maybeLayoutNode(state.levelEditor.layout, openRoomId);
  if (openRoom === undefined) {
    return undefined;
  }

  const { itemGrab, tool } = state.levelEditor;
  if (itemGrab?.dragging !== undefined) {
    const { dropInto, sourceOpenRoomId, grabbedItems } = itemGrab;
    if (dropInto === undefined) {
      return sourceOpenRoomId === openRoomId ?
          onlyOne(grabbedItems)
        : undefined;
    }
    if (dropInto.openRoomId !== openRoomId) {
      return undefined;
    }
    const grabbedItem = onlyOne(grabbedItems);
    if (grabbedItem?.whichEditorGhost !== undefined) {
      // a dragged editor ghost stays in its own room, as itself:
      return grabbedItem;
    }
    // moved items may have new ids in the room they are dropping into:
    const movedJsonItemId = onlyOne(dropInto.movedItemIds);
    return movedJsonItemId === undefined ? undefined : (
        { jsonItemId: movedJsonItemId, whichEditorGhost: undefined }
      );
  }

  if (tool.type === "item") {
    // what the item tool points at is only where its item goes:
    const previewOnlyJsonItemId =
      openRoom.editable ?
        onlyOne(selectPreviewOnlyJsonItemIds(state, openRoom.roomId))
      : undefined;
    return previewOnlyJsonItemId === undefined ? undefined : (
        { jsonItemId: previewOnlyJsonItemId, whichEditorGhost: undefined }
      );
  }

  const { hoveredItem } = openRoom;
  if (hoveredItem !== undefined) {
    const { jsonItemId, whichEditorGhost } = hoveredItem;
    return { jsonItemId, whichEditorGhost };
  }
  return onlyOne(openRoom.selection);
};
