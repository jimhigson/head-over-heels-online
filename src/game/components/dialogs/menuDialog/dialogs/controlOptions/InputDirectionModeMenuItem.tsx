import { useInputDirectionMode } from "../../../../../../store/selectors";
import {
  inputDirectionModes,
  nextInputDirectionMode,
} from "../../../../../../store/slices/gameMenusSlice";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchActionCallback";
import { SwitchN } from "../../../../../../ui/Switch";
import { BlockyMarkdown } from "../../../../BlockyMarkdown";
import { MenuItem } from "../../MenuItem";
import { optionsHintMarkdownClassname } from "../options/optionsHintMarkdownClassname";
import { spriteLeaderClasses } from "./spriteLeaderClasses";

const directions4HintMarkdown =
  "**4-way**: true to the 1987 original - move in x directions only";
const directions8HintMarkdown =
  "**8-way**: the original with *4-way* movement, plus *diagonals*";
const analogueDirectionsHintMarkdown =
  "**analogue**: move in *any* direction with analogue stick";
export const InputDirectionModeMenuItem = () => {
  const inputDirectionMode = useInputDirectionMode();
  return (
    <MenuItem
      id="analogueControl"
      label="Directions"
      leader={
        <span
          className={`${spriteLeaderClasses} texture-joystick sprites-normal-height`}
        />
      }
      valueElement={
        <SwitchN
          className="ml-auto"
          values={inputDirectionModes}
          value={inputDirectionMode}
        />
      }
      onSelect={useDispatchActionCallback(nextInputDirectionMode)}
      verticalAlignItemsCentre
      hintInline
      hint={
        <BlockyMarkdown
          className={optionsHintMarkdownClassname}
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
