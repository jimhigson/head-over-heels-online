import { type TextureTailwindClass } from "../../../sprites/spritesheet/spritesheetData/TextureTailwindClass";
import { store, useEditorAppSelector } from "../../../store/store";
import { selectTool, setTool } from "../../slice/levelEditorSlice";
import { ToolbarButton } from "./ToolbarButton";

export const PointerToolButton = () => {
  const currentTool = useEditorAppSelector(selectTool);

  const isCurrentTool = currentTool?.type === "pointer";

  return (
    <ToolbarButton
      ariaLabel="Pointer / select tool"
      onClick={() => store.dispatch(setTool({ type: "pointer" }))}
      isCurrentTool={isCurrentTool}
      shortcutKeys={[
        // Escape key to switch back to default pointer tool
        "Escape",
        // dot copies the dpaint shortcut to go back to a single pixel brush
        ".",
      ]}
      tooltipContent={`## Pointer`}
    >
      <span
        className={`sprite ${"texture-editor_tool_pointer" satisfies TextureTailwindClass} relative`}
      />
    </ToolbarButton>
  );
};
