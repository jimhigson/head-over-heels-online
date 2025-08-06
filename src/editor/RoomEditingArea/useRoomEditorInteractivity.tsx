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
  setSelectedItemsInRoom,
  selectTool,
  setHoveredItemInRoom,
  selectHoveredItem,
  setTool,
  changeDragInProgress,
  selectItem,
  moveOrResizeItemAsPreview,
  resetPreviewedEdits,
  toggleSelectedItemInRoom,
  selectItemIsSelected,
  commitCurrentPreviewedEdits,
} from "../slice/levelEditorSlice";
import { store } from "../../store/store";

import { itemToolPutDownLocation } from "./cursor/itemToolPutDownLocation";
import nanoEqual from "nano-equal";
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
  EditorRoomItemId,
  EditorRoomState,
  EditorUnionOfAllItemInPlayTypes,
} from "../editorTypes";
import {
  getConsolidatableVector,
  isConsolidatable,
} from "../../consolidateItems/ConsolidatableJsonItem";
import {
  addingItemWouldCollide,
  itemMoveOrResizeWouldCollide,
} from "./cursor/editWouldCollide";
import { resizeTimesAndPosition } from "./resizeTimesAndPosition";
import {
  upscaledMousePosition,
  upscaledMouseMove,
} from "./cursor/upscaledMouse";
import { emptyArray } from "../../utils/empty";
import { iterate } from "../../utils/iterate";
import { selectItemInLevelEditorState } from "../slice/levelEditorSliceSelectors";

const dragMinimumDistance = 5; // pixels

