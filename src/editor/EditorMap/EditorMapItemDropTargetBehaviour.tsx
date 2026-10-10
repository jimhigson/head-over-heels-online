import { useEffect } from "preact/hooks";

import { type RoomBehaviourProps } from "../../game/components/dialogs/menuDialog/dialogs/map/RoomDecoratorProps";
import { editorStore } from "../../store/store";
import { HookComponent } from "../../utils/preact/HookComponent";
import { twClass } from "../../utils/twClass" with { type: "macro" };
import { type EditorRoomId } from "../editorTypes";
import { dropItemsOnRoomThunk } from "../slice/dropItemsOnRoomThunk";
import { findItemsDropPlacement } from "../slice/findItemsDropPlacement";
import { selectCursorRoomId } from "../slice/levelEditorSlice";

/** tints a room while items dragged over it can (or can't) be dropped there */
const dropHighlightClasses = twClass([
  "data-[item-drop=allowed]:fill-moss",
  "data-[item-drop=blocked]:fill-midRed",
  "data-[item-drop]:[fill-opacity:0.5]",
]);

/**
 * lets items being dragged out of the room editing pane be dropped on this
 * room's area of the map, moving them here
 */
const useEditorMapItemDropTarget = ({
  roomId,
  subRoomId,
  interactiveAreaRef,
}: RoomBehaviourProps<EditorRoomId>) => {
  useEffect(() => {
    const el = interactiveAreaRef.current;
    if (!el) {
      return;
    }

    let canDrop = false;

    const clearHighlight = () => {
      canDrop = false;
      delete el.dataset.itemDrop;
    };

    const isDraggingItemsFromAnotherRoom = () => {
      const editorState = editorStore.getState();
      return (
        editorState.levelEditor.dragInProgress === "moveItems" &&
        selectCursorRoomId(editorState) !== roomId
      );
    };

    const handlePointerEnter = () => {
      if (!isDraggingItemsFromAnotherRoom()) {
        return;
      }
      const { levelEditor } = editorStore.getState();
      canDrop =
        findItemsDropPlacement(
          levelEditor,
          levelEditor.selectedJsonItemIds,
          roomId,
          subRoomId,
        ) !== undefined;
      el.dataset.itemDrop = canDrop ? "allowed" : "blocked";
    };

    const handlePointerMove = () => {
      // the drag ended some other way (eg escape) while over this room:
      if (
        el.dataset.itemDrop !== undefined &&
        !isDraggingItemsFromAnotherRoom()
      ) {
        clearHighlight();
      }
    };

    const handlePointerUp = () => {
      if (canDrop && isDraggingItemsFromAnotherRoom()) {
        editorStore.dispatch(
          dropItemsOnRoomThunk({
            itemIds: editorStore.getState().levelEditor.selectedJsonItemIds,
            toRoomId: roomId,
            toSubRoomId: subRoomId,
          }),
        );
      }
      clearHighlight();
    };

    el.classList.add(...dropHighlightClasses);
    el.addEventListener("pointerenter", handlePointerEnter);
    el.addEventListener("pointermove", handlePointerMove);
    el.addEventListener("pointerleave", clearHighlight);
    el.addEventListener("pointerup", handlePointerUp);
    return () => {
      el.removeEventListener("pointerenter", handlePointerEnter);
      el.removeEventListener("pointermove", handlePointerMove);
      el.removeEventListener("pointerleave", clearHighlight);
      el.removeEventListener("pointerup", handlePointerUp);
      el.classList.remove(...dropHighlightClasses);
      delete el.dataset.itemDrop;
    };
  }, [interactiveAreaRef, roomId, subRoomId]);
};

/** a map room behaviour making the room a drop target for dragged items */
export const EditorMapItemDropTargetBehaviour = HookComponent(
  useEditorMapItemDropTarget,
);
