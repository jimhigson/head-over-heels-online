import {
  getConsolidatableVector,
  isConsolidatable,
} from "../../../../consolidateItems/ConsolidatableJsonItem";
import {
  fineXyzToBlockXyz,
  projectWorldXyzToScreenXy,
  unprojectScreenXyToWorldXyz,
} from "../../../../game/render/projections";
import {
  type EditorRootState,
  editorStore,
  store,
} from "../../../../store/store";
import { emptyArray } from "../../../../utils/empty";
import { planeAxesDesc } from "../../../../utils/vectors/orthoPlane";
import {
  addXyz,
  elementWiseProductXyz,
  lengthXy,
  lengthXyz,
  originXyz,
  type Plane,
  subXy,
  unitXyz_x,
  unitXyz_y,
  unitXyz_z,
  type Xy,
  type Xyz,
  xyzEqual,
} from "../../../../utils/vectors/vectors";
import {
  type EditorJsonItemUnion,
  type EditorRoomItemId,
  type EditorRoomState,
} from "../../../editorTypes";
import { selectCurrentCommittedRoomJsonFromLevelEditorState } from "../../../slice/levelEditorSelectors";
import {
  changeDragInProgress,
  commitCurrentPreviewedEdits,
  type GridResolution,
  moveOrResizeItemAsPreview,
  openItemContextMenu,
  selectCursorRoomSelectedJsonItemIds,
  selectItem,
  selectItemIsSelected,
  setHoveredItemInRoom,
  setSelectedItemsInRoom,
  toggleSelectedItemInRoom,
} from "../../../slice/levelEditorSlice";
import { type ItemsDrag } from "../../../slice/reducers/dragToMoveReducers";
import { getMovableVector } from "../../../slice/reducers/moveOrResizeItemPreview/getMovableVector";
import { moveOrResizeOutcome } from "../../../slice/reducers/moveOrResizeItemPreview/moveOrResizeItemPreviewReducers";
import { snapGridResolution } from "../../../snapGridResolution";
import { itemMoveOrResizeWouldCollide } from "../../cursor/editWouldCollide";
import { roundXyzProjection } from "../../cursor/findPointerPointingAt";
import { type MaybePointingAtSomething } from "../../cursor/PointingAt";
import {
  viewportMouseMovement,
  viewportMousePosition,
} from "../../cursor/viewportMouse";
import { resizeTimesAndPosition } from "../../resizeTimesAndPosition";
import { dispatchHoveredOnChangedIfNeeded } from "../dispatchHoveredOnChangedIfNeeded";
import { itemsAreLocked } from "../itemsAreLocked";
import { jsonItemAndIdForInPlayItem } from "../jsonItemAndIdForInPlayItem";
import { type Tool } from "../Tool";
import { findItemInPlayForPicking } from "./ItemToolHandler";
import {
  type MouseDownParams,
  type MouseLeaveParams,
  type MouseMoveParams,
  type MouseUpParams,
  type ToolHandler,
} from "./ToolHandler";

const dragMinimumDistance = 5; // pixels

const { dispatch } = store;

/**
 * interpret which item(s) the user wants the current operation to affect
 *  - either single or multiple
 */
const getJsonItemIdsToUseForPointingAt = (
  storeState: EditorRootState,
  roomState: EditorRoomState,
  mouseDownPointingAt: MaybePointingAtSomething | undefined,
): EditorRoomItemId[] => {
  const mouseDownItemInPlayId = mouseDownPointingAt?.world?.itemId;

  if (mouseDownItemInPlayId === undefined) {
    // not pointing at anything:
    return emptyArray;
  }

  const mouseDownJsonItemId = findItemInPlayForPicking(
    roomState,
    mouseDownItemInPlayId,
  )?.jsonItemId;

  if (mouseDownJsonItemId === undefined) {
    // item not in the room - this shouldn't normally happen
    return emptyArray;
  }

  const selectedJsonItemIds = selectCursorRoomSelectedJsonItemIds(storeState);

  return selectedJsonItemIds.includes(mouseDownJsonItemId) ?
      // interacted with an already selected item - use all selected items:
      selectedJsonItemIds
      // interacted with an unselected item - use just that one:
    : [mouseDownJsonItemId];
};

