import {
  getConsolidatableVector,
  isConsolidatable,
} from "../../../../consolidateItems/ConsolidatableJsonItem";
import {
  fineXyzToBlockXyz,
  projectWorldXyzToScreenXy,
  unprojectScreenXyToWorldXyz,
  unprojectScreenXyToWorldXyzOnFace,
} from "../../../../game/render/projections";
import { roomWallBounds } from "../../../../model/roomWallBounds";
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
  subXyz,
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
  type EditorRoomJson,
  type EditorRoomState,
} from "../../../editorTypes";
import {
  itemsMoveBetweenRoomsEdits,
  planItemsMoveBetweenRooms,
} from "../../../slice/inPlaceMutators/moveItemsToRoomInPlace";
import {
  type GridResolution,
  itemGrabDragStarted,
  itemGrabDropped,
  itemGrabPlaneChanged,
  itemGrabPointerDown,
  itemGrabPreviewedInto,
  itemGrabRounded,
  type LevelEditorState,
  openItemContextMenu,
  selectItem,
  selectOpenRoomSelectedJsonItemIds,
  setHoveredItemInRoom,
  setSelectedItemsInRoom,
  toggleSelectedItemInRoom,
} from "../../../slice/levelEditorSlice";
import { type OpenRoomId } from "../../../slice/OpenRoom";
import { existingLayoutNode, maybeLayoutNode } from "../../../slice/PaneLayout";
import { type ItemDragAction } from "../../../slice/reducers/dragToMoveReducers";
import {
  type ItemDragPlane,
  type ItemGrab,
  type ItemGrabPreviewedIntoPayload,
} from "../../../slice/reducers/itemGrabReducers";
import { getMovableVector } from "../../../slice/reducers/moveOrResizeItemPreview/getMovableVector";
import { moveOrResizeOutcome } from "../../../slice/reducers/moveOrResizeItemPreview/moveOrResizeOutcome";
import { snapGridResolution } from "../../../snapGridResolution";
import {
  itemMoveOrResizeWouldCollide,
  sameMoveOrResizeForEach,
} from "../../cursor/editWouldCollide";
import { roundXyzProjection } from "../../cursor/findPointerPointingAt";
import { type MaybePointingAtSomething } from "../../cursor/PointingAt";
import {
  viewportMouseMovement,
  viewportMousePosition,
} from "../../cursor/viewportMouse";
import { resizeTimesAndPosition } from "../../resizeTimesAndPosition";
import { itemsAreLocked } from "../itemsAreLocked";
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
 * the plane the drag is on with the pointer at `mousePosition`, in the open
 * room the pointer is over - or undefined if the pointer hasn't yet moved far
 * enough to drag
 */
