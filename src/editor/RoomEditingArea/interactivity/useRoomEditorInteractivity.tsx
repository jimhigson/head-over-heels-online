import nanoEqual from "nano-equal";
import { type RefObject } from "preact";
import { useEffect, useMemo, useRef } from "preact/hooks";

import { useAppDispatch } from "../../../store/hooks";
import { editorStore, store } from "../../../store/store";
import { useMouseWheel } from "../../../ui/useMouseWheel";
import { catchErrors } from "../../../utils/errors/errors";
import { type Xy, type Xyz } from "../../../utils/vectors/vectors";
import { editorLoadedRoom } from "../../editorLoadedRoom";
import { type EditorRoomRenderer } from "../../editorTypes";
import {
  selectCursorRoomIdFromLevelEditorState,
  selectPreviewOnlyJsonItemIds,
} from "../../slice/levelEditorSelectors";
import {
  changeDragInProgress,
  cursorRoomViewPanned,
  cursorRoomViewZoomed,
  resetPreviewedEdits,
  selectTool,
} from "../../slice/levelEditorSlice";
import { findPointerPointingAt } from "../cursor/findPointerPointingAt";
import { type MaybePointingAtSomething } from "../cursor/PointingAt";
import { viewportMousePosition } from "../cursor/viewportMouse";
import { useProvidedPixiApplication } from "../PixiApplicationProvider";
import { useEditorE2eApi } from "../useEditorE2eApi";
import { useEditorViewport } from "../viewport/EditorViewportProvider";
import { type Tool } from "./Tool";
import { EyeDropperToolHandler } from "./toolHandlers/EyeDropperToolHandler";
import { ItemToolHandler } from "./toolHandlers/ItemToolHandler";
import { PointerToolHandler } from "./toolHandlers/PointerToolHandler";
import { type ToolHandler } from "./toolHandlers/ToolHandler";

const toolHandlers: {
  [T in Tool["type"]]: ToolHandler<Extract<Tool, { type: T }>>;
} = {
  item: new ItemToolHandler(),
  pointer: new PointerToolHandler(),
  eyeDropper: new EyeDropperToolHandler(),
};

/**
 * an unclaimed left-drag only starts panning after moving this far (css px),
 * so plain clicks on empty space still register as clicks (eg to unselect)
 */
const panMinimumDistancePx = 3;

/**
 * the wheel walks the zoom in steps of this size, snapped to its grid -
 * whole-number zooms match the upscales the game engine itself renders at
 */
const wheelZoomStep = 1;

type PanSession = {
  /** pans immediately (middle button); left-drags activate after a threshold */
  active: boolean;
  startClientX: number;
  startClientY: number;
};

