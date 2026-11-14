import { createContext } from "preact";
import { useContext } from "preact/hooks";

import { type LoadedRoomCache } from "../loadedRoomCache/LoadedRoomCache";
import { type OpenRoomId } from "../slice/OpenRoom";

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
