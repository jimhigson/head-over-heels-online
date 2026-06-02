import { lazy } from "react";

import { type RoomBehaviourComponent } from "../../game/components/dialogs/menuDialog/dialogs/map/RoomDecoratorProps";
import { importOnce } from "../../utils/importOnce";
import { type EditorRoomId } from "../editorTypes";

const importEditorMapRoomTooltipBehaviour = importOnce(
  () => import("./EditorMapRoomTooltipBehaviour"),
);

export const LazyEditorMapRoomTooltipBehaviour: RoomBehaviourComponent<EditorRoomId> =
  lazy(importEditorMapRoomTooltipBehaviour);
