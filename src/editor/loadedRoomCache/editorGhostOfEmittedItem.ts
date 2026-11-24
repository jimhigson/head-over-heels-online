import { loadItemFromJson } from "../../game/gameState/loadRoom/loadItemFromJson";
import type {
  EmittableItemRecipe,
  EmitterEmits,
} from "../../model/json/ItemConfigMap";
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

const firstEmittableRecipe = (emits: EmitterEmits): EmittableItemRecipe => {
  if (emits.type === "cyclic") {
    return emits.cycle[0];
  }
  if (emits.type === "probabilistic") {
    return emits.choices[0].emits;
  }
  return emits;
};

/**
 * a greyed editor ghost of what an emitter emits, where the emitter is, belonging to
 * the emitter. An emitter with several recipes is shown by its first
 */
export const editorGhostOfEmittedItem = (
  jsonItemId: EditorRoomItemId,
  emitterJson: EditorJsonItem<"emitter">,
  roomJson: EditorRoomJson,
): EditorItemInPlayUnion<"editorGhost">[] =>
  loadItemFromJson<EditorRoomId, EditorRoomItemId>(
    `${jsonItemId}.emits` as EditorRoomItemId,
    {
      ...firstEmittableRecipe(emitterJson.config.emits),
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