const getDragPlaneNormal = (
  mouseDownPointingAt: MaybePointingAtSomething,
  modifierPressed: boolean,
  jsonItems: Iterable<EditorJsonItemUnion>,
): undefined | Xyz => {
  const edgePlane = mouseDownPointingAt.world?.onItem.edge;

  // element-wise product of all the consolidatable vectors of the items:
  // - ie, can resize in the axes that all the items are consolidatable on
  const consolidatableVector = elementWiseProductXyz(
    ...Iterator.from(jsonItems).map((jsonItem) =>
      getConsolidatableVector(jsonItem),
    ),
  );

  const resizeDirection = elementWiseProductXyz(
    edgePlane?.point ?? originXyz,
    consolidatableVector,
  );

  if (lengthXyz(resizeDirection) > 0) {
    // dragging will be resizing - use the plane of the edge under the mouse:
    return edgePlane!.normal;
  }

  // not all items can be moved in all directions - get the legal directions
  // for the current selections:
  const movableVector = elementWiseProductXyz(
    ...Iterator.from(jsonItems).map((jsonItem) => getMovableVector(jsonItem)),
  );

  const movableVectorDesc = planeAxesDesc(movableVector);

  switch (movableVectorDesc) {
    case "xyz":
      // item can move in all axes - use canned plane normals depending on if modifier key is pressed:
      return modifierPressed ?
          // vertical (z) movement - give (normal to) yz plane
          unitXyz_x
          // horizontal (xy) movement
        : unitXyz_z;
    case "x":
    case "y":
    case "xy":
      // item can only move on xy plane - normal is z axis:
      return unitXyz_z;
    case "z":
    case "xz":
      // item can only move on xz plane - normal is y axis::
      return unitXyz_y;
    case "yz":
      // item can only move on yz plane - normal is x axis::
      return unitXyz_x;
    case "":
      // can't move on any axes:
      return undefined;
    default:
      movableVectorDesc satisfies never;
      throw new Error(
        `unexpected movable vector description ${movableVectorDesc}`,
      );
  }
};

const getDragVector = (
  /** undefined if the mouse is not down */
  mouseDownPointingAt: MaybePointingAtSomething | undefined,
  mousePosition: Xy,
  mouseMove: Xy,
  modifierPressed: boolean,
  draggingAlready: boolean,
  jsonItem: Iterable<EditorJsonItemUnion>,
  cameraAngle: Xy,
): undefined | Xyz => {
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

  if (plane === undefined) {
    // can't move in any direction
    return undefined;
  }

  const dragVectorWorld = unprojectScreenXyToWorldXyz(
    plane,
    mouseMove,
    cameraAngle,
  );

  return modifierPressed ?
      {
        x: 0,
        y: 0,
        z: dragVectorWorld.z,
      }
    : dragVectorWorld;
};

const roundDragVector = (dragVector: Xyz, gridResolution: GridResolution) =>
  roundXyzProjection(dragVector, unitXyz_z, gridResolution);

/**
 * the most moves a drag tries each time the pointer moves - if none of them
 * can be made, the drag keeps its last valid preview
 */
const maxDragMovesToTry = 64;

/** the multiples of `step` from 0 to `to` (inclusive), in the direction of `to` */
const stepsTowards = (to: number, step: number): number[] =>
  Array.from(
    { length: Math.round(Math.abs(to) / step) + 1 },
    (_, index) => Math.sign(to) * index * step,
  );

/**
 * the moves to try for a drag, best first: every grid step in the rectangle
 * between where the items started and where they are dragged to, closest on
 * screen to where they are dragged to first (then furthest from the start) -
 * so a drag that can't go where it points goes as near to it as it can,
 * sliding along whatever blocks it or stopping just short of it
 */
