import { type TextureTailwindClass } from "../../sprites/spritesheet/spritesheetData/TextureTailwindClass";
import { store, useEditorAppSelector } from "../../store/store";
import { rotateXy } from "../../utils/vectors/rotateXy";
import { unitVectors } from "../../utils/vectors/unitVectors";
import {
  type DirectionXy4,
  nonZeroVectorClosestDirectionXy4,
} from "../../utils/vectors/vectors";
import {
  rotateViewAnticlockwise,
  rotateViewClockwise,
  rotateViewTo,
  selectEditorCameraAngle,
} from "../slice/levelEditorSlice";
import { ToolbarButton } from "../toolbar/buttons/ToolbarButton";

/** the screen direction each world direction renders in at the base angle */
const directionGlyphs = {
  away: "↗",
  right: "↘",
  towards: "↙",
  left: "↖",
} as const satisfies Record<DirectionXy4, string>;

/**
 * two buttons that rotate the editor's view of the room a quarter-turn each way,
 * with a compass needle between them showing where world "away" (north) points
 * at the current angle (↗ at the base angle).
 */
export const RotateViewControls = () => {
  const cameraAngle = useEditorAppSelector(selectEditorCameraAngle);
  const cameraAngleXy4 = nonZeroVectorClosestDirectionXy4(
    rotateXy(unitVectors.away, cameraAngle),
  );

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
        class={`px-1 ${cameraAngleXy4 === "away" ? "bg-moss" : "bg-shadow"} items-center flex text-single-line pt-half`}
        tooltipContent="Reset view rotation"
        onClick={() => store.dispatch(rotateViewTo("away"))}
      >
        {directionGlyphs[cameraAngleXy4]}
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
