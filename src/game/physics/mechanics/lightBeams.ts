import { type ItemTypeUnion } from "../../../_generated/types/ItemInPlayUnion";
import {
  type ItemInPlay,
  type UnionOfAllItemInPlayTypes,
} from "../../../model/ItemInPlay";
import { type LightBeamEnd } from "../../../model/ItemStateMap";
import { reflectedBeamDirection } from "../../../model/MirrorOrientation";
import {
  roomItemsIterable,
  roomSpatialIndexKey,
  type RoomState,
} from "../../../model/RoomState";
import { unitVectors } from "../../../utils/vectors/unitVectors";
import {
  type AxisXy,
  type DirectionXy4,
  perpendicularAxisXy,
  tangentAxis,
  type Xyz,
  xyzEqual,
} from "../../../utils/vectors/vectors";
import { defaultBaseState } from "../../gameState/loadRoom/itemDefaultStates";
import { addItemToRoom } from "../../gameState/mutators/addItemToRoom";
import { deleteItemFromRoom } from "../../gameState/mutators/deleteItemFromRoom";
import { updateItemPosition } from "../../gameState/mutators/updateItemPosition";
import { isLightBeam, isMirror, isSolid } from "../itemPredicates";
import { blockSizePx } from "../mechanicsConstants";

/** the size of the beam's square cross-section, in world px */
export const lightBeamCrossSectionPx = 8;
/** how far above the bottom of each block of the emitting lamp the beam sits */
export const lightBeamLiftPx = 2;

/** mirrors could be arranged into a loop, so stop reflecting after this many segments */
const maxBeamSegments = 8;
/** fallback for rooms with an open edge in the beam's path - nothing real is this long */
const maxBeamLengthPx = blockSizePx.x * 128;

/**
 * one straight run of one block-row of a beam. Tall lamps cast one ray per
 * block of their height; rays from adjacent rows that follow the same path
 * merge into single (tower-shaped) lightBeam items
 */
type RowSegment = {
  direction: DirectionXy4;
  axis: AxisXy;
  /** the beam box's min corner on the travel axis */
  along: number;
  lengthPx: number;
  perpMin: number;
  /** bottom of this row's 8px-tall band */
  zMin: number;
  end: LightBeamEnd;
};

type BeamSegment = {
  direction: DirectionXy4;
  /** min corner of the segment's box */
  position: Xyz;
  aabb: Xyz;
  end: LightBeamEnd;
  /** how many block-rows tall this segment is */
  timesZ: number;
};

type Band = { min: number; max: number };

const bandsOverlapStrictly = (
  itemMin: number,
  itemMax: number,
  { min, max }: Band,
) => itemMax > min && itemMin < max;

/** does the item's extent fully contain the band on the given axis? */
const containsBand = (itemMin: number, itemMax: number, { min, max }: Band) =>
  itemMin <= min && itemMax >= max;

/** which side a beam turns to when its direction reflects to another */
const turnOfReflection = (
  from: DirectionXy4,
  to: DirectionXy4,
): "reflect-left" | "reflect-right" => {
  const fromVector = unitVectors[from];
  const toVector = unitVectors[to];
  return fromVector.x * toVector.y - fromVector.y * toVector.x > 0 ?
      "reflect-left"
    : "reflect-right";
};

/**
 * walk one block-row of the beam from the lamp, reflecting at mirrors,
 * stopping at the first solid item in its path. Yields one segment per
 * straight run. Each row is cast independently, so a tall beam that only
 * partially hits a mirror splits: the covered rows reflect while the rest
 * carry straight on
 */
