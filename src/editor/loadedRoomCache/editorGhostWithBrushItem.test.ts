import { expect, test } from "vitest";

import { loadItemFromJson } from "../../game/gameState/loadRoom/loadItemFromJson";
import { itemBehaviourKey } from "../../model/itemInPlay/ItemInPlay";
import { noPlanetsLiberated } from "../../store/slices/gameInPlay/gameInPlaySlice";
import type {
  EditorJsonItem,
  EditorRoomItemId,
  EditorRoomJson,
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
  const [brushBlock] = loadItemFromJson(
    "block" as EditorRoomItemId,
    block,
    roomJson,
    noPlanetsLiberated,
  );
  const editorGhost = editorGhostWithBrushItem(brushBlock, {
    jsonItemId: "block" as EditorRoomItemId,
    drawnGreyedOut: true,
    whichEditorGhost: undefined,
  });

  expect(editorGhost[itemBehaviourKey].isNonSolid(editorGhost)).toBe(true);
});
