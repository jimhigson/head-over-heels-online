import { useState } from "react";
import { useRoomRenderer } from "./useRoomRenderer";
import { useRoomEditorInteractivity } from "./interactivity/useRoomEditorInteractivity";
import { useCanvasTransform } from "../../utils/scaledRendering/useCanvasInlineStyle";
import { TextureStyle } from "pixi.js";
import { useTickRoomRenderer } from "./useTickRoomRenderer";
import { useAddApplicationCanvasToDom } from "./useAddApplicationCanvasToDom";
import { usePutUpscaleOnAppStage } from "./usePutUpscaleOnAppStage";
import { useResizePixiApplicationToMatchCanvasSize } from "./useResizePixiApplicationToMatchCanvasSize";
import { useAddRoomRendererOutputToApplicationStage } from "./useAddRoomRendererOutputToApplicationStage";
import { useUpdateUpscaleWhenElementResizes } from "../../store/storeFlow/useUpateUpscaleWhenElementResizes";
import { useRemoveCursorPreviewsWhenToolChanges } from "./useRemoveCursorPreviewsWhenToolChanges";
import { type ResolutionName } from "../../originalGame";
import { ResolutionControls } from "./ResolutionControls";

import { useRoomEditingAreaCursorClassName } from "./useRoomEditingAreaCursorClassName";
import { PixiApplicationProvider } from "./PixiApplicationProvider";
import { useCenterScrollOnLoad } from "./useCenterScrollOnLoad";
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
