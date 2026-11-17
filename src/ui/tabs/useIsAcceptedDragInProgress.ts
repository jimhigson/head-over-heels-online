import { useEffect, useState } from "preact/hooks";

/**
 * whether a drag (html drag and drop) that would be accepted is going on
 * anywhere in the page
 */
export const useIsAcceptedDragInProgress = (
  /**
   * whether a drag is one that would be accepted - undefined accepts none
   */
  acceptsDrag: ((dragEvent: DragEvent) => boolean) | undefined,
): boolean => {
  const [isAcceptedDragInProgress, setIsAcceptedDragInProgress] =
    useState(false);

  useEffect(() => {
    if (acceptsDrag === undefined) {
      return;
    }
    const handleDragEnter = (dragEvent: DragEvent) => {
      if (acceptsDrag(dragEvent)) {
        setIsAcceptedDragInProgress(true);
      }
    };
    const handleDragFinished = () => setIsAcceptedDragInProgress(false);

    // captured, so drop targets stopping the events can't hide them:
    document.addEventListener("dragenter", handleDragEnter, true);
    document.addEventListener("drop", handleDragFinished, true);
    document.addEventListener("dragend", handleDragFinished, true);
    return () => {
      document.removeEventListener("dragenter", handleDragEnter, true);
      document.removeEventListener("drop", handleDragFinished, true);
      document.removeEventListener("dragend", handleDragFinished, true);
    };
  }, [acceptsDrag]);

  return isAcceptedDragInProgress;
};
