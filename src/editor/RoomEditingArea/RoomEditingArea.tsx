import { useState } from "react";
import { useRoomRenderer } from "./useRoomRenderer";
import { useRoomEditorInteractivity } from "./useRoomEditorInteractivity";
import { useCanvasInlineStyle } from "../../utils/scaledRendering/useCanvasInlineStyle";
import { TextureStyle } from "pixi.js";
import { useTickRoomRenderer } from "./useTickRoomRenderer";
import { useAddApplicationCanvasToDom } from "./useAddApplicationCanvasToDom";
import { usePutUpscaleOnAppStage } from "./usePutUpscaleOnAppStage";
import { useResizePixiApplicationToMatchCanvasSize } from "./useResizePixiApplicationToMatchCanvasSize";
import { useAddRoomRendererOutputToApplicationStage } from "./useAddRoomRendererOutputToApplicationStage";
import { useUpdateUpscaleWhenWindowResizes } from "../../store/storeFlow/useUpateUpscaleWhenWIndowResizes";
import { useAppSelectorWithLevelEditorSlice } from "../slice/levelEditorSlice";
import { useRemoveCursorPreviewsWhenToolChanges } from "./useRemoveCursorPreviewsWhenToolChanges";
TextureStyle.defaultOptions.scaleMode = "nearest";

export const RoomEditingArea = () => {
  const roomRenderer = useRoomRenderer();
  const [renderArea, setRenderArea] = useState<HTMLDivElement | null>(null);
  const [renderSizingArea, setRenderSizingArea] =
    useState<HTMLDivElement | null>(null);

  const cursorClassname = useAppSelectorWithLevelEditorSlice(
    ({ levelEditor }) =>
      levelEditor.dragInProgress ? "cursor-grabbing"
      : levelEditor.clickableAnnotationHovered ? "cursor-pointer"
      : levelEditor.hoveredJsonItemId ?
        (
          // if hovering on the selected item, use grab cursor to suggest can
          // move it
          levelEditor.selectedJsonItemIds.includes(
            levelEditor.hoveredJsonItemId,
          )
        ) ?
          "cursor-grab"
        : "cursor-default"
      : "cursor-crosshair",
  );

  useUpdateUpscaleWhenWindowResizes(undefined, renderSizingArea ?? undefined);
  useResizePixiApplicationToMatchCanvasSize();
  useAddRoomRendererOutputToApplicationStage(roomRenderer);
  useTickRoomRenderer(roomRenderer);
  useRoomEditorInteractivity(renderArea);
  useAddApplicationCanvasToDom(renderArea);
  usePutUpscaleOnAppStage();
  useRemoveCursorPreviewsWhenToolChanges();
  const canvasInlineStyle = useCanvasInlineStyle();

  return (
    <div
      className={`w-full h-full overflow-hidden ${cursorClassname}`}
      ref={setRenderSizingArea}
    >
      <div style={canvasInlineStyle} ref={setRenderArea} />
    </div>
  );
};
