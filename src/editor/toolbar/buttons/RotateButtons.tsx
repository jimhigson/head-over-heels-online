import { BitmapText } from "../../../game/components/tailwindSprites/BitmapText";
import { useAppDispatch } from "../../../store/hooks";
import { useEditorAppSelector } from "../../../store/store";
import { type EditorJsonItemUnion } from "../../editorTypes";
import { isRotatable, type RotationSense } from "../../itemRotation";
import { selectCurrentRoomJsonFromLevelEditorState } from "../../slice/levelEditorSelectors";
import {
  rotateCurrentToolItem,
  rotateSelectedItems,
  selectTool,
} from "../../slice/levelEditorSlice";
import { ToolbarButton } from "./ToolbarButton";

/**
 * Rotate the selected item(s) a quarter-turn, or - when nothing rotatable is
 * selected - the item the current placement tool will drop. Enabled only when
 * the selection is all rotatable or the active item tool's item is rotatable.
 */
export const RotateButtons = () => {
  const dispatch = useAppDispatch();

  const selectedItems = useEditorAppSelector((state) =>
    state.levelEditor.selectedJsonItemIds
      .map(
        (jsonItemId) =>
          selectCurrentRoomJsonFromLevelEditorState(state.levelEditor).items[
            jsonItemId
          ],
      )
      .filter((item) => item !== undefined),
  );
  const tool = useEditorAppSelector(selectTool);

  const selectionRotatable =
    selectedItems.length > 0 && selectedItems.every(isRotatable);
  // ItemTool is {type, config}; EditorJsonItemUnion is assignable to it, so the
  // cast just gives isRotatable the discriminated view it expects:
  const toolItemRotatable =
    tool.type === "item" && isRotatable(tool.item as EditorJsonItemUnion);

  const disabled = !(selectionRotatable || toolItemRotatable);

  const rotate = (sense: RotationSense) => {
    if (selectionRotatable) {
      dispatch(rotateSelectedItems({ sense, timestamp: Date.now() }));
    } else {
      dispatch(rotateCurrentToolItem({ sense }));
    }
  };

  return (
    <div className="flex flex-row gap-oneScaledPix bg-metallicBlue">
      <ToolbarButton
        disabled={disabled}
        onClick={() => rotate("anticlockwise")}
        shortcutKeys={["["]}
        tooltipContent={`##Rotate anti-clockwise\n\nTurn the selected item(s) - or the item the current tool will place - a quarter-turn anti-clockwise`}
      >
        <BitmapText>↺</BitmapText>
      </ToolbarButton>
      <ToolbarButton
        disabled={disabled}
        onClick={() => rotate("clockwise")}
        shortcutKeys={["]"]}
        tooltipContent={`##Rotate clockwise\n\nTurn the selected item(s) - or the item the current tool will place - a quarter-turn clockwise`}
      >
        <BitmapText>↻</BitmapText>
      </ToolbarButton>
    </div>
  );
};
