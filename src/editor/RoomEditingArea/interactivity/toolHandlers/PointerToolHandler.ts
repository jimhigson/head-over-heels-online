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
  type EditorThunk,
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
  itemDragPlaneChanged,
  itemDragPointerDown,
  itemDragRounded,
  moveOrResizeItemAsPreview,
  openItemContextMenu,
  selectItem,
  selectOpenRoomSelectedJsonItemIds,
  setHoveredItemInRoom,
  setSelectedItemsInRoom,
  toggleSelectedItemInRoom,
} from "../../../slice/levelEditorSlice";
import { type OpenRoomId } from "../../../slice/OpenRoom";
import { existingLayoutNode, maybeLayoutNode } from "../../../slice/PaneLayout";
import { type ItemsDrag } from "../../../slice/reducers/dragToMoveReducers";
import {
  type ItemDrag,
  type ItemDragPlane,
} from "../../../slice/reducers/itemDragReducers";
import { getMovableVector } from "../../../slice/reducers/moveOrResizeItemPreview/getMovableVector";
import { moveOrResizeOutcome } from "../../../slice/reducers/moveOrResizeItemPreview/moveOrResizeItemPreviewReducers";
import { snapGridResolution } from "../../../snapGridResolution";
import {
  itemMoveOrResizeWouldCollide,
  sameMoveOrResizeForEach,
} from "../../cursor/editWouldCollide";
import { roundXyzProjection } from "../../cursor/findPointerPointingAt";
import { type MaybePointingAtSomething } from "../../cursor/PointingAt";
import { viewportMousePosition } from "../../cursor/viewportMouse";
import { resizeTimesAndPosition } from "../../resizeTimesAndPosition";
import { itemsAreLocked } from "../itemsAreLocked";
import { jsonItemAndIdForInPlayItem } from "../jsonItemAndIdForInPlayItem";
import { setHoveredItemIfChangedThunk } from "../setHoveredItemIfChangedThunk";
import { findItemInPlayForPicking } from "./ItemToolHandler";
import {
  type MouseDownParams,
  type MouseLeaveParams,
  type MouseMoveParams,
  type MouseUpParams,
  type ToolHandler,
} from "./ToolHandler";

const dragMinimumDistance = 5; // pixels

/**
 * interpret which item(s) the user wants the current operation to affect
 *  - either single or multiple
 */
