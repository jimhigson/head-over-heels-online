import { tabDrag } from "../../ui/tabs/tabDrag";
import { type TabInGroup } from "../slice/PaneLayout";

/**
 * a room tab dragged (html drag and drop) to another place among tabs, or
 * beside a pane
 */
export const roomTabDrag = tabDrag<TabInGroup>(
  "application/x-blockstack-room-tab",
);
