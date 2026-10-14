import { editorStore } from "../store/store";
import { LoadedRoomCache } from "./LoadedRoomCache";

/** the editor's loaded room, following the editor store */
export const editorLoadedRoom = new LoadedRoomCache(editorStore);
