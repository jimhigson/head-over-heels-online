import { type ItemTypeUnion } from "../../../_generated/types/ItemInPlayUnion";
import { nextItemIdInItems } from "../../../model/inPlaceMutators/nextItemId";
import {
  type ItemInPlay,
  type UnionOfAllItemInPlayTypes,
} from "../../../model/ItemInPlay";
import { type LightBeamEnd } from "../../../model/ItemStateMap";
import { typePrefix } from "../../../model/json/typePrefix";
import { reflectedFacingVector } from "../../../model/MirrorOrientation";
import {
  type Progression,
  roomSpatialIndexKey,
  type RoomState,
} from "../../../model/RoomState";
import { emptyArray } from "../../../utils/empty";
import {
  type AxisXy,
  dominantAxisXy,
  perpendicularAxisXy,
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

/** fallback for rooms with an open edge in the beam's path - nothing real is this long */
const maxBeamLengthPx = blockSizePx.x * 128;

const idPrefix = typePrefix.lightBeam;

/**
 * one straight run of one block-row of a beam, as a world-space box. Tall lamps
 * cast one ray per block of their height, each run becoming its own
 * single-height beam item
 */
type BeamSegment = {
  direction: Xyz;
  /** min corner of the segment's box */
  position: Xyz;
  aabb: Xyz;
  end: LightBeamEnd;
};

const beamSegmentAabb = (axis: AxisXy, lengthPx: number): Xyz => ({
  x: axis === "x" ? lengthPx : lightBeamCrossSectionPx,
  y: axis === "y" ? lengthPx : lightBeamCrossSectionPx,
  z: lightBeamCrossSectionPx,
});

// the beam's cross-section is a constant 8px wide on each perpendicular axis,
// so a band is just its min coordinate - its max is min + lightBeamCrossSectionPx

const bandsOverlapStrictly = (
  itemMin: number,
  itemMax: number,
  bandMin: number,
) => itemMax > bandMin && itemMin < bandMin + lightBeamCrossSectionPx;

/** does the item's extent fully contain the beam's cross-section at bandMin? */
const containsBand = (itemMin: number, itemMax: number, bandMin: number) =>
  itemMin <= bandMin && itemMax >= bandMin + lightBeamCrossSectionPx;

/** which side a beam turns to when its direction reflects to another */
const turnOfReflection = (
  from: Xyz,
  to: Xyz,
): "reflect-left" | "reflect-right" =>
  from.x * to.y - from.y * to.x > 0 ? "reflect-left" : "reflect-right";

/**
 * walk one block-row of the beam from the lamp, reflecting at mirrors,
 * stopping at the first solid item in its path. Yields one segment per
 * straight run. Each row is cast independently, so a tall beam that only
 * partially hits a mirror splits: the covered rows reflect while the rest
 * carry straight on
 */
const castBeamRowSegments = <RoomId extends string, RoomItemId extends string>(
  lamp: ItemInPlay<"lamp", RoomId, RoomItemId>,
  room: RoomState<RoomId, RoomItemId>,
  zMin: number,
  /** straight runs found are appended here, avoiding a per-row generator */
  segments: BeamSegment[],
): void => {
  // the item the beam is currently being emitted from - initially the lamp,
  // then each mirror it reflects off:
  let source: UnionOfAllItemInPlayTypes<RoomId, RoomItemId> = lamp;
  let { direction } = lamp.config;

  // no explicit cycle guard is needed: reflection is reversible, so a lamp's
  // beam traces a simple, non-repeating path of (mirror, direction) states and
  // always ends at a solid blocker (including the opaque source lamp, should
  // mirrors route the beam back into it) or the room's edge
  for (;;) {
    const axis = dominantAxisXy(direction);
    const perpAxis = perpendicularAxisXy(axis);
    const sign = direction[axis];

    const sourcePosition: Xyz = source.state.position;
    // the 8px cross-section, centred in the source's perpendicular footprint:
    const perpMin: number =
      sourcePosition[perpAxis] +
      (source.aabb[perpAxis] - lightBeamCrossSectionPx) / 2;

    const startPlane =
      sign > 0 ?
        sourcePosition[axis] + source.aabb[axis]
      : sourcePosition[axis];

    let nearestBlocker:
      undefined | UnionOfAllItemInPlayTypes<RoomId, RoomItemId>;
    let nearestDistance = maxBeamLengthPx;

    /*
     * march the spatial index cells along the beam's thin path, near-to-far,
     * instead of scanning every item in the room. The per-item narrow phase
     * below is identical to a full scan - the index only shrinks the candidate
     * set to the cells the beam could pass through, so the result is the same.
     */
    const index = room[roomSpatialIndexKey];
    const extent = index.getOccupiedCuboidCellExtent();
    if (extent !== undefined) {
      const cellSize = blockSizePx.x * 2; // SpatialIndex cell width/depth
      const toAlongCell = (world: number) =>
        axis === "x" ? index.worldXToCellX(world) : index.worldYToCellY(world);
      const toPerpCell = (world: number) =>
        perpAxis === "x" ?
          index.worldXToCellX(world)
        : index.worldYToCellY(world);

      // the 8px-wide beam straddles at most two perpendicular cells:
      const perpCellLo = toPerpCell(perpMin);
      const perpCellHi = toPerpCell(perpMin + lightBeamCrossSectionPx);

      const startCell = toAlongCell(startPlane);
      // bound the walk: never past the index's occupied extent on this axis,
      // nor past the hard max-length cap (the open, wall-less edge fallback):
      const capCell = toAlongCell(startPlane + sign * maxBeamLengthPx);
      const extentCell =
        sign > 0 ?
          axis === "x" ?
            extent.maxCellX
          : extent.maxCellY
        : axis === "x" ? extent.minCellX
        : extent.minCellY;
      const stopCell =
        sign > 0 ?
          Math.min(capCell, extentCell)
        : Math.max(capCell, extentCell);

      for (
        let alongCell = startCell;
        sign > 0 ? alongCell <= stopCell : alongCell >= stopCell;
        alongCell += sign
      ) {
        // cells are visited in increasing along-distance, so once a cell's
        // near edge is beyond the nearest hit so far, nothing closer remains:
        const cellNearAlong =
          sign > 0 ? alongCell * cellSize : (alongCell + 1) * cellSize;
        const cellNearDistance =
          sign > 0 ? cellNearAlong - startPlane : startPlane - cellNearAlong;
        if (cellNearDistance > nearestDistance) {
          break;
        }

        for (let perpCell = perpCellLo; perpCell <= perpCellHi; perpCell++) {
          const bin = index.getCellByCellCoords(
            axis === "x" ? alongCell : perpCell,
            axis === "x" ? perpCell : alongCell,
          );
          if (bin === undefined) {
            continue;
          }
          // an item spanning several cells is re-tested in each; harmless
          // (nearestDistance is a min), so no dedup is needed:
          for (const item of bin) {
            // the current emitter (the lamp on the first segment, a mirror
            // after that) cannot block its own outgoing beam; but the lamp
            // must still stop a beam that loops back into it through mirrors,
            // so only `source` - not the lamp itself - is excluded here:
            if (item === source || isLightBeam(item)) {
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
                perpMin,
              ) ||
              !bandsOverlapStrictly(
                itemPosition.z,
                itemPosition.z + item.aabb.z,
                zMin,
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
        }
      }
    }

    /*
     * decide before yielding whether the beam reflects onwards here: only
     * off a mirror that covers this row's full cross-section (a
     * partially-aligned mirror just blocks like any other solid item)
     */
    const reflectingMirror =
      (
        nearestBlocker !== undefined &&
        isMirror(nearestBlocker) &&
        containsBand(
          nearestBlocker.state.position[perpAxis],
          nearestBlocker.state.position[perpAxis] +
            nearestBlocker.aabb[perpAxis],
          perpMin,
        ) &&
        containsBand(
          nearestBlocker.state.position.z,
          nearestBlocker.state.position.z + nearestBlocker.aabb.z,
          zMin,
        )
      ) ?
        nearestBlocker
      : undefined;

    const reflectedDirection =
      reflectingMirror === undefined ? undefined : (
        reflectedFacingVector(reflectingMirror.state.orientation, direction)
      );

    if (nearestDistance > 0) {
      const along = sign > 0 ? startPlane : startPlane - nearestDistance;
      segments.push({
        direction,
        position: {
          x: axis === "x" ? along : perpMin,
          y: axis === "y" ? along : perpMin,
          z: zMin,
        },
        aabb: beamSegmentAabb(axis, nearestDistance),
        end:
          reflectedDirection !== undefined ?
            turnOfReflection(direction, reflectedDirection)
            // the energy dissipates where the beam hits something, but
            // not at the open-edge fallback length:
          : nearestBlocker !== undefined ? "terminus"
          : "none",
      });
    }

    if (reflectingMirror === undefined || reflectedDirection === undefined) {
      // this row of the beam has reached its destination and stops:
      return;
    }

    direction = reflectedDirection;
    source = reflectingMirror;
  }
};

/**
 * cast beams for every z of the lamp
 */
export const castBeamSegments = <
  RoomId extends string,
  RoomItemId extends string,
>(
  lamp: ItemInPlay<"lamp", RoomId, RoomItemId>,
  room: RoomState<RoomId, RoomItemId>,
): BeamSegment[] => {
  const lampTimesZ = lamp.config.times?.z ?? 1;

  const segments: BeamSegment[] = [];
  for (let row = 0; row < lampTimesZ; row++) {
    const rowBaseZ = lamp.state.position.z + row * blockSizePx.z;
    const zMin = rowBaseZ + lightBeamLiftPx;
    castBeamRowSegments(lamp, room, zMin, segments);
  }

  return segments;
};

/**
 * (re)casts a lamp's light beam, syncing the room's lightBeam items to the
 * beam's current path. Runs every tick so the beam reacts immediately to
 * items moving into/out of its path and to mirrors flipping.
 *
 * The lamp's segments form a linked list - `lamp.state.firstBeam` to the head,
 * each segment's `state.next` to the one after. The reconcile walks that chain,
 * reusing its items in order for the new segments (cheaper than recreating, and
 * each reused item keeps its renderer/animation), creating items only where the
 * path has grown, and deleting the leftover tail by following its links. Beam
 * ids are arbitrary now the chain connects them, so new ones come from the
 * shared item-id generator rather than a deterministic per-lamp scheme.
 */
export const tickLampLightBeams = <
  RoomId extends string,
  RoomItemId extends string,
>(
  lamp: ItemInPlay<"lamp", RoomId, RoomItemId>,
  room: RoomState<RoomId, RoomItemId>,
): undefined => {
  const segments =
    lamp.state.activated ?
      castBeamSegments(lamp, room)
    : (emptyArray as BeamSegment[]);

  let cursorId = lamp.state.firstBeam;
  let previousBeam: ItemTypeUnion<"lightBeam", RoomId, RoomItemId> | undefined;

  for (const segment of segments) {
    const existing = cursorId === undefined ? undefined : room.items[cursorId];

    let beam: ItemTypeUnion<"lightBeam", RoomId, RoomItemId>;
    if (existing !== undefined && isLightBeam(existing)) {
      // reuse the next item in the chain, mutating it to this segment:
      cursorId = existing.state.next;
      existing.config.direction = segment.direction;
      existing.state.end = segment.end;
      const aabbChanged = !xyzEqual(existing.aabb, segment.aabb);
      if (aabbChanged) {
        existing.aabb = segment.aabb;
      }
      if (!xyzEqual(existing.state.position, segment.position)) {
        updateItemPosition(room, existing, segment.position);
      } else if (aabbChanged) {
        // a beam growing in its positive direction lengthens without its
        // min corner moving
        existing.state.movedOrResizedOnProgression =
          ++room.progression as Progression;
        room[roomSpatialIndexKey].updateItemSpatialIndex(existing);
      }
      beam = existing;
    } else {
      // the existing chain has run out - create a new segment. Earlier creates
      // this tick are already in room.items, so each gets a distinct id:
      cursorId = undefined;
      const id = nextItemIdInItems(room.items, idPrefix);
      beam = {
        type: "lightBeam",
        // light beams never animate, so the hash (only used to de-synchronise animations) is irrelevant:
        hash: 0,
        id,
        config: {
          direction: segment.direction,
          sourceItemId: lamp.id,
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
        item: beam as UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
      });
    }

    if (previousBeam === undefined) {
      lamp.state.firstBeam = beam.id;
    } else {
      previousBeam.state.next = beam.id;
    }
    previousBeam = beam;
  }

  // cut the new chain off after its last segment (or empty it):
  if (previousBeam === undefined) {
    lamp.state.firstBeam = undefined;
  } else {
    previousBeam.state.next = undefined;
  }

  // delete the leftover tail of the old (longer) chain by following its links:
  while (cursorId !== undefined) {
    const staleBeam = room.items[cursorId];
    if (staleBeam === undefined) {
      break;
    }
    cursorId = isLightBeam(staleBeam) ? staleBeam.state.next : undefined;
    deleteItemFromRoom({ room, item: staleBeam });
  }
};
