import { loadItemFromJson } from "../../game/gameState/loadRoom/loadItemFromJson";
import { noPlanetsLiberated } from "../../store/slices/gameInPlay/gameInPlaySlice";
import type {
  EditorItemInPlayUnion,
  EditorJsonItem,
  EditorJsonItemUnion,
  EditorRoomId,
  EditorRoomItemId,
  EditorRoomJson,
  EditorUnionOfAllItemInPlayTypes,
} from "../editorTypes";
import { editorGhostWithBrushItem } from "./editorGhostWithBrushItem";

/**
 * a greyed editor ghost of what an emitter emits, where the emitter is, belonging to
 * the emitter
 */
export const editorGhostOfEmittedItem = (
  jsonItemId: EditorRoomItemId,
  emitterJson: EditorJsonItem<"emitter">,
  roomJson: EditorRoomJson,
): EditorItemInPlayUnion<"editorGhost">[] =>
  loadItemFromJson<EditorRoomId, EditorRoomItemId>(
    `${jsonItemId}.emits` as EditorRoomItemId,
    {
      ...emitterJson.config.emits,
      position: emitterJson.position,
    } as EditorJsonItemUnion,
    roomJson,
    // the editor plays no game, so has liberated no planets:
    noPlanetsLiberated,
  )
    .map((emittedItem) =>
      editorGhostWithBrushItem(emittedItem as EditorUnionOfAllItemInPlayTypes, {
        jsonItemId,
        drawnGreyedOut: true,
        whichEditorGhost: "emittedItem",
      }),
    )
    .toArray();
