import { tabDrag } from "../../ui/tabs/tabDrag";
import type { DraggedRoomTab } from "../slice/PaneLayout";

/**
 * a room tab, or a room to open in a tab (eg from the map), dragged (html drag
 * and drop) to a place among tabs, or beside a pane
 */
export const roomTabDrag = tabDrag<DraggedRoomTab>(
  "application/x-blockstack-room-tab",
);
