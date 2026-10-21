import { useMemo, useRef, useState } from "preact/hooks";

import { boundingBoxDecorateItemRenderer } from "../../game/render/item/itemRender/boundingBoxDecorateItemRenderer";
import { type RoomRendererDecorators } from "../../game/render/room/RoomRenderer";
import { subRoomBoundariesDecorateRoomRenderer } from "../../game/render/room/subRoomBoundariesDecorateRoomRenderer";
import { type EditorRoomItemId, type EditorRoomRenderer } from "../editorTypes";
import { makeEditorAnnotationsDecorateItemRenderer } from "../rendering/EditorAnnotationsRenderer";
import {
  type EditorPaneId,
  type EditorPaneRoomSource,
} from "../slice/EditorPane";
import { ItemContextMenu } from "./contextMenu/ItemContextMenu";
import { EditorMainLoop } from "./EditorMainLoop";
import { useRoomEditorInteractivity } from "./interactivity/useRoomEditorInteractivity";
import { EditorPaneProvider, useEditorPane } from "./pane/EditorPaneProvider";
import { PixiApplicationProvider } from "./PixiApplicationProvider";
import { RoomTabBar } from "./RoomTabBar";
import { RotateViewControls } from "./RotateViewControls";
import { useAddApplicationCanvasToDom } from "./useAddApplicationCanvasToDom";
import { useRemoveCursorPreviewsWhenToolChanges } from "./useRemoveCursorPreviewsWhenToolChanges";
import { useResizePixiApplicationToPane } from "./useResizePixiApplicationToPane";
import { useRoomEditingAreaCursorClassName } from "./useRoomEditingAreaCursorClassName";
import { useSpritesheets } from "./useSpritesheets";
import {
  EditorViewportProvider,
  useEditorViewport,
} from "./viewport/EditorViewportProvider";
import { useFitRoomInView } from "./viewport/useFitRoomInView";
import { useViewportFollowsPaneView } from "./viewport/useViewportFollowsPaneView";
import { ZoomControls } from "./ZoomControls";

const editorRoomDecorators = [subRoomBoundariesDecorateRoomRenderer];

/** the pane's own decorators for its room renderer */
const useEditorRoomRendererDecorators = (): RoomRendererDecorators => {
  const viewport = useEditorViewport();
  const { paneId, editable } = useEditorPane();
  return useMemo(
    () => ({
      itemDecorators: [
        makeEditorAnnotationsDecorateItemRenderer(viewport, paneId, editable),
        boundingBoxDecorateItemRenderer,
      ],
      roomDecorators: editorRoomDecorators,
    }),
    [viewport, paneId, editable],
  );
};

const RoomEditingAreaInner = () => {
  const spritesheets = useSpritesheets();
  const { editable } = useEditorPane();
  const decorators = useEditorRoomRendererDecorators();

  // the main loop keeps this pointing at the current room renderer;
  // interactivity reads its render boxes for pointer picking:
  const roomRendererRef = useRef<EditorRoomRenderer | undefined>(undefined);

  const [renderArea, setRenderArea] = useState<HTMLDivElement | null>(null);

  const cursorClassname = useRoomEditingAreaCursorClassName();

  useViewportFollowsPaneView();
  useFitRoomInView();
  useResizePixiApplicationToPane(renderArea);
  useRoomEditorInteractivity(renderArea, roomRendererRef);
  useAddApplicationCanvasToDom(renderArea);
  useRemoveCursorPreviewsWhenToolChanges();

  return (
    <div
      class="w-full h-full relative"
      aria-description={
        editable ?
          "Room preview area showing a rendering of the currently selected (cursor) room that is interactive and allows editing by dragging or a right-click context menu"
        : "Room preview area showing a rendering of a room, where clicking an item picks it"
      }
    >
      {/* the tabs take the width they need; the controls sit beside them while
          there is room, and drop below them when not. Clicks in the gap between them go
          through to the pane: */}
      <div class="absolute scale-editor top-0 left-0 right-1 z-slightlyAbove flex flex-wrap items-start gap-x-1 gap-y-half leading-none text-white pointer-events-none">
        {editable && <RoomTabBar class="pointer-events-auto" />}
        <div class="ml-auto flex flex-nowrap items-start shrink-0 gap-1 pointer-events-auto">
          <ZoomControls />
          {editable && <RotateViewControls />}
        </div>
      </div>
      <div
        ref={setRenderArea}
        tabIndex={1}
        // remove outline when has focus:
        class={`w-full h-full ${cursorClassname} bg-shadowHalfbrite overflow-hidden focus-visible:outline-none`}
      />
      {editable && <ItemContextMenu renderArea={renderArea} />}
      <EditorMainLoop
        spritesheets={spritesheets}
        roomRendererRef={roomRendererRef}
        decorators={decorators}
      />
    </div>
  );
};

export type RoomEditingAreaProps = {
  /**
   * the pane's id - generated if not given
   */
  paneId?: EditorPaneId;
  /**
   * the room shown - the cursor room if not given
   */
  roomSource?: EditorPaneRoomSource;
  /**
   * shows the room for picking items only: no editing, tabs, context menu or
   * camera rotation
   */
  pickOnly?: boolean;
  /**
   * become the active pane on mounting - eg in a modal dialog
   */
  activateOnMount?: boolean;
  /**
   * what the pane starts with selected
   */
  initialSelectedJsonItemIds?: EditorRoomItemId[];
};

const cursorRoomSource: EditorPaneRoomSource = { type: "cursorRoom" };

const RoomEditingArea = ({
  paneId,
  roomSource = cursorRoomSource,
  pickOnly = false,
  activateOnMount = false,
  initialSelectedJsonItemIds,
}: RoomEditingAreaProps) => {
  return (
    <EditorPaneProvider
      paneId={paneId}
      roomSource={roomSource}
      initialSelectedJsonItemIds={initialSelectedJsonItemIds}
      editable={!pickOnly}
      activateOnMount={activateOnMount}
    >
      <PixiApplicationProvider>
        <EditorViewportProvider>
          <RoomEditingAreaInner />
        </EditorViewportProvider>
      </PixiApplicationProvider>
    </EditorPaneProvider>
  );
};

// default export for lazy loading
export default RoomEditingArea;
