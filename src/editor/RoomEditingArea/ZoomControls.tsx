import { actionCommandDefinitions } from "../commands/actionCommandDefinitions";
import { CommandToolbarButton } from "../commands/CommandToolbarButton";
import { buttonSmallHeightClassNames } from "../toolbar/buttonSizeClassNames";
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
      <CommandToolbarButton small command={actionCommandDefinitions.zoomOut} />
      <span
        class={`px-1 bg-shadow items-center flex text-single-line pt-oneScaledPix whitespace-pre ${buttonSmallHeightClassNames}`}
      >
        {`${percentageZoom}%`}
      </span>
      <CommandToolbarButton small command={actionCommandDefinitions.zoomIn} />
      <CommandToolbarButton
        small
        command={actionCommandDefinitions.fitRoomInView}
      />
    </div>
  );
};
