import { loadItemFromJson } from "../../game/gameState/loadRoom/loadItemFromJson";
import { emittedItemBox } from "../../game/itemBehaviours/emitter/emittedItemBox";
import type {
  EmittableItemRecipe,
  EmitterEmits,
} from "../../model/json/ItemConfigMap";
import { noPlanetsLiberated } from "../../store/slices/gameInPlay/gameInPlaySlice";
import type {
  EditorItemInPlayUnion,
  EditorJsonItem,
  EditorJsonItemUnion,
  EditorRoomItemId,
  EditorRoomJson,
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
 * a greyed editor ghost of what an emitter emits, where the emitter emits it in
 * the game, belonging to the emitter. An emitter with several recipes is shown
 * by its first
 */
export const editorGhostOfEmittedItem = (
  jsonItemId: EditorRoomItemId,
  emitterJson: EditorJsonItem<"emitter">,
  roomJson: EditorRoomJson,
): EditorItemInPlayUnion<"editorGhost">[] => {
  const [emitter] = loadItemFromJson(
    jsonItemId,
    emitterJson,
    roomJson,
    // the editor plays no game, so has liberated no planets:
    noPlanetsLiberated,
  );

  return loadItemFromJson(
    `${jsonItemId}.emits` as EditorRoomItemId,
    {
      ...firstEmittableRecipe(emitterJson.config.emits),
      // loaded anywhere, then placed as the emitter would place it:
      position: emitterJson.position,
    } as EditorJsonItemUnion,
    roomJson,
    noPlanetsLiberated,
  )
    .map((emittedItem) => {
      emittedItem.state.box = emittedItemBox(emitter, emittedItem.state.box);
      return editorGhostWithBrushItem(emittedItem, {
        jsonItemId,
        drawnGreyedOut: true,
        whichEditorGhost: "emittedItem",
      });
    })
    .toArray();
};
