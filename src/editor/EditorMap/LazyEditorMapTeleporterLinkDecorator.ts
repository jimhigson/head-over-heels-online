import { lazy } from "preact/compat";

import { type PostfixRoomDecoratorComponent } from "../../game/components/dialogs/menuDialog/dialogs/map/RoomDecoratorProps";
import { importOnce } from "../../utils/importOnce";
import { type EditorRoomId } from "../editorTypes";

const importEditorMapTeleporterLinkDecorator = importOnce(
  () => import("./EditorMapTeleporterLinkDecorator"),
);

export const LazyEditorMapTeleporterLinkDecorator: PostfixRoomDecoratorComponent<EditorRoomId> =
  lazy(importEditorMapTeleporterLinkDecorator);
