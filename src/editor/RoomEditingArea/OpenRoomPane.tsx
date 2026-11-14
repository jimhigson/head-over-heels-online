import { useLayoutEffect, useMemo, useRef, useState } from "preact/hooks";

import { boundingBoxDecorateItemRenderer } from "../../game/render/item/itemRender/boundingBoxDecorateItemRenderer";
import { type RoomRendererDecorators } from "../../game/render/room/RoomRenderer";
import { subRoomBoundariesDecorateRoomRenderer } from "../../game/render/room/subRoomBoundariesDecorateRoomRenderer";
import { type Spritesheets } from "../../sprites/spritesheet/Spritesheets";
import { type EditorRootState, editorStore } from "../../store/store";
import { type EditorRoomJson, type EditorRoomRenderer } from "../editorTypes";
import {
  LoadedRoomCache,
  type LoadedRoomJsonSelectors,
} from "../loadedRoomCache/LoadedRoomCache";
import { loadedRoomCaches } from "../loadedRoomCache/loadedRoomCaches";
import { makeEditorAnnotationsDecorateItemRenderer } from "../rendering/EditorAnnotationsRenderer";
import { selectCurrentEditingRoomJsonWithPreviews } from "../slice/levelEditorSelectors";
import {
  selectCurrentCommittedRoomJson,
  selectRoom,
} from "../slice/levelEditorSlice";
import { existingOpenRoom, type OpenRoomId } from "../slice/OpenRoom";
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
  const { openRoomId, editable } = useOpenRoomPane();
  return useMemo(
    () => ({
      itemDecorators: [
        makeEditorAnnotationsDecorateItemRenderer(
          viewport,
          openRoomId,
          editable,
        ),
        boundingBoxDecorateItemRenderer,
      ],
      roomDecorators: editorRoomDecorators,
    }),
    [viewport, openRoomId, editable],
  );
};

export type OpenRoomPaneContentProps = {
  spritesheets: Spritesheets;
};

const OpenRoomPaneContent = ({ spritesheets }: OpenRoomPaneContentProps) => {
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

/**
 * the edited (front tab's) room follows the cursor room, previews included
 */
const cursorRoomJsonSelectors: LoadedRoomJsonSelectors = {
  selectRoomJsonWithPreviews: selectCurrentEditingRoomJsonWithPreviews,
  selectCommittedRoomJson: selectCurrentCommittedRoomJson,
};

/**
 * a room only picked from is never previewed
 */
const pickedRoomJsonSelectors = (
  roomId: EditorRoomJson["id"],
): LoadedRoomJsonSelectors => {
  const selectPickedRoomJson = (state: EditorRootState): EditorRoomJson => {
    const maybeRoomJson = selectRoom(state, roomId);
    if (import.meta.env.DEV && maybeRoomJson === undefined) {
      throw new Error(`picked room ${roomId} is not in the campaign`);
    }
    return maybeRoomJson!;
  };
  return {
    selectRoomJsonWithPreviews: selectPickedRoomJson,
    selectCommittedRoomJson: selectPickedRoomJson,
  };
};

export type OpenRoomPaneProps = {
  openRoomId: OpenRoomId;
  /**
   * shared by the panes of one area, so a new pane needn't bake them again
   */
  spritesheets: Spritesheets;
};

/**
 * draws (and edits, or picks from) one open room, keeping its loaded room
 * while it is mounted. Holds no state of its own - that is the open room's, in
 * the store
 */
export const OpenRoomPane = ({
  openRoomId,
  spritesheets,
}: OpenRoomPaneProps) => {
  const [paneContextValue, setPaneContextValue] =
    useState<null | OpenRoomPaneContextValue>(null);

  useLayoutEffect(() => {
    // an open room keeps its room and editability for its whole life:
    const { roomId, editable } = existingOpenRoom(
      editorStore.getState().levelEditor,
      openRoomId,
    );
    const loadedRoom = new LoadedRoomCache(
      editorStore,
      editable ? cursorRoomJsonSelectors : pickedRoomJsonSelectors(roomId),
    );
    loadedRoomCaches.set(openRoomId, loadedRoom);
    setPaneContextValue({ openRoomId, editable, loadedRoom });

    return () => {
      loadedRoomCaches.delete(openRoomId);
      loadedRoom.dispose();
    };
  }, [openRoomId]);

  if (paneContextValue === null) {
    // the loaded room isn't made yet, act as a gate
    return null;
  }

  return (
    <OpenRoomPaneContext value={paneContextValue}>
      <EditorViewportProvider>
        <OpenRoomPaneContent spritesheets={spritesheets} />
      </EditorViewportProvider>
    </OpenRoomPaneContext>
  );
};