const dragMovesToTry = (
  /**
   * where the drag would move the items to, from where they started
   */
  target: Xyz,
  gridResolution: GridResolution,
  cameraAngle: Xy,
): Xyz[] => {
  const targetOnScreen = projectWorldXyzToScreenXy(target, cameraAngle);
  const screenDistanceToTarget = (move: Xyz) =>
    lengthXy(
      subXy(projectWorldXyzToScreenXy(move, cameraAngle), targetOnScreen),
    );
  const isTarget = (move: Xyz) => move.x === target.x && move.y === target.y;

  return stepsTowards(target.x, gridResolution)
    .flatMap((x) =>
      stepsTowards(target.y, gridResolution).map((y) => ({
        x,
        y,
        z: target.z,
      })),
    )
    .filter(
      (move) =>
        // not moving across at all would undo the drag, rather than follow it:
        isTarget(move) || move.x !== 0 || move.y !== 0,
    )
    .map((move) => ({
      move,
      screenDistanceToTarget: screenDistanceToTarget(move),
      distanceFromStart: lengthXy(move),
    }))
    .sort(
      (a, b) =>
        a.screenDistanceToTarget - b.screenDistanceToTarget ||
        b.distanceFromStart - a.distanceFromStart,
    )
    .slice(0, maxDragMovesToTry)
    .map(({ move }) => move);
};

export class PointerToolHandler implements ToolHandler<
  Extract<Tool, { type: "pointer" }>
