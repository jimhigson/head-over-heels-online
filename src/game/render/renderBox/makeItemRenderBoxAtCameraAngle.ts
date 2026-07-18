import { type ItemInPlayType } from "../../../model/ItemInPlay";
import { isWallDirectionHiddenAtAngle } from "../../../model/json/WallJsonConfig";
import {
  type ItemRenderExtentKey,
  type ItemRenderExtents,
  type SpritesheetMetadata,
} from "../../../sprites/spritesheet/spritesheetData/spritesheetMetaData";
import { axisProjectsReversed } from "../../../utils/vectors/rotateXy";
import {
  type Aabb,
  alongAxisOfDirectionXy,
  dominantAxisXy,
  isNegativeSideXy,
  originXyz,
  perpendicularAxisXy,
  type Xy,
  type Xyz,
} from "../../../utils/vectors/vectors";
import {
  blockSizePx,
  wallFaceHeightPx,
} from "../../physics/mechanicsConstants";

// wall art overflows the top of the nominal face parallelogram: sampling every
// wall tile's opaque pixels, the tallest tops (moonbase coil) reach this far
// above the face top edge. The render box height must cover it or the cuboid
// transition mesh clips the tops. Fractional px are expected - isometric corners
// rarely land on whole pixels. (The box bottom must stay at the wall base, z=0,
// so the z-sort keeps walls resting on - drawn in front of - the floor.)
const wallArtOverflowTopPx = 7.75;

export const wallRenderHeight = wallFaceHeightPx + wallArtOverflowTopPx;

/**
 * a render box for an item at a camera angle: the cuboid the item's sprites
 * draw into, used for draw-ordering (never collisions)
 */
export type RenderBox = {
  renderAabb: Aabb;
  renderAabbOffset: Aabb | undefined;
};

/**
 * per-item render boxes at a single camera angle. `null` means the box was
 * derived and the item deliberately has none (it renders true to its physical
 * aabb - the common case); a missing key means the item is not in the render
 * world, or was queried before the owner (the room renderer) reconciled boxes
 * for the frame - distinguishable from `null` so misses can be treated as the
 * programming errors they are rather than silently falling back to the aabb
 */
export type RenderBoxes<Item> = ReadonlyMap<Item, null | RenderBox>;

/**
 * whether a door (given its baked world-space facts) is in a hidden wall at
 * this camera angle
 */
export const isDoorPartInHiddenWall = (
  {
    direction,
    onFloorEdge,
  }: {
    direction: Xyz;
    onFloorEdge: boolean;
  },
  cameraAngle: Xy,
): boolean =>
  onFloorEdge && isWallDirectionHiddenAtAngle(direction, cameraAngle);

/* door render geometry - must agree with the physical geometry in loadDoor: */
const doorPostHeightPx = blockSizePx.z * 4;
const doorPortalHeight = blockSizePx.z * 2;
const doorPostPhysicalWidthPx = 8;
const doorApparentNearPostWidthPx = 9;
const doorPostWidthInThroughAxisPx = 8;
const doorTunnelLengthPx = blockSizePx.x;

/* floor render geometry - must agree with loadFloor: */
const floorEdgeRenderThicknessPx = 10;
/**
 * the physical doorway expansion is a clean 0.5 block on every expanded side
 * (loadFloor), but the apparently-far ("back") edges are drawn this much extra
 * so the floor meets the back wall pixel-perfectly, matching the original
 * game. Render-only: the physical aabb stays integer-aligned
 */
const floorBackEdgeOverhangBlocks = 0.02;
const floorBackEdgeOverhangPx = floorBackEdgeOverhangBlocks * blockSizePx.x;

/* wall render geometry - must agree with loadWalls: */
const wallThicknessBlocks = 1;

/**
 * the surface makeItemRenderBoxAtCameraAngle needs from an item - purely
 * physical; the drawn overdraw comes from the spritesheet meta, never from
 * item fields
 */
export type RenderBoxableItem = {
  aabb: Aabb;
  type?: ItemInPlayType;
  // the union of config fields the derivation needs; real items narrow by type
  config?: unknown;
};

/**
 * the itemRenderExtents table key for an item: dotted kind ids following the
 * TextureId convention (`block.tower`, `monster.monkey`); the plain type for
 * kinds with a single rendering. The casts are sound because each config's
 * discriminator is drawn from the same union the key type is constructed from
 */
const itemRenderExtentKey = (
  type: ItemInPlayType,
  config: unknown,
): ItemRenderExtentKey => {
  switch (type) {
    case "block":
    case "slidingBlock":
    case "deadlyBlock":
    case "moveableDeadly":
      return `${type}.${(config as { style: string }).style}` as ItemRenderExtentKey;
    case "monster":
    case "sceneryPlayer":
      return `${type}.${(config as { which: string }).which}` as ItemRenderExtentKey;
    case "pickup":
      return `pickup.${(config as { gives: string }).gives}` as ItemRenderExtentKey;
    default:
      return type;
  }
};