function* castBeamRowSegments<RoomId extends string, RoomItemId extends string>(
  lamp: ItemInPlay<"lamp", RoomId, RoomItemId>,
  room: RoomState<RoomId, RoomItemId>,
  zBand: Band,
): Generator<RowSegment> {
  // the item the beam is currently being emitted from - initially the lamp,
  // then each mirror it reflects off:
  let source: UnionOfAllItemInPlayTypes<RoomId, RoomItemId> = lamp;
  let { direction } = lamp.config;

  // guards against reflecting in an infinite loop of mirrors:
  const visited = new Set<string>();

  for (let segmentI = 0; segmentI < maxBeamSegments; segmentI++) {
    const axis = tangentAxis(direction);
    const perpAxis = perpendicularAxisXy(axis);
    const sign = unitVectors[direction][axis];

    const sourcePosition = source.state.position;
    const perpBand: Band = {
      min:
        sourcePosition[perpAxis] +
        (source.aabb[perpAxis] - lightBeamCrossSectionPx) / 2,
      max:
        sourcePosition[perpAxis] +
        (source.aabb[perpAxis] + lightBeamCrossSectionPx) / 2,
    };

    const startPlane =
      sign > 0 ?
        sourcePosition[axis] + source.aabb[axis]
      : sourcePosition[axis];

    let nearestBlocker:
      | undefined
      | UnionOfAllItemInPlayTypes<RoomId, RoomItemId>;
    let nearestDistance = maxBeamLengthPx;

    for (const item of roomItemsIterable(room.items)) {
      if (item === source || item === lamp || isLightBeam(item)) {
        continue;
      }
      // the beam is blocked by anything (generally) solid - including
      // monsters and the players' own bodies:
      if (!isSolid(item)) {
        continue;
      }
      const itemPosition = item.state.position;
      if (
        !bandsOverlapStrictly(
          itemPosition[perpAxis],
          itemPosition[perpAxis] + item.aabb[perpAxis],
          perpBand,
        ) ||
        !bandsOverlapStrictly(
          itemPosition.z,
          itemPosition.z + item.aabb.z,
          zBand,
        )
      ) {
        continue;
      }

      const distance =
        sign > 0 ?
          itemPosition[axis] - startPlane
        : startPlane - (itemPosition[axis] + item.aabb[axis]);

      // items entirely behind the start plane can't block:
      if (
        sign > 0 ?
          itemPosition[axis] + item.aabb[axis] <= startPlane
        : itemPosition[axis] >= startPlane
      ) {
        continue;
      }

      const clampedDistance = Math.max(0, distance);
      if (clampedDistance < nearestDistance) {
        nearestDistance = clampedDistance;
        nearestBlocker = item;
      }
    }

    /*
     * decide before yielding whether the beam reflects onwards here: only
     * off an unvisited mirror that covers this row's full cross-section
     * (a partially-aligned mirror just blocks like any other solid item)
     */
    const reflectingMirror =
      (
        nearestBlocker !== undefined &&
        isMirror(nearestBlocker) &&
        !visited.has(`${nearestBlocker.id}:${direction}`) &&
        containsBand(
          nearestBlocker.state.position[perpAxis],
          nearestBlocker.state.position[perpAxis] +
            nearestBlocker.aabb[perpAxis],
          perpBand,
        ) &&
        containsBand(
          nearestBlocker.state.position.z,
          nearestBlocker.state.position.z + nearestBlocker.aabb.z,
          zBand,
        )
      ) ?
        nearestBlocker
      : undefined;

    const reflectedDirection =
      reflectingMirror === undefined ? undefined : (
        reflectedBeamDirection(reflectingMirror.state.orientation, direction)
      );

    if (nearestDistance > 0) {
      yield {
        direction,
        axis,
        along: sign > 0 ? startPlane : startPlane - nearestDistance,
        lengthPx: nearestDistance,
        perpMin: perpBand.min,
        zMin: zBand.min,
        end:
          reflectedDirection !== undefined ?
            turnOfReflection(direction, reflectedDirection)
            // the energy dissipates where the beam hits something, but
            // not at the open-edge fallback length:
          : nearestBlocker !== undefined ? "terminus"
          : "none",
      };
    }

    if (reflectingMirror === undefined || reflectedDirection === undefined) {
      // this row of the beam has reached its destination and stops:
      return;
    }

    visited.add(`${reflectingMirror.id}:${direction}`);
    direction = reflectedDirection;
    source = reflectingMirror;
  }
}

const beamSegmentAabb = (
  axis: AxisXy,
  lengthPx: number,
  timesZ: number,
): Xyz => ({
  x: axis === "x" ? lengthPx : lightBeamCrossSectionPx,
  y: axis === "y" ? lengthPx : lightBeamCrossSectionPx,
  // like blocks with style "tower", the gaps between a tall beam's rows
  // count as part of the item - one bounding box covers the whole stack:
  z: (timesZ - 1) * blockSizePx.z + lightBeamCrossSectionPx,
});

/**
 * cast every block-row of the lamp's beam, then merge rays from vertically
 * adjacent rows that follow exactly the same path into single tall segments
 */
