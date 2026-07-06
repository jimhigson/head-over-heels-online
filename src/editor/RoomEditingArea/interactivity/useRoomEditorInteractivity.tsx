import nanoEqual from "nano-equal";
import { useEffect, useMemo, useRef } from "preact/hooks";

import { useAppDispatch } from "../../../store/hooks";
import { editorStore, store } from "../../../store/store";
import { useMouseWheel } from "../../../ui/useMouseWheel";
import { catchErrors } from "../../../utils/errors/errors";
import { type Xyz } from "../../../utils/vectors/vectors";
import {
  selectCursorRoomId,
  selectEditorRoomState,
} from "../../slice/levelEditorSelectors";
import {
  changeDragInProgress,
  resetPreviewedEdits,
  selectTool,
} from "../../slice/levelEditorSlice";
import { findPointerPointingAt } from "../cursor/findPointerPointingAt";
import { type MaybePointingAtSomething } from "../cursor/PointingAt";
import { viewportMousePosition } from "../cursor/viewportMouse";
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
) => {
  const viewport = useEditorViewport();

  const dispatch = useAppDispatch();
  const pointingAtRef = useRef<MaybePointingAtSomething | undefined>(undefined);
  const mouseDownPointingAtRef = useRef<MaybePointingAtSomething | undefined>(
    undefined,
  );
  /* while dragging to move/resize, set to the current drag vector, otherwise will be undefined */
  const dragAccVec = useRef<undefined | Xyz>(undefined);
  /* while a pan gesture is possible/happening, otherwise undefined */
  const panSessionRef = useRef<PanSession | undefined>(undefined);

  // wheel zooming: one normalised wheel notch walks the zoom a quarter-step
  // along the wheelZoomStep grid, about the cursor:
  const renderAreaRef = useMemo(() => ({ current: renderArea }), [renderArea]);
  useMouseWheel(renderAreaRef, (direction, wheelEvent) => {
    if (renderArea === null) {
      return;
    }
    const gridSteps = Math.round(viewport.zoom / wheelZoomStep);
    const rect = renderArea.getBoundingClientRect();
    viewport.setZoom((gridSteps + direction) * wheelZoomStep, {
      x: wheelEvent.clientX - rect.left,
      y: wheelEvent.clientY - rect.top,
    });
  });

  useEffect(() => {
    if (renderArea === null) {
      return;
    }

    const endPanSession = () => {
      if (panSessionRef.current?.active) {
        store.dispatch(changeDragInProgress(false));
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
        store.dispatch(changeDragInProgress(false));
      }
      dragAccVec.current = undefined;
      mouseDownPointingAtRef.current = undefined;
    };

    const handleMouseMove = (mouseEvent: MouseEvent) => {
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
            store.dispatch(changeDragInProgress(true));
          }
        }
        if (panSession.active) {
          viewport.panBy({
            x: mouseEvent.movementX,
            y: mouseEvent.movementY,
          });
          return;
        }
      }

      // no point in re-running this effect when it changes so select it 'live':
      const storeState = editorStore.getState();
      const roomState = selectEditorRoomState(storeState);
      const mouseXy = viewportMousePosition(viewport, mouseEvent);

      const tool = selectTool(storeState);

      const pointingAt = findPointerPointingAt(
        mouseXy,
        roomState,
        tool,
        storeState.levelEditor.gridResolution,
        storeState.levelEditor.cameraAngle,
      );

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
      const paneRect = renderArea.getBoundingClientRect();
      const releasedInsidePane =
        mouseEvent.clientX >= paneRect.left &&
        mouseEvent.clientX < paneRect.right &&
        mouseEvent.clientY >= paneRect.top &&
        mouseEvent.clientY < paneRect.bottom;
      if (!releasedInsidePane) {
        abandonToolDrag();
        return;
      }

      const storeState = editorStore.getState();
      const roomState = selectEditorRoomState(storeState);

      if (roomState.id !== selectCursorRoomId(storeState.levelEditor)) {
        return;
      }

      const mouseXy = viewportMousePosition(viewport, mouseEvent);

      // no point in re-running this effect when it changes so select it 'live':
      const tool = selectTool(editorStore.getState());

      // get a fresh PointingAt - the one in the ref could be pointing
      // at a previous room if we just switched
      const pointingAt = findPointerPointingAt(
        mouseXy,
        roomState,
        tool,
        storeState.levelEditor.gridResolution,
        storeState.levelEditor.cameraAngle,
      );

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

      store.dispatch(changeDragInProgress(false));

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
        // mid-drag/pan the pane holds pointer capture so leave shouldn't fire,
        // but if it somehow does, the gesture continues outside the pane:
        return;
      }

      const storeState = editorStore.getState();
      const roomState = selectEditorRoomState(storeState);
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
        // gesture, and the release is seen wherever it happens:
        renderArea.setPointerCapture(mouseEvent.pointerId);
      }

      if (mouseEvent.button === 1) {
        // middle button always pans, immediately - it never goes to a tool:
        mouseEvent.preventDefault();
        panSessionRef.current = {
          active: true,
          startClientX: mouseEvent.clientX,
          startClientY: mouseEvent.clientY,
        };
        store.dispatch(changeDragInProgress(true));
        return;
      }

      const storeState = editorStore.getState();
      const roomState = selectEditorRoomState(storeState);
      const mouseXy = viewportMousePosition(viewport, mouseEvent);
      const tool = selectTool(storeState);

      const pointingAt = findPointerPointingAt(
        mouseXy,
        roomState,
        tool,
        storeState.levelEditor.gridResolution,
        storeState.levelEditor.cameraAngle,
      );
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

    const handleMouseMoveCatch = catchErrors(handleMouseMove);

    renderArea.addEventListener("pointermove", handleMouseMoveCatch);
    renderArea.addEventListener("pointerup", handleMouseUp);
    renderArea.addEventListener("pointerdown", handleMouseDown);
    renderArea.addEventListener("pointerleave", handleMouseLeave);
    renderArea.addEventListener("pointercancel", handlePointerCancel);
    renderArea.addEventListener("contextmenu", handleContextMenu);
    // on window so cancelling doesn't depend on the pane having focus:
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      renderArea.removeEventListener("pointermove", handleMouseMoveCatch);
      renderArea.removeEventListener("pointerup", handleMouseUp);
      renderArea.removeEventListener("pointerdown", handleMouseDown);
      renderArea.removeEventListener("pointerleave", handleMouseLeave);
      renderArea.removeEventListener("pointercancel", handlePointerCancel);
      renderArea.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [renderArea, dispatch, viewport]);
};
