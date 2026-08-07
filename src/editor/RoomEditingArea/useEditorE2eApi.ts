import { type RefObject } from "preact";
import { useEffect } from "preact/hooks";

import { projectWorldXyzToScreenXy } from "../../game/render/projections";
import { roomItemsIterable } from "../../model/RoomState";
import { editorStore } from "../../store/store";
import { type Xy, type Xyz } from "../../utils/vectors/vectors";
import {
  type EditorRoomItemId,
  type EditorRoomState,
  type EditorUnionOfAllItemInPlayTypes,
} from "../editorTypes";
import { selectEditorCameraAngle } from "../slice/levelEditorSlice";
import { type MaybePointingAtSomething } from "./cursor/PointingAt";
import { type EditorViewport } from "./viewport/EditorViewport";

/** an item in the room, as much of it as pointing at things needs to be described */
export type EditorE2eItem = {
  id: EditorRoomItemId;
  /** the id of the json item this was loaded from - what the room json is keyed by */
  jsonItemId: EditorRoomItemId | undefined;
  type: EditorUnionOfAllItemInPlayTypes["type"];
  /** in engine (world) pixels, not blocks */
  position: Xyz;
  aabb: Xyz;
};

/**
 * the handle e2e tests drive the room editing area through. Pointing at the
 * room means putting the mouse at an exact place on the canvas, which is only
 * knowable from the room's projection and the viewport's transform - so the
 * app, which owns both, converts world positions to page coordinates for the
 * tests rather than tests guessing at pixels
 */
export type EditorE2eApi = {
  /**
   * where a world position falls on the page, in the client coordinates
   * mouse events are given in
   */
  worldToClient(worldPosition: Xyz): Xy;
  /** the room's items, as picking sees them */
  items(): Array<EditorE2eItem>;
  /**
   * what the pointer resolved to as of the last pointer event - the same value
   * the tools act on
   */
  pointingAt(): MaybePointingAtSomething | undefined;
};

const editorE2eItem = (
  item: EditorUnionOfAllItemInPlayTypes,
): EditorE2eItem => ({
  id: item.id,
  jsonItemId: item.jsonItemId,
  type: item.type,
  position: item.state.position,
  aabb: item.aabb,
});

export type UseEditorE2eApiParams = {
  /** the element the room renders into, which mouse positions are relative to */
  renderArea: HTMLElement | null;
  viewport: EditorViewport;
  getRoomState: () => EditorRoomState;
  pointingAtRef: RefObject<MaybePointingAtSomething | undefined>;
};

/**
 * publishes {@link EditorE2eApi} on the window, in visual-regression builds
 * only - the same builds that expose the store (in any other build this
 * compiles away)
 */
export const useEditorE2eApi = ({
  renderArea,
  viewport,
  getRoomState,
  pointingAtRef,
}: UseEditorE2eApiParams): void => {
  useEffect(() => {
    if (import.meta.env.MODE !== "visual-regression" || renderArea === null) {
      return;
    }

    window._e2e_editor = {
      worldToClient(worldPosition) {
        const paneRect = renderArea.getBoundingClientRect();
        const panePosition = viewport.toScreen(
          projectWorldXyzToScreenXy(
            worldPosition,
            selectEditorCameraAngle(editorStore.getState()),
          ),
        );
        return {
          x: paneRect.left + panePosition.x,
          y: paneRect.top + panePosition.y,
        };
      },
      items() {
        return roomItemsIterable(getRoomState().items)
          .map(editorE2eItem)
          .toArray();
      },
      pointingAt() {
        return pointingAtRef.current;
      },
    };

    return () => {
      window._e2e_editor = undefined;
    };
  }, [renderArea, viewport, getRoomState, pointingAtRef]);
};
