import { store, useEditorAppSelector } from "../../../store/store";
import { deleteSelected } from "../../slice/levelEditorSlice";
import { ToolbarButton } from "./ToolbarButton";

export const DeleteItemToolButton = () => {
  const somethingSelected = useEditorAppSelector(
    (state) => state.levelEditor.selectedJsonItemIds.length > 0,
  );

  return (
    <ToolbarButton
      ariaLabel="Delete selected item(s)"
      class="bg-midRed"
      disabled={!somethingSelected}
      onClick={() => store.dispatch(deleteSelected({ timestamp: Date.now() }))}
      shortcutKeys={["Delete", "Backspace"]}
      tooltipContent={`## Delete items
delete selected item(s)`}
    >
      <span class="text-single-line">X</span>
    </ToolbarButton>
  );
};