export const useRoomEditorInteractivity = (
  renderArea: HTMLDivElement | null,
  /** the current room renderer, for its render boxes (the drawn extents picking selects by) */
  roomRendererRef: RefObject<EditorRoomRenderer | undefined>,
) => {
  const viewport = useEditorViewport();
  const pixiApplication = useProvidedPixiApplication();
  const dispatch = useAppDispatch();
  const pointingAtRef = useRef<MaybePointingAtSomething | undefined>(undefined);
  const mouseDownPointingAtRef = useRef<MaybePointingAtSomething | undefined>(
    undefined,
  );
  /* while dragging to move/resize, set to the current drag vector, otherwise will be undefined */
  const dragAccVec = useRef<undefined | Xyz>(undefined);
  /* while a pan gesture is possible/happening, otherwise undefined */
  const panSessionRef = useRef<PanSession | undefined>(undefined);
  /**
   * where (in client px) an item drag left the pane, which released pointer
   * capture so the map (or anything else) sees the pointer under normal hit
   * testing. Undefined while the pane has the drag
   */
  const itemDragLeftPaneAtRef = useRef<undefined | Xy>(undefined);

  useEditorE2eApi({ renderArea, viewport, pointingAtRef });

  // wheel zooming: one normalised wheel notch walks the zoom a quarter-step
  // along the wheelZoomStep grid, about the cursor:
  const renderAreaRef = useMemo(() => ({ current: renderArea }), [renderArea]);
  useMouseWheel(renderAreaRef, (direction, wheelEvent) => {
    if (renderArea === null) {
      return;
    }
    const gridSteps = Math.round(viewport.zoom / wheelZoomStep);
    const rect = renderArea.getBoundingClientRect();
    store.dispatch(
      cursorRoomViewZoomed({
        zoom: (gridSteps + direction) * wheelZoomStep,
        fixedPanePoint: {
          x: wheelEvent.clientX - rect.left,
          y: wheelEvent.clientY - rect.top,
        },
      }),
    );
  });

  useEffect(() => {
    if (renderArea === null) {
      return;
    }

    const endPanSession = () => {
      if (panSessionRef.current?.active) {
        store.dispatch(changeDragInProgress(undefined));
      }
      panSessionRef.current = undefined;
    };

    /**
     * abandon any in-flight tool drag without committing: the previewed
     * (uncommitted) edit is discarded from the store so the dragged item
     * returns to where it started
     */
    const abandonToolDrag = () => {
      if (dragAccVec.current !== undefined) {
        store.dispatch(resetPreviewedEdits());
        store.dispatch(changeDragInProgress(undefined));
      }
      dragAccVec.current = undefined;
      mouseDownPointingAtRef.current = undefined;
      itemDragLeftPaneAtRef.current = undefined;
    };

    const isInsidePane = ({ clientX, clientY }: MouseEvent) => {
      const paneRect = renderArea.getBoundingClientRect();
      return (
        clientX >= paneRect.left &&
        clientX < paneRect.right &&
        clientY >= paneRect.top &&
        clientY < paneRect.bottom
      );
    };

    /**
     * an item drag leaving the pane gives up pointer capture, so whatever is
     * under the pointer (eg a map room to drop on) gets its events; coming
     * back takes capture again. Returns this move's movement in client px, or
     * undefined if the drag was abandoned
     */
    const trackItemDragAcrossPaneEdge = (
      mouseEvent: PointerEvent,
    ): undefined | Xy => {
      const leftPaneAt = itemDragLeftPaneAtRef.current;
      if (leftPaneAt !== undefined) {
        // only seen again once back over the pane:
        if (mouseEvent.buttons === 0) {
          // released somewhere its pointerup never reached us:
          abandonToolDrag();
          return undefined;
        }
        pixiApplication.canvas.setPointerCapture(mouseEvent.pointerId);
        itemDragLeftPaneAtRef.current = undefined;
        // the moves made outside were never seen - catch up in one jump, so
        // the items come back under the pointer:
        return {
          x: mouseEvent.clientX - leftPaneAt.x,
          y: mouseEvent.clientY - leftPaneAt.y,
        };
      }
      if (
        editorStore.getState().levelEditor.dragInProgress === "moveItems" &&
        !isInsidePane(mouseEvent)
      ) {
        pixiApplication.canvas.releasePointerCapture(mouseEvent.pointerId);
        itemDragLeftPaneAtRef.current = {
          x: mouseEvent.clientX,
          y: mouseEvent.clientY,
        };
      }
      return { x: mouseEvent.movementX, y: mouseEvent.movementY };
    };

    const handleMouseMove = (mouseEvent: PointerEvent) => {
      const panSession = panSessionRef.current;
      if (panSession !== undefined) {
        if (!panSession.active) {
          const movedPx = Math.hypot(
            mouseEvent.clientX - panSession.startClientX,
            mouseEvent.clientY - panSession.startClientY,
          );
          if (movedPx > panMinimumDistancePx) {
            panSession.active = true;
            // reuse the drag-in-progress state for the grabbing cursor:
            store.dispatch(changeDragInProgress("pan"));
          }
        }
        if (panSession.active) {
          store.dispatch(
            cursorRoomViewPanned({
              x: mouseEvent.movementX,
              y: mouseEvent.movementY,
            }),
          );
          return;
        }
      }

      const clientMovement = trackItemDragAcrossPaneEdge(mouseEvent);
      if (clientMovement === undefined) {
        return;
      }

      // no point in re-running this effect when it changes so select it 'live':
      const storeState = editorStore.getState();
      const roomState = editorLoadedRoom.getRoomState();
      const mouseXy = viewportMousePosition(viewport, mouseEvent);

      const tool = selectTool(storeState);

      const pointingAt = findPointerPointingAt({
        scrXy: mouseXy,
        room: roomState,
        tool,
        gridResolution: storeState.levelEditor.gridResolution,
        cameraAngle: storeState.levelEditor.cameraAngle,
        roomRenderer: roomRendererRef.current,
        previewOnlyJsonItemIds: selectPreviewOnlyJsonItemIds(storeState),
      });

      // we don't care if just the xy of the mouse changed (if it didn't point at anything new),
      // only if the pointing-at-in-world changed:
      const pointingAtChanged = !nanoEqual(
        pointingAt.world,
        pointingAtRef.current?.world,
      );

      const handler = toolHandlers[tool.type] as ToolHandler<Tool>;
      handler.handleMouseMove({
        pointingAtChanged,
        roomState,
        pointingAt,
        tool,
        storeState,
        mouseDownPointingAtRef,
        mouseEvent,
        clientMovement,
        viewport,
        dragAccVec,
      });

      pointingAtRef.current = pointingAt;
    };

    const handleMouseUp = (mouseEvent: MouseEvent) => {
      const wasPanning = panSessionRef.current?.active === true;
      const wasMiddleButton = mouseEvent.button === 1;
      endPanSession();
      if (wasPanning || wasMiddleButton) {
        // a pan is not a click or a tool drag:
        dragAccVec.current = undefined;
        mouseDownPointingAtRef.current = undefined;
        return;
      }

      // the pane holds pointer capture during drags, so release can happen
      // anywhere on (or off) the screen - releasing outside the pane abandons
      // the drag instead of committing it:
      if (!isInsidePane(mouseEvent)) {
        abandonToolDrag();
        return;
      }

      const storeState = editorStore.getState();
      const roomState = editorLoadedRoom.getRoomState();

      if (
        roomState.id !==
        selectCursorRoomIdFromLevelEditorState(storeState.levelEditor)
      ) {
        return;
      }

      const mouseXy = viewportMousePosition(viewport, mouseEvent);

      // no point in re-running this effect when it changes so select it 'live':
      const tool = selectTool(editorStore.getState());

      // get a fresh PointingAt - the one in the ref could be pointing
      // at a previous room if we just switched
      const pointingAt = findPointerPointingAt({
        scrXy: mouseXy,
        room: roomState,
        tool,
        gridResolution: storeState.levelEditor.gridResolution,
        cameraAngle: storeState.levelEditor.cameraAngle,
        roomRenderer: roomRendererRef.current,
        previewOnlyJsonItemIds: selectPreviewOnlyJsonItemIds(storeState),
      });

      const isDragEnd = dragAccVec.current !== undefined;

      const isClick =
        !isDragEnd &&
        // it is ok to click on nothing, but...
        // click needs to have started in the same room - this could be different happen if the
        // user clicks a door annotation to change room
        pointingAt.roomId === mouseDownPointingAtRef.current?.roomId &&
        // click needs to have started on the same item to count
        pointingAt.world?.itemId ===
          mouseDownPointingAtRef.current?.world?.itemId;

      // Store the mouseDownPointingAt before clearing
      const mouseDownPointingAt = mouseDownPointingAtRef.current;

      // clear some state now no longer mouse down:;
      dragAccVec.current = undefined;
      mouseDownPointingAtRef.current = undefined;

      store.dispatch(changeDragInProgress(undefined));

      if (!isClick && !isDragEnd) {
        console.log("mouseUp - not a click or drag end - skipping");
        return;
      }

      const handler = toolHandlers[tool.type] as ToolHandler<Tool>;
      handler.handleMouseUp({
        roomState,
        pointingAt,
        tool,
        storeState,
        mouseDownPointingAt,
        mouseEvent,
        viewport,
        isClick,
        isDragEnd,
      });
    };

    const handleMouseLeave = (mouseEvent: MouseEvent) => {
      if (
        dragAccVec.current !== undefined ||
        panSessionRef.current !== undefined
      ) {
        // the gesture continues outside the pane (an item drag leaving
        // releases capture, which fires this):
        return;
      }

      const storeState = editorStore.getState();
      const roomState = editorLoadedRoom.getRoomState();
      const tool = selectTool(storeState);

      const handler = toolHandlers[tool.type] as ToolHandler<Tool>;
      handler.handleMouseLeave({
        roomState,
        tool,
        storeState,
        mouseEvent,
      });
    };

    const handleMouseDown = (mouseEvent: PointerEvent) => {
      if (mouseEvent.button === 0 || mouseEvent.button === 1) {
        // capture so drags/pans keep receiving pointer events after the
        // cursor leaves the pane - dragging out and back in continues the
        // gesture, and the release is seen wherever it happens (except item
        // drags, which give capture up outside the pane). Captured on
        // pixi's canvas so pixi still sees the release as on its canvas, and
        // fires clicks on its own objects (eg annotations):
        pixiApplication.canvas.setPointerCapture(mouseEvent.pointerId);
      }

      if (mouseEvent.button === 1) {
        // middle button always pans, immediately - it never goes to a tool:
        mouseEvent.preventDefault();
        panSessionRef.current = {
          active: true,
          startClientX: mouseEvent.clientX,
          startClientY: mouseEvent.clientY,
        };
        store.dispatch(changeDragInProgress("pan"));
        return;
      }

      const storeState = editorStore.getState();
      const roomState = editorLoadedRoom.getRoomState();
      const mouseXy = viewportMousePosition(viewport, mouseEvent);
      const tool = selectTool(storeState);

      const pointingAt = findPointerPointingAt({
        scrXy: mouseXy,
        room: roomState,
        tool,
        gridResolution: storeState.levelEditor.gridResolution,
        cameraAngle: storeState.levelEditor.cameraAngle,
        roomRenderer: roomRendererRef.current,
        previewOnlyJsonItemIds: selectPreviewOnlyJsonItemIds(storeState),
      });
      mouseDownPointingAtRef.current = pointingAt;

      const handler = toolHandlers[tool.type] as ToolHandler<Tool>;

      const mouseDownParams = {
        roomState,
        pointingAt,
        tool,
        storeState,
        mouseEvent,
        viewport,
      };

      if (mouseEvent.button === 0 && !handler.claimsDrag(mouseDownParams)) {
        // no tool wants this drag - if the mouse moves far enough while down,
        // it pans the view instead:
        panSessionRef.current = {
          active: false,
          startClientX: mouseEvent.clientX,
          startClientY: mouseEvent.clientY,
        };
      }

      handler.handleMouseDown(mouseDownParams);
    };

    // suppress the native browser context menu - right-clicks are handled via
    // the mouse up/down handlers above (which open our own item context menu)
    const handleContextMenu = (mouseEvent: MouseEvent) => {
      mouseEvent.preventDefault();
    };

    // the browser has taken over the pointer (eg a touch gesture) - the
    // release will never be seen, so abandon rather than commit:
    const handlePointerCancel = () => {
      endPanSession();
      abandonToolDrag();
    };

    const handleKeyDown = (keyEvent: KeyboardEvent) => {
      if (keyEvent.key !== "Escape") {
        return;
      }
      if (
        dragAccVec.current === undefined &&
        panSessionRef.current === undefined
      ) {
        return;
      }
      endPanSession();
      abandonToolDrag();
    };

    // an item drag released outside the pane, after giving up capture - by
    // now (bubbling to window) any drop target under the pointer has had it:
    const handleWindowPointerUp = () => {
      if (itemDragLeftPaneAtRef.current !== undefined) {
        abandonToolDrag();
      }
    };

    const handleMouseMoveCatch = catchErrors(handleMouseMove);

    renderArea.addEventListener("pointermove", handleMouseMoveCatch);
    renderArea.addEventListener("pointerup", handleMouseUp);
    renderArea.addEventListener("pointerdown", handleMouseDown);
    renderArea.addEventListener("pointerleave", handleMouseLeave);
    renderArea.addEventListener("pointercancel", handlePointerCancel);
    renderArea.addEventListener("contextmenu", handleContextMenu);
    // on window so cancelling doesn't depend on the pane having focus:
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("pointerup", handleWindowPointerUp);

    return () => {
      window.removeEventListener("pointerup", handleWindowPointerUp);
      renderArea.removeEventListener("pointermove", handleMouseMoveCatch);
      renderArea.removeEventListener("pointerup", handleMouseUp);
      renderArea.removeEventListener("pointerdown", handleMouseDown);
      renderArea.removeEventListener("pointerleave", handleMouseLeave);
      renderArea.removeEventListener("pointercancel", handlePointerCancel);
      renderArea.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [renderArea, dispatch, viewport, roomRendererRef, pixiApplication]);
};
