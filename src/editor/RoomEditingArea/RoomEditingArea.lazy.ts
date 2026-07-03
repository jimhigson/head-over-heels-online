import { lazy } from "preact/compat";

import { importRoomEditingArea } from "./RoomEditingArea.import.ts";

export const LazyRoomEditingArea = lazy(importRoomEditingArea);
