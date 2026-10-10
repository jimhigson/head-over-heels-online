import { useEffect } from "preact/hooks";

import { editorStore } from "../../store/store";
import { type EditorRoomId } from "../editorTypes";
import { dropItemsOnRoom } from "../slice/dropItemsOnRoom";
import { findItemsDropPlacement } from "../slice/findItemsDropPlacement";
import { selectCursorRoomId } from "../slice/levelEditorSelectors";

type HoveredDropTarget = {
  element: HTMLElement | SVGElement;
  roomId: EditorRoomId;
  subRoomId: string;
  canDrop: boolean;
};

/** the map room under the pointer, as marked by EditorMapItemDropTargetBehaviour */
const dropTargetElementAt = ({ clientX, clientY }: PointerEvent) =>
  document
    .elementFromPoint(clientX, clientY)
    ?.closest<HTMLElement | SVGElement>("[data-item-drop-room-id]");

/**
 * lets items being dragged in the room editing pane be dropped on another
 * room on the map, moving them there. The pane keeps the pointer captured
 * while dragging, so the map sees the drag only through window listeners -
 * in the capture phase, so the drop is handled before the pane ends the drag
 */
export const useDropItemsOnMap = () => {
  useEffect(() => {
    let hovered: HoveredDropTarget | undefined;

    const clearHovered = () => {
      if (hovered !== undefined) {
        delete hovered.element.dataset.itemDrop;
        hovered = undefined;
      }
    };

    const handlePointerMove = (pointerEvent: PointerEvent) => {
      const { levelEditor } = editorStore.getState();
      if (levelEditor.dragInProgress !== "moveItems") {
        clearHovered();
        return;
      }
      const element = dropTargetElementAt(pointerEvent);
      if (element === hovered?.element) {
        return;
      }
      clearHovered();
      if (element === null || element === undefined) {
        return;
      }
      const roomId = element.dataset.itemDropRoomId as EditorRoomId;
      const subRoomId = element.dataset.itemDropSubRoomId!;
      if (roomId === selectCursorRoomId(levelEditor)) {
        return;
      }
      const canDrop =
        findItemsDropPlacement(
          levelEditor,
          levelEditor.selectedJsonItemIds,
          roomId,
          subRoomId,
        ) !== undefined;
      element.dataset.itemDrop = canDrop ? "allowed" : "blocked";
      hovered = { element, roomId, subRoomId, canDrop };
    };

    const handlePointerUp = () => {
      const { levelEditor } = editorStore.getState();
      if (hovered?.canDrop && levelEditor.dragInProgress === "moveItems") {
        editorStore.dispatch(
          dropItemsOnRoom({
            itemIds: levelEditor.selectedJsonItemIds,
            toRoomId: hovered.roomId,
            toSubRoomId: hovered.subRoomId,
          }),
        );
      }
      clearHovered();
    };

    window.addEventListener("pointermove", handlePointerMove, {
      capture: true,
    });
    window.addEventListener("pointerup", handlePointerUp, { capture: true });
    window.addEventListener("pointercancel", clearHovered, { capture: true });
    return () => {
      clearHovered();
      window.removeEventListener("pointermove", handlePointerMove, {
        capture: true,
      });
      window.removeEventListener("pointerup", handlePointerUp, {
        capture: true,
      });
      window.removeEventListener("pointercancel", clearHovered, {
        capture: true,
      });
    };
  }, []);
};
