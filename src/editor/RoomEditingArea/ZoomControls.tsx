import { editorStore } from "../../store/store";
import { ToolbarButton } from "../toolbar/buttons/ToolbarButton";
import { buttonSmallHeightClassNames } from "../toolbar/buttonSizeClassNames";
import { fitCursorRoomInViewThunk } from "./viewport/fitCursorRoomInViewThunk";
import { stepCursorRoomZoomThunk } from "./viewport/stepCursorRoomZoomThunk";
import { useEditorViewportZoom } from "./viewport/useEditorViewportZoom";

/**
 * zoom in/out in discrete steps, and fit the room to the pane, walking a ladder of standard zoom detents
 */
export const ZoomControls = () => {
  const zoom = useEditorViewportZoom();

  // left-pad to 4 chars so the readout doesn't jump width as the digit count
  // changes (13% … 1600%):
  const percentageZoom = String(Math.round(zoom * 100)).padStart(4, " ");

  return (
    <div class="flex gap-0 leading-none">
      <ToolbarButton
        small
        ariaLabel="Zoom out"
        tooltipContent={`## zoom ⬇\n\nmakes things look *smaller*`}
        onClick={() => {
          editorStore.dispatch(stepCursorRoomZoomThunk("out"));
        }}
        shortcutKeys={["-"]}
      >
        <span class="text-single-line">-</span>
      </ToolbarButton>
      <span
        class={`px-1 bg-shadow items-center flex text-single-line pt-oneScaledPix whitespace-pre ${buttonSmallHeightClassNames}`}
      >
        {`${percentageZoom}%`}
      </span>
      <ToolbarButton
        small
        ariaLabel="Zoom in"
        tooltipContent={`## zoom ⬆\n\nmakes things look *bigger*`}
        onClick={() => {
          editorStore.dispatch(stepCursorRoomZoomThunk("in"));
        }}
        shortcutKeys={["⇧+", "="]}
      >
        <span class="text-single-line">+</span>
      </ToolbarButton>
      <ToolbarButton
        small
        class="bg-moss px-2"
        ariaLabel="Fit room in view"
        tooltipContent={`## fit\n\nzoom and pan the room to exactly fit the pane`}
        onClick={() => {
          editorStore.dispatch(fitCursorRoomInViewThunk());
        }}
        shortcutKeys={["0"]}
      >
        <span class="text-single-line">Fit</span>
      </ToolbarButton>
    </div>
  );
};