const wallRenderBox = (
  item: RenderBoxableItem,
  cameraAngle: Xy,
): RenderBox | undefined => {
  const { direction } = item.config as { direction: Xyz };
  if (isWallDirectionHiddenAtAngle(direction, cameraAngle)) {
    return undefined;
  }
  const alongAxis = alongAxisOfDirectionXy(direction);
  const thicknessAxis = dominantAxisXy(direction);

  const renderAabb: Xyz = {
    ...originXyz,
    [alongAxis]: item.aabb[alongAxis],
    z: wallRenderHeight,
  };
  // the wall draws on its room-side face: towards/right walls' boxes extend
  // negative (out of the room), so the drawn plane is a wall-thickness from
  // the position:
  const outIsNegative = isNegativeSideXy(direction);
  const renderAabbOffset: Aabb | undefined =
    outIsNegative ?
      {
        ...originXyz,
        [thicknessAxis]: wallThicknessBlocks * blockSizePx[thicknessAxis],
      }
    : undefined;
  return { renderAabb, renderAabbOffset };
};

const doorFrameRenderBox = (
  item: RenderBoxableItem,
  cameraAngle: Xy,
): RenderBox => {
  const { direction, part } = item.config as {
    direction: Xyz;
    part: "far" | "near" | "top";
  };
  const alongAxis = alongAxisOfDirectionXy(direction);
  const throughAxis = perpendicularAxisXy(alongAxis);
  const outIsNegative = isNegativeSideXy(direction);
  const alongReversed = axisProjectsReversed(alongAxis, cameraAngle);

  // the tunnel: physical aabbs extend a block out of the room; the drawn box
  // sits at the room end of the tunnel:
  const tunnelOffset: undefined | Xyz =
    outIsNegative ?
      { ...originXyz, [throughAxis]: doorTunnelLengthPx }
    : undefined;

  if (part === "top") {
    const renderAabb: Xyz = {
      ...originXyz,
      [alongAxis]:
        2 * blockSizePx.x -
        doorApparentNearPostWidthPx -
        doorPostPhysicalWidthPx,
      [throughAxis]: doorPostWidthInThroughAxisPx,
      z: doorPostHeightPx - doorPortalHeight,
    };
    // the top's art lines up with the apparently-nearer (9px) post: 1px past the
    // physical gap start on its along axis at every angle (the freeze fixed the
    // post positions, so this offset - which the old model encoded in the top's
    // angle-dependent physical position - is a constant +1 now):
    const renderAabbOffset: Xyz = {
      ...(tunnelOffset ?? originXyz),
      [alongAxis]: 1,
    };
    return { renderAabb, renderAabbOffset };
  }

  // near/far posts: physically both 8px along the wall; the apparently-near
  // one draws 9px, with the 9th pixel extending into the doorway:
  const isApparentlyNear = (part === "near") !== alongReversed;
  const renderAabb: Xyz = {
    ...originXyz,
    [alongAxis]:
      isApparentlyNear ? doorApparentNearPostWidthPx : doorPostPhysicalWidthPx,
    [throughAxis]: doorPostWidthInThroughAxisPx,
    z: doorPostHeightPx,
  };
  // the doorway is on the far ("away"-along) side of the near post and the
  // near side of the far post - the 9th pixel extends toward the doorway,
  // which for the far-part post means back past its own min corner:
  const extendsNegative = isApparentlyNear && part === "far";
  const renderAabbOffset: undefined | Xyz =
    extendsNegative || tunnelOffset !== undefined ?
      {
        ...(tunnelOffset ?? originXyz),
        [alongAxis]: extendsNegative ? -1 : 0,
      }
    : undefined;
  return { renderAabb, renderAabbOffset };
};

const doorLegsRenderBox = (
  item: RenderBoxableItem,
  cameraAngle: Xy,
): RenderBox | undefined => {
  const config = item.config as {
    direction: Xyz;
    onFloorEdge: boolean;
    height: number;
  };
  if (!isDoorPartInHiddenWall(config, cameraAngle)) {
    // legs in a visible wall render within their physical box:
    return undefined;
  }
  const alongAxis = alongAxisOfDirectionXy(config.direction);
  const throughAxis = perpendicularAxisXy(alongAxis);
  const outIsNegative = isNegativeSideXy(config.direction);

  // in a hidden wall the legs draw only the floating threshold:
  const renderAabb: Xyz = {
    ...originXyz,
    [alongAxis]: 2 * blockSizePx.x,
    [throughAxis]: 0.5 * blockSizePx.x,
    z: 0.5 * blockSizePx.z,
  };
  const renderAabbOffset: Xyz = {
    ...originXyz,
    [throughAxis]: outIsNegative ? doorTunnelLengthPx : 0,
    z: (config.height - 0.5) * blockSizePx.z,
  };
  return { renderAabb, renderAabbOffset };
};

