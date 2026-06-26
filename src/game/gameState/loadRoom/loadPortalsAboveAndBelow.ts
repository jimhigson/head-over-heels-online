import { defaultItemProperties } from "../../../model/defaultItemProperties";
import {
  type ItemInPlay,
  type ItemInPlayBeforeHash,
} from "../../../model/ItemInPlay";
import { isWholeRoomSubRooms, type RoomJson } from "../../../model/RoomJson";
import {
  roomItemsIterable,
  type RoomStateItems,
} from "../../../model/RoomState";
import { withPositionHash } from "../../../model/withPositionHash";
import { objectEntriesIter } from "../../../utils/entries";
import { unitVectors } from "../../../utils/vectors/unitVectors";
import { addXyz } from "../../../utils/vectors/vectors";
import { isFloor } from "../../physics/itemPredicates";
import {
  blockSizePx,
  defaultRoomHeightBlocks,
} from "../../physics/mechanicsConstants";
import { nonRenderingItemFixedZIndex } from "../../render/sortZ/fixedZIndexes";
import { defaultBaseState } from "./itemDefaultStates";

const portalThickness = blockSizePx.z;
/* the z of the top of the portal to below */
const portalToRoomBelowTop = -blockSizePx.z;

type FloorFootprint = {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
};

/**
 * combine all the floors of the room into one big, rectangular footprint to
 * cover the whole room:
 */
const floorsCombinedFootprint = <
  RoomId extends string,
  RoomItemId extends string,
>(
  roomStateItems: RoomStateItems<RoomId, RoomItemId>,
) => {
  const limits = roomItemsIterable(roomStateItems)
    .filter(isFloor)
    .reduce(
      (
        acc,
        {
          config: {
            naturalFootprint: {
              position: { x, y },
              aabb: { x: width, y: depth },
            },
          },
        },
      ) => {
        const xEnd = x + width;
        const yEnd = y + depth;

        return {
          minX: Math.min(acc.minX, x),
          maxX: Math.max(acc.maxX, xEnd),
          minY: Math.min(acc.minY, y),
          maxY: Math.max(acc.maxY, yEnd),
        };
      },
      {
        minX: Infinity,
        maxX: -Infinity,
        minY: Infinity,
        maxY: -Infinity,
      },
    );

  if (limits.minX > limits.maxY) {
    // nothing found
    return undefined;
  }
  return limits;
};

export function* loadPortalsAboveAndBelow<
  RoomId extends string,
  RoomItemId extends string,
>(
  roomJson: RoomJson<RoomId, RoomItemId>,
  roomStateItems: RoomStateItems<RoomId, RoomItemId>,
): Generator<
  | ItemInPlay<"floor", RoomId, RoomItemId>
  | ItemInPlay<"portal", RoomId, RoomItemId>
> {
  const floorFootprint = floorsCombinedFootprint(roomStateItems);
  if (floorFootprint === undefined) {
    return;
  }

  const subRooms = roomJson.meta?.subRooms;
  if (subRooms === undefined) {
    return;
  }

  // the fine-coordinate footprint that sizes a portal: the whole-room floor
  // footprint for the undivided ('*') form, or the sub-room's cell otherwise
  const footprintForSubRoom = (subRoomId: string): FloorFootprint => {
    if (subRoomId === "*" || isWholeRoomSubRooms(subRooms)) {
      return floorFootprint;
    }
    const { from, to } = subRooms[subRoomId].physicalPosition;
    return {
      minX: from.x * blockSizePx.x,
      maxX: to.x * blockSizePx.x,
      minY: from.y * blockSizePx.y,
      maxY: to.y * blockSizePx.y,
    };
  };

  const belowPortal = (
    subRoomId: string,
    { minX, maxX, minY, maxY }: FloorFootprint,
    toRoom: RoomId,
  ) =>
    ({
      ...defaultItemProperties,
      ...{
        type: "portal",
        id: `portal/toRoomBelow/${subRoomId}` as RoomItemId,
        fixedZIndex: nonRenderingItemFixedZIndex,
        config: {
          toRoom,
          // floor and ceiling relative points are the middle of the portal, this fixes
          // falling into dissimilar-sized rooms, ie penitentiary21 falling into penitentiary20
          relativePoint: {
            x: (maxX - minX) / 2,
            y: (maxY - minY) / 2,
            // relative point one block high - this makes the player spawn on top of blocks when
            // transitioning to the room above, since a lot of rooms need you to appear *on* something,
            // and given these rooms usually have 'none' floors it probably isn't the floor
            z: portalThickness + blockSizePx.z,
          },
          direction: unitVectors["down"],
        },
        aabb: { x: maxX - minX, y: maxY - minY, z: portalThickness },
        state: {
          ...defaultBaseState(),
          position: {
            x: minX,
            y: minY,
            z: portalToRoomBelowTop - portalThickness,
          },
        },
        renders: false,
      },
    }) satisfies ItemInPlayBeforeHash<ItemInPlay<"portal", RoomId, RoomItemId>>;

  const abovePortal = (
    subRoomId: string,
    { minX, maxX, minY, maxY }: FloorFootprint,
    toRoom: RoomId,
  ) =>
    ({
      ...defaultItemProperties,
      ...{
        type: "portal",
        id: `portal/toRoomAbove/${subRoomId}` as RoomItemId,
        fixedZIndex: nonRenderingItemFixedZIndex,
        config: {
          toRoom,
          relativePoint: {
            x: (maxX - minX) / 2,
            y: (maxY - minY) / 2,
            z: -blockSizePx.z,
          },
          direction: unitVectors["up"],
        },
        aabb: { x: maxX - minX, y: maxY - minY, z: portalThickness },
        state: {
          ...defaultBaseState(),
          position: addXyz(
            { x: minX, y: minY },
            { z: blockSizePx.z * (roomJson.height ?? defaultRoomHeightBlocks) },
          ),
        },
      },
    }) satisfies ItemInPlayBeforeHash<ItemInPlay<"portal", RoomId, RoomItemId>>;

  const linkHolders: Array<
    [string, { above?: { room: RoomId }; below?: { room: RoomId } }]
  > =
    isWholeRoomSubRooms(subRooms) ?
      [["*", subRooms["*"]]]
    : [...objectEntriesIter(subRooms)];

  for (const [subRoomId, { above, below }] of linkHolders) {
    const footprint = footprintForSubRoom(subRoomId);
    if (below !== undefined) {
      yield withPositionHash(belowPortal(subRoomId, footprint, below.room));
    }
    if (above !== undefined) {
      yield withPositionHash(abovePortal(subRoomId, footprint, above.room));
    }
  }
}
