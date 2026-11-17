import { createContext } from "preact";
import { useContext } from "preact/hooks";

import { type LoadedRoomCache } from "../loadedRoomCache/LoadedRoomCache";
import { type OpenRoomId } from "../slice/OpenRoom";

/**
 * the open room a pane draws, for the many hooks and components inside the
 * pane that act on it - given through context rather than props, which would
 * otherwise be threaded through every level between. Its loaded room and
 * editability could each be looked up by the id, but are given here once so
 * every consumer needn't look them up for itself
 */
export type OpenRoomPaneContextValue = {
  openRoomId: OpenRoomId;
  /**
   * whether the open room is edited, or only picked from
   */
  editable: boolean;
  /**
   * the open room's room, loaded and following the store
   */
  loadedRoom: LoadedRoomCache;
};

export const OpenRoomPaneContext =
  createContext<null | OpenRoomPaneContextValue>(null);

/**
 * the open room the enclosing pane draws
 */
export const useOpenRoomPane = (): OpenRoomPaneContextValue => {
  const openRoomPaneContextValue = useContext(OpenRoomPaneContext);
  if (openRoomPaneContextValue === null) {
    throw new Error("useOpenRoomPane must be used inside an OpenRoomPane");
  }
  return openRoomPaneContextValue;
};
