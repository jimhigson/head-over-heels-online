import { store } from "../../store/store";
import {
  deleteSelected,
  useAppSelectorWithLevelEditorSlice,
} from "../slice/levelEditorSlice";
import { ToolbarButton } from "./ToolbarButton";

export const DeleteItemToolButton = () => {
  const somethingSelected = useAppSelectorWithLevelEditorSlice(
    (state) => state.levelEditor.selectedJsonItemIds.length > 0,
  );

  return (
    <ToolbarButton
      className="bg-midRed"
      disabled={!somethingSelected}
      onClick={() => store.dispatch(deleteSelected())}
      shortcutKeys={["Delete", "Backspace"]}
      tooltipContent={`## Delete items
delete selected item(s)`}
    >
      <span className={`sprite sprite-tinted texture-hud_char_X relative`} />
    </ToolbarButton>
  );
};
