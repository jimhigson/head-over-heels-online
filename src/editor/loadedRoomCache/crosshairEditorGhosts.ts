import { collisionBoxes } from "../../game/collision/aabbCollision";
import { blockSizePx } from "../../game/physics/mechanicsConstants";
import { cameraReversedAxes } from "../../game/render/itemAppearances/adjustNearCornerForCameraAngle";
import { defaultRoomHeightBlocks } from "../../model/defaultRoomHeightBlocks";
import { itemBehaviourKey } from "../../model/ItemInPlay";
import { isXyInFootprints, roomFootprints } from "../../model/roomFootprints";
import { roomItemsIterable } from "../../model/roomItemsInPlayIterators";
import { roomSpatialIndexKey } from "../../model/RoomState";
import { getItemInPlayTimes } from "../../model/times";
import { unitVectors } from "../../utils/vectors/unitVectors";
import {
  addXyz,
  boxWithSize,
  directionsXyz4,
  elementWiseProductXyz,
  scaleXyz,
  type Xy,
  type Xyz,
  type XyzBox,
} from "../../utils/vectors/vectors";
import {
  type EditorItemInPlayUnion,
  type EditorRoomJson,
  type EditorRoomState,
  type EditorUnionOfAllItemInPlayTypes,
} from "../editorTypes";
import { type SelectionEntry } from "../slice/SelectionEntry";
import { editorGhostOfParticleDot } from "./editorGhostOfParticleDot";

/**
 * the spacing of the crosshair's editor ghosts, in px on each axis
 */
const crosshairStepPx = scaleXyz(blockSizePx, 0.25);

/**
 * an in-play item's first block: at its camera-closest bottom corner, one
 * repetition of it (if multiplied), no bigger than a block on any axis
 */
const firstBlockBox = (
  item: EditorUnionOfAllItemInPlayTypes,
  cameraAngle: Xy,
): XyzBox => {
  const {
    state: { box },
  } = item;
  const times = getItemInPlayTimes(item);
  const reversedAxes = cameraReversedAxes(cameraAngle);
  const xd = Math.min(box.xd / times.x, blockSizePx.x);
  const yd = Math.min(box.yd / times.y, blockSizePx.y);
  return {
    x: reversedAxes.x ? box.x + box.xd - xd : box.x,
    y: reversedAxes.y ? box.y + box.yd - yd : box.y,
    z: box.z,
    xd,
    yd,
    zd: Math.min(box.zd / times.z, blockSizePx.z),
  };
};

/**
 * the centre of the box around the first blocks of all the in-play items
 * a selection entry selects, or undefined if there are none
 */
export const selectionEntryCentre = (
  roomState: EditorRoomState,
  selectionEntry: SelectionEntry,
  cameraAngle: Xy,
): undefined | Xyz => {
  const boxes = roomItemsIterable(roomState.items)
    // the in-play items loaded from the json item, or the one editor ghost of it:
    .filter(
      (item) =>
        item.jsonItemId === selectionEntry.jsonItemId &&
        (selectionEntry.whichEditorGhost === undefined ?
          item.type !== "editorGhost"
        : item.type === "editorGhost" &&
          item.config.whichEditorGhost === selectionEntry.whichEditorGhost),
    )
    .map((item) => firstBlockBox(item, cameraAngle))
    .toArray();
  if (boxes.length === 0) {
    return undefined;
  }
  const min = (axis: keyof Xyz) => Math.min(...boxes.map((box) => box[axis]));
  const max = (axis: keyof Xyz, size: keyof XyzBox) =>
    Math.max(...boxes.map((box) => box[axis] + box[size]));
  return {
    x: (min("x") + max("x", "xd")) / 2,
    y: (min("y") + max("y", "yd")) / 2,
    z: (min("z") + max("z", "zd")) / 2,
  };
};

/**
 * editor ghosts of particle dots, marking where a json item (or editor ghost) is in 3d: every quarter block out from the
 * centre of its first block along x, y and z, both ways, to the room's floor and
 * height, and on across its sub-rooms until leaving all of their footprints -
 * leaving out any inside a solid item
 */
export const crosshairEditorGhosts = (
  roomState: EditorRoomState,
  /**
   * the json the loaded room is loaded from, previews included
   */
  roomJson: EditorRoomJson,
  selectionEntry: SelectionEntry,
  /**
   * the crosshair starts from the item's block closest to the camera
   */
  cameraAngle: Xy,
): EditorItemInPlayUnion<"editorGhost">[] => {
  const centre = selectionEntryCentre(roomState, selectionEntry, cameraAngle);
  if (centre === undefined) {
    return [];
  }

  const footprints = roomFootprints(roomJson);
  const heightPx = (roomJson.height ?? defaultRoomHeightBlocks) * blockSizePx.z;
  const isInRoom = (position: Xyz) =>
    position.z >= 0 &&
    position.z <= heightPx &&
    isXyInFootprints(footprints, {
      x: position.x / blockSizePx.x,
      y: position.y / blockSizePx.y,
    });

  const spatialIndex = roomState[roomSpatialIndexKey];
  const isInsideSolidItem = (position: Xyz) =>
    spatialIndex.findInBox(
      // a little volume, so a point on a face (eg the seam between two items)
      // counts as inside:
      boxWithSize(addXyz(position, { x: -0.5, y: -0.5, z: -0.5 }), {
        x: 1,
        y: 1,
        z: 1,
      }),
      (item, pointBox) =>
        !item[itemBehaviourKey].isNonSolid(item) &&
        collisionBoxes(pointBox, item.state.box),
      undefined,
    ) !== undefined;

  const crosshairEditorGhosts: EditorItemInPlayUnion<"editorGhost">[] = [];
  for (const direction of directionsXyz4) {
    const step = elementWiseProductXyz(unitVectors[direction], crosshairStepPx);
    for (
      let position = addXyz(centre, step);
      isInRoom(position);
      position = addXyz(position, step)
    ) {
      if (!isInsideSolidItem(position)) {
        crosshairEditorGhosts.push(
          editorGhostOfParticleDot(position, undefined),
        );
      }
    }
  }
  return crosshairEditorGhosts;
};
