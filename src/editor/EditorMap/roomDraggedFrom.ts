import { type EditorRoomId } from "../editorTypes";
import { type DraggedRoomTab } from "../slice/PaneLayout";

/**
 * the room a drag starting on this element (eg the target of the pointer
 * pressed before it) would open, if it is in a room on the map
 */
export const roomDraggedFrom = (
  target: EventTarget | null,
): Extract<DraggedRoomTab, { type: "room" }> | undefined => {
  if (!(target instanceof Element)) {
    return undefined;
  }
  const maybeRoomElement = target.closest<SVGElement>("[data-room-id]");
  if (maybeRoomElement === null) {
    return undefined;
  }
  const { roomId, subRoomId } = maybeRoomElement.dataset;
  if (roomId === undefined || subRoomId === undefined) {
    return undefined;
  }
  return {
    type: "room",
    roomId: roomId as EditorRoomId,
    subRoomId,
  };
};
