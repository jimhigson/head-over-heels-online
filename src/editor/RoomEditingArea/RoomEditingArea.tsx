import { TextureStyle } from "pixi.js";
import { useMemo, useRef, useState } from "preact/hooks";

import { boundingBoxDecorateItemRenderer } from "../../game/render/item/itemRender/boundingBoxDecorateItemRenderer";
import { subRoomBoundariesDecorateRoomRenderer } from "../../game/render/room/subRoomBoundariesDecorateRoomRenderer";
import { useRegisterDecorateItemRenderers } from "../../game/render/useRegisterDecorateItemRenderers";
import { useRegisterDecorateRoomRenderers } from "../../game/render/useRegisterDecorateRoomRenderers";
import { useFixedSpritesheetVariants } from "../../sprites/spritesheet/variants/useFixedSpritesheetVariants";
import { type EditorRoomRenderer } from "../editorTypes";
import { makeEditorAnnotationsDecorateItemRenderer } from "../rendering/EditorAnnotationsRenderer";
import { ItemContextMenu } from "./contextMenu/ItemContextMenu";
import { EditorRoomStateProvider } from "./EditorRoomStateProvider";
import { useRoomEditorInteractivity } from "./interactivity/useRoomEditorInteractivity";
import { PixiApplicationProvider } from "./PixiApplicationProvider";
import { RotateViewControls } from "./RotateViewControls";
import { useAddApplicationCanvasToDom } from "./useAddApplicationCanvasToDom";
import { useEditorMainLoop } from "./useEditorMainLoop";
import { useRemoveCursorPreviewsWhenToolChanges } from "./useRemoveCursorPreviewsWhenToolChanges";
import { useResizePixiApplicationToPane } from "./useResizePixiApplicationToPane";
import { useRoomEditingAreaCursorClassName } from "./useRoomEditingAreaCursorClassName";
import {
  EditorViewportProvider,
  useEditorViewport,
} from "./viewport/EditorViewportProvider";
import { useFitRoomInView } from "./viewport/useFitRoomInView";
import { ZoomControls } from "./ZoomControls";
TextureStyle.defaultOptions.scaleMode = "nearest";

const editorRoomDecorators = [subRoomBoundariesDecorateRoomRenderer];

const RoomEditingAreaInner = () => {
  const spritesheetVariants = useFixedSpritesheetVariants("BlockStack");

  const viewport = useEditorViewport();
  const editorItemRendererDecorators = useMemo(
    () => [
      makeEditorAnnotationsDecorateItemRenderer(viewport),
      boundingBoxDecorateItemRenderer,
    ],
    [viewport],
  );

  useRegisterDecorateItemRenderers(editorItemRendererDecorators);
  useRegisterDecorateRoomRenderers(editorRoomDecorators);

  // the main loop keeps this pointing at the current room renderer;
  // interactivity reads its render boxes for pointer picking:
  const roomRendererRef = useRef<EditorRoomRenderer | undefined>(undefined);
  useEditorMainLoop(spritesheetVariants, roomRendererRef);

  const [renderArea, setRenderArea] = useState<HTMLDivElement | null>(null);

  const cursorClassname = useRoomEditingAreaCursorClassName();

  const fitRoom = useFitRoomInView();
  // the canvas fills the pane; fit the room once the pane's size is first known:
  useResizePixiApplicationToPane(renderArea, fitRoom);
  useRoomEditorInteractivity(renderArea, roomRendererRef);
  useAddApplicationCanvasToDom(renderArea);
  useRemoveCursorPreviewsWhenToolChanges();

  return (
    <div
      class="w-full h-full relative"
      aria-description="Room preview area showing a rendering of the currently selected (cursor) room that is interactive and allows editing by dragging or a right-click context menu"
    >
      <div class="absolute scale-editor top-0 right-1 z-slightlyAbove flex gap-1 leading-none text-white">
        <ZoomControls />
        <RotateViewControls />
      </div>
      <div
        ref={setRenderArea}
        tabIndex={1}
        // remove outline when has focus:
        class={`w-full h-full ${cursorClassname} bg-editor-checkerboard overflow-hidden focus-visible:outline-none`}
      />
      <ItemContextMenu renderArea={renderArea} />
    </div>
  );
};

const RoomEditingArea = () => {
  return (
    <PixiApplicationProvider>
      <EditorViewportProvider>
        <EditorRoomStateProvider>
          <RoomEditingAreaInner />
        </EditorRoomStateProvider>
      </EditorViewportProvider>
    </PixiApplicationProvider>
  );
};

// default export for lazy loading
export default RoomEditingArea;
