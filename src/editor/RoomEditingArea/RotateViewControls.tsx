import { type TextureTailwindClass } from "../../sprites/spritesheet/spritesheetData/TextureTailwindClass";
import { store } from "../../store/store";
import {
  rotateViewAnticlockwise,
  rotateViewClockwise,
} from "../slice/levelEditorSlice";
import { ToolbarButton } from "../toolbar/buttons/ToolbarButton";

/**
 * two buttons that rotate the editor's view of the room a quarter-turn each way.
 */
export const RotateViewControls = () => {
  return (
    <div class="flex gap-0 leading-none">
      <ToolbarButton
        small
        tooltipContent="Rotate view ↺"
        onClick={() => store.dispatch(rotateViewAnticlockwise())}
      >
        <span
          class={`sprite ${"texture-hud_char_↺" satisfies TextureTailwindClass}`}
        />
      </ToolbarButton>
      <ToolbarButton
        small
        tooltipContent="Rotate view ↻"
        onClick={() => store.dispatch(rotateViewClockwise())}
      >
        <span
          class={`sprite ${"texture-hud_char_↻" satisfies TextureTailwindClass}`}
        />
      </ToolbarButton>
    </div>
  );
};
