import { projectWorldXyzToScreenXy } from "../../../../game/render/projections";
import { blockSizePx } from "../../../../model/blockSizePx";
import { roomItemsIterable } from "../../../../model/roomItemsInPlayIterators";
import {
  elementWiseProductXyz,
  unitXyz_z,
  type Xyz,
} from "../../../../utils/vectors/vectors";
import {
  type EditorRoomItemId,
  type EditorRoomJson,
} from "../../../editorTypes";
import { type PointingAtItem } from "../../../RoomEditingArea/cursor/PointingAt";
import { PointerToolHandler } from "../../../RoomEditingArea/interactivity/toolHandlers/PointerToolHandler";
import { EditorViewport } from "../../../RoomEditingArea/viewport/EditorViewport";
import {
  changeWallsFloorsLocked,
  type LevelEditorState,
  setSelectedItemsInRoom,
} from "../../levelEditorSlice";
import { loadEditorRoom } from "../../loadEditorRoom";
import {
  reduceLevelEditorActions,
  testOpenRoomId,
  testRoomId,
} from "./storeStates";

export type SimulatePointerToolDragWithMouseArgs = {
  jsonItemIds: EditorRoomItemId[];
  /**
   * the edge of the first item the pointer presses on, as the direction to
   * it from the item's centre, to resize the items - without one the pointer
   * presses on the item's top, to move them
   */
  edgeDirection?: Xyz;
  /**
   * where the pointer moves to while pressed, each as how far it is dragging
   * the items, in blocks
   */
  moves: Xyz[];
};

/**
 * the editor's state after a user drags items in the test room's open room,
 * as the editor takes the pointer's events: walls and floors unlocked, the
 * items selected, the pointer pressed on the first of them, moved through
 * `moves` and released. Needs a dom (eg happy-dom) for the pointer's events
 */
export const simulatePointerToolDragWithMouse = (
  state: LevelEditorState,
  { jsonItemIds, edgeDirection, moves }: SimulatePointerToolDragWithMouseArgs,
): LevelEditorState => {
  const roomState = loadEditorRoom(
    testRoomId,
    state.campaignInProgress.rooms[testRoomId] as EditorRoomJson,
  );
  const [firstJsonItemId] = jsonItemIds;
  const pressedItem = roomItemsIterable(roomState.items).find(
    ({ jsonItemId }) => jsonItemId === firstJsonItemId,
  )!;
  const pointingAt: PointingAtItem = {
    roomId: testRoomId,
    scrXy: { x: 0, y: 0 },
    world: {
      itemId: pressedItem.id,
      position: {
        x: pressedItem.state.box.x,
        y: pressedItem.state.box.y,
        z: pressedItem.state.box.z,
      },
      onItem: {
        face: unitXyz_z,
        ...(edgeDirection === undefined ?
          {}
        : { edge: { point: edgeDirection, normal: unitXyz_z } }),
      },
    },
  };
  const paneElement = document.createElement("div");
  const viewport = new EditorViewport();
  const handler = new PointerToolHandler();

  return reduceLevelEditorActions(
    state,
    changeWallsFloorsLocked(false),
    setSelectedItemsInRoom({
      selection: jsonItemIds.map((jsonItemId) => ({
        jsonItemId,
        whichEditorGhost: undefined,
      })),
    }),
    handler.handleMouseDown({
      openRoomId: testOpenRoomId,
      roomState,
      mouseEvent: { button: 0 } as MouseEvent,
      viewport,
      pointingAt,
    }),
    ...moves.map((blockMove) => {
      // the pane and view are unmoved, so client px are the room's screen px:
      const pointer = projectWorldXyzToScreenXy(
        elementWiseProductXyz(blockMove, blockSizePx),
      );
      return handler.handleMouseMove({
        openRoomId: testOpenRoomId,
        roomState,
        mouseEvent: {
          clientX: pointer.x,
          clientY: pointer.y,
          currentTarget: paneElement,
          metaKey: false,
          shiftKey: false,
        } as Partial<MouseEvent> as MouseEvent,
        viewport,
        pointingAt,
        pointingAtChanged: true,
      });
    }),
    handler.handleMouseUp({
      openRoomId: testOpenRoomId,
      roomState,
      mouseEvent: { button: 0 } as MouseEvent,
      viewport,
      pointingAt,
      isClick: false,
    }),
  );
};
