import { nextInputDirectionMode } from "../../../../../../store/gameMenusSlice";
import { useInputDirectionMode } from "../../../../../../store/selectors";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchCallback";
import { BlockyMarkdown } from "../../../../BlockyMarkdown";
import { BitmapText } from "../../../../Sprite";
import { MenuItem } from "../../MenuItem";
import { controlMenuValueClass } from "./controlMenuValueClass";
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
      leader={<span className={`${spriteLeaderClasses} texture-joystick`} />}
      valueElement={
        <BitmapText className={controlMenuValueClass}>
          {inputDirectionMode}
        </BitmapText>
      }
      onSelect={useDispatchActionCallback(nextInputDirectionMode)}
      hintInline
      hint={
        <BlockyMarkdown
          className="text-midGrey zx:text-zxBlack"
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
