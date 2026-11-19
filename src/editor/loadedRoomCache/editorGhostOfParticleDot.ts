import { defaultBaseState } from "../../game/gameState/loadRoom/itemDefaultStates";
import { getBehaviourForItemTypeAndConfig } from "../../game/itemBehaviours/attachBehaviourToItem";
import { itemBehaviourKey } from "../../model/ItemInPlay";
import { hashXyzToNumber0to1 } from "../../utils/maths/hashing";
import { boxWithSize, originXyz, type Xyz } from "../../utils/vectors/vectors";
import {
  type EditorItemInPlayUnion,
  type EditorRoomItemId,
} from "../editorTypes";
import { editorGhostWithBrushItem } from "./editorGhostWithBrushItem";

let editorParticleDotsMade = 0;

/**
 * an editor ghost of a still particle, marking a point in 3d
 */
export const editorGhostOfParticleDot = (
  position: Xyz,
  /**
   * the json item the particle dot belongs to - undefined for one that belongs to
   * no item
   */
  jsonItemId: EditorRoomItemId | undefined,
): EditorItemInPlayUnion<"editorGhost"> => {
  const config = { forCharacter: "head" as "head", animated: false };
  return editorGhostWithBrushItem(
    {
      hash: hashXyzToNumber0to1(position),
      id: `editorParticleDot.${editorParticleDotsMade++}` as EditorRoomItemId,
      type: "particle",
      config,
      [itemBehaviourKey]: getBehaviourForItemTypeAndConfig("particle", config),
      state: {
        ...defaultBaseState<EditorRoomItemId>(),
        box: boxWithSize(position, originXyz),
      },
    },
    { jsonItemId, drawnGreyedOut: false, whichEditorGhost: undefined },
  );
};
