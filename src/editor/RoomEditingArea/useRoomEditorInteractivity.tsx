import { type Xy } from "../../utils/vectors/vectors";
import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import type { Upscale } from "../../store/slices/upscale/upscaleSlice";
import { selectUpscale } from "../../store/slices/upscale/upscaleSlice";
import { useEditorRoomState } from "../EditorRoomStateProvider";
import { useProvidedPixiApplication } from "./PixiApplicationProvider";
import type { RootStateWithLevelEditorSlice } from "../slice/levelEditorSlice";
import type { PointingAt } from "./cursor/PointingAt";
import {
  applyToolToRoomJson,
  setSelectedItemInRoom,
  selectTool,
  deleteSelected,
  undo,
  redo,
} from "../slice/levelEditorSlice";
import { store } from "../../store/store";
import {
  mutateRoomRemoveCursorPreviews,
  mutateRoomAddCursorItems,
} from "./cursor/mutateRoomWithCursorPointingAt";
import {
  previewItemsForCursor,
  itemToolPutDownLocation,
} from "./cursor/itemToolPutDownLocation";
import { emptyArray } from "../../utils/empty";
import nanoEqual from "nano-equal";
import type { ApplyToolToRoomJsonPayload } from "../slice/reducers/applyToolToRoomJson";
import { findPointerPointingAt } from "./findPointerPointingAt";
import type { Key } from "../../game/input/keys";

const upscaledMousePosition = (upscale: Upscale, event: MouseEvent): Xy => {
  const totalUpscale = upscale.cssUpscale * upscale.gameEngineUpscale;
  //const totalUpscale = upscale.gameEngineUpscale * upscale.cssUpscale;
  return {
    x: event.x / totalUpscale - upscale.gameEngineScreenSize.x / 2,
    y: event.y / totalUpscale - upscale.gameEngineScreenSize.y + 16,
  };
};

export const useRoomEditorInteractivity = (
  renderArea: HTMLDivElement | null,
) => {
  const application = useProvidedPixiApplication();

  const upscale = useAppSelector(selectUpscale);
  const dispatch = useAppDispatch();
  const roomState = useEditorRoomState();
  const pointingAtRef = useRef<PointingAt | undefined>(undefined);

  useEffect(() => {
    application.stage.eventMode = "none";
    if (renderArea === null) {
      return;
    }

    const handleMouseMove = (event: MouseEvent) => {
      const upscaledMouseXy = upscaledMousePosition(upscale, event);

      // no point in re-running this effect when it changes so select it 'live':
      const storeState = store.getState() as RootStateWithLevelEditorSlice;

      const tool = selectTool(storeState);

      const pointingAt = findPointerPointingAt(
        upscaledMouseXy,
        roomState,
        tool,
        storeState.levelEditor.halfGridResolution,
      );

      if (nanoEqual(pointingAt, pointingAtRef.current)) {
        // no change - stop here
        return;
      }
      pointingAtRef.current = pointingAt;

      if (pointingAt !== undefined) {
        switch (tool.type) {
          case "item": {
            const previewItems = previewItemsForCursor(
              pointingAt,
              roomState,
              tool.item,
            );
            const valid = previewItems !== undefined;

            mutateRoomRemoveCursorPreviews(roomState);
            mutateRoomAddCursorItems({
              room: roomState,
              pointingAt,
              valid,
              includeCursor: !valid,
              previewItems: previewItems ?? emptyArray,
            });
            break;
          }
          case "pointer": {
            mutateRoomRemoveCursorPreviews(roomState);
            mutateRoomAddCursorItems({
              room: roomState,
              pointingAt,
              valid: true,
              includeCursor: true,
              previewItems: emptyArray,
            });
            const hoveredJsonItemId =
              roomState.items[pointingAt.itemId]?.jsonItemId;
            roomState.editor = {
              ...roomState.editor,
              hoveredJsonItemId,
            };
            break;
          }
          default:
            tool satisfies never;
        }
      } else {
        mutateRoomRemoveCursorPreviews(roomState);
      }
    };

    const handleMouseClick = (mouseEvent: MouseEvent) => {
      // no point in re-running this effect when it changes so select it 'live':
      const tool = selectTool(
        store.getState() as RootStateWithLevelEditorSlice,
      );

      switch (tool.type) {
        case "item": {
          const currentPointingAt = pointingAtRef.current;
          if (currentPointingAt === undefined) {
            return;
          }
          const putDownItems = previewItemsForCursor(
            currentPointingAt,
            roomState,
            tool.item,
          );
          if (putDownItems === undefined) {
            return;
          }
          const pointedAtItem = roomState.items[currentPointingAt.itemId];
          dispatch(
            applyToolToRoomJson({
              blockPosition: itemToolPutDownLocation(
                currentPointingAt,
                roomState,
                tool.item,
              )!,
              pointedAtItem: {
                type: pointedAtItem.type,
                config: pointedAtItem.config,
                jsonItemId: pointedAtItem.jsonItemId,
              } as ApplyToolToRoomJsonPayload["pointedAtItem"],
            }),
          );
          break;
        }
        case "pointer": {
          const currentPointingAt = pointingAtRef.current;
          if (!currentPointingAt) {
            return;
          }
          const { jsonItemId } = roomState.items[currentPointingAt.itemId];

          dispatch(
            setSelectedItemInRoom({
              jsonItemId,
              additive: mouseEvent.ctrlKey || mouseEvent.metaKey,
            }),
          );
          break;
        }
        default:
          tool satisfies never;
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const key = event.key as Key;
      if (key === "Backspace" || key === "Delete") {
        dispatch(deleteSelected());
      }

      if (
        ((key as string) === "z" || key === "Z") &&
        (event.ctrlKey || event.metaKey)
      ) {
        // Ctrl+Z or Cmd+Z for undo - this may not work if the browser is taking
        // this keystroke over and not passing it down to Javascript
        store.dispatch(event.shiftKey ? redo() : undo());
      }
    };

    renderArea.addEventListener("mousemove", handleMouseMove);
    renderArea.addEventListener("click", handleMouseClick);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      renderArea.removeEventListener("mousemove", handleMouseMove);
      renderArea.removeEventListener("click", handleMouseClick);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [application.stage, upscale, renderArea, dispatch, roomState]);
};
