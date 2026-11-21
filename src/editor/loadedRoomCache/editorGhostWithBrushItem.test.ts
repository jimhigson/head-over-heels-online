import { expect, test } from "vitest";

import { loadItemFromJson } from "../../game/gameState/loadRoom/loadItemFromJson";
import { itemBehaviourKey } from "../../model/ItemInPlay";
import { noPlanetsLiberated } from "../../store/slices/gameInPlay/gameInPlaySlice";
import type {
  EditorJsonItem,
  EditorRoomId,
  EditorRoomItemId,
  EditorRoomJson,
  EditorUnionOfAllItemInPlayTypes,
} from "../editorTypes";
import { editorGhostWithBrushItem } from "./editorGhostWithBrushItem";

test("an editor ghost of a solid item is not solid", () => {
  const block: EditorJsonItem<"block"> = {
    type: "block",
    config: { style: "organic" },
    position: { x: 2, y: 2, z: 0 },
  };
  const roomJson: EditorRoomJson = {
    planet: "blacktooth",
    color: { hue: "cyan", shade: "basic" },
    items: { ["block" as EditorRoomItemId]: block },
  };
  const [brushBlock] = loadItemFromJson<EditorRoomId, EditorRoomItemId>(
    "block" as EditorRoomItemId,
    block,
    roomJson,
    noPlanetsLiberated,
  );
  const editorGhost = editorGhostWithBrushItem(
    brushBlock as EditorUnionOfAllItemInPlayTypes,
    {
      jsonItemId: "block" as EditorRoomItemId,
      drawnGreyedOut: true,
      whichEditorGhost: undefined,
    },
  );

  expect(editorGhost[itemBehaviourKey].isNonSolid(editorGhost)).toBe(true);
});
