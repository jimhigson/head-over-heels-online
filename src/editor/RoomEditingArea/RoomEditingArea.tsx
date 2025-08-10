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
import { useCenterScrollOnLoad } from "./useCenterScrollOnLoad";

import { useRoomEditingAreaCursorClassName } from "./useRoomEditingAreaCursorClassName";
TextureStyle.defaultOptions.scaleMode = "nearest";

export const RoomEditingArea = () => {
  const roomRenderer = useRoomRenderer();
  const [renderArea, setRenderArea] = useState<HTMLDivElement | null>(null);
  const [renderSizingArea, setRenderSizingArea] =
    useState<HTMLDivElement | null>(null);

  const cursorClassname = useRoomEditingAreaCursorClassName();

  useUpdateUpscaleWhenElementResizes(
    "amigaLowResPal",
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
    <div
      className={`w-full h-full bg-editor-checkerboard overflow-scroll flex scrollbar scrollbar-w-1 scrollbar-track-pureBlack scrollbar-thumb-metallicBlue ${cursorClassname}`}
      ref={setRenderSizingArea}
    >
      <div className="flex justify-center items-center w-[500dvw] h-[500dvh]">
        <div
          style={{
            transform: useCanvasTransform(),
            transformOrigin: "center center",
          }}
          ref={setRenderArea}
        />
      </div>
    </div>
  );
};
