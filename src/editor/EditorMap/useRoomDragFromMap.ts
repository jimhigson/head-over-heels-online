import { useRef } from "preact/hooks";

import { useIsUncolourised } from "../../store/slices/gameMenus/gameMenusSelectors";
import { roomTabDrag } from "../RoomEditingArea/roomTabDrag";
import { setRoomTabDragImage } from "../RoomEditingArea/setRoomTabDragImage";
import type { DraggedRoomTab } from "../slice/PaneLayout";
import { roomDraggedFrom } from "./roomDraggedFrom";

/**
 * handlers for a draggable html element around the map, so a room dragged
 * from it is dropped among tabs or beside a pane as a tab would be. Only a
 * drag that starts on a room goes ahead
 */
export const useRoomDragFromMap = () => {
  const uncolourised = useIsUncolourised();
  // a drag starts on the html element, so which room was pressed is kept:
  const pressedRoomRef = useRef<
    Extract<DraggedRoomTab, { type: "room" }> | undefined
  >(undefined);

  return {
    onPointerDown(pointerEvent: PointerEvent) {
      pressedRoomRef.current = roomDraggedFrom(pointerEvent.target);
    },
    onDragStart(dragEvent: DragEvent) {
      const pressedRoom = pressedRoomRef.current;
      if (pressedRoom === undefined) {
        dragEvent.preventDefault();
        return;
      }
      roomTabDrag.start(dragEvent, pressedRoom);
      setRoomTabDragImage(dragEvent, pressedRoom.roomId, uncolourised);
    },
  };
};
