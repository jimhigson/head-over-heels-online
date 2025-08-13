import { useAppSelectorWithLevelEditorSlice } from "../slice/levelEditorSlice";
import type { RootStateWithLevelEditorSlice } from "../slice/levelEditorSlice";
import { twClass } from "../twClass";
import { isConsolidatable } from "../../consolidateItems/ConsolidatableJsonItem";
import { selectItemInLevelEditorState } from "../slice/levelEditorSelectors";
import {
  betweenRightAndTowards,
  betweenRightAndUp,
  betweenTowardsAndUp,
  betweenUpAndAway,
  betweenUpAndLeft,
  betweenLeftAndTowards,
  betweenTowardsAndDown,
  betweenRightAndAway,
  betweenRightAndDown,
} from "./cursor/pointerIntersectionEdge";
import nanoEqual from "nano-equal";
import { xyzEqual } from "../../utils/vectors/vectors";

export const selectCursor = ({
  levelEditor,
}: RootStateWithLevelEditorSlice): `cursor-${string}` => {
  const {
    dragInProgress,
    clickableAnnotationHovered,
    hoveredItem,
    selectedJsonItemIds,
  } = levelEditor;

  if (dragInProgress) {
    return twClass("cursor-grabbing");
  }

  if (clickableAnnotationHovered) {
    return twClass("cursor-pointer");
  }

  if (hoveredItem) {
    const hoveredItemJson = selectItemInLevelEditorState(
      levelEditor,
      hoveredItem.jsonItemId,
    );

    if (hoveredItemJson !== undefined && isConsolidatable(hoveredItemJson)) {
      if (hoveredItem.pointingAtOnItem.corner) {
        if (
          xyzEqual(hoveredItem.pointingAtOnItem.corner, { x: 1, y: 1, z: 1 })
        ) {
          return twClass("cursor-n-resize");
        }
      } else {
        const { edge } = hoveredItem.pointingAtOnItem;
        if (edge) {
          // TODO: this could be done more efficiently than deep-equals checking arbitrary objects
          if (nanoEqual(edge, betweenRightAndAway)) {
            return twClass("cursor-e-resize");
          }
          if (nanoEqual(edge, betweenRightAndTowards)) {
            return twClass("cursor-s-resize");
          }
          if (nanoEqual(edge, betweenLeftAndTowards)) {
            return twClass("cursor-w-resize");
          }
          if (
            nanoEqual(edge, betweenRightAndUp) ||
            nanoEqual(edge, betweenUpAndAway)
          ) {
            return twClass("cursor-ne-resize");
          }
          if (
            nanoEqual(edge, betweenTowardsAndUp) ||
            nanoEqual(edge, betweenUpAndLeft)
          ) {
            return twClass("cursor-nw-resize");
          }
          if (nanoEqual(edge, betweenRightAndDown)) {
            return twClass("cursor-se-resize");
          }
          if (nanoEqual(edge, betweenTowardsAndDown)) {
            return twClass("cursor-sw-resize");
          }
        }
      }
    }

    // if hovering on the selected item, use grab cursor to suggest can
    // move it
    if (selectedJsonItemIds.includes(hoveredItem.jsonItemId)) {
      return twClass("cursor-grab");
    }

    return twClass("cursor-default");
  }

  return twClass("cursor-crosshair");
};

export const useRoomEditingAreaCursorClassName = () => {
  return useAppSelectorWithLevelEditorSlice(selectCursor);
};
