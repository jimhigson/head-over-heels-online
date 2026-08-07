import { useMemo } from "preact/hooks";

import { roomRenderExtent } from "../../game/render/room/roomRenderExtent";
import { spritesheetMetas } from "../../sprites/spritesheet/spritesheetData/spritesheetMetaData";
import { useEditorAppSelector } from "../../store/store";
import { useStableValue } from "../../utils/preact/useStableValue";
import { type Xy } from "../../utils/vectors/vectors";
import { useEditorRoomStateContext } from "../EditorRoomStateProvider";
import { type EditorRoomState } from "../editorTypes";
import { selectEditorCameraAngle } from "../slice/levelEditorSlice";

export type RenderedRoomDimensions = {
  l: number;
  r: number;
  t: number;
  b: number;
  w: number;
  h: number;
};

/** where in the pane's coordinates the room's rendering falls */
export const editorRoomRenderDimensions = (
  roomState: EditorRoomState,
  cameraAngle: Xy,
): RenderedRoomDimensions => {
  const {
    floors: { edgeLeftX: l, edgeRightX: r, bottomEdgeY: b },
    allItems: { topEdgeY: t },
  } = roomRenderExtent(roomState, spritesheetMetas.BlockStack, cameraAngle);

  // simplify to the x/y/w/h rectangle to inform the editor where the rendering is:
  return {
    l,
    r,
    w: r - l,
    b,
    t,
    h: b - t,
  };
};

export const useEditorRoomRenderDimensions = (): RenderedRoomDimensions => {
  const editorRoomState = useEditorRoomStateContext();
  const cameraAngle = useEditorAppSelector(selectEditorCameraAngle);

  // the room is patched in place, so it is the context value - re-minted on
  // every change to the room - that says the extents need re-measuring:
  const measured = useMemo(
    () => editorRoomRenderDimensions(editorRoomState.roomState, cameraAngle),
    [editorRoomState, cameraAngle],
  );

  // most edits leave the extents exactly where they were, and everything sized
  // from them (the backdrop, the room renderer) is expensive to rebuild:
  return useStableValue(measured);
};
