import { ToolbarButton } from "./ToolbarButton";
import { IconWithTwoLineHoverText } from "./ToolbarButtonContentPatterns";

export const SaveButton = () => {
  return (
    <ToolbarButton>
      <IconWithTwoLineHoverText
        icon={
          <div className="flex flex-row items-center">
            <span
              className={`sprite sprite-tinted text-highlightBeige texture-hud_char_➡ relative`}
            />
            <span className={`sprite texture-editor_tool_save relative`} />
          </div>
        }
        topText="sa"
        bottomText="ve"
      />
    </ToolbarButton>
  );
};

export const LoadButton = () => {
  return (
    <ToolbarButton>
      <IconWithTwoLineHoverText
        icon={
          <div className="flex flex-row items-center">
            <span className={`sprite texture-editor_tool_save relative`} />
            <span
              className={`sprite sprite-tinted text-highlightBeige texture-hud_char_➡ relative`}
            />
          </div>
        }
        topText="lo"
        bottomText="ad"
      />
    </ToolbarButton>
  );
};