const getJsonItemIdsToUseForPointingAt = (
  storeState: EditorRootState,
  openRoomId: OpenRoomId,
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

  const selectedJsonItemIds = selectOpenRoomSelectedJsonItemIds(
    storeState,
    openRoomId,
  );

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

/**
 * the (unrounded) drag vector with the pointer at `mousePosition` - worked out
 * from where the pointer is, not from its movements, so it is right however
 * many of the pointer's moves were seen
 */
const dragVectorOnPlane = (
  { normal, modifierPressed, startScrXy, startDragVector }: ItemDragPlane,
  mousePosition: Xy,
  cameraAngle: Xy,
): Xyz => {
  const onPlane = unprojectScreenXyToWorldXyz(
    normal,
    subXy(mousePosition, startScrXy),
    cameraAngle,
  );
  return addXyz(
    startDragVector,
    modifierPressed ? { x: 0, y: 0, z: onPlane.z } : onPlane,
  );
};

/**
 * the plane the drag is on with the pointer at `mousePosition`, or undefined
 * if the pointer hasn't yet moved far enough to drag
 */
const dragPlaneNow = (
  itemDrag: ItemDrag,
  normal: Xyz,
  modifierPressed: boolean,
  mousePosition: Xy,
  cameraAngle: Xy,
): ItemDragPlane | undefined => {
  const { plane, mouseDownPointingAt } = itemDrag;
  if (plane === undefined) {
    return (
        lengthXy(subXy(mousePosition, mouseDownPointingAt.scrXy)) >
          dragMinimumDistance
      ) ?
        {
          normal,
          modifierPressed,
          startScrXy: mouseDownPointingAt.scrXy,
          startDragVector: originXyz,
        }
      : undefined;
  }
  if (plane.modifierPressed === modifierPressed) {
    return plane;
  }
  // the modifier changed - carry on from here, on the other plane:
  return {
    normal,
    modifierPressed,
    startScrXy: mousePosition,
    startDragVector: dragVectorOnPlane(plane, mousePosition, cameraAngle),
  };
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

export class PointerToolHandler implements ToolHandler {
  handleMouseMove({
    openRoomId,
    roomState,
    pointingAt,
    mouseEvent,
    viewport,
  }: MouseMoveParams): EditorThunk {
    return (dispatch, getState) => {
      const storeState = getState();
      // not dragging, so the most moving the pointer can do is change the
      // hover status of items:
      const hover = () =>
        dispatch(
          setHoveredItemIfChangedThunk(
            openRoomId,
            existingLayoutNode(storeState.levelEditor.layout, openRoomId)
              .editable,
            roomState,
            pointingAt,
          ),
        );

      const { itemDrag } = storeState.levelEditor;
      if (
        itemDrag === undefined ||
        itemDrag.sourceOpenRoomId !== openRoomId ||
        // ignore dragging if it started in a different room:
        pointingAt.roomId !== itemDrag.mouseDownPointingAt.roomId
      ) {
        hover();
        return;
      }

      const { jsonItemIds, mouseDownPointingAt } = itemDrag;
      const jsonItems = jsonItemIds.map((jiid) =>
        selectItem(storeState, jiid)!,
      );

      if (itemsAreLocked(storeState, ...jsonItems)) {
        // if item isn't in the json (or is locked) we can't drag it
        return;
      }

      const modifierPressed = mouseEvent.metaKey || mouseEvent.shiftKey;
      const normal = getDragPlaneNormal(
        mouseDownPointingAt,
        modifierPressed,
        jsonItems,
      );
      if (normal === undefined) {
        // can't move in any direction
        hover();
        return;
      }

      const openRoom = maybeLayoutNode(
        storeState.levelEditor.layout,
        openRoomId,
      );
      // the open room may have been closed or replaced (its pane is going):
      if (openRoom === undefined) {
        return;
      }
      const { cameraAngle } = openRoom;
      const mousePosition = viewportMousePosition(viewport, mouseEvent);
      const plane = dragPlaneNow(
        itemDrag,
        normal,
        modifierPressed,
        mousePosition,
        cameraAngle,
      );
      if (plane === undefined) {
        hover();
        return;
      }
      if (plane !== itemDrag.plane) {
        dispatch(itemDragPlaneChanged(plane));
      }

      if (
        jsonItemIds.length === 1 &&
        !selectOpenRoomSelectedJsonItemIds(storeState, openRoomId).includes(
          jsonItemIds[0],
        )
      ) {
        // once we are dragging an item, select it:
        dispatch(
          setSelectedItemsInRoom({
            jsonItemIds,
          }),
        );
      }

      const mouseDownEdge: Plane | undefined =
        mouseDownPointingAt.world.onItem.edge;
      // grabbing an edge resizes, if every item can be resized:
      const resizeEdge =
        jsonItems.every((jsonItem) => isConsolidatable(jsonItem)) ?
          mouseDownEdge
        : undefined;
      const itemsDrag: ItemsDrag =
        resizeEdge === undefined ? "moveItems" : "resizeItems";

      const dragGridResolution =
        // sizes are always whole blocks:
        itemsDrag === "resizeItems" ? 1 : (
          snapGridResolution(
            storeState.levelEditor.gridResolution,
            jsonItems.map(({ type }) => type),
          )
        );

      const roundedDragVector = roundDragVector(
        dragVectorOnPlane(plane, mousePosition, cameraAngle),
        dragGridResolution,
      );

      if (xyzEqual(itemDrag.lastRoundedDragVector, roundedDragVector)) {
        // rounded drag vector didn't change - nothing to do
        return;
      }
      dispatch(itemDragRounded(roundedDragVector));

      const blockDragAccVec = fineXyzToBlockXyz(roundedDragVector);

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
          findItemInPlayForPicking(roomState, mouseDownPointingAt.world.itemId),
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
          dragMovesToTry(positionDelta, dragGridResolution, cameraAngle)
        : [positionDelta];

      const { levelEditor: levelEditorState } = getState();
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
            movesOrResizes: sameMoveOrResizeForEach(jsonItemIds, {
              blockPositionDelta: moveToTry,
              timesDelta,
            }),
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
      if (
        maybeLayoutNode(levelEditorState.layout, openRoomId)?.dragInProgress !==
        itemsDrag
      ) {
        dispatch(
          changeDragInProgress({ openRoomId, dragInProgress: itemsDrag }),
        );
      }
      dispatch(
        moveOrResizeItemAsPreview({
          jsonItemIds,
          positionDelta: validMove,
          timesDelta,
          timestamp: Date.now(),
        }),
      );
    };
  }

  handleMouseUp({
    openRoomId,
    roomState,
    pointingAt,
    mouseEvent,
    isClick,
  }: MouseUpParams): EditorThunk {
    return (dispatch, getState) => {
      const storeState = getState();
      if (isClick) {
        const { editable } = existingLayoutNode(
          storeState.levelEditor.layout,
          openRoomId,
        );
        const clickedOnItem =
          pointingAt.world === undefined ?
            undefined
          : findItemInPlayForPicking(roomState, pointingAt.world.itemId);

        if (
          clickedOnItem?.jsonItemId === undefined ||
          (editable && itemsAreLocked(storeState, clickedOnItem))
        ) {
          // clicking on nothing (or something with no json id) (or a locked floor/wall) unselects:
          dispatch(
            setSelectedItemsInRoom({
              jsonItemIds: [],
            }),
          );
          return;
        }

        // a non-editable open room has no context menu:
        const isRightClick = editable && mouseEvent.button === 2;
        // right-clicking within the selection opens the menu for all of it:
        const keepsSelection =
          isRightClick &&
          selectOpenRoomSelectedJsonItemIds(storeState, openRoomId).includes(
            clickedOnItem.jsonItemId,
          );

        if (!keepsSelection) {
          dispatch(
            // a non-editable open room picks a single item:
            editable && (mouseEvent.ctrlKey || mouseEvent.metaKey) ?
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
          dispatch(
            openItemContextMenu({ openRoomId, scrXy: pointingAt.scrXy }),
          );
        }
      } else if (storeState.levelEditor.itemDrag?.plane !== undefined) {
        // a drag ended:
        dispatch(commitCurrentPreviewedEdits());
      }
    };
  }

  handleMouseDown(params: MouseDownParams): EditorThunk {
    return (dispatch, getState) => {
      const { openRoomId, roomState, pointingAt, mouseEvent } = params;
      if (mouseEvent.button !== 0 || pointingAt.world === undefined) {
        return;
      }
      const storeState = getState();
      if (!this.claimsDrag(params, storeState)) {
        return;
      }
      // the items a drag from here would drag, if the pointer moves far enough:
      dispatch(
        itemDragPointerDown({
          sourceOpenRoomId: openRoomId,
          mouseDownPointingAt: pointingAt,
          jsonItemIds: getJsonItemIdsToUseForPointingAt(
            storeState,
            openRoomId,
            roomState,
            pointingAt,
          ),
        }),
      );
    };
  }

  claimsDrag(
    { openRoomId, pointingAt, roomState }: MouseDownParams,
    storeState: EditorRootState,
  ): boolean {
    const { editable } = existingLayoutNode(
      storeState.levelEditor.layout,
      openRoomId,
    );
    if (!editable) {
      return false;
    }
    // a drag is used (to move/resize) only when it starts on unlocked item(s) -
    // the same conditions handleMouseMove bails on:
    const jsonItemIds = getJsonItemIdsToUseForPointingAt(
      storeState,
      openRoomId,
      roomState,
      pointingAt,
    );
    if (jsonItemIds.length === 0) {
      return false;
    }
    const jsonItems = jsonItemIds.map((jiid) => selectItem(storeState, jiid)!);
    return !itemsAreLocked(storeState, ...jsonItems);
  }

  handleMouseLeave({ openRoomId }: MouseLeaveParams): EditorThunk {
    return (dispatch) => {
      dispatch(setHoveredItemInRoom({ openRoomId, hoveredItem: undefined }));
    };
  }
}
