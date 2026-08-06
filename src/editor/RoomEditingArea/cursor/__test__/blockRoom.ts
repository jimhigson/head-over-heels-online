import { projectWorldXyzToScreenXy } from "../../../../game/render/projections";
import {
  makeItemRenderBoxAtCameraAngle,
  type RenderBox,
  type RenderBoxes,
} from "../../../../game/render/renderBox/makeItemRenderBoxAtCameraAngle";
import { roomItemsIterable } from "../../../../model/RoomState";
import { spritesheetMetas } from "../../../../sprites/spritesheet/spritesheetData/spritesheetMetaData";
import { addXyz, type Xy, type Xyz } from "../../../../utils/vectors/vectors";
import {
  type EditorRoomId,
  type EditorRoomItemId,
  type EditorRoomJson,
  type EditorRoomState,
  type EditorUnionOfAllItemInPlayTypes,
} from "../../../editorTypes";
import { loadEditorRoom } from "../../../slice/loadEditorRoom";
import { type Tool } from "../../interactivity/Tool";

export const pointerTool: Tool = { type: "pointer" };

/**
 * for each camera angle, the physical (world) face that renders as each of the
 * two visible side faces of an item: the face on the screen-right, and the
 * face on the screen-lower-left ("towards" in the base view)
 */
export const visibleSideFaces: Array<{
  cameraAngle: Xy;
  apparentRight: Xyz;
  apparentTowards: Xyz;
}> = [
  {
    cameraAngle: { x: 1, y: 0 },
    apparentRight: { x: -1, y: 0, z: 0 },
    apparentTowards: { x: 0, y: -1, z: 0 },
  },
  {
    cameraAngle: { x: 0, y: 1 },
    apparentRight: { x: 0, y: 1, z: 0 },
    apparentTowards: { x: -1, y: 0, z: 0 },
  },
  {
    cameraAngle: { x: -1, y: 0 },
    apparentRight: { x: 1, y: 0, z: 0 },
    apparentTowards: { x: 0, y: 1, z: 0 },
  },
  {
    cameraAngle: { x: 0, y: -1 },
    apparentRight: { x: 0, y: -1, z: 0 },
    apparentTowards: { x: 1, y: 0, z: 0 },
  },
];

export const blockJsonItemId = "block1" as EditorRoomItemId;
/** the block's position in the room json, in blocks */
export const blockPositionBlocks: Xyz = { x: 2, y: 3, z: 0 };

/**
 * load a room containing a single full-size block through the editor's own
 * room-loading path (the room model is camera-angle-free; the angle only
 * matters to the hit-testing that these fixtures feed)
 */
export const blockRoom = (): {
  room: EditorRoomState;
  block: EditorUnionOfAllItemInPlayTypes;
} => {
  const roomJson = {
    id: "testRoom" as EditorRoomId,
    planet: "blacktooth",
    color: {
      hue: "cyan",
      shade: "dimmed",
    },
    items: {
      [blockJsonItemId]: {
        type: "block",
        position: blockPositionBlocks,
        config: { style: "organic" },
      },
    },
  } as EditorRoomJson;

  const room = loadEditorRoom(roomJson);
  const block = roomItemsIterable(room.items).find((i) => i.type === "block");
  if (block === undefined) {
    throw new Error("fixture room has no block");
  }
  return { room, block };
};

/**
 * the drawn extents for every item in the room at one camera angle - the same
 * map the editor's room renderer owns and picking reads in the real app
 */
export const renderBoxesForRoom = (
  room: EditorRoomState,
  cameraAngle: Xy,
): RenderBoxes<EditorUnionOfAllItemInPlayTypes> => {
  const renderBoxes = new Map<
    EditorUnionOfAllItemInPlayTypes,
    RenderBox | undefined
  >();
  for (const item of roomItemsIterable(room.items)) {
    renderBoxes.set(
      item,
      makeItemRenderBoxAtCameraAngle(
        item,
        cameraAngle,
        spritesheetMetas.BlockStack,
      ),
    );
  }
  return renderBoxes;
};

/**
 * the world-space centre of the given face (unit ± axis normal) of an item's
 * aabb
 */
export const faceCentreWorld = (
  item: EditorUnionOfAllItemInPlayTypes,
  face: Xyz,
): Xyz => {
  const {
    state: { position },
    aabb,
  } = item;
  return {
    x:
      position.x +
      (face.x > 0 ? aabb.x
      : face.x < 0 ? 0
      : aabb.x / 2),
    y:
      position.y +
      (face.y > 0 ? aabb.y
      : face.y < 0 ? 0
      : aabb.y / 2),
    z:
      position.z +
      (face.z > 0 ? aabb.z
      : face.z < 0 ? 0
      : aabb.z / 2),
  };
};

/** project the centre of an item's face to the screen at the given angle */
export const projectFaceCentre = (
  item: EditorUnionOfAllItemInPlayTypes,
  face: Xyz,
  cameraAngle: Xy,
): Xy => projectWorldXyzToScreenXy(faceCentreWorld(item, face), cameraAngle);

type SilhouetteCorner = {
  /** the world offset from the item's position identifying the corner */
  offset: Xyz;
  scr: Xy;
};

export type ApparentSilhouette = {
  bottomCentre: Xy;
  topLeft: Xy;
  topRight: Xy;
  /** the highest projected top corner (the c111 analogue at the base angle) */
  topCorner: SilhouetteCorner;
  /** base-level corner below topLeft (the c100 analogue at the base angle) */
  leftBase: Xy;
  /** base-level corner below topRight (the c010 analogue at the base angle) */
  rightBase: Xy;
  /** the base-level corner hidden behind the item ((1,1,0) at the base angle) */
  hiddenBackCorner: SilhouetteCorner;
};

/**
 * independent oracle for where an item's silhouette corners appear on screen at
 * any camera angle: projects all eight aabb corners and picks the extremes,
 * without any knowledge of how production code chooses corners
 */
export const apparentSilhouette = (
  item: EditorUnionOfAllItemInPlayTypes,
  cameraAngle: Xy,
): ApparentSilhouette => {
  const {
    state: { position },
    aabb,
  } = item;

  const cornersAt = (z: number): Array<SilhouetteCorner> =>
    [
      { x: 0, y: 0, z },
      { x: aabb.x, y: 0, z },
      { x: 0, y: aabb.y, z },
      { x: aabb.x, y: aabb.y, z },
    ].map((offset) => ({
      offset,
      scr: projectWorldXyzToScreenXy(addXyz(position, offset), cameraAngle),
    }));

  const pick = (
    corners: Array<SilhouetteCorner>,
    better: (a: SilhouetteCorner, b: SilhouetteCorner) => boolean,
  ): SilhouetteCorner =>
    corners.reduce((best, corner) => (better(corner, best) ? corner : best));

  const base = cornersAt(0);
  const top = cornersAt(aabb.z);

  return {
    bottomCentre: pick(base, (a, b) => a.scr.y > b.scr.y).scr,
    hiddenBackCorner: pick(base, (a, b) => a.scr.y < b.scr.y),
    topLeft: pick(top, (a, b) => a.scr.x < b.scr.x).scr,
    topRight: pick(top, (a, b) => a.scr.x > b.scr.x).scr,
    topCorner: pick(top, (a, b) => a.scr.y < b.scr.y),
    leftBase: pick(base, (a, b) => a.scr.x < b.scr.x).scr,
    rightBase: pick(base, (a, b) => a.scr.x > b.scr.x).scr,
  };
};
