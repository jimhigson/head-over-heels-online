import { lazy } from "preact/compat";

import { type PostfixRoomDecoratorComponent } from "../../map/RoomDecoratorProps";
import { importOnce } from "../../utils/importOnce";
import { type EditorRoomId } from "../editorTypes";

const importEditorMapInsertButtonDecorator = importOnce(
  () => import("./EditorMapInsertButtonDecorator"),
);

export const LazyEditorMapInsertButtonDecorator: PostfixRoomDecoratorComponent<EditorRoomId> =
  lazy(importEditorMapInsertButtonDecorator);
