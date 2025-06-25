import { lazy } from "react";
import { importJsonRoomEditor } from "./JsonRoomEditor.import";

export const LazyJsonRoomEditor = lazy(importJsonRoomEditor);
// ) as typeof JsonRoomEditor;
