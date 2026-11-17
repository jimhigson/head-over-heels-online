import { useEffect, useRef } from "preact/hooks";

import { useAppDispatch } from "../../../store/hooks";
import { undoHovered } from "../../slice/levelEditorSlice";
import { type HistoryDirection } from "../../slice/reducers/undoReducers";

/**
 * while hovered, previews undoing (or redoing) back to an entry of the cursor
 * room's history - unmounting while hovered ends the preview, since nothing
 * then sees the pointer leave
 */
export const useHistoryHoverPreview = (
  direction: HistoryDirection,
  /**
   * the entry to step to, numbered from the oldest in its stack, from 1
   */
  entryNumber: number,
) => {
  const dispatch = useAppDispatch();
  const isHoveredRef = useRef(false);
  useEffect(
    () => () => {
      if (isHoveredRef.current) {
        dispatch(undoHovered(0));
      }
    },
    [dispatch],
  );

  return {
    onMouseEnter() {
      isHoveredRef.current = true;
      dispatch(undoHovered(direction === "undo" ? entryNumber : -entryNumber));
    },
    onMouseLeave() {
      isHoveredRef.current = false;
      dispatch(undoHovered(0));
    },
  };
};
