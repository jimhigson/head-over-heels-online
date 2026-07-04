import { applyRenderAabbCameraShift } from "../../game/gameState/loadRoom/applyRenderAabbCameraShift";
import {
  loadRoom,
  type LoadRoomOptions,
} from "../../game/gameState/loadRoom/loadRoom";
import { reloadStructureForCamera } from "../../game/gameState/loadRoom/reloadStructureForCamera";
import { emptyUserSettings } from "../../store/slices/userSettings/emptyUserSettings";
import { emptyObject } from "../../utils/empty";
import { cameraAngleBase } from "../../utils/vectors/rotateXy";
import { type Xy } from "../../utils/vectors/vectors";
import {
  type EditorRoomId,
  type EditorRoomItemId,
  type EditorRoomJson,
  type EditorRoomState,
} from "../editorTypes";

const loadRoomDefaultOptions = {
  roomPickupsCollected: emptyObject,
  scrollsRead: emptyObject,
  // display heads and heels in their starting rooms:
  isNewGame: true,
  userSettings: emptyUserSettings,
} as const satisfies Partial<LoadRoomOptions<EditorRoomId, EditorRoomItemId>>;

/**
 * load the editing room, re-deriving its camera-relative structure (walls/doors/
 * floors) for the editor's view angle exactly as the game does on rotation. The
 * base angle needs no reload.
 */
export const loadEditorRoom = (
  roomJson: EditorRoomJson,
  cameraAngle: Xy,
): EditorRoomState => {
  const room = loadRoom({ roomJson, ...loadRoomDefaultOptions });
  if (
    cameraAngle.x !== cameraAngleBase.x ||
    cameraAngle.y !== cameraAngleBase.y
  ) {
    reloadStructureForCamera(room, cameraAngle);
    applyRenderAabbCameraShift(room, cameraAngle);
  }
  return room;
};
