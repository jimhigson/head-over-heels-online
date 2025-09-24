import { TextureStyle } from "pixi.js";
import { useState } from "react";

import { type ResolutionName } from "../../originalGame";
import { useUpdateUpscaleWhenElementResizes } from "../../store/slices/upscale/useUpdateUpscaleWhenElementResizes";
import { useCanvasTransform } from "../../utils/scaledRendering/useCanvasInlineStyle";
import { useRoomEditorInteractivity } from "./interactivity/useRoomEditorInteractivity";
import { PixiApplicationProvider } from "./PixiApplicationProvider";
import { ResolutionControls } from "./ResolutionControls";
import { useAddApplicationCanvasToDom } from "./useAddApplicationCanvasToDom";
import { useAddRoomRendererOutputToApplicationStage } from "./useAddRoomRendererOutputToApplicationStage";
import { useCenterScrollOnLoad } from "./useCenterScrollOnLoad";
import { usePutUpscaleOnAppStage } from "./usePutUpscaleOnAppStage";
import { useRemoveCursorPreviewsWhenToolChanges } from "./useRemoveCursorPreviewsWhenToolChanges";
import { useResizePixiApplicationToMatchCanvasSize } from "./useResizePixiApplicationToMatchCanvasSize";
import { useRoomEditingAreaCursorClassName } from "./useRoomEditingAreaCursorClassName";
import { useRoomRenderer } from "./useRoomRenderer";
import { useTickRoomRenderer } from "./useTickRoomRenderer";
TextureStyle.defaultOptions.scaleMode = "nearest";

const RoomEditingAreaInner = () => {
  const roomRenderer = useRoomRenderer();
  const [renderArea, setRenderArea] = useState<HTMLDivElement | null>(null);
  const [renderSizingArea, setRenderSizingArea] =
    useState<HTMLDivElement | null>(null);
  const [selectedResolution, setSelectedResolution] =
    useState<ResolutionName>("amigaLowResPal");

  const cursorClassname = useRoomEditingAreaCursorClassName();

  useUpdateUpscaleWhenElementResizes(
    selectedResolution,
    renderSizingArea ?? undefined,
  );
  useResizePixiApplicationToMatchCanvasSize();
  useAddRoomRendererOutputToApplicationStage(roomRenderer);
  useTickRoomRenderer(roomRenderer);
  useRoomEditorInteractivity(renderArea);
  useAddApplicationCanvasToDom(renderArea);
  usePutUpscaleOnAppStage();
  useRemoveCursorPreviewsWhenToolChanges();
  useCenterScrollOnLoad(renderSizingArea, renderArea);

  return (
    <div className="w-full h-full relative">
      <ResolutionControls
        selectedResolution={selectedResolution}
        onResolutionChange={setSelectedResolution}
      />
      <div
        ref={setRenderSizingArea}
        className={`w-full h-full ${cursorClassname} scale-editor bg-editor-checkerboard overflow-scroll scrollbar scrollbar-w-1 scrollbar-track-pureBlack scrollbar-thumb-metallicBlue`}
      >
        <div
          style={{
            transform: useCanvasTransform(),
            transformOrigin: "center center",
          }}
          ref={setRenderArea}
          tabIndex={1}
          // remove outline when has focus:
          className="focus-visible:outline-none"
        />
      </div>
    </div>
  );
};

const RoomEditingArea = () => {
  return (
    <PixiApplicationProvider>
      <RoomEditingAreaInner />
    </PixiApplicationProvider>
  );
};

// default export for lazy loading
export default RoomEditingArea;