const castBeamSegments = <RoomId extends string, RoomItemId extends string>(
  lamp: ItemInPlay<"lamp", RoomId, RoomItemId>,
  room: RoomState<RoomId, RoomItemId>,
): BeamSegment[] => {
  const lampTimesZ = lamp.config.times?.z ?? 1;

  const runs = new Map<string, RowSegment[]>();
  for (let row = 0; row < lampTimesZ; row++) {
    const rowBaseZ = lamp.state.position.z + row * blockSizePx.z;
    const zBand: Band = {
      min: rowBaseZ + lightBeamLiftPx,
      max: rowBaseZ + lightBeamLiftPx + lightBeamCrossSectionPx,
    };
    for (const rowSegment of castBeamRowSegments(lamp, room, zBand)) {
      const { direction, along, lengthPx, perpMin, end } = rowSegment;
      const key = `${direction}|${along}|${lengthPx}|${perpMin}|${end}`;
      const run = runs.get(key);
      if (run === undefined) {
        runs.set(key, [rowSegment]);
      } else {
        run.push(rowSegment);
      }
    }
  }

  const segments: BeamSegment[] = [];
  for (const run of runs.values()) {
    // rows are cast bottom-up, so each run's rows are already in z order;
    // split any non-contiguous run into contiguous stacks:
    let stack: RowSegment[] = [];
    const flushStack = () => {
      if (stack.length === 0) {
        return;
      }
      const [{ direction, axis, along, lengthPx, perpMin, zMin, end }] = stack;
      segments.push({
        direction,
        position: {
          x: axis === "x" ? along : perpMin,
          y: axis === "y" ? along : perpMin,
          z: zMin,
        },
        aabb: beamSegmentAabb(axis, lengthPx, stack.length),
        end,
        timesZ: stack.length,
      });
      stack = [];
    };
    for (const rowSegment of run) {
      const [previous] = stack.slice(-1);
      if (
        previous !== undefined &&
        rowSegment.zMin !== previous.zMin + blockSizePx.z
      ) {
        flushStack();
      }
      stack.push(rowSegment);
    }
    flushStack();
  }
  return segments;
};

const beamSegmentId = <RoomItemId extends string>(
  lampId: RoomItemId,
  segmentI: number,
): RoomItemId => `${lampId}/lightBeam/${segmentI}` as RoomItemId;

/**
 * (re)casts a lamp's light beam, syncing the room's lightBeam items to the
 * beam's current path. Runs every tick so the beam reacts immediately to
 * items moving into/out of its path and to mirrors flipping
 */
export const tickLampLightBeams = <
  RoomId extends string,
  RoomItemId extends string,
>(
  lamp: ItemInPlay<"lamp", RoomId, RoomItemId>,
  room: RoomState<RoomId, RoomItemId>,
): undefined => {
  const segments =
    lamp.state.activated ? castBeamSegments(lamp, room) : ([] as BeamSegment[]);

  for (const [segmentI, segment] of segments.entries()) {
    const id = beamSegmentId(lamp.id, segmentI);
    const existing = room.items[id];

    if (existing !== undefined && isLightBeam(existing)) {
      existing.config.direction = segment.direction;
      existing.config.times = { z: segment.timesZ };
      existing.state.end = segment.end;
      const aabbChanged = !xyzEqual(existing.aabb, segment.aabb);
      if (aabbChanged) {
        existing.aabb = segment.aabb;
      }
      if (!xyzEqual(existing.state.position, segment.position)) {
        updateItemPosition(room, existing, segment.position);
      } else if (aabbChanged) {
        // a beam growing in its positive direction lengthens without its
        // min corner moving - the spatial index covers position+aabb, so
        // it must be reindexed for aabb-only changes too, or the index
        // under-covers the beam's new tip:
        room[roomSpatialIndexKey].updateItemSpatialIndex(existing);
      }
    } else {
      const beamItem: ItemTypeUnion<"lightBeam", RoomId, RoomItemId> = {
        type: "lightBeam",
        id,
        config: {
          direction: segment.direction,
          sourceItemId: lamp.id,
          times: { z: segment.timesZ },
        },
        aabb: segment.aabb,
        state: {
          ...defaultBaseState<RoomItemId>(),
          position: segment.position,
          end: segment.end,
        },
        castsShadowWhileStoodOn: false,
      };
      addItemToRoom({
        room,
        item: beamItem as UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
      });
    }
  }

  // remove any now-stale segments from a previous (longer) cast:
  for (let segmentI = segments.length; ; segmentI++) {
    const staleItem = room.items[beamSegmentId(lamp.id, segmentI)];
    if (staleItem === undefined) {
      break;
    }
    deleteItemFromRoom({ room, item: staleItem });
  }
};
