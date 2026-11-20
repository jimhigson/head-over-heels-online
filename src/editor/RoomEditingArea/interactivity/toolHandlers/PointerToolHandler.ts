import {
  getConsolidatableVector,
  isConsolidatable,
} from "../../../../consolidateItems/ConsolidatableJsonItem";
import {
  fineXyzToBlockXyz,
  unprojectScreenXyToWorldXyz,
  unprojectScreenXyToWorldXyzOnFace,
} from "../../../../game/render/projections";
import {
  isXyRectInFootprints,
  roomFootprints,
} from "../../../../model/roomFootprints";
import { getJsonItemTimes } from "../../../../model/times";
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
  isJsonItemWithEditorGhosts,
  maybeEditorGhostEditorBehaviour,
} from "../../../editorGhostEditorBehaviours";
import {
  type EditorJsonItemUnion,
  type EditorRoomJson,
  type EditorRoomState,
} from "../../../editorTypes";
import {
  itemsMoveBetweenRoomsDescription,
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
  selectOpenRoomSelectionJsonItemIdsWithoutEditorGhostSelections,
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
import {
  type EditorGhostSelectionEntry,
  type SelectionEntry,
} from "../../../slice/SelectionEntry";
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
import {
  candidatesAround,
  nearestCandidatesFirst,
  placementReachBlocks,
  slideCandidates,
} from "../nearestCandidatesFirst";
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
 *  - either single or multiple, or a single item's editor ghost by itself
 */
const getGrabbedItemsForPointingAt = (
  storeState: EditorRootState,
  openRoomId: OpenRoomId,
  roomState: EditorRoomState,
  mouseDownPointingAt: MaybePointingAtSomething | undefined,
): SelectionEntry[] => {
  const mouseDownItemInPlayId = mouseDownPointingAt?.world?.itemId;

  if (mouseDownItemInPlayId === undefined) {
    // not pointing at anything:
    return emptyArray;
  }

  const mouseDownItem = findItemInPlayForPicking(
    roomState,
    mouseDownItemInPlayId,
  );
  if (mouseDownItem?.jsonItemId === undefined) {
    // item not in the room - this shouldn't normally happen
    return emptyArray;
  }
  const mouseDownJsonItemId = mouseDownItem.jsonItemId;

  if (
    mouseDownItem.type === "editorGhost" &&
    mouseDownItem.config.whichEditorGhost !== undefined
  ) {
    // an editor ghost is dragged by itself:
    return [
      {
        jsonItemId: mouseDownJsonItemId,
        whichEditorGhost: mouseDownItem.config.whichEditorGhost,
      },
    ];
  }

  const selectedJsonItemIds =
    selectOpenRoomSelectionJsonItemIdsWithoutEditorGhostSelections(
      storeState,
      openRoomId,
    );

  return (
    selectedJsonItemIds.includes(mouseDownJsonItemId) ?
      // interacted with an already selected item - use all selected items:
      selectedJsonItemIds
      // interacted with an unselected item - use just that one:
    : [mouseDownJsonItemId]).map((jsonItemId) => ({
    jsonItemId,
    whichEditorGhost: undefined,
  }));
};

const getDragPlaneNormal = (
  mouseDownPointingAt: MaybePointingAtSomething,
  modifierPressed: boolean,
  jsonItems: Iterable<EditorJsonItemUnion>,
  /**
   * the editor ghost being dragged, if one is dragged rather than whole items
   */
  grabbedEditorGhost: EditorGhostSelectionEntry | undefined,
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

  if (grabbedEditorGhost === undefined && lengthXyz(resizeDirection) > 0) {
    // dragging will be resizing - use the plane of the edge under the mouse:
    return edgePlane!.normal;
  }

  // not all items can be moved in all directions - get the legal directions
  // for the current selections:
  const movableVector =
    grabbedEditorGhost === undefined ?
      elementWiseProductXyz(
        ...Iterator.from(jsonItems).map((jsonItem) =>
          getMovableVector(jsonItem),
        ),
      )
    : elementWiseProductXyz(
        ...Iterator.from(jsonItems).map(
          (jsonItem) =>
            (isJsonItemWithEditorGhosts(jsonItem) &&
              maybeEditorGhostEditorBehaviour(
                jsonItem,
                grabbedEditorGhost.whichEditorGhost,
              )?.movableVector) ||
            originXyz,
        ),
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
    itemGrab: { grabbedItems, mouseDownPointingAt },
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
  const jsonItemIds = grabbedItems.map(({ jsonItemId }) => jsonItemId);
  // a grabbed editor ghost moves by itself, leaving its item where it is:
  const wholeJsonItemIds = grabbedItems
    .filter(({ whichEditorGhost }) => whichEditorGhost === undefined)
    .map(({ jsonItemId }) => jsonItemId);
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
  // moving slides along whatever blocks the way, from where the items were:
  const movesToTry =
    resizeEdge === undefined ?
      nearestCandidatesFirst(
        slideCandidates(originXyz, positionDelta, gridResolution),
        positionDelta,
        cameraAngle,
      )
    : [positionDelta];

  for (const moveToTry of movesToTry) {
    if (
      // collision has to happen on the loaded room, not the json:
      itemMoveOrResizeWouldCollide({
        roomState,
        roomJson,
        movesOrResizes: sameMoveOrResizeForEach(wholeJsonItemIds, {
          blockPositionDelta: moveToTry,
          timesDelta,
        }),
      })
    ) {
      continue;
    }
    const outcome = moveOrResizeOutcome(roomJson, {
      selectionEntries: grabbedItems,
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
            edits: { [mouseDownPointingAt.roomId]: outcome.edits },
            description: outcome.description,
            timestamp: outcome.timestamp,
            madeBy: { type: "drag" },
          },
    };
  }
  return undefined;
};

/**
 * the drag in another room: moving the items there with new ids, to the
 * nearest spot that fits around where the drag points - there is nowhere in
 * this room for them to slide from
 */
const dragPreviewInOtherRoom = ({
  levelEditorState,
  itemGrab: { grabbedItems, mouseDownPointingAt },
  openRoomId,
  roomState,
  blockDragVector,
  gridResolution,
  cameraAngle,
}: DragPreviewArgs): ItemGrabPreviewedIntoPayload | undefined => {
  const jsonItemIds = grabbedItems.map(({ jsonItemId }) => jsonItemId);
  const { rooms } = levelEditorState.campaignInProgress;
  const { roomId: toRoomId } = existingLayoutNode(
    levelEditorState.layout,
    openRoomId,
  );
  const fromRoom = rooms[mouseDownPointingAt.roomId] as EditorRoomJson;
  const toRoom = rooms[toRoomId] as EditorRoomJson;
  const pointedMove = planItemsMoveBetweenRooms(rooms, {
    fromRoomId: mouseDownPointingAt.roomId,
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
  const footprints = roomFootprints(toRoom);
  const fits = (moveToTry: Xyz) => {
    const fromPointed = subXyz(moveToTry, blockDragVector);
    return (
      movedItemIds.every((itemId) => {
        const movedItem = toRoomWithItems.items[itemId];
        const { x, y } = addXyz(movedItem.position, fromPointed);
        const times = getJsonItemTimes(movedItem);
        return isXyRectInFootprints(
          footprints,
          { x, y },
          { x: x + times.x, y: y + times.y },
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
  const validMove = nearestCandidatesFirst(
    candidatesAround(blockDragVector, gridResolution, placementReachBlocks),
    blockDragVector,
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
      description: itemsMoveBetweenRoomsDescription(rooms, move),
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

      const { grabbedItems, mouseDownPointingAt } = itemGrab;
      const jsonItemIds = grabbedItems.map(({ jsonItemId }) => jsonItemId);
      const fromRoom = storeState.levelEditor.campaignInProgress.rooms[
        mouseDownPointingAt.roomId
      ] as EditorRoomJson;
      const jsonItems = jsonItemIds.map((itemId) => fromRoom.items[itemId]);
      if (itemsAreLocked(storeState, ...jsonItems)) {
        // if item isn't in the json (or is locked) we can't drag it
        return;
      }

      const grabbedEditorGhost = grabbedItems.find(
        (grabbedItem): grabbedItem is EditorGhostSelectionEntry =>
          grabbedItem.whichEditorGhost !== undefined,
      );
      // grabbing an edge resizes, if every item can be resized - an editor ghost
      // never is:
      const resizeEdge =
        (
          grabbedEditorGhost === undefined &&
          jsonItems.every((jsonItem) => isConsolidatable(jsonItem))
        ) ?
          mouseDownPointingAt.world.onItem.edge
        : undefined;
      const dragAction: ItemDragAction =
        grabbedEditorGhost !== undefined ? "moveEditorGhost"
        : resizeEdge === undefined ? "moveItems"
        : "resizeItems";
      const isItemsRoom = openRoom.roomId === mouseDownPointingAt.roomId;
      switch (dragAction) {
        case "moveItems":
          break;
        // a resize, or an editor ghost's drag, stays in its own pane:
        case "resizeItems":
        case "moveEditorGhost":
          if (openRoomId !== itemGrab.sourceOpenRoomId) {
            return;
          }
          break;
        default:
          dragAction satisfies never;
      }

      const modifierPressed = mouseEvent.metaKey || mouseEvent.shiftKey;
      const normal = getDragPlaneNormal(
        mouseDownPointingAt,
        modifierPressed,
        jsonItems,
        grabbedEditorGhost,
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
        if (grabbedEditorGhost !== undefined) {
          // once we are dragging an editor ghost, select it:
          dispatch(
            setSelectedItemsInRoom({
              selection: [grabbedEditorGhost],
            }),
          );
        } else if (
          jsonItemIds.length === 1 &&
          !selectOpenRoomSelectionJsonItemIdsWithoutEditorGhostSelections(
            storeState,
            openRoomId,
          ).includes(jsonItemIds[0])
        ) {
          // once we are dragging an item, select it:
          dispatch(
            setSelectedItemsInRoom({
              selection: jsonItemIds.map((jsonItemId) => ({
                jsonItemId,
                whichEditorGhost: undefined,
              })),
            }),
          );
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
        : dragPreviewInOtherRoom(previewArgs);
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

        const clickedSelectionEntry =
          clickedOnItem?.jsonItemId === undefined ?
            undefined
          : {
              jsonItemId: clickedOnItem.jsonItemId,
              whichEditorGhost:
                clickedOnItem.type === "editorGhost" ?
                  clickedOnItem.config.whichEditorGhost
                : undefined,
            };

        if (
          clickedOnItem === undefined ||
          clickedSelectionEntry === undefined ||
          (editable && itemsAreLocked(storeState, clickedOnItem))
        ) {
          // clicking on nothing (or something with no json id) (or a locked floor/wall) unselects:
          dispatch(
            setSelectedItemsInRoom({
              selection: [],
            }),
          );
          return;
        }

        // a non-editable open room has no context menu:
        const isRightClick = editable && mouseEvent.button === 2;
        // right-clicking within the selection opens the menu for all of it:
        const keepsSelection =
          isRightClick &&
          selectOpenRoomSelectionJsonItemIdsWithoutEditorGhostSelections(
            storeState,
            openRoomId,
          ).includes(clickedSelectionEntry.jsonItemId);

        if (!keepsSelection) {
          dispatch(
            // a non-editable open room picks a single item:
            editable && (mouseEvent.ctrlKey || mouseEvent.metaKey) ?
              toggleSelectedItemInRoom({
                selectionEntry: clickedSelectionEntry,
                onlySelect: isRightClick,
              })
            : setSelectedItemsInRoom({
                selection: [clickedSelectionEntry],
              }),
          );
        }

        // only an item itself has a context menu, not its editor ghosts:
        if (
          isRightClick &&
          clickedSelectionEntry.whichEditorGhost === undefined
        ) {
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
          grabbedItems: getGrabbedItemsForPointingAt(
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
    const jsonItemIds = getGrabbedItemsForPointingAt(
      storeState,
      openRoomId,
      roomState,
      pointingAt,
    ).map(({ jsonItemId }) => jsonItemId);
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
