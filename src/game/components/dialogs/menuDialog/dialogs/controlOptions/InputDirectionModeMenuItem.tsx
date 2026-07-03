import { type TextureTailwindClass } from "../../../../../../sprites/spritesheet/spritesheetData/TextureTailwindClass";
import { useInputDirectionMode } from "../../../../../../store/slices/gameMenus/gameMenusSelectors";
import {
  inputDirectionModes,
  nextInputDirectionMode,
} from "../../../../../../store/slices/userSettings/userSettingsSlice";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchActionCallback";
import { SwitchN } from "../../../../../../ui/Switch";
import { BlockyMarkdown } from "../../../../BlockyMarkdown";
import {
  optionsHintMarkdownClassname,
  spriteLeaderClasses,
} from "../../../dialogClasses";
import { MenuItem } from "../../MenuItem";

const directions4HintMarkdown =
  "**4-way**: True to the 1987 original - move in 4 directions";
const directions8HintMarkdown =
  "**8-way**: New for the remake - *diagonal* movement";
const analogueDirectionsHintMarkdown =
  "**Analogue**: Move in *any* direction with analogue stick";

export const InputDirectionModeMenuItem = () => {
  const inputDirectionMode = useInputDirectionMode();
  return (
    <MenuItem
      id="analogueControl"
      label="Directions"
      leader={
        <span
          class={`${spriteLeaderClasses} ${"texture-joystick_whole" satisfies TextureTailwindClass} sprites-normal-height`}
        />
      }
      valueElement={
        <SwitchN
          class="ml-auto"
          values={inputDirectionModes}
          valueLabels={["4-way", "8-way", "anlg"]}
          value={inputDirectionMode}
        />
      }
      onSelect={useDispatchActionCallback(nextInputDirectionMode)}
      verticalAlignItemsCentre
      doubleHeight
      hint={
        <BlockyMarkdown
          class={optionsHintMarkdownClassname}
          markdown={
            inputDirectionMode === "analogue" ? analogueDirectionsHintMarkdown
            : inputDirectionMode === "8-way" ?
              directions8HintMarkdown
            : directions4HintMarkdown
          }
        />
      }
    />
  );
};
