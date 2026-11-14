import { useSyncExternalStore } from "preact/compat";

import { type OpenRoomId } from "../slice/OpenRoom";
import { type LoadedRoomCache } from "./LoadedRoomCache";
import {
  findLoadedRoomCache,
  subscribeToLoadedRoomCaches,
} from "./loadedRoomCaches";

/**
 * an open room's loaded room - undefined until it is made, and once its open
 * room has left the store
 */
export const useLoadedRoomCache = (
  openRoomId: OpenRoomId,
): LoadedRoomCache | undefined =>
  useSyncExternalStore(subscribeToLoadedRoomCaches, () =>
    findLoadedRoomCache(openRoomId),
  );
