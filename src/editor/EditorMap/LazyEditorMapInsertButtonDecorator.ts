import { lazy } from "react";

import type { PostfixRoomDecoratorComponent } from "../../game/components/dialogs/menuDialog/dialogs/map/RoomDecoratorProps";
import type { EditorRoomId } from "../editorTypes";

import { importOnce } from "../../utils/importOnce";

const importEditorMapInsertButtonDecorator = importOnce(
  () => import("./EditorMapInsertButtonDecorator"),
);

export const LazyEditorMapInsertButtonDecorator: PostfixRoomDecoratorComponent<EditorRoomId> =
  lazy(importEditorMapInsertButtonDecorator);
