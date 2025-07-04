import type { Xyz } from "../../utils/vectors/vectors";
import {
  addXyz,
  lengthXy,
  roundXyzToXyHalves,
  subXy,
  subXyz,
  xyzEqual,
  type Xy,
} from "../../utils/vectors/vectors";
import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import type { Upscale } from "src/store/slices/upscale/Upscale";
import { selectUpscale } from "../../store/slices/upscale/upscaleSlice";
import { useEditorRoomState } from "../EditorRoomStateProvider";
import { useProvidedPixiApplication } from "./PixiApplicationProvider";
import type { RootStateWithLevelEditorSlice } from "../slice/levelEditorSlice";
import type { MaybePointingAtSomething } from "./cursor/PointingAt";
import {
  applyToolToRoomJson,
  setSelectedItemInRoom,
  selectTool,
  deleteSelected,
  undo,
  redo,
  setHoveredItemInRoom,
  selectHoveredJsonItemId,
  setTool,
  moveItemInRoom,
  changeDragInProgress,
} from "../slice/levelEditorSlice";
import { store } from "../../store/store";
import {
  mutateRoomRemoveCursorPreviews,
  mutateRoomAddCursorPreviews,
  mutateRoomForDrag,
} from "./cursor/mutateRoomWithCursorPointingAt";
import {
  previewItemsForCursor,
  itemToolPutDownLocation,
} from "./cursor/itemToolPutDownLocation";
import nanoEqual from "nano-equal";
import type { ApplyToolToRoomJsonPayload } from "../slice/reducers/applyToolToRoomJson";
import {
  findPointerPointingAt,
  roundXyzProjection,
} from "./cursor/findPointerPointingAt";
import type { Key } from "../../game/input/keys";
import {
  fineXyzToBlockXyz,
  unprojectScreenXyToWorldXyz,
} from "../../game/render/projections";
import { catchErrors } from "../../utils/errors/errors";
import type {
  EditorRoomItemId,
  EditorRoomState,
  EditorUnionOfAllItemInPlayTypes,
} from "../EditorRoomId";

const dragMinimumDistance = 5; // pixels

const upscaledMousePosition = (upscale: Upscale, event: MouseEvent): Xy => {
  const totalUpscale = upscale.cssUpscale * upscale.gameEngineUpscale;

  if (event.target === null) {
    throw new Error("Mouse event target is null");
  }

  const rect = (event.target as HTMLElement).getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  return {
    x: x / totalUpscale - upscale.gameEngineScreenSize.x / 2,
    y: y / totalUpscale - upscale.gameEngineScreenSize.y + 16,
  };
};

const upscaledMouseMove = (upscale: Upscale, event: MouseEvent): Xy => {
  const totalUpscale = upscale.cssUpscale * upscale.gameEngineUpscale;

  if (event.target === null) {
    throw new Error("Mouse event target is null");
  }

  const x = event.movementX;
  const y = event.movementY;

  return {
    x: x / totalUpscale,
    y: y / totalUpscale,
  };
};

const getDrag = (
  /** undefined if the mouse is not down */
  mouseDownAt: Xy | undefined,
  mousePosition: Xy,
  mouseMove: Xy,
  vertical: boolean,
  draggingAlready: boolean,
) => {
  if (mouseDownAt === undefined) {
    return undefined;
  }

  const dragVectorScrPx = mouseDownAt && subXy(mousePosition, mouseDownAt);
  const dragDistancePx = lengthXy(dragVectorScrPx);
  const isDragging = draggingAlready || dragDistancePx > dragMinimumDistance;

  if (!isDragging) {
    return undefined;
  }

  const plane = vertical ? "yz" : "xy";

  const dragVectorWorldPx = unprojectScreenXyToWorldXyz(mouseMove, plane);

  return vertical ?
      {
        x: 0,
        y: 0,
        z: dragVectorWorldPx.z,
      }
    : dragVectorWorldPx;
};