> {
  handleMouseMove({
    roomState,
    pointingAt,
    storeState,
    mouseDownPointingAtRef,
    mouseEvent,
    clientMovement,
    viewport,
    dragAccVec,
  }: MouseMoveParams<Extract<Tool, { type: "pointer" }>>) {
    const mouseMoveXy = viewportMouseMovement(viewport, clientMovement);

    const jsonItemIds: EditorRoomItemId[] = getJsonItemIdsToUseForPointingAt(
      storeState,
      roomState,
      mouseDownPointingAtRef.current,
    );

    if (jsonItemIds.length === 0) {
      // can't be pointing without mouse going down on an item
      dispatchHoveredOnChangedIfNeeded(roomState, pointingAt);
      return;
    }

    // we are dragging - resize/move items
    const jsonItems = jsonItemIds.map((jiid) => selectItem(storeState, jiid)!);

    if (itemsAreLocked(storeState, ...jsonItems)) {
      // if item isn't in the json (or is locked) we can't drag it
      return;
    }

    const mouseWhenDownInSameRoom =
      pointingAt.roomId === mouseDownPointingAtRef.current?.roomId;

    /**
     * get the (unrounded) drag delta vector since the last frame
     * (if there is one)
     */
    const dragDeltaVec: undefined | Xyz =
      mouseWhenDownInSameRoom ?
        getDragVector(
          mouseDownPointingAtRef.current,
          viewportMousePosition(viewport, mouseEvent),
          mouseMoveXy,
          mouseEvent.metaKey || mouseEvent.shiftKey,
          dragAccVec.current !== undefined,
          jsonItems,
          storeState.levelEditor.cameraAngle,
        )
        // ignore dragging if it started in a different room:
      : undefined;

    if (!dragDeltaVec) {
      // not dragging so the most moving the pointer can do is change the hover status of items:
      dispatchHoveredOnChangedIfNeeded(roomState, pointingAt);
      return;
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

    const mouseDownEdge: Plane | undefined =
      mouseDownPointingAtRef.current?.world?.onItem.edge;
    // grabbing an edge resizes, if every item can be resized:
    const resizeEdge =
      jsonItems.every((jsonItem) => isConsolidatable(jsonItem)) ? mouseDownEdge
      : undefined;
    const itemsDrag: ItemsDrag =
      resizeEdge === undefined ? "moveItems" : "resizeItems";

    const prevDragAccVec: Xyz = dragAccVec.current ?? originXyz;
    const dragGridResolution =
      // sizes are always whole blocks:
      itemsDrag === "resizeItems" ? 1 : (
        snapGridResolution(
          storeState.levelEditor.gridResolution,
          jsonItems.map(({ type }) => type),
        )
      );

    // accumulate some more on the drag vector:
    const nextDragAccVec = addXyz(prevDragAccVec, dragDeltaVec);
    const nextDragAccVecRound = roundDragVector(
      nextDragAccVec,
      dragGridResolution,
    );

    // store for the next frame:
    dragAccVec.current = nextDragAccVec;

    if (
      xyzEqual(
        roundDragVector(prevDragAccVec, dragGridResolution),
        nextDragAccVecRound,
      )
    ) {
      // rounded acc drag vector didn't change - nothing to do
      return;
    }

    const blockDragAccVec = fineXyzToBlockXyz(nextDragAccVecRound);

    let positionDelta: Xyz;
    let timesDelta: undefined | Xyz = undefined;

    if (resizeEdge !== undefined) {
      // resizing
      //
      //   ⌑
      //     ↘ ┌-┐
      //       └-┘
      //
      const [, mouseDownJsonItem] = jsonItemAndIdForInPlayItem(
        storeState,
        findItemInPlayForPicking(
          roomState,
          mouseDownPointingAtRef.current!.world!.itemId,
        ),
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
    const movesToTry =
      resizeEdge === undefined ?
        dragMovesToTry(
          positionDelta,
          dragGridResolution,
          storeState.levelEditor.cameraAngle,
        )
      : [positionDelta];

    const { levelEditor: levelEditorState } = editorStore.getState();
    const validMove = movesToTry.find(
      (moveToTry) =>
        // collision has to happen on the loaded room, not the json:
        !itemMoveOrResizeWouldCollide({
          roomState,
          // the drag's moves are from the committed room:
          roomJson:
            selectCurrentCommittedRoomJsonFromLevelEditorState(
              levelEditorState,
            ),
          jsonItemIds,
          blockPositionDelta: moveToTry,
          timesDelta,
        }) &&
        moveOrResizeOutcome(levelEditorState, {
          jsonItemIds,
          positionDelta: moveToTry,
          timesDelta,
          timestamp: 0,
        }).type !== "invalid",
    );

    if (validMove === undefined) {
      // nowhere near the drag can be moved to, so keep the last valid preview
      return;
    }
    if (levelEditorState.dragInProgress !== itemsDrag) {
      dispatch(changeDragInProgress(itemsDrag));
    }
    dispatch(
      moveOrResizeItemAsPreview({
        jsonItemIds,
        positionDelta: validMove,
        timesDelta,
        timestamp: Date.now(),
      }),
    );
  }

  handleMouseUp({
    roomState,
    pointingAt,
    storeState,
    mouseEvent,
    isClick,
    isDragEnd,
  }: MouseUpParams<Extract<Tool, { type: "pointer" }>>) {
    if (isClick) {
      const clickedOnItem =
        pointingAt.world === undefined ?
          undefined
        : findItemInPlayForPicking(roomState, pointingAt.world.itemId);

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
        return;
      }

      const isRightClick = mouseEvent.button === 2;
      // right-clicking within the selection opens the menu for all of it:
      const keepsSelection =
        isRightClick &&
        selectItemIsSelected(storeState, clickedOnItem.jsonItemId);

      if (!keepsSelection) {
        dispatch(
          mouseEvent.ctrlKey || mouseEvent.metaKey ?
            toggleSelectedItemInRoom({
              jsonItemId: clickedOnItem.jsonItemId,
              onlySelect: isRightClick,
            })
          : setSelectedItemsInRoom({
              jsonItemIds: [clickedOnItem.jsonItemId],
            }),
        );
      }

      if (isRightClick) {
        // a right-click selects the item the same way a left-click does (above),
        // unless it is already selected, then additionally opens the context
        // menu for the resulting selection
        if (
          clickedOnItem?.jsonItemId !== undefined &&
          !itemsAreLocked(storeState, clickedOnItem)
        ) {
          dispatch(openItemContextMenu({ scrXy: pointingAt.scrXy }));
        }
      }
    } else if (isDragEnd) {
      dispatch(commitCurrentPreviewedEdits());
    }
  }

  handleMouseDown(
    _params: MouseDownParams<Extract<Tool, { type: "pointer" }>>,
  ) {
    // Pointer tool doesn't need to do anything special on mouse down
    // The main logic handles setting mouseDownPointingAtRef
  }

  claimsDrag({
    pointingAt,
    roomState,
    storeState,
  }: MouseDownParams<Extract<Tool, { type: "pointer" }>>): boolean {
    // a drag is used (to move/resize) only when it starts on unlocked item(s) -
    // the same conditions handleMouseMove bails on:
    const jsonItemIds = getJsonItemIdsToUseForPointingAt(
      storeState,
      roomState,
      pointingAt,
    );
    if (jsonItemIds.length === 0) {
      return false;
    }
    const jsonItems = jsonItemIds.map((jiid) => selectItem(storeState, jiid)!);
    return !itemsAreLocked(storeState, ...jsonItems);
  }

  handleMouseLeave(
    _params: MouseLeaveParams<Extract<Tool, { type: "pointer" }>>,
  ) {
    dispatch(setHoveredItemInRoom(undefined));
  }
}
