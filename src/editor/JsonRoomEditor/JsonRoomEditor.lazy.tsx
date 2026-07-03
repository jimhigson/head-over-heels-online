import { lazy } from "preact/compat";

import { importJsonRoomEditor } from "./JsonRoomEditor.import";

export const LazyJsonRoomEditor = lazy(importJsonRoomEditor);
