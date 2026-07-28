import { type Xy } from "../../utils/vectors/vectors";
import { ToolbarButton } from "../toolbar/buttons/ToolbarButton";
import { useProvidedPixiApplication } from "./PixiApplicationProvider";
import { useEditorViewport } from "./viewport/EditorViewportProvider";
import { fitRoomInView } from "./viewport/fitRoomInView";
import { useEditorViewportZoom } from "./viewport/useEditorViewportZoom";

/** the discrete zooms the buttons step through (the wheel is continuous) */
const zoomLadder = [0.5, 0.75, 1, 1.5, 2, 3, 4, 6, 8, 11, 16];

// past the ends of the ladder (eg after a fit zoomed a huge room way out),
// stepping is a no-op rather than jumping to the ladder's nearest end:
const nextLadderStepUp = (zoom: number): number =>
  zoomLadder.find((step) => step > zoom) ?? zoom;

const nextLadderStepDown = (zoom: number): number =>
  zoomLadder.findLast((step) => step < zoom) ?? zoom;

/**
 * zoom in/out in discrete steps, and fit the room to the pane, walking a ladder of standard zoom detents
 */
export const ZoomControls = () => {
  const viewport = useEditorViewport();
  const application = useProvidedPixiApplication();
  const zoom = useEditorViewportZoom();

  const paneCentre = (): Xy => ({
    x: application.renderer.screen.width / 2,
    y: application.renderer.screen.height / 2,
  });

  // left-pad to 4 chars so the readout doesn't jump width as the digit count
  // changes (13% … 1600%):
  const percentageZoom = String(Math.round(zoom * 100)).padStart(4, "\u2003");

  return (
    <div class="flex gap-0 leading-none">
      <ToolbarButton
        small
        ariaLabel="Zoom out"
        tooltipContent={`## zoom ⬇\n\nmakes things look *smaller*`}
        onClick={() => {
          viewport.setZoom(nextLadderStepDown(viewport.zoom), paneCentre());
        }}
        shortcutKeys={["-"]}
      >
        <span class="text-single-line">-</span>
      </ToolbarButton>
      <span class="px-1 bg-shadow items-center flex text-single-line pt-oneScaledPix whitespace-pre">
        {`${percentageZoom}%`}
      </span>
      <ToolbarButton
        small
        ariaLabel="Zoom in"
        tooltipContent={`## zoom ⬆\n\nmakes things look *bigger*`}
        onClick={() => {
          viewport.setZoom(nextLadderStepUp(viewport.zoom), paneCentre());
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
          fitRoomInView(viewport, application.renderer);
        }}
        shortcutKeys={["0"]}
      >
        <span class="text-single-line">Fit</span>
      </ToolbarButton>
    </div>
  );
};
