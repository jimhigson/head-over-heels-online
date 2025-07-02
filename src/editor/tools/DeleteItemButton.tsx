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
      disabled={!somethingSelected}
      onClick={() => store.dispatch(deleteSelected())}
    >
      <span className={`sprite sprite-tinted texture-hud_char_X relative`} />
    </ToolbarButton>
  );
};
