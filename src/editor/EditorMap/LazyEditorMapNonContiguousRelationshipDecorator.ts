import { lazy } from "preact/compat";

import { type PrefixRoomDecoratorComponent } from "../../game/components/dialogs/menuDialog/dialogs/map/RoomDecoratorProps";
import { importOnce } from "../../utils/importOnce";
import { type EditorRoomId } from "../editorTypes";

const importEditorMapNonContiguousRelationshipDecorator = importOnce(
  () => import("./EditorMapNonContiguousRelationshipDecorator"),
);

export const LazyEditorMapNonContiguousRelationshipDecorator: PrefixRoomDecoratorComponent<EditorRoomId> =
  lazy(importEditorMapNonContiguousRelationshipDecorator);