const roundDragVector = (dragVector: Xyz) => {
  const levelEditorState = (store.getState() as RootStateWithLevelEditorSlice)
    .levelEditor;

  return roundXyzProjection(
    dragVector,
    "xy",
    levelEditorState.tool,
    levelEditorState.halfGridResolution,
  );
};

const jsonItemIdForItemId = (
  roomState: EditorRoomState,
  itemId: EditorRoomItemId,
) => {
  return roomState.items[itemId]?.jsonItemId;
};

const itemIsSelected = (
  storeState: RootStateWithLevelEditorSlice,
  item: EditorUnionOfAllItemInPlayTypes,
) => {
  return (
    item.jsonItemId &&
    storeState.levelEditor.selectedJsonItemIds.includes(item.jsonItemId)
  );
};

const itemIsLocked = (
  item: EditorUnionOfAllItemInPlayTypes,
  storeState: RootStateWithLevelEditorSlice,
) => {
  return (
    storeState.levelEditor.wallsFloorsLocked &&
    (item.type === "wall" || item.type === "floor")
  );
};

export const useRoomEditorInteractivity = (
  renderArea: HTMLDivElement | null,
) => {
  const application = useProvidedPixiApplication();

  const upscale = useAppSelector(selectUpscale);
  const dispatch = useAppDispatch();
  const roomState = useEditorRoomState();
  const pointingAtRef = useRef<MaybePointingAtSomething | undefined>(undefined);
  const mouseDownPointingAtRef = useRef<MaybePointingAtSomething | undefined>(
    undefined,
  );
  /* while dragging, set to the current drag vector, otherwise will be undefined */
  const dragItemPosition = useRef<Xyz | undefined>(undefined);
  const dragItemStartPosition = useRef<Xyz | undefined>(undefined);

  useEffect(() => {
    if (renderArea === null) {
      return;
    }

    const handleMouseMove = (mouseEvent: MouseEvent) => {
      const mousePosXy = upscaledMousePosition(upscale, mouseEvent);
      const mouseMoveXy = upscaledMouseMove(upscale, mouseEvent);

      /** unrounded */
      const dragDeltaVec: Xyz | undefined = getDrag(
        mouseDownPointingAtRef.current?.scrXy,
        mousePosXy,
        mouseMoveXy,
        mouseEvent.metaKey || mouseEvent.shiftKey,
        dragItemPosition.current !== undefined,
      );

      // no point in re-running this effect when it changes so select it 'live':
      const storeState = store.getState() as RootStateWithLevelEditorSlice;

      const tool = selectTool(storeState);

      const pointingAt = findPointerPointingAt(
        mousePosXy,
        roomState,
        tool,
        storeState.levelEditor.halfGridResolution,
      );

      // we don't care if just the xy of the mouse changed (if it didn't point at anything new),
      // only if the pointing-at-in-world changed:
      const pointingAtChanged = !nanoEqual(
        pointingAt.world,
        pointingAtRef.current?.world,
      );

      // if (pointingAtChanged) {
      //   if (pointingAt.world !== undefined) {
      switch (tool.type) {
        case "item": {
          if (!pointingAtChanged) {
            break;
          }

          // update item put-down preview by directly mutating room state:
          const previewItems =
            pointingAt.world &&
            previewItemsForCursor(pointingAt, roomState, tool.item);

          mutateRoomRemoveCursorPreviews(roomState);
          if (previewItems !== undefined) {
            mutateRoomAddCursorPreviews(roomState, previewItems);
          }
          break;
        }
        case "pointer": {
          if (dragDeltaVec) {
            // we are dragging - move items etc

            const dragItem =
              roomState.items[mouseDownPointingAtRef.current!.world!.itemId];
            if (dragItemStartPosition.current === undefined) {
              store.dispatch(changeDragInProgress(true));
              dragItemStartPosition.current = dragItem.state.position;
            }

            if (
              dragItem.jsonItemId === undefined ||
              itemIsLocked(dragItem, storeState)
            ) {
              // if item isn't in the json (or is locked) we can't drag it
              break;
            }

            if (!itemIsSelected(storeState, dragItem)) {
              store.dispatch(
                setSelectedItemInRoom({ jsonItemId: dragItem.jsonItemId }),
              );
            }

            const dragPosition = addXyz(
              dragItemPosition.current ?? dragItemStartPosition.current,
              dragDeltaVec,
            );
            const positionRounded = roundDragVector(dragPosition);
            const prevPositionRounded = roundDragVector(
              dragItemPosition.current ?? dragItemStartPosition.current,
            );

            if (!xyzEqual(positionRounded, prevPositionRounded)) {
              // item world positions aren't exactly on grid lines:
              const itemPositionInsideGridBlock = subXyz(
                dragItemStartPosition.current,
                roundDragVector(dragItemStartPosition.current),
              );
              mutateRoomForDrag(
                roomState,
                dragItem.jsonItemId,
                // this needs to be relative since many in-play items
                // can have the same jsonItemId
                subXyz(
                  addXyz(positionRounded, itemPositionInsideGridBlock),
                  dragItem.state.position,
                ),
              );
            }

            dragItemPosition.current = dragPosition;
          } else {
            // hovering, not dragging- can set focus:
            if (!pointingAtChanged) {
              // not thing new to point at
              break;
            }

            const pointingAtItemId = pointingAt.world?.itemId;
            {
              // convert from id of item in world to id of item in json:
              const hoveredItem =
                pointingAtItemId && roomState.items[pointingAtItemId];

              const newHoveredItemJsonId =
                hoveredItem !== undefined ?
                  itemIsLocked(hoveredItem, storeState) ? undefined
                  : hoveredItem.jsonItemId
                : undefined;

              if (
                selectHoveredJsonItemId(storeState) !== newHoveredItemJsonId
              ) {
                dispatch(setHoveredItemInRoom(newHoveredItemJsonId));
              }
            }
          }
          break;
        }
        default:
          tool satisfies never;
      }

      pointingAtRef.current = pointingAt;
    };

    const handleMouseUp = (mouseEvent: MouseEvent) => {
      const storeState = store.getState() as RootStateWithLevelEditorSlice;

      if (roomState.id !== storeState.levelEditor.currentlyEditingRoomId) {
        return;
      }

      const upscaledMouseXy = upscaledMousePosition(upscale, mouseEvent);
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
        storeState.levelEditor.halfGridResolution,
      );

      const isDragEnd = dragItemPosition.current !== undefined;

      if (isDragEnd) {
        const {
          state: { position: dragPosition },
        } = roomState.items[mouseDownPointingAtRef.current!.world!.itemId];

        const moveDeltaPx = subXyz(
          dragPosition,
          dragItemStartPosition.current!,
        );
        const moveDeltaBlocks = roundXyzToXyHalves(
          fineXyzToBlockXyz(moveDeltaPx),
        );

        store.dispatch(
          moveItemInRoom({
            jsonItemId: jsonItemIdForItemId(
              roomState,
              mouseDownPointingAtRef.current!.world!.itemId,
            )!,
            positionDelta: moveDeltaBlocks,
          }),
        );
      }

      const isClick =
        !isDragEnd &&
        // it is ok to click on nothing, but...
        // click needs to have started in the same room - this could be different happen if the
        // user clicks a door annotation to change room
        pointingAt.roomId === mouseDownPointingAtRef.current?.roomId &&
        // click needs to have started on the same item to count
        pointingAt.world?.itemId ===
          mouseDownPointingAtRef.current?.world?.itemId;

      // clear some state now no longer mouse down:;
      dragItemPosition.current = undefined;
      mouseDownPointingAtRef.current = undefined;
      dragItemStartPosition.current = undefined;
      store.dispatch(changeDragInProgress(false));

      if (!isClick && !isDragEnd) {
        console.log("mouseUp - not a click or drag end - skipping");
        return;
      }

      switch (tool.type) {
        case "item": {
          if (pointingAt.world === undefined) {
            // if using item tool, clicking on nothing is a quick way to go back to
            // the pointer:
            dispatch(setTool({ type: "pointer" }));
            break;
          }
          const putDownItems = previewItemsForCursor(
            pointingAt,
            roomState,
            tool.item,
          );
          if (putDownItems === undefined) {
            // clicked but unable to make any items here - skip
            break;
          }
          const pointedAtItemInPlay = roomState.items[pointingAt.world.itemId];
          dispatch(
            applyToolToRoomJson({
              blockPosition: itemToolPutDownLocation(
                pointingAt,
                roomState,
                tool.item,
              )!,
              pointedAtItem: {
                type: pointedAtItemInPlay.type,
                config: pointedAtItemInPlay.config,
                state: pointedAtItemInPlay.state,
                jsonItemId: pointedAtItemInPlay.jsonItemId,
              } as ApplyToolToRoomJsonPayload["pointedAtItem"],
            }),
          );
          break;
        }
        case "pointer": {
          if (isClick) {
            const clickedOnItem =
              pointingAt.world === undefined ?
                undefined
              : roomState.items[pointingAt.world.itemId];

            if (
              clickedOnItem?.jsonItemId === undefined ||
              itemIsLocked(clickedOnItem, storeState)
            ) {
              // clicking on nothing (or something with no json id) (or a locked floor/wall) unselects:
              dispatch(
                setSelectedItemInRoom({
                  jsonItemId: undefined,
                }),
              );
              break;
            }

            dispatch(
              setSelectedItemInRoom({
                jsonItemId: clickedOnItem.jsonItemId,
                additive: mouseEvent.ctrlKey || mouseEvent.metaKey,
              }),
            );
          }
          break;
        }
        default:
          tool satisfies never;
      }
    };

    const handleMouseLeave = (_mouseEvent: MouseEvent) => {
      const tool = selectTool(
        store.getState() as RootStateWithLevelEditorSlice,
      );

      dragItemPosition.current = undefined;
      mouseDownPointingAtRef.current = undefined;
      dragItemStartPosition.current = undefined;

      switch (tool.type) {
        case "item": {
          mutateRoomRemoveCursorPreviews(roomState);
          break;
        }
        case "pointer": {
          dispatch(setHoveredItemInRoom(undefined));
          break;
        }
        default:
          tool satisfies never;
      }
    };

    const handleMouseDown = (mouseEvent: MouseEvent) => {
      const upscaledMouseXy = upscaledMousePosition(upscale, mouseEvent);

      const storeState = store.getState() as RootStateWithLevelEditorSlice;
      const tool = selectTool(storeState);

      const pointingAt = findPointerPointingAt(
        upscaledMouseXy,
        roomState,
        tool,
        storeState.levelEditor.halfGridResolution,
      );
      mouseDownPointingAtRef.current = pointingAt;
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const key = event.key as Key;
      if (key === "Backspace" || key === "Delete") {
        dispatch(deleteSelected());
      }

      if (
        (key as string) === "z" ||
        key === "Z" //&&
        //(event.ctrlKey || event.metaKey)
      ) {
        // Ctrl+Z or Cmd+Z for undo - this may not work if the browser is taking
        // this keystroke over and not passing it down to Javascript
        store.dispatch(event.shiftKey ? redo() : undo());
      }
    };

    const handleMouseMoveCatch = catchErrors(handleMouseMove);

    renderArea.addEventListener("mousemove", handleMouseMoveCatch);
    renderArea.addEventListener("mouseup", handleMouseUp);
    renderArea.addEventListener("mousedown", handleMouseDown);
    renderArea.addEventListener("mouseleave", handleMouseLeave);
    renderArea.tabIndex = 0; // Make the div focusable to capture key events
    renderArea.addEventListener("keyup", handleKeyUp);

    return () => {
      renderArea.removeEventListener("mousemove", handleMouseMoveCatch);
      renderArea.removeEventListener("mouseup", handleMouseUp);
      renderArea.removeEventListener("mousedown", handleMouseDown);
      renderArea.removeEventListener("mouseleave", handleMouseLeave);
      renderArea.removeEventListener("keyup", handleKeyUp);
    };
  }, [application.stage, upscale, renderArea, dispatch, roomState]);
};
