import { type JsonItemConfig } from "../../../model/json/JsonItem";
import { type EditorRoomItemId } from "../../editorTypes";
import { type EditorToolRoomId, type ItemTool } from "./Tool";

/** the door tool, placing doors that add a room beyond them or lead nowhere */
export const doorItemTool = (
  /** placing a door also adds a room beyond it */
  autoAddsRoom: boolean,
): ItemTool => ({
  type: "door",
  config: {
    direction: "away", // arbitrary, to be corrected on placement
    toRoom: autoAddsRoom ? "+" : "nowhere",
  } satisfies JsonItemConfig<"door", EditorToolRoomId, EditorRoomItemId>,
});
