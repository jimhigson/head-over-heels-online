import { TextureStyle } from "pixi.js";
import { useState } from "preact/hooks";

import { boundingBoxDecorateItemRenderer } from "../../game/render/item/itemRender/boundingBoxDecorateItemRenderer";
import { subRoomBoundariesDecorateRoomRenderer } from "../../game/render/room/subRoomBoundariesDecorateRoomRenderer";
import { useRegisterDecorateItemRenderers } from "../../game/render/useRegisterDecorateItemRenderers";
import { useRegisterDecorateRoomRenderers } from "../../game/render/useRegisterDecorateRoomRenderers";
import { type ResolutionName } from "../../originalGame";
import { useFixedSpritesheetVariants } from "../../sprites/spritesheet/variants/useFixedSpritesheetVariants";
import { useUpdateUpscaleOnDisplaySettingsChange } from "../../store/slices/upscale/useUpdateUpscaleOnDisplaySettingsChange";
import { useUpdateUpscaleWhenElementResizes } from "../../store/slices/upscale/useUpdateUpscaleWhenElementResizes";
import { useCanvasTransform } from "../../utils/scaledRendering/useCanvasInlineStyle";
import { editorAnnotationsDecorateItemRenderer } from "../rendering/EditorAnnotationsRenderer";
import { ItemContextMenu } from "./contextMenu/ItemContextMenu";
import { EditorRoomStateProvider } from "./EditorRoomStateProvider";
import { useRoomEditorInteractivity } from "./interactivity/useRoomEditorInteractivity";
import { PixiApplicationProvider } from "./PixiApplicationProvider";
import { ResolutionControls } from "./ResolutionControls";
import { useAddApplicationCanvasToDom } from "./useAddApplicationCanvasToDom";
import { useCenterScrollOnLoad } from "./useCenterScrollOnLoad";
import { useEditorMainLoop } from "./useEditorMainLoop";
import { usePutUpscaleOnAppStage } from "./usePutUpscaleOnAppStage";
import { useRemoveCursorPreviewsWhenToolChanges } from "./useRemoveCursorPreviewsWhenToolChanges";
import { useResizePixiApplicationToMatchCanvasSize } from "./useResizePixiApplicationToMatchCanvasSize";
import { useRoomEditingAreaCursorClassName } from "./useRoomEditingAreaCursorClassName";
TextureStyle.defaultOptions.scaleMode = "nearest";

const editorItemRendererDecorators = [
  editorAnnotationsDecorateItemRenderer,
  boundingBoxDecorateItemRenderer,
];

const editorRoomDecorators = [subRoomBoundariesDecorateRoomRenderer];

const RoomEditingAreaInner = () => {
  const spritesheetVariants = useFixedSpritesheetVariants("BlockStack");

  useRegisterDecorateItemRenderers(editorItemRendererDecorators);
  useRegisterDecorateRoomRenderers(editorRoomDecorators);
  useEditorMainLoop(spritesheetVariants);

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
  useUpdateUpscaleOnDisplaySettingsChange(
    selectedResolution,
    renderSizingArea ?? undefined,
  );
  useResizePixiApplicationToMatchCanvasSize();
  useRoomEditorInteractivity(renderArea);
  useAddApplicationCanvasToDom(renderArea);
  usePutUpscaleOnAppStage();
  useRemoveCursorPreviewsWhenToolChanges();
  useCenterScrollOnLoad(renderSizingArea, renderArea);

  return (
    <div
      class="w-full h-full relative"
      aria-description="Room preview area showing a rendering of the currently selected (cursor) room that is interactive and allows editing by dragging or a right-click context menu"
    >
      <ResolutionControls
        selectedResolution={selectedResolution}
        onResolutionChange={setSelectedResolution}
      />
      <div
        ref={setRenderSizingArea}
        class={`w-full h-full ${cursorClassname} scale-editor bg-editor-checkerboard overflow-scroll scrollbar scrollbar-w-1 scrollbar-track-pureBlack scrollbar-thumb-metallicBlue`}
      >
        <div
          style={{
            transform: useCanvasTransform(),
            transformOrigin: "center center",
          }}
          ref={setRenderArea}
          tabIndex={1}
          // remove outline when has focus:
          class="focus-visible:outline-none"
        />
      </div>
      <ItemContextMenu renderArea={renderArea} />
    </div>
  );
};

const RoomEditingArea = () => {
  return (
    <PixiApplicationProvider>
      <EditorRoomStateProvider>
        <RoomEditingAreaInner />
      </EditorRoomStateProvider>
    </PixiApplicationProvider>
  );
};

// default export for lazy loading
export default RoomEditingArea;
