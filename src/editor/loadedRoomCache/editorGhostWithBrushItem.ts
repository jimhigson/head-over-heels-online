import { defaultBaseState } from "../../game/gameState/loadRoom/itemDefaultStates";
import { getBehaviourForItemTypeAndConfig } from "../../game/itemBehaviours/attachBehaviourToItem";
import { itemBehaviourKey } from "../../model/ItemInPlay";
import type {
  EditorItemInPlayUnion,
  EditorRoomItemId,
  EditorUnionOfAllItemInPlayTypes,
} from "../editorTypes";
import type { WhichEditorGhostOfAnyItemType } from "../WhichEditorGhostOf";

/**
 * an editor ghost drawing `brushItem` where it is
 */
export const editorGhostWithBrushItem = (
  brushItem: EditorUnionOfAllItemInPlayTypes,
  {
    jsonItemId,
    drawnGreyedOut,
    whichEditorGhost,
  }: {
    /**
     * the json item the editor ghost belongs to, so selecting the editor ghost selects (one
     * of the editor ghosts of) it, and it is removed and remade with the item -
     * undefined for an editor ghost that belongs to no item
     */
    jsonItemId: EditorRoomItemId | undefined;
    drawnGreyedOut: boolean;
    /**
     * which of its item's editor ghosts this is - undefined for the editor ghost of a
     * particle dot, which is none of an item's selectable editor ghosts
     */
    whichEditorGhost: undefined | WhichEditorGhostOfAnyItemType;
  },
): EditorItemInPlayUnion<"editorGhost"> => {
  const config = { brushItem, drawnGreyedOut, whichEditorGhost };
  return {
    hash: brushItem.hash,
    id: (jsonItemId === undefined || whichEditorGhost === undefined ?
      `${brushItem.id}.ghost`
    : `${jsonItemId}.ghost.${whichEditorGhost}`) as EditorRoomItemId,
    jsonItemId,
    type: "editorGhost",
    config,
    [itemBehaviourKey]: getBehaviourForItemTypeAndConfig("editorGhost", config),
    state: {
      ...defaultBaseState<EditorRoomItemId>(),
      box: brushItem.state.box,
    },
  };
};