const dragPlaneNow = (
  itemGrab: ItemGrab,
  normal: Xyz,
  modifierPressed: boolean,
  mousePosition: Xy,
  /**
   * how far the pointer moved to get to `mousePosition`, in screen px
   */
  mouseMovement: Xy,
  cameraAngle: Xy,
): ItemDragPlane | undefined => {
  const { plane, mouseDownPointingAt, dragging, roundedDragVector } = itemGrab;
  if (plane === undefined && dragging === undefined) {
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
  if (plane === undefined) {
    // just come into this open room - carry on with the grabbed point under
    // the pointer, at the height the drag had it:
    const grabbedAt = mouseDownPointingAt.world.position;
    const pointedAt = unprojectScreenXyToWorldXyzOnFace(
      addXyz(grabbedAt, roundedDragVector),
      unitXyz_z,
      mousePosition,
      cameraAngle,
    );
    return {
      normal,
      modifierPressed,
      startScrXy: mousePosition,
      startDragVector: subXyz(pointedAt, grabbedAt),
    };
  }
  if (plane.modifierPressed === modifierPressed) {
    return plane;
  }
  // the modifier changed since the pointer's last move - carry on from where
  // it was then, on the other plane:
  const changedAt = subXy(mousePosition, mouseMovement);
  return {
    normal,
    modifierPressed,
    startScrXy: changedAt,
    startDragVector: dragVectorOnPlane(plane, changedAt, cameraAngle),
  };
};

const roundDragVector = (dragVector: Xyz, gridResolution: GridResolution) =>
  roundXyzProjection(dragVector, unitXyz_z, gridResolution);

/**
 * the most moves a drag tries each time the pointer moves - if none of them
 * can be made, the drag keeps its last valid preview
 */
const maxDragMovesToTry = 64;

/**
 * the multiples of `step` from `from` to `to` (inclusive), in the direction of
 * `to`
 */
const stepsTowards = (from: number, to: number, step: number): number[] =>
  Array.from(
    { length: Math.round(Math.abs(to - from) / step) + 1 },
    (_, index) => from + Math.sign(to - from) * index * step,
  );

/**
 * the moves to try for a drag, best first: every grid step in the rectangle
 * between where the drag comes from and where it points, closest on screen
 * to where it points first (then furthest from where it comes from) - so a
 * drag that can't go where it points goes as near to it as it can, sliding
 * along whatever blocks it or stopping just short of it
 */
const dragMovesToTry = (
  /**
   * the move the drag comes from - none, in the items' own room
   */
  from: Xyz,
  /**
   * the move the drag points to
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

  return stepsTowards(from.x, target.x, gridResolution)
    .flatMap((x) =>
      stepsTowards(from.y, target.y, gridResolution).map((y) => ({
        x,
        y,
        z: target.z,
      })),
    )
    .filter(
      (move) =>
        // not moving across at all would undo the drag, rather than follow it:
        isTarget(move) || move.x !== from.x || move.y !== from.y,
    )
    .map((move) => ({
      move,
      screenDistanceToTarget: screenDistanceToTarget(move),
      distanceFromStart: lengthXy(subXy(move, from)),
    }))
    .sort(
      (a, b) =>
        a.screenDistanceToTarget - b.screenDistanceToTarget ||
        b.distanceFromStart - a.distanceFromStart,
    )
    .slice(0, maxDragMovesToTry)
    .map(({ move }) => move);
};

/**
 * what previewing the drag in an open room works from
 */
type DragPreviewArgs = {
  levelEditorState: LevelEditorState;
  itemGrab: ItemGrab;
  /**
   * the open room the pointer is over
   */
  openRoomId: OpenRoomId;
  /**
   * that open room's loaded room
   */
  roomState: EditorRoomState;
  /**
   * the drag vector, rounded, in blocks
   */
  blockDragVector: Xyz;
  gridResolution: GridResolution;
  cameraAngle: Xy;
};

/**
 * the drag in a view of the items' own room: moving (sliding to the nearest
 * spot that fits) or resizing them
 */
const dragPreviewInItemsRoom = (
  {
    levelEditorState,
    itemGrab: { jsonItemIds, mouseDownPointingAt },
    openRoomId,
    roomState,
    blockDragVector,
    gridResolution,
    cameraAngle,
  }: DragPreviewArgs,
  /**
   * the edge being dragged, when resizing
   */
  resizeEdge: Plane | undefined,
): ItemGrabPreviewedIntoPayload | undefined => {
  const roomJson = levelEditorState.campaignInProgress.rooms[
    mouseDownPointingAt.roomId
  ] as EditorRoomJson;

  let positionDelta: Xyz;
  let timesDelta: undefined | Xyz = undefined;
  if (resizeEdge !== undefined) {
    // resizing
    //
    //   ⌑
    //     ↘ ┌-┐
    //       └-┘
    //
    const mouseDownJsonItemId = findItemInPlayForPicking(
      roomState,
      mouseDownPointingAt.world.itemId,
    )!.jsonItemId!;
    ({ timesDelta, positionDelta } = resizeTimesAndPosition({
      // in case there are multiple, the changes are calculated on the item the (single) item
      // that the mouse went down on, and then applied to the other selected items - this
      // could potentially create different results for different items if they have different
      // starting sizes but it generally makes sense- all are increase or decreased by the same
      // amount on the same axes:
      jsonItem: roomJson.items[mouseDownJsonItemId],
      blockDragAccVec: blockDragVector,
      resizeEdgeDirection: resizeEdge.point,
    }));
  } else {
    // moving
    //
    //   ⌑ -> ⌑
    //
    positionDelta = blockDragVector;
  }
  const movesToTry =
    resizeEdge === undefined ?
      dragMovesToTry(originXyz, positionDelta, gridResolution, cameraAngle)
    : [positionDelta];

  for (const moveToTry of movesToTry) {
    if (
      // collision has to happen on the loaded room, not the json:
      itemMoveOrResizeWouldCollide({
        roomState,
        roomJson,
        movesOrResizes: sameMoveOrResizeForEach(jsonItemIds, {
          blockPositionDelta: moveToTry,
          timesDelta,
        }),
      })
    ) {
      continue;
    }
    const outcome = moveOrResizeOutcome(levelEditorState, {
      jsonItemIds,
      positionDelta: moveToTry,
      timesDelta,
      timestamp: Date.now(),
    });
    if (outcome.type === "invalid") {
      continue;
    }
    return {
      openRoomId,
      movedItemIds: jsonItemIds,
      pendingEdits:
        outcome.type === "unchanged" ?
          undefined
        : {
            edits: { [roomJson.id]: outcome.edits },
            description: outcome.description,
            timestamp: outcome.timestamp,
            madeBy: { type: "drag" },
          },
    };
  }
  return undefined;
};

/**
 * the drag in another room: moving the items there with new ids, sliding to
 * the nearest spot that fits between where the drag came into the room and
 * where it points
 */
const dragPreviewInOtherRoom = (
  {
    levelEditorState,
    itemGrab: { jsonItemIds, mouseDownPointingAt },
    openRoomId,
    roomState,
    blockDragVector,
    gridResolution,
    cameraAngle,
  }: DragPreviewArgs,
  /**
   * the drag vector, rounded, in blocks, where the drag came into the room
   */
  blockEntryDragVector: Xyz,
): ItemGrabPreviewedIntoPayload | undefined => {
  const { rooms } = levelEditorState.campaignInProgress;
  const { roomId: toRoomId, subRoomId: toSubRoomId } = existingLayoutNode(
    levelEditorState.layout,
    openRoomId,
  );
  const fromRoom = rooms[mouseDownPointingAt.roomId] as EditorRoomJson;
  const toRoom = rooms[toRoomId] as EditorRoomJson;
  const pointedMove = planItemsMoveBetweenRooms(rooms, fromRoom.id, {
    itemIds: jsonItemIds,
    toRoomId,
    blockPositionDelta: blockDragVector,
  });
  if (pointedMove === undefined) {
    return undefined;
  }

  // the destination with the items added where the drag points, to try moves
  // from there against:
  const movedItemIds = pointedMove.newIds.values().toArray();
  const toRoomWithItems: EditorRoomJson = {
    ...toRoom,
    items: {
      ...toRoom.items,
      ...Object.fromEntries(
        pointedMove.newIds.entries().map(([itemId, newId]) => {
          const item = fromRoom.items[itemId];
          return [
            newId,
            { ...item, position: addXyz(item.position, blockDragVector) },
          ];
        }),
      ),
    },
  };
  const walls = roomWallBounds(toRoom, toSubRoomId);
  const fits = (moveToTry: Xyz) => {
    const fromPointed = subXyz(moveToTry, blockDragVector);
    return (
      movedItemIds.every((itemId) => {
        const { x, y } = addXyz(
          toRoomWithItems.items[itemId].position,
          fromPointed,
        );
        return (
          x >= walls.from.x &&
          x < walls.to.x &&
          y >= walls.from.y &&
          y < walls.to.y
        );
      }) &&
      !itemMoveOrResizeWouldCollide({
        roomState,
        roomJson: toRoomWithItems,
        movesOrResizes: sameMoveOrResizeForEach(movedItemIds, {
          blockPositionDelta: fromPointed,
        }),
      })
    );
  };
  const validMove = dragMovesToTry(
    blockEntryDragVector,
    blockDragVector,
    gridResolution,
    cameraAngle,
  ).find(fits);
  if (validMove === undefined) {
    return undefined;
  }

  const move = { ...pointedMove, blockPositionDelta: validMove };
  return {
    openRoomId,
    movedItemIds,
    pendingEdits: {
      edits: itemsMoveBetweenRoomsEdits(rooms, move),
      description: {
        kind: "itemAction",
        verb: `Move to ${toRoomId}`,
        items: move.newIds
          .keys()
          .map((itemId) => [itemId, fromRoom.items[itemId]] as const)
          .toArray(),
      },
      timestamp: Date.now(),
      madeBy: { type: "drag" },
    },
  };
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
      const openRoom = maybeLayoutNode(
        storeState.levelEditor.layout,
        openRoomId,
      );
      // the open room may have been closed or replaced (its pane is going):
      if (openRoom === undefined) {
        return;
      }
      const { itemGrab } = storeState.levelEditor;
      if (itemGrab === undefined) {
        // not dragging, so the most moving the pointer can do is change the
        // hover status of items:
        dispatch(
          setHoveredItemIfChangedThunk(
            openRoomId,
            openRoom.editable,
            roomState,
            pointingAt,
          ),
        );
        return;
      }
      if (!openRoom.editable) {
        // nothing can be dropped here
        return;
      }

      const { jsonItemIds, mouseDownPointingAt } = itemGrab;
      const fromRoom = storeState.levelEditor.campaignInProgress.rooms[
        mouseDownPointingAt.roomId
      ] as EditorRoomJson;
      const jsonItems = jsonItemIds.map((itemId) => fromRoom.items[itemId]);
      if (itemsAreLocked(storeState, ...jsonItems)) {
        // if item isn't in the json (or is locked) we can't drag it
        return;
      }

      // grabbing an edge resizes, if every item can be resized:
      const resizeEdge =
        jsonItems.every((jsonItem) => isConsolidatable(jsonItem)) ?
          mouseDownPointingAt.world.onItem.edge
        : undefined;
      const dragAction: ItemDragAction =
        resizeEdge === undefined ? "moveItems" : "resizeItems";
      const isItemsRoom = openRoom.roomId === fromRoom.id;
      if (
        dragAction === "resizeItems" &&
        openRoomId !== itemGrab.sourceOpenRoomId
      ) {
        // a resize stays in its own pane
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
        return;
      }

      const { cameraAngle } = openRoom;
      const mousePosition = viewportMousePosition(viewport, mouseEvent);
      const plane = dragPlaneNow(
        itemGrab,
        normal,
        modifierPressed,
        mousePosition,
        viewportMouseMovement(viewport, {
          x: mouseEvent.movementX,
          y: mouseEvent.movementY,
        }),
        cameraAngle,
      );
      if (plane === undefined) {
        // not dragging yet
        return;
      }
      if (itemGrab.dragging === undefined) {
        dispatch(itemGrabDragStarted({ dragging: dragAction, plane }));
        if (
          jsonItemIds.length === 1 &&
          !selectOpenRoomSelectedJsonItemIds(storeState, openRoomId).includes(
            jsonItemIds[0],
          )
        ) {
          // once we are dragging an item, select it:
          dispatch(setSelectedItemsInRoom({ jsonItemIds }));
        }
      } else if (plane !== itemGrab.plane) {
        dispatch(itemGrabPlaneChanged(plane));
      }

      const gridResolution =
        // sizes are always whole blocks:
        dragAction === "resizeItems" ? 1 : (
          snapGridResolution(
            storeState.levelEditor.gridResolution,
            jsonItems.map(({ type }) => type),
          )
        );
      const roundedDragVector = roundDragVector(
        dragVectorOnPlane(plane, mousePosition, cameraAngle),
        gridResolution,
      );
      if (
        itemGrab.triedInOpenRoomId === openRoomId &&
        xyzEqual(itemGrab.roundedDragVector, roundedDragVector)
      ) {
        // rounded drag vector didn't change - nothing to do
        return;
      }
      dispatch(itemGrabRounded({ openRoomId, roundedDragVector }));

      const previewArgs: DragPreviewArgs = {
        levelEditorState: getState().levelEditor,
        itemGrab,
        openRoomId,
        roomState,
        blockDragVector: fineXyzToBlockXyz(roundedDragVector),
        gridResolution,
        cameraAngle,
      };
      const previewed =
        isItemsRoom ?
          dragPreviewInItemsRoom(previewArgs, resizeEdge)
        : dragPreviewInOtherRoom(
            previewArgs,
            fineXyzToBlockXyz(
              roundDragVector(plane.startDragVector, gridResolution),
            ),
          );
      if (previewed !== undefined) {
        dispatch(itemGrabPreviewedInto(previewed));
      }
      // otherwise, nowhere near the drag can go, so the last preview stays
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
        const openRoom = maybeLayoutNode(
          storeState.levelEditor.layout,
          openRoomId,
        );
        // the open room may have been closed or replaced (its pane is going):
        if (openRoom === undefined) {
          return;
        }
        const { editable } = openRoom;
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
      } else if (
        storeState.levelEditor.itemGrab?.dropInto?.openRoomId === openRoomId
      ) {
        // a drag released where it is previewed dropping:
        dispatch(itemGrabDropped());
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
        itemGrabPointerDown({
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
    // a closed (or replaced) open room claims nothing:
    if (!maybeLayoutNode(storeState.levelEditor.layout, openRoomId)?.editable) {
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
