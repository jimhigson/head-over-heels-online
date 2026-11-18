import { type EditorRootState } from "../../store/store";
import { type EditorRoomItemId } from "../editorTypes";
import { selectPreviewOnlyJsonItemIds } from "./levelEditorSelectors";
import { type OpenRoomId } from "./OpenRoom";
import { maybeLayoutNode } from "./PaneLayout";

/**
 * the one id in a list, or undefined if it holds none or several
 */
const onlyOne = (
  jsonItemIds: Iterable<EditorRoomItemId>,
): EditorRoomItemId | undefined => {
  const [first, second] = Iterator.from(jsonItemIds).take(2).toArray();
  return second === undefined ? first : undefined;
};

/**
 * the item an open room shows its crosshair on, to show where it is in 3d -
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
export const selectCrosshairJsonItemId = (
  state: EditorRootState,
  openRoomId: OpenRoomId,
): EditorRoomItemId | undefined => {
  const openRoom = maybeLayoutNode(state.levelEditor.layout, openRoomId);
  if (openRoom === undefined) {
    return undefined;
  }

  const { itemGrab, tool } = state.levelEditor;
  if (itemGrab?.dragging !== undefined) {
    const { dropInto, sourceOpenRoomId, jsonItemIds } = itemGrab;
    if (dropInto !== undefined) {
      return dropInto.openRoomId === openRoomId ?
          onlyOne(dropInto.movedItemIds)
        : undefined;
    }
    return sourceOpenRoomId === openRoomId ? onlyOne(jsonItemIds) : undefined;
  }

  if (tool.type === "item") {
    // what the item tool points at is only where its item goes:
    return openRoom.editable ?
        onlyOne(selectPreviewOnlyJsonItemIds(state, openRoom.roomId))
      : undefined;
  }

  return (
    openRoom.hoveredItem?.jsonItemId ?? onlyOne(openRoom.selectedJsonItemIds)
  );
};
