import type { RefObject } from "preact";
import { useEffect } from "preact/hooks";

import { projectWorldXyzToScreenXy } from "../../game/render/projections";
import { roomItemsIterable } from "../../model/roomItemsInPlayIterators";
import { editorStore } from "../../store/store";
import type { Xy, Xyz, XyzBox } from "../../utils/vectors/vectors";
import type {
  EditorRoomItemId,
  EditorUnionOfAllItemInPlayTypes,
} from "../editorTypes";
import type { LoadedRoomCache } from "../loadedRoomCache/LoadedRoomCache";
import {
  selectActiveOpenRoomId,
  selectOpenRoomCameraAngle,
} from "../slice/levelEditorSlice";
import type { OpenRoomId } from "../slice/OpenRoom";
import type { MaybePointingAtSomething } from "./cursor/PointingAt";
import type { EditorViewport } from "./viewport/EditorViewport";

/** an item in the room, as much of it as pointing at things needs to be described */
export type EditorE2eItem = {
  id: EditorRoomItemId;
  /** the id of the json item this was loaded from - what the room json is keyed by */
  jsonItemId: EditorRoomItemId | undefined;
  type: EditorUnionOfAllItemInPlayTypes["type"];
  /** in engine (world) pixels, not blocks */
  box: Readonly<XyzBox>;
};

/**
 * how e2e tests drive one open room's pane. Pointing at the room means putting
 * the mouse at an exact place on the canvas, which is only knowable from the
 * room's projection and the pane's viewport - so the app, which owns both,
 * converts world positions to page coordinates for the tests rather than tests
 * guessing at pixels
 */
export type EditorE2eOpenRoomApi = {
  /**
   * where a world position falls on the page, in the client coordinates
   * mouse events are given in
   */
  worldToClient(worldPosition: Xyz): Xy;
  /**
   * the angle the open room is viewed from
   */
  cameraAngle(): Xy;
  /** the room's items, as picking sees them */
  items(): Array<EditorE2eItem>;
  /**
   * what the pointer resolved to as of the last pointer event in the open
   * room's pane - the same value the tools act on
   */
  pointingAt(): MaybePointingAtSomething | undefined;
};

/**
 * the handle e2e tests drive the level editor through, on the window in
 * visual-regression builds
 */
export type EditorE2eApi = {
  /**
   * an editable open room shown in a pane, or undefined if it isn't
   */
  openRoom(
    /**
     * which open room - the active one if not given
     */
    openRoomId?: OpenRoomId,
  ): EditorE2eOpenRoomApi | undefined;
  /**
   * the open room commands act on - the focused pane's front tab
   */
  activeOpenRoomId(): OpenRoomId;
};

/**
 * the open rooms in panes that tests can drive, by id
 */
const e2eOpenRooms = new Map<OpenRoomId, EditorE2eOpenRoomApi>();

const activeOpenRoomId = () => selectActiveOpenRoomId(editorStore.getState());

const editorE2eApi: EditorE2eApi = {
  openRoom: (openRoomId = activeOpenRoomId()) => e2eOpenRooms.get(openRoomId),
  activeOpenRoomId,
};

const editorE2eItem = (
  item: EditorUnionOfAllItemInPlayTypes,
): EditorE2eItem => ({
  id: item.id,
  jsonItemId: item.jsonItemId,
  type: item.type,
  box: item.state.box,
});

export type UseEditorE2eApiParams = {
  openRoomId: OpenRoomId;
  /** the element the room renders into, which mouse positions are relative to */
  renderArea: HTMLElement | null;
  viewport: EditorViewport;
  pointingAtRef: RefObject<MaybePointingAtSomething | undefined>;
  loadedRoom: LoadedRoomCache;
  /**
   * whether the open room is editable - only an editable one is driven by the
   * tests
   */
  editable: boolean;
};

/**
 * makes an editable open room's pane drivable through {@link EditorE2eApi},
 * published on the window, in visual-regression builds only - the same builds
 * that expose the store (in any other build this compiles away)
 */
export const useEditorE2eApi = ({
  openRoomId,
  renderArea,
  viewport,
  pointingAtRef,
  loadedRoom,
  editable,
}: UseEditorE2eApiParams): void => {
  useEffect(() => {
    if (
      import.meta.env.MODE !== "visual-regression" ||
      renderArea === null ||
      !editable
    ) {
      return;
    }

    window._e2e_editor = editorE2eApi;
    e2eOpenRooms.set(openRoomId, {
      worldToClient(worldPosition) {
        const paneRect = renderArea.getBoundingClientRect();
        const panePosition = viewport.toScreen(
          projectWorldXyzToScreenXy(
            worldPosition,
            selectOpenRoomCameraAngle(editorStore.getState(), openRoomId),
          ),
        );
        return {
          x: paneRect.left + panePosition.x,
          y: paneRect.top + panePosition.y,
        };
      },
      cameraAngle() {
        return selectOpenRoomCameraAngle(editorStore.getState(), openRoomId);
      },
      items() {
        return roomItemsIterable(loadedRoom.getRoomState().items)
          .map(editorE2eItem)
          .toArray();
      },
      pointingAt() {
        return pointingAtRef.current;
      },
    });

    return () => {
      e2eOpenRooms.delete(openRoomId);
    };
  }, [openRoomId, renderArea, viewport, pointingAtRef, loadedRoom, editable]);
};