const getDragPlaneNormal = (
  mouseDownPointingAt: MaybePointingAtSomething,
  modifierPressed: boolean,
  jsonItems: Iterable<EditorJsonItemUnion>,
): Xyz => {
  const edgePlane = mouseDownPointingAt.world?.onItem.edge;

  // element-wise product of all the consolidatable vectors of the items:
  // - ie, can resize in the axes that all the items are consolidatable on
  const consolidatableVector = elementWiseProductXyz(
    ...iterate(jsonItems).map((jsonItem) => getConsolidatableVector(jsonItem)),
  );

  const edgeDirection = elementWiseProductXyz(
    edgePlane?.point ?? originXyz,
    consolidatableVector,
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
  jsonItem: Iterable<EditorJsonItemUnion>,
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
  alwaysFullBlocks = false,
) => {
  const levelEditorState = (store.getState() as RootStateWithLevelEditorSlice)
    .levelEditor;

  return roundXyzProjection(
    dragVector,
    { x: 0, y: 0, z: 1 },
    levelEditorState.tool,
    alwaysFullBlocks ? 1 : levelEditorState.gridResolution,
  );
};

const jsonItemAndIdForInPlayItemId = (
  { levelEditor: levelEditorState }: RootStateWithLevelEditorSlice,
  roomState: EditorRoomState,
  itemId: EditorRoomItemId,
): [EditorRoomItemId, EditorJsonItemUnion] | undefined => {
  const jsonItemId = roomState.items[itemId]?.jsonItemId;
  if (jsonItemId === undefined) {
    return undefined;
  }
  const jsonItem = selectItemInLevelEditorState(levelEditorState, jsonItemId);
  if (jsonItem === undefined) {
    return undefined;
  }
  return [jsonItemId, jsonItem];
};

const itemsAreLocked = (
  storeState: RootStateWithLevelEditorSlice,
  ...items: //| JsonItemType[]
  //| ItemInPlayType[]
  EditorJsonItemUnion[] | EditorUnionOfAllItemInPlayTypes[]
) => {
  return (
    storeState.levelEditor.wallsFloorsLocked &&
    items.some(
      (t) =>
        //typeof t === "string" ?
        //  t === "wall" || t === "floor",
        //:
        t.type === "wall" || t.type === "floor",
    )
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
      itemsAreLocked(storeState, hoveredInPlayItem) ? undefined : (
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

/** decide which item(s) the user wants the current operation to affect - either single or multiple */
const getJsonItemIdsToUseForPointingAt = (
  storeState: RootStateWithLevelEditorSlice,
  roomState: EditorRoomState,
  mouseDownPointingAt: MaybePointingAtSomething | undefined,
): EditorRoomItemId[] => {
  const mouseDownItemInPlayId = mouseDownPointingAt?.world?.itemId;

  if (mouseDownItemInPlayId === undefined) {
    return emptyArray;
  }

  const mouseDownJsonItemId = roomState.items[mouseDownItemInPlayId].jsonItemId;

  if (mouseDownJsonItemId === undefined) {
    return emptyArray;
  }

  const { selectedJsonItemIds } = storeState.levelEditor;

  return selectedJsonItemIds.includes(mouseDownJsonItemId) ? selectedJsonItemIds
    : [mouseDownJsonItemId];
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
        storeState.levelEditor.gridResolution,
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

          // remove old previews
          dispatch(resetPreviewedEdits());

          if (pointingAt.world === undefined) {
            break;
          }

          const asJson = jsonItemAndIdForInPlayItemId(
            storeState,
            roomState,
            pointingAt.world.itemId,
          );
          if (asJson === undefined) {
            break;
          }
          const [, jsonItem] = asJson;

          const putDownBlockPosition = itemToolPutDownLocation(
            pointingAt,
            roomState,
            tool.item,
          );

          if (putDownBlockPosition === undefined) {
            break;
          }

          const collides = addingItemWouldCollide({
            roomState,
            blockPosition: putDownBlockPosition,
            itemTool: tool.item,
          });

          if (collides) {
            break;
          }

          dispatch(
            applyItemTool({
              blockPosition: putDownBlockPosition,
              pointedAtItemJson: jsonItem,
              preview: true,
            }),
          );

          break;
        }
        case "pointer": {
          const jsonItemIds: EditorRoomItemId[] =
            getJsonItemIdsToUseForPointingAt(
              storeState,
              roomState,
              mouseDownPointingAtRef.current,
            );

          if (jsonItemIds.length === 0) {
            // can't be pointing without mouse going down on an item
            dispatchHoveredOnChangedIfNeeded(roomState, pointingAt);
            break;
          }

          // we are dragging - resize/move items
          const jsonItems = jsonItemIds.map(
            (jiid) => selectItem(storeState, jiid)!,
          );

          if (itemsAreLocked(storeState, ...jsonItems)) {
            // if item isn't in the json (or is locked) we can't drag it
            break;
          }

          const mouseWhenDownInSameRoom =
            pointingAt.roomId === mouseDownPointingAtRef.current?.roomId;

          /**
           * get the (unrounded) drag delta vector since the last frame
           * (if there is one)
           */
          const dragDeltaVec: Xyz | undefined =
            mouseWhenDownInSameRoom ?
              getDragVector(
                mouseDownPointingAtRef.current,
                mousePosXy,
                mouseMoveXy,
                mouseEvent.metaKey || mouseEvent.shiftKey,
                dragAccVec.current !== undefined,
                jsonItems,
              )
              // ignore dragging if it started in a different room:
            : undefined;

          if (!dragDeltaVec) {
            // not dragging so the most moving the pointer can do is change the hover status of items:
            dispatchHoveredOnChangedIfNeeded(roomState, pointingAt);
            break;
          }

          if (
            jsonItemIds.length === 1 &&
            !selectItemIsSelected(storeState, jsonItemIds[0])
          ) {
            // once we are dragging an item, select it:
            store.dispatch(
              setSelectedItemsInRoom({
                jsonItemIds,
              }),
            );
          }

          const resizeEdge: Plane | undefined =
            mouseDownPointingAtRef.current?.world?.onItem.edge;
          const isResizing =
            resizeEdge &&
            jsonItems.every((jsonItem) => isConsolidatable(jsonItem));

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

          const blockDragAccVec = fineXyzToBlockXyz(nextDragAccVecRound);

          let positionDelta: Xyz;
          let timesDelta: Xyz | undefined = undefined;

          if (isResizing) {
            // resizing
            //
            //   ⌑
            //     ↘ ┌-┐
            //       └-┘
            //
            const [, mouseDownJsonItem] = jsonItemAndIdForInPlayItemId(
              storeState,
              roomState,
              mouseDownPointingAtRef.current!.world!.itemId,
            )!;
            ({ timesDelta, positionDelta } = resizeTimesAndPosition({
              // in case there are multiple, the changes are calculated on the item the (single) item
              // that the mouse went down on, and then applied to the other selected items - this
              // could potentially create different results for different items if they have different
              // starting sizes but it generally makes sense- all are increase or decreased by the same
              // amount on the same axes:
              jsonItem: mouseDownJsonItem,
              blockDragAccVec,
              resizeEdgeDirection: resizeEdge.point,
            }));
          } else {
            // moving
            //
            //   ⌑ -> ⌑
            //
            positionDelta = blockDragAccVec;
          }
          // collision has to happen on the loaded room, not the json, so can't
          // be done in the reducer:
          const collides = itemMoveOrResizeWouldCollide({
            roomState,
            jsonItemIds,
            blockPositionDelta: positionDelta,
            timesDelta,
          });

          if (collides) {
            break;
          }
          dispatch(
            moveOrResizeItemAsPreview({
              jsonItemIds,
              positionDelta,
              timesDelta,
            }),
          );
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

      // clear some state now no longer mouse down:;
      dragAccVec.current = undefined;
      mouseDownPointingAtRef.current = undefined;

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

          const asJson = jsonItemAndIdForInPlayItemId(
            storeState,
            roomState,
            pointingAt.world.itemId,
          );
          if (asJson === undefined) {
            break;
          }
          const [, jsonItem] = asJson;

          dispatch(
            applyItemTool({
              blockPosition: itemToolPutDownLocation(
                pointingAt,
                roomState,
                tool.item,
              )!,
              pointedAtItemJson: jsonItem,
              preview: false,
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
              itemsAreLocked(storeState, clickedOnItem)
            ) {
              // clicking on nothing (or something with no json id) (or a locked floor/wall) unselects:
              dispatch(
                setSelectedItemsInRoom({
                  jsonItemIds: [],
                }),
              );
              break;
            }

            dispatch(
              mouseEvent.ctrlKey || mouseEvent.metaKey ?
                toggleSelectedItemInRoom({
                  jsonItemId: clickedOnItem.jsonItemId,
                })
              : setSelectedItemsInRoom({
                  jsonItemIds: [clickedOnItem.jsonItemId],
                }),
            );
          } else if (isDragEnd) {
            dispatch(commitCurrentPreviewedEdits());
          }
          break;
        }
        case "eyeDropper": {
          if (isClick) {
            const itemId = pointingAt.world?.itemId;

            if (itemId === undefined) {
              console.warn("no itemId");
              break;
            }

            const clickedOnItem = roomState.items[itemId];

            if (itemsAreLocked(storeState, clickedOnItem)) {
              break;
            }

            const asJson = jsonItemAndIdForInPlayItemId(
              storeState,
              roomState,
              itemId,
            );
            if (asJson === undefined) {
              break;
            }
            const [, jsonItem] = asJson;

            dispatch(
              setTool({
                type: "item",
                item: {
                  type: jsonItem.type,
                  config: jsonItem.config,
                },
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

      dragAccVec.current = undefined;
      mouseDownPointingAtRef.current = undefined;

      switch (tool.type) {
        case "item": {
          dispatch(resetPreviewedEdits());
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
        storeState.levelEditor.gridResolution,
      );
      console.log("setting mouseDownPointingAtRef to", pointingAt);
      mouseDownPointingAtRef.current = pointingAt;
    };

    const handleMouseMoveCatch = catchErrors(handleMouseMove);

    renderArea.addEventListener("mousemove", handleMouseMoveCatch);
    renderArea.addEventListener("mouseup", handleMouseUp);
    renderArea.addEventListener("mousedown", handleMouseDown);
    renderArea.addEventListener("mouseleave", handleMouseLeave);
    renderArea.tabIndex = 0; // Make the div focusable to capture key events

    return () => {
      renderArea.removeEventListener("mousemove", handleMouseMoveCatch);
      renderArea.removeEventListener("mouseup", handleMouseUp);
      renderArea.removeEventListener("mousedown", handleMouseDown);
      renderArea.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [application.stage, upscale, renderArea, dispatch, roomState]);
};
