import { store, useEditorAppSelector } from "../../store/store";
import { directionXyz4Glyphs } from "../../utils/vectors/directionGlyphs";
import { rotateXy } from "../../utils/vectors/rotateXy";
import { unitVectors } from "../../utils/vectors/unitVectors";
import { nonZeroVectorClosestDirectionXy4 } from "../../utils/vectors/vectors";
import {
  rotateViewAnticlockwise,
  rotateViewClockwise,
  rotateViewTo,
  selectEditorCameraAngle,
} from "../slice/levelEditorSlice";
import { ToolbarButton } from "../toolbar/buttons/ToolbarButton";

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
        <span class="text-single-line">↺</span>
      </ToolbarButton>
      <ToolbarButton
        small
        class={`${cameraAngleXy4 === "away" ? "bg-moss" : "bg-shadow"} items-center flex text-single-line`}
        tooltipContent="Reset view rotation"
        onClick={() => store.dispatch(rotateViewTo("away"))}
      >
        {directionXyz4Glyphs[cameraAngleXy4]}
      </ToolbarButton>
      <ToolbarButton
        small
        tooltipContent="Rotate view ↻"
        onClick={() => store.dispatch(rotateViewClockwise())}
      >
        <span class="text-single-line">↻</span>
      </ToolbarButton>
    </div>
  );
};