const floorRenderBox = (
  item: RenderBoxableItem,
  cameraAngle: Xy,
): RenderBox => {
  const { doorExpandedSides } = item.config as {
    doorExpandedSides: Array<Xyz>;
  };

  const renderAabb: Xyz = {
    x: item.aabb.x,
    y: item.aabb.y,
    z: floorEdgeRenderThicknessPx,
  };
  const renderAabbOffset: Xyz = {
    ...originXyz,
    z: item.aabb.z - floorEdgeRenderThicknessPx,
  };

  // the physical expansion is a clean 0.5 block on every door-expanded side;
  // the world-away/left sides draw a hair (0.02 block) more, matching the
  // original game's floors, which expanded 0.52 through those doors and 0.5
  // through towards/right ones. On a camera-reversed axis that overhung side
  // is the apparently-near one, so the drawn origin moves out to it - the
  // floor's container anchors on this (fractional) origin so the whole drawn
  // floor rounds to the device grid as one, exactly as when the expansion
  // was baked into the loaded (camera-rotated) room model:
  for (const side of doorExpandedSides) {
    if (isNegativeSideXy(side)) {
      continue;
    }
    const axis = perpendicularAxisXy(alongAxisOfDirectionXy(side));
    renderAabb[axis] += floorBackEdgeOverhangPx;
    const axisReversed =
      axis === "x" ?
        cameraAngle.x + cameraAngle.y < 0
      : cameraAngle.x - cameraAngle.y < 0;
    if (axisReversed) {
      renderAabbOffset[axis] -= floorBackEdgeOverhangPx;
    }
  }

  return { renderAabb, renderAabbOffset };
};

/**
 * the world x/y offset from a floor's physical position to its drawn origin -
 * the fractional near corner given by the drawn 0.02-block overhang on
 * camera-reversed axes (see {@link floorRenderBox}). z is always 0: the drawn
 * box's z offset describes the drawn edge thickness, not a position shift.
 * The floor's container, its baked art and its received shadows all take
 * this origin, so they round to the device pixel grid together
 */
export const floorDrawnOriginXyOffset = (
  renderBox: null | RenderBox | undefined,
): Xyz =>
  renderBox?.renderAabbOffset === undefined ?
    originXyz
  : { x: renderBox.renderAabbOffset.x, y: renderBox.renderAabbOffset.y, z: 0 };

/**
 * generic items take their angle-invariant per-face overdraw from the
 * spritesheet meta's itemRenderExtents table (no entry = draws true to the
 * physical aabb; "none" = draws nothing). The render box's near corner sits
 * on the aabb's near corner (where the footprint sprite is anchored), so on
 * camera-reversed axes the box offsets back by its overdraw.
 */
const genericRenderBox = (
  item: RenderBoxableItem,
  cameraAngle: Xy,
  itemRenderExtents: ItemRenderExtents,
): RenderBox | undefined => {
  if (item.type === undefined) {
    return undefined;
  }
  const extent = itemRenderExtents[itemRenderExtentKey(item.type, item.config)];
  if (extent === undefined) {
    return undefined;
  }
  const { aabb } = item;
  const reversedX = cameraAngle.x + cameraAngle.y < 0;
  const reversedY = cameraAngle.x - cameraAngle.y < 0;

  if (extent === "none") {
    // a zero-size box on the aabb's near corner:
    return {
      renderAabb: originXyz,
      renderAabbOffset: {
        x: reversedX ? aabb.x : 0,
        y: reversedY ? aabb.y : 0,
        z: 0,
      },
    };
  }

  const { xNeg = 0, xPos = 0, yNeg = 0, yPos = 0, zNeg = 0, zPos = 0 } = extent;
  // the deltas are margins on the physical box, so `times` repetition needs
  // no special handling - the aabb is already stretched over the repetition:
  const renderAabb: Aabb = {
    x: aabb.x + xNeg + xPos,
    y: aabb.y + yNeg + yPos,
    z: aabb.z + zNeg + zPos,
  };
  return {
    renderAabb,
    renderAabbOffset: {
      x: -xNeg + (reversedX ? aabb.x - renderAabb.x : 0),
      y: -yNeg + (reversedY ? aabb.y - renderAabb.y : 0),
      // 0 - normalises the IEEE -0 that a plain negation gives when zNeg is 0:
      z: 0 - zNeg,
    },
  };
};

/**
 * the cuboid an item's sprites draw into at the given camera angle, for
 * draw-ordering. Undefined means the item renders true to its physical aabb
 * (the common case). Pure: the room model holds nothing angle-dependent, and
 * items carry no render geometry - the structural types (wall, doorFrame,
 * doorLegs, floor) derive inline here and everything else comes from the
 * spritesheet meta's itemRenderExtents table. In-game, the room renderer
 * derives once per (item, angle) into its renderBoxes map rather than calling
 * this at time of use.
 */
export const makeItemRenderBoxAtCameraAngle = (
  item: RenderBoxableItem,
  cameraAngle: Xy,
  spritesheetMeta: SpritesheetMetadata,
): RenderBox | undefined => {
  switch (item.type) {
    case "wall":
      return wallRenderBox(item, cameraAngle);
    case "doorFrame":
      return doorFrameRenderBox(item, cameraAngle);
    case "doorLegs":
      return doorLegsRenderBox(item, cameraAngle);
    case "floor":
      return floorRenderBox(item, cameraAngle);
    default:
      return genericRenderBox(
        item,
        cameraAngle,
        spritesheetMeta.itemRenderExtents,
      );
  }
};
