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
import { useSyncSelectFromStoreToRoomState } from "./useSyncSelectFromStoreToRoomState";
TextureStyle.defaultOptions.scaleMode = "nearest";

export const RoomEditingArea = () => {
  const roomRenderer = useRoomRenderer();
  const [renderArea, setRenderArea] = useState<HTMLDivElement | null>(null);

  useResizePixiApplicationToMatchCanvasSize();
  useAddRoomRendererOutputToApplicationStage(roomRenderer);
  useTickRoomRenderer(roomRenderer);
  useRoomEditorInteractivity(renderArea);
  useAddApplicationCanvasToDom(renderArea);
  usePutUpscaleOnAppStage();
  useSyncSelectFromStoreToRoomState();
  const canvasInlineStyle = useCanvasInlineStyle();

  return <div style={canvasInlineStyle} ref={setRenderArea} />;
};
