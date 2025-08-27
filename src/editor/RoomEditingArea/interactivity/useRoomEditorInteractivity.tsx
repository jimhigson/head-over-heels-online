import nanoEqual from "nano-equal";
import { useEffect, useRef } from "react";

import type { Xyz } from "../../../utils/vectors/vectors";
import type { RootStateWithLevelEditorSlice } from "../../slice/levelEditorSlice";
import type { Tool } from "../../Tool";
import type { MaybePointingAtSomething } from "../cursor/PointingAt";
import type { ToolHandler } from "./tools/ToolHandler";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { selectUpscale } from "../../../store/slices/upscale/upscaleSlice";
import { store } from "../../../store/store";
import { catchErrors } from "../../../utils/errors/errors";
import {
  selectEditorRoomRenderDimensions,
  selectEditorRoomState,
} from "../../slice/levelEditorSelectors";
import { changeDragInProgress, selectTool } from "../../slice/levelEditorSlice";
import { findPointerPointingAt } from "../cursor/findPointerPointingAt";
import { upscaledMousePosition } from "../cursor/upscaledMouse";
import { useProvidedPixiApplication } from "../PixiApplicationProvider";
import { EyeDropperToolHandler } from "./tools/EyeDropperToolHandler";
import { ItemToolHandler } from "./tools/ItemToolHandler";
import { PointerToolHandler } from "./tools/PointerToolHandler";

const toolHandlers: {
  [T in Tool["type"]]: ToolHandler<Extract<Tool, { type: T }>>;
} = {
  item: new ItemToolHandler(),
  pointer: new PointerToolHandler(),
  eyeDropper: new EyeDropperToolHandler(),
};

export const useRoomEditorInteractivity = (
  renderArea: HTMLDivElement | null,
) => {
  const application = useProvidedPixiApplication();

  const upscale = useAppSelector(selectUpscale);
  const dispatch = useAppDispatch();
  const pointingAtRef = useRef<MaybePointingAtSomething | undefined>(undefined);
  const mouseDownPointingAtRef = useRef<MaybePointingAtSomething | undefined>(
    undefined,
  );
  /* while dragging to move/resize, set to the current drag vector, otherwise will be undefined */
  const dragAccVec = useRef<undefined | Xyz>(undefined);

  useEffect(() => {
    if (renderArea === null) {
      return;
    }

    const handleMouseMove = (mouseEvent: MouseEvent) => {
      // no point in re-running this effect when it changes so select it 'live':
      const storeState = store.getState() as RootStateWithLevelEditorSlice;
      const roomState = selectEditorRoomState(storeState);
      const roomRenderSize = selectEditorRoomRenderDimensions(storeState);
      const upscaledMouseXy = upscaledMousePosition(
        upscale,
        roomRenderSize,
        mouseEvent,
      );

      const tool = selectTool(storeState);

      const pointingAt = findPointerPointingAt(
        upscaledMouseXy,
        roomState,
        tool,
        storeState.levelEditor.gridResolution,
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
        upscale,
        dragAccVec,
        roomRenderSize,
      });

      pointingAtRef.current = pointingAt;
    };

    const handleMouseUp = (mouseEvent: MouseEvent) => {
      const storeState = store.getState() as RootStateWithLevelEditorSlice;
      const roomState = selectEditorRoomState(storeState);

      if (roomState.id !== storeState.levelEditor.currentlyEditingRoomId) {
        return;
      }

      const roomRenderSize = selectEditorRoomRenderDimensions(storeState);
      const upscaledMouseXy = upscaledMousePosition(
        upscale,
        roomRenderSize,
        mouseEvent,
      );

      // no point in re-running this effect when it changes so select it 'live':
      const tool = selectTool(
        store.getState() as RootStateWithLevelEditorSlice,
      );

      // get a fresh PointingAt - the one in the ref could be pointing
      // at a previous room if we just switched
      const pointingAt = findPointerPointingAt(
        upscaledMouseXy,
        roomState,
        tool,
        storeState.levelEditor.gridResolution,
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
        upscale,
        isClick,
        isDragEnd,
      });
    };

    const handleMouseLeave = (mouseEvent: MouseEvent) => {
      const storeState = store.getState() as RootStateWithLevelEditorSlice;
      const roomState = selectEditorRoomState(storeState);
      const tool = selectTool(storeState);

      dragAccVec.current = undefined;
      mouseDownPointingAtRef.current = undefined;

      const handler = toolHandlers[tool.type] as ToolHandler<Tool>;
      handler.handleMouseLeave({
        roomState,
        tool,
        storeState,
        mouseEvent,
      });
    };

    const handleMouseDown = (mouseEvent: MouseEvent) => {
      const storeState = store.getState() as RootStateWithLevelEditorSlice;
      const roomState = selectEditorRoomState(storeState);
      const roomRenderSize = selectEditorRoomRenderDimensions(storeState);
      const upscaledMouseXy = upscaledMousePosition(
        upscale,
        roomRenderSize,
        mouseEvent,
      );
      const tool = selectTool(storeState);

      const pointingAt = findPointerPointingAt(
        upscaledMouseXy,
        roomState,
        tool,
        storeState.levelEditor.gridResolution,
      );
      console.log("setting mouseDownPointingAtRef to", pointingAt);
      mouseDownPointingAtRef.current = pointingAt;

      const handler = toolHandlers[tool.type] as ToolHandler<Tool>;
      handler.handleMouseDown({
        roomState,
        pointingAt,
        tool,
        storeState,
        mouseEvent,
        upscale,
      });
    };

    const handleMouseMoveCatch = catchErrors(handleMouseMove);

    renderArea.addEventListener("mousemove", handleMouseMoveCatch);
    renderArea.addEventListener("mouseup", handleMouseUp);
    renderArea.addEventListener("mousedown", handleMouseDown);
    renderArea.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      renderArea.removeEventListener("mousemove", handleMouseMoveCatch);
      renderArea.removeEventListener("mouseup", handleMouseUp);
      renderArea.removeEventListener("mousedown", handleMouseDown);
      renderArea.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [application.stage, upscale, renderArea, dispatch]);
};
