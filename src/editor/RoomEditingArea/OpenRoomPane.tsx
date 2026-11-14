import { useMemo, useRef, useState } from "preact/hooks";

import { boundingBoxDecorateItemRenderer } from "../../game/render/item/itemRender/boundingBoxDecorateItemRenderer";
import { type RoomRendererDecorators } from "../../game/render/room/RoomRenderer";
import { subRoomBoundariesDecorateRoomRenderer } from "../../game/render/room/subRoomBoundariesDecorateRoomRenderer";
import { type Spritesheets } from "../../sprites/spritesheet/Spritesheets";
import { useEditorAppSelector } from "../../store/store";
import { type EditorRoomId, type EditorRoomRenderer } from "../editorTypes";
import { useLoadedRoomCache } from "../loadedRoomCache/useLoadedRoomCache";
import { makeEditorAnnotationsDecorateItemRenderer } from "../rendering/EditorAnnotationsRenderer";
import { type OpenRoomId } from "../slice/OpenRoom";
import { findLayoutNode, type TabGroupId } from "../slice/PaneLayout";
import { ItemContextMenu } from "./contextMenu/ItemContextMenu";
import { EditorMainLoop } from "./EditorMainLoop";
import { useRoomEditorInteractivity } from "./interactivity/useRoomEditorInteractivity";
import { RoomTabBar } from "./RoomTabBar";
import { RotateViewControls } from "./RotateViewControls";
import { useAddApplicationCanvasToDom } from "./useAddApplicationCanvasToDom";
import {
  OpenRoomPaneContext,
  type OpenRoomPaneContextValue,
  useOpenRoomPane,
} from "./useOpenRoomPane";
import { useRemoveCursorPreviewsWhenToolChanges } from "./useRemoveCursorPreviewsWhenToolChanges";
import { useResizePixiApplicationToPane } from "./useResizePixiApplicationToPane";
import { useRoomEditingAreaCursorClassName } from "./useRoomEditingAreaCursorClassName";
import {
  EditorViewportProvider,
  useEditorViewport,
} from "./viewport/EditorViewportProvider";
import { useFitRoomInView } from "./viewport/useFitRoomInView";
import { useViewportFollowsOpenRoomView } from "./viewport/useViewportFollowsOpenRoomView";
import { ZoomControls } from "./ZoomControls";

const editorRoomDecorators = [subRoomBoundariesDecorateRoomRenderer];

/**
 * the pane's own decorators for its room renderer
 */
const useEditorRoomRendererDecorators = (): RoomRendererDecorators => {
  const viewport = useEditorViewport();
  const { openRoomId, editable, onFollowLink } = useOpenRoomPane();
  return useMemo(
    () => ({
      itemDecorators: [
        makeEditorAnnotationsDecorateItemRenderer(
          viewport,
          openRoomId,
          editable,
          onFollowLink,
        ),
        boundingBoxDecorateItemRenderer,
      ],
      roomDecorators: editorRoomDecorators,
    }),
    [viewport, openRoomId, editable, onFollowLink],
  );
};

export type OpenRoomPaneContentProps = {
  spritesheets: Spritesheets;
  /**
   * the pane (tab group) whose front tab this is - undefined for an open room
   * shown by itself, with no tabs (eg in a dialog)
   */
  tabGroupId: TabGroupId | undefined;
};

const OpenRoomPaneContent = ({
  spritesheets,
  tabGroupId,
}: OpenRoomPaneContentProps) => {
  const { editable } = useOpenRoomPane();
  const decorators = useEditorRoomRendererDecorators();

  // the main loop keeps this pointing at the current room renderer;
  // interactivity reads its render boxes for pointer picking:
  const roomRendererRef = useRef<EditorRoomRenderer | undefined>(undefined);

  const [renderArea, setRenderArea] = useState<HTMLDivElement | null>(null);

  const cursorClassname = useRoomEditingAreaCursorClassName();

  useViewportFollowsOpenRoomView();
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
      {/* clicks beside the tabs go through to the pane: */}
      <div class="absolute scale-editor top-0 left-0 right-1 z-slightlyAbove flex leading-none text-white pointer-events-none">
        {tabGroupId !== undefined && (
          <RoomTabBar tabGroupId={tabGroupId} class="pointer-events-auto" />
        )}
      </div>
      {/* fixed in the corner, so they never move as the tabs change: */}
      <div class="absolute scale-editor bottom-0 right-0 z-slightlyAbove flex flex-nowrap items-end gap-1 leading-none text-white">
        <ZoomControls />
        {editable && <RotateViewControls />}
      </div>
      <div
        ref={setRenderArea}
        tabIndex={1}
        // remove outline when has focus:
        class={`relative w-full h-full ${cursorClassname} bg-shadowHalfbrite overflow-hidden focus-visible:outline-none`}
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

export type OpenRoomPaneProps = {
  openRoomId: OpenRoomId;
  /**
   * the pane (tab group) whose front tab this is - undefined for an open room
   * shown by itself, with no tabs (eg in a dialog)
   */
  tabGroupId: TabGroupId | undefined;
  /**
   * shared by the panes of one area, so a new pane needn't bake them again
   */
  spritesheets: Spritesheets;
  /**
   * a link in the room (eg a door's annotation) was followed to another room -
   * the pane's owner decides where that goes
   */
  onFollowLink: (roomId: EditorRoomId) => void;
};

/**
 * draws (and edits, or picks from) one open room, keeping its loaded room
 * while it is mounted. Holds no state of its own - that is the open room's, in
 * the store
 */
export const OpenRoomPane = ({
  openRoomId,
  tabGroupId,
  spritesheets,
  onFollowLink,
}: OpenRoomPaneProps) => {
  const loadedRoom = useLoadedRoomCache(openRoomId);
  // an open room keeps its editability for its whole life:
  const editable = useEditorAppSelector(
    ({ levelEditor: { layout } }) =>
      findLayoutNode(layout, openRoomId)?.editable ?? false,
  );
  const paneContextValue = useMemo(
    (): OpenRoomPaneContextValue | undefined =>
      loadedRoom === undefined ? undefined : (
        { openRoomId, editable, onFollowLink, loadedRoom }
      ),
    [openRoomId, editable, onFollowLink, loadedRoom],
  );

  if (paneContextValue === undefined) {
    // the loaded room isn't made yet (or the open room has closed), act as a gate
    return null;
  }

  return (
    <OpenRoomPaneContext value={paneContextValue}>
      <EditorViewportProvider>
        <OpenRoomPaneContent
          spritesheets={spritesheets}
          tabGroupId={tabGroupId}
        />
      </EditorViewportProvider>
    </OpenRoomPaneContext>
  );
};
