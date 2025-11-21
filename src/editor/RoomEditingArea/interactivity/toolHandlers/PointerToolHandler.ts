import type { Plane, Xy, Xyz } from "../../../../utils/vectors/vectors";
import type {
  EditorJsonItemUnion,
  EditorRoomItemId,
  EditorRoomState,
} from "../../../editorTypes";
import type { RootStateWithLevelEditorSlice } from "../../../slice/levelEditorSlice";
import type { MaybePointingAtSomething } from "../../cursor/PointingAt";
import type { Tool } from "../Tool";
import type {
  MouseDownParams,
  MouseLeaveParams,
  MouseMoveParams,
  MouseUpParams,
  ToolHandler,
} from "./ToolHandler";

import {
  getConsolidatableVector,
  isConsolidatable,
} from "../../../../consolidateItems/ConsolidatableJsonItem";
import {
  fineXyzToBlockXyz,
  unprojectScreenXyToWorldXyz,
} from "../../../../game/render/projections";
import { store } from "../../../../store/store";
import { emptyArray } from "../../../../utils/empty";
import { iterate } from "../../../../utils/iterate";
import { planeAxesDesc } from "../../../../utils/vectors/orthoPlane";
import {
  addXyz,
  elementWiseProductXyz,
  lengthXy,
  lengthXyz,
  originXyz,
  subXy,
  unitXyz_x,
  unitXyz_y,
  unitXyz_z,
  xyzEqual,
} from "../../../../utils/vectors/vectors";
import {
  commitCurrentPreviewedEdits,
  moveOrResizeItemAsPreview,
  selectItem,
  selectItemIsSelected,
  setHoveredItemInRoom,
  setSelectedItemsInRoom,
  toggleSelectedItemInRoom,
} from "../../../slice/levelEditorSlice";
import { getMovableVector } from "../../../slice/reducers/moveOrResizeItemPreview/getMovableVector";
import { itemMoveOrResizeWouldCollide } from "../../cursor/editWouldCollide";
import { roundXyzProjection } from "../../cursor/findPointerPointingAt";
import {
  upscaledMouseMove,
  upscaledMousePosition,
} from "../../cursor/upscaledMouse";
import { resizeTimesAndPosition } from "../../resizeTimesAndPosition";
import { dispatchHoveredOnChangedIfNeeded } from "../dispatchHoveredOnChangedIfNeeded";
import { itemsAreLocked } from "../itemsAreLocked";
import { jsonItemAndIdForInPlayItemId } from "../jsonItemAndIdForInPlayItemId";

const dragMinimumDistance = 5; // pixels

const { dispatch } = store;

/**
 * interpret which item(s) the user wants the current operation to affect
 *  - either single or multiple
 */
const getJsonItemIdsToUseForPointingAt = (
  storeState: RootStateWithLevelEditorSlice,
  roomState: EditorRoomState,
  mouseDownPointingAt: MaybePointingAtSomething | undefined,
): EditorRoomItemId[] => {
  const mouseDownItemInPlayId = mouseDownPointingAt?.world?.itemId;

  if (mouseDownItemInPlayId === undefined) {
    // not pointing at anything:
    return emptyArray;
  }

  const mouseDownJsonItemId = roomState.items[mouseDownItemInPlayId].jsonItemId;

  if (mouseDownJsonItemId === undefined) {
    // item not in the room - this shouldn't normally happen
    return emptyArray;
  }

  const { selectedJsonItemIds } = storeState.levelEditor;

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
    ...iterate(jsonItems).map((jsonItem) => getConsolidatableVector(jsonItem)),
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
    ...iterate(jsonItems).map((jsonItem) => getMovableVector(jsonItem)),
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
    unitXyz_z,
    levelEditorState.tool,
    alwaysFullBlocks ? 1 : levelEditorState.gridResolution,
  );
};

export class PointerToolHandler
  implements ToolHandler<Extract<Tool, { type: "pointer" }>>
{
  handleMouseMove({
    roomState,
    pointingAt,
    storeState,
    mouseDownPointingAtRef,
    mouseEvent,
    upscale,
    dragAccVec,
    roomRenderSize,
  }: MouseMoveParams<Extract<Tool, { type: "pointer" }>>) {
    const mouseMoveXy = upscaledMouseMove(upscale, mouseEvent);

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
          upscaledMousePosition(upscale, roomRenderSize, mouseEvent),
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

    const resizeEdge: Plane | undefined =
      mouseDownPointingAtRef.current?.world?.onItem.edge;
    const isResizing =
      resizeEdge && jsonItems.every((jsonItem) => isConsolidatable(jsonItem));

    const prevDragAccVec: Xyz = dragAccVec.current ?? originXyz;

    // accumulate some more on the drag vector:
    const nextDragAccVec = addXyz(prevDragAccVec, dragDeltaVec);
    const nextDragAccVecRound = roundDragVector(nextDragAccVec, isResizing);

    // store for the next frame:
    dragAccVec.current = nextDragAccVec;

    if (
      xyzEqual(roundDragVector(prevDragAccVec, isResizing), nextDragAccVecRound)
    ) {
      // rounded acc drag vector didn't change - nothing to do
      return;
    }

    const blockDragAccVec = fineXyzToBlockXyz(nextDragAccVecRound);

    let positionDelta: Xyz;
    let timesDelta: undefined | Xyz = undefined;

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
      return;
    }
    dispatch(
      moveOrResizeItemAsPreview({
        jsonItemIds,
        positionDelta,
        timesDelta,
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
        return;
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
  }

  handleMouseDown(
    _params: MouseDownParams<Extract<Tool, { type: "pointer" }>>,
  ) {
    // Pointer tool doesn't need to do anything special on mouse down
    // The main logic handles setting mouseDownPointingAtRef
  }

  handleMouseLeave(
    _params: MouseLeaveParams<Extract<Tool, { type: "pointer" }>>,
  ) {
    dispatch(setHoveredItemInRoom(undefined));
  }
}

// Legacy export for backwards compatibility - to be removed after migration
export const pointerMouseMove = (
  params: MouseMoveParams<Extract<Tool, { type: "pointer" }>>,
) => {
  const handler = new PointerToolHandler();
  handler.handleMouseMove(params);
};
