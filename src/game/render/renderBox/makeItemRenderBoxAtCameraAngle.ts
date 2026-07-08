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
  type DirectionXy4,
  doorAlongAxis,
  originXyz,
  perpendicularAxisXy,
  tangentAxis,
  type Xy,
  type Xyz,
} from "../../../utils/vectors/vectors";
import { multiplyBoundingBox } from "../../collision/multiplyBoundingBox";
import {
  blockSizePx,
  wallRenderHeight,
} from "../../physics/mechanicsConstants";

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
    direction: DirectionXy4;
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
  const { direction } = item.config as { direction: DirectionXy4 };
  if (isWallDirectionHiddenAtAngle(direction, cameraAngle)) {
    return undefined;
  }
  const alongAxis = doorAlongAxis(direction);
  const thicknessAxis = tangentAxis(direction);

  const renderAabb: Xyz = {
    ...originXyz,
    [alongAxis]: item.aabb[alongAxis],
    z: wallRenderHeight,
  };
  // the wall draws on its room-side face: towards/right walls' boxes extend
  // negative (out of the room), so the drawn plane is a wall-thickness from
  // the position:
  const outIsNegative = direction === "towards" || direction === "right";
  const renderAabbOffset: Aabb | undefined =
    outIsNegative ?
      {
        ...originXyz,
        [thicknessAxis]:
          wallThicknessBlocks *
          (thicknessAxis === "x" ? blockSizePx.x : blockSizePx.y),
      }
    : undefined;
  return { renderAabb, renderAabbOffset };
};

const doorFrameRenderBox = (
  item: RenderBoxableItem,
  cameraAngle: Xy,
): RenderBox => {
  const { direction, part } = item.config as {
    direction: DirectionXy4;
    part: "far" | "near" | "top";
  };
  const alongAxis = doorAlongAxis(direction);
  const throughAxis = perpendicularAxisXy(alongAxis);
  const outIsNegative = direction === "towards" || direction === "right";
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
    direction: DirectionXy4;
    onFloorEdge: boolean;
    height: number;
  };
  if (!isDoorPartInHiddenWall(config, cameraAngle)) {
    // legs in a visible wall render within their physical box:
    return undefined;
  }
  const alongAxis = doorAlongAxis(config.direction);
  const throughAxis = perpendicularAxisXy(alongAxis);
  const outIsNegative =
    config.direction === "towards" || config.direction === "right";

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
    doorExpandedSides: Array<DirectionXy4>;
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
  // the apparently-far ("back") sides draw a hair more so the floor meets the
  // back wall. Apparently-near (hidden-wall) sides draw flush to the physical
  // edge, so they stay exactly on the pixel grid:
  for (const side of doorExpandedSides) {
    if (isWallDirectionHiddenAtAngle(side, cameraAngle)) {
      continue;
    }
    const axis = perpendicularAxisXy(doorAlongAxis(side));
    renderAabb[axis] += floorBackEdgeOverhangPx;
    if (side === "towards" || side === "right") {
      // a min-coordinate side seen as the back edge grows outward from the
      // near corner, so shift the render box's near corner out too:
      renderAabbOffset[axis] -= floorBackEdgeOverhangPx;
    }
  }

  return { renderAabb, renderAabbOffset };
};

/**
 * generic items take their angle-invariant overdraw box from the spritesheet
 * meta's itemRenderExtents table (no entry = draws true to the physical
 * aabb), stretched over any `times` repetition. The render box's near corner
 * sits on the aabb's near corner (where the footprint sprite is anchored), so
 * on camera-reversed axes the box offsets back by its overdraw. The table's
 * base offset is added on top.
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
  const { times } = (item.config ?? {}) as { times?: Partial<Xyz> };
  const renderAabb =
    times === undefined ?
      extent.renderAabb
    : multiplyBoundingBox(extent.renderAabb, times);
  const base = extent.baseRenderAabbOffset ?? originXyz;
  const { aabb } = item;
  return {
    renderAabb,
    renderAabbOffset: {
      x:
        base.x +
        (cameraAngle.x + cameraAngle.y < 0 ? aabb.x - renderAabb.x : 0),
      y:
        base.y +
        (cameraAngle.x - cameraAngle.y < 0 ? aabb.y - renderAabb.y : 0),
      z: base.z,
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
