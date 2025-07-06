import type { Plane, Xyz } from "../../utils/vectors/vectors";
import {
  addXyz,
  elementWiseProductXyz,
  lengthXy,
  lengthXyz,
  originXyz,
  subXy,
  xyzEqual,
  type Xy,
} from "../../utils/vectors/vectors";
import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import type { Upscale } from "src/store/slices/upscale/Upscale";
import { selectUpscale } from "../../store/slices/upscale/upscaleSlice";
import { useEditorRoomState } from "../EditorRoomStateProvider";
import { useProvidedPixiApplication } from "./PixiApplicationProvider";
import type {
  HoveredItem,
  RootStateWithLevelEditorSlice,
} from "../slice/levelEditorSlice";
import type { MaybePointingAtSomething } from "./cursor/PointingAt";
import {
  applyItemTool,
  setSelectedItemInRoom,
  selectTool,
  setHoveredItemInRoom,
  selectHoveredItem,
  setTool,
  changeDragInProgress,
  selectItem,
  moveOrResizeItem,
} from "../slice/levelEditorSlice";
import { store } from "../../store/store";
import {
  mutateRoomRemoveCursorPreviews,
  mutateRoomAddCursorPreviews,
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
import {
  fineXyzToBlockXyz,
  unprojectScreenXyToWorldXyz,
} from "../../game/render/projections";
import { catchErrors } from "../../utils/errors/errors";
import type {
  EditorJsonItemUnion,
  EditorJsonItemWithTimes,
  EditorRoomItemId,
  EditorRoomState,
  EditorUnionOfAllItemInPlayTypes,
} from "../editorTypes";
import type { Tool } from "../Tool";
import { editorKeyboardShortcuts } from "./editorKeyboardShortcuts";
import {
  getConsolidatableVector,
  isConsolidatable,
} from "../../model/json/ConsolidatableJsonItem";
import { itemChangeCausesCollision } from "./cursor/itemChangeCausesCollision";
import { completeTimesXyz } from "../../game/collision/boundingBoxTimes";
import { resizeTimesAndPosition } from "./resizeTimesAndPosition";

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

const getDragPlaneNormal = (
  mouseDownPointingAt: MaybePointingAtSomething,
  modifierPressed: boolean,
  jsonItem: EditorJsonItemUnion,
): Xyz => {
  const edgePlane = mouseDownPointingAt.world?.onItem.edge;

  const edgeDirection = elementWiseProductXyz(
    edgePlane?.point ?? originXyz,
    getConsolidatableVector(jsonItem),
  );

  if (lengthXyz(edgeDirection) > 0) {
    // dragging will be resizing - use the plane of the edge under the mouse:
    return edgePlane!.normal;
  }

  // drag will be moving - use canned planes:
  return modifierPressed ?
      // vertical (z) movement - give (normal to) yz plane
      { x: 1, y: 0, z: 0 }
      // horizontal (xy) movement
    : { x: 0, y: 0, z: 1 };
};

const getDragVector = (
  /** undefined if the mouse is not down */
  mouseDownPointingAt: MaybePointingAtSomething | undefined,
  mousePosition: Xy,
  mouseMove: Xy,
  modifierPressed: boolean,
  draggingAlready: boolean,
  jsonItem: EditorJsonItemUnion,
): Xyz | undefined => {
  if (mouseDownPointingAt === undefined) {
    return undefined;
  }

  const dragVectorScrPx = subXy(mousePosition, mouseDownPointingAt.scrXy);
  const dragDistancePx = lengthXy(dragVectorScrPx);
  const isDragging = draggingAlready || dragDistancePx > dragMinimumDistance;

  if (!isDragging) {
    return undefined;
  }

  // TODO: this isn't taking any account of if the item is resizable, which
  // is probably a mistake given that it is possible to grab on an edge of
  // a non-resizable item. As-is, it is a bit confusing which axes the drag-move
  // of an item will happen on since there's no feedback given if going to drag
  // on their corner
  const plane = getDragPlaneNormal(
    mouseDownPointingAt,
    modifierPressed,
    jsonItem,
  );

  const dragVectorWorld = unprojectScreenXyToWorldXyz(plane, mouseMove);

  return modifierPressed ?
      {
        x: 0,
        y: 0,
        z: dragVectorWorld.z,
      }
    : dragVectorWorld;
};

const roundDragVector = (
  dragVector: Xyz,
  /**
   * if given and false, the halfGridResolution setting is ignored and will never
   * round to halves
   */
  noHalves = false,
) => {
  const levelEditorState = (store.getState() as RootStateWithLevelEditorSlice)
    .levelEditor;

  return roundXyzProjection(
    dragVector,
    { x: 0, y: 0, z: 1 },
    levelEditorState.tool,
    !noHalves && levelEditorState.halfGridResolution,
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

const dispatchHoveredOnChangedIfNeeded = (
  roomState: EditorRoomState,
  pointingAt: MaybePointingAtSomething,
) => {
  const storeState = store.getState() as RootStateWithLevelEditorSlice;

  let newHoveredItem: HoveredItem | undefined;

  if (pointingAt.world) {
    const pointingAtItemId = pointingAt.world.itemId;

    // convert from id of item in world to id of item in json:
    const hoveredInPlayItem =
      pointingAtItemId && roomState.items[pointingAtItemId];

    const newHoveredItemJsonId =
      itemIsLocked(hoveredInPlayItem, storeState) ? undefined : (
        hoveredInPlayItem.jsonItemId
      );

    newHoveredItem =
      newHoveredItemJsonId === undefined ? undefined : (
        {
          jsonItemId: newHoveredItemJsonId,
          pointingAtOnItem: pointingAt.world!.onItem,
        }
      );
  } else {
    newHoveredItem = undefined;
  }

  if (
    // only dispatch if something is different, to stop the redux dev tools being flooded:
    !nanoEqual(selectHoveredItem(storeState), newHoveredItem)
  ) {
    store.dispatch(setHoveredItemInRoom(newHoveredItem));
  }
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
  /* while dragging to move/resize, set to the current drag vector, otherwise will be undefined */
  const dragAccVec = useRef<Xyz | undefined>(undefined);
  const dragItemStartProperties = useRef<
    { position: Xyz; times: Xyz } | undefined
  >(undefined);
  const isItemsFirstMove = useRef<boolean>(true);

  useEffect(() => {
    if (renderArea === null) {
      return;
    }

    const handleMouseMove = (mouseEvent: MouseEvent) => {
      const mousePosXy = upscaledMousePosition(upscale, mouseEvent);
      const mouseMoveXy = upscaledMouseMove(upscale, mouseEvent);

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
          const itemId = mouseDownPointingAtRef.current?.world?.itemId;

          if (itemId === undefined) {
            // can't be pointing without mouse going down on an item
            dispatchHoveredOnChangedIfNeeded(roomState, pointingAt);
            break;
          }

          // we are dragging - resize/move items
          const item = roomState.items[itemId];
          const { jsonItemId } = item;
          const jsonItem = roomState.roomJson.items[
            jsonItemId!
          ] as EditorJsonItemUnion;
          /**
           * get the (unrounded) drag delta vector since the last frame
           * (if there is one)
           */
          const dragDeltaVec: Xyz | undefined = getDragVector(
            mouseDownPointingAtRef.current,
            mousePosXy,
            mouseMoveXy,
            mouseEvent.metaKey || mouseEvent.shiftKey,
            dragAccVec.current !== undefined,
            jsonItem,
          );

          if (!dragDeltaVec) {
            // not dragging so the most moving the pointer can do is change the hover status of items:
            dispatchHoveredOnChangedIfNeeded(roomState, pointingAt);
            break;
          }

          if (dragItemStartProperties.current === undefined) {
            store.dispatch(changeDragInProgress(true));
            isItemsFirstMove.current = true;
            dragItemStartProperties.current = {
              position: jsonItem.position,
              times: completeTimesXyz(
                (jsonItem as EditorJsonItemWithTimes).config.times,
              ),
            };
          }

          if (jsonItemId === undefined || itemIsLocked(item, storeState)) {
            // if item isn't in the json (or is locked) we can't drag it
            break;
          }

          if (!itemIsSelected(storeState, item)) {
            // once we are dragging an item, select it:
            store.dispatch(setSelectedItemInRoom({ jsonItemId }));
          }

          const resizeEdge: Plane | undefined =
            mouseDownPointingAtRef.current?.world?.onItem.edge;
          const isResizing = resizeEdge && isConsolidatable(jsonItem);

          const prevDragAccVec: Xyz = dragAccVec.current ?? originXyz;

          // accumulate some more on the drag vector:
          const nextDragAccVec = addXyz(prevDragAccVec, dragDeltaVec);
          const nextDragAccVecRound = roundDragVector(
            nextDragAccVec,
            isResizing,
          );

          // store for the next frame:
          dragAccVec.current = nextDragAccVec;

          if (
            xyzEqual(
              roundDragVector(prevDragAccVec, isResizing),
              nextDragAccVecRound,
            )
          ) {
            // rounded acc drag vector didn't change - nothing to do
            break;
          }

          const startPosition = dragItemStartProperties.current!.position;
          const startTimes = dragItemStartProperties.current!.times;

          const blockDragAccVec = fineXyzToBlockXyz(nextDragAccVecRound);

          let newPosition: Xyz;
          let newTimes: Xyz | undefined = undefined;

          if (isResizing) {
            // resizing
            //
            //   ⌑
            //     ↘ ┌-┐
            //       └-┘
            //
            ({ newTimes, newPosition } = resizeTimesAndPosition({
              jsonItem,
              blockDragAccVec,
              resizeEdgeDirection: resizeEdge.point,
              startTimes,
              startPosition,
            }));
          } else {
            // moving
            //
            //   ⌑ -> ⌑
            //
            newPosition = addXyz(startPosition, blockDragAccVec);
          }
          if (
            (!newTimes ||
              xyzEqual(
                newTimes,
                completeTimesXyz(
                  (jsonItem as EditorJsonItemWithTimes).config.times,
                ),
              )) &&
            xyzEqual(newPosition, jsonItem.position)
          ) {
            // break out - the size of the item (times) or position isn't different from what it already is
            break;
          }

          const collides = itemChangeCausesCollision({
            roomState,
            jsonItemId,
            newPosition,
            newTimes,
          });

          if (collides) {
            break;
          }
          dispatch(
            moveOrResizeItem({
              jsonItemId,
              newPosition,
              newTimes,
              startOfGesture: isItemsFirstMove.current,
            }),
          );
          isItemsFirstMove.current = false;
          break;
        }
        case "eyeDropper":
          dispatchHoveredOnChangedIfNeeded(roomState, pointingAt);
          break;
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

      // clear some state now no longer mouse down:;
      dragAccVec.current = undefined;
      mouseDownPointingAtRef.current = undefined;
      dragItemStartProperties.current = undefined;
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
            applyItemTool({
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
        case "eyeDropper": {
          if (isClick) {
            // TODO: skip locked items!

            const itemId = pointingAt.world?.itemId;

            if (itemId === undefined) {
              console.warn("no itemId");
              break;
            }

            const clickedOnItem = roomState.items[itemId];

            if (itemIsLocked(clickedOnItem, storeState)) {
              break;
            }

            const jsonItemId = jsonItemIdForItemId(roomState, itemId)!;
            const jsonItem = selectItem(storeState, jsonItemId);

            if (jsonItem === undefined) {
              console.warn("no json item");
              break;
            }

            const itemTool: Tool = {
              type: "item",
              item: {
                type: jsonItem.type,
                config: jsonItem.config,
              },
            };

            dispatch(setTool(itemTool));
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

      dragAccVec.current = undefined;
      mouseDownPointingAtRef.current = undefined;
      dragItemStartProperties.current = undefined;

      switch (tool.type) {
        case "item": {
          mutateRoomRemoveCursorPreviews(roomState);
          break;
        }
        case "pointer": {
          dispatch(setHoveredItemInRoom(undefined));
          break;
        }
        case "eyeDropper":
          // nothing to do
          break;
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
      console.log("setting mouseDownPointingAtRef to", pointingAt);
      mouseDownPointingAtRef.current = pointingAt;
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      editorKeyboardShortcuts(event);
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
