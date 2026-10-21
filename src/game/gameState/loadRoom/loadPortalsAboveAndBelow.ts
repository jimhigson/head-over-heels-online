import { itemBehaviourKey, type ItemInPlay } from "../../../model/ItemInPlay";
import { roomItemsIterable } from "../../../model/roomItemsInPlayIterators";
import { isWholeRoomSubRooms, type RoomJson } from "../../../model/RoomJson";
import { type RoomStateItems } from "../../../model/RoomState";
import { objectEntriesIter } from "../../../utils/entries";
import { unitVectors } from "../../../utils/vectors/unitVectors";
import { addXyz, boxWithSize } from "../../../utils/vectors/vectors";
import { getBehaviourForItemTypeAndConfig } from "../../itemBehaviours/attachBehaviourToItem";
import {
  blockSizePx,
  defaultRoomHeightBlocks,
} from "../../physics/mechanicsConstants";
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
    .filter((item) => item.type === "floor")
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
  ): ItemInPlay<"portal", RoomId, RoomItemId> => {
    const config = {
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
    };
    return {
      ...{
        type: "portal",
        // portals never animate, so the hash (only used to de-synchronise animations) is irrelevant:
        hash: 0,
        id: `portal/toRoomBelow/${subRoomId}` as RoomItemId,
        config,
        [itemBehaviourKey]: getBehaviourForItemTypeAndConfig("portal", config),
        state: {
          ...defaultBaseState(),
          box: {
            x: minX,
            y: minY,
            z: portalToRoomBelowTop - portalThickness,
            xd: maxX - minX,
            yd: maxY - minY,
            zd: portalThickness,
          },
        },
        renders: false,
      },
    };
  };

  const abovePortal = (
    subRoomId: string,
    { minX, maxX, minY, maxY }: FloorFootprint,
    toRoom: RoomId,
  ): ItemInPlay<"portal", RoomId, RoomItemId> => {
    const config = {
      toRoom,
      relativePoint: {
        x: (maxX - minX) / 2,
        y: (maxY - minY) / 2,
        z: -blockSizePx.z,
      },
      direction: unitVectors["up"],
    };
    return {
      ...{
        type: "portal",
        // portals never animate, so the hash (only used to de-synchronise animations) is irrelevant:
        hash: 0,
        id: `portal/toRoomAbove/${subRoomId}` as RoomItemId,
        config,
        [itemBehaviourKey]: getBehaviourForItemTypeAndConfig("portal", config),
        state: {
          ...defaultBaseState(),
          box: boxWithSize(
            addXyz(
              { x: minX, y: minY },
              {
                z: blockSizePx.z * (roomJson.height ?? defaultRoomHeightBlocks),
              },
            ),
            { x: maxX - minX, y: maxY - minY, z: portalThickness },
          ),
        },
      },
    };
  };

  const linkHolders: Array<
    [string, { above?: { room: RoomId }; below?: { room: RoomId } }]
  > =
    isWholeRoomSubRooms(subRooms) ?
      [["*", subRooms["*"]]]
    : [...objectEntriesIter(subRooms)];

  // sub-rooms linking to the same room share one portal, since passing
  // through any of them is the same transition. Keyed by the linked room:
  const belowGroups = new Map<RoomId, PortalGroup>();
  const aboveGroups = new Map<RoomId, PortalGroup>();
  for (const [subRoomId, { above, below }] of linkHolders) {
    const footprint = footprintForSubRoom(subRoomId);
    if (below !== undefined) {
      addToPortalGroup(belowGroups, below.room, subRoomId, footprint);
    }
    if (above !== undefined) {
      addToPortalGroup(aboveGroups, above.room, subRoomId, footprint);
    }
  }

  for (const [toRoom, { firstSubRoomId, footprint }] of belowGroups) {
    yield belowPortal(firstSubRoomId, footprint, toRoom);
  }
  for (const [toRoom, { firstSubRoomId, footprint }] of aboveGroups) {
    yield abovePortal(firstSubRoomId, footprint, toRoom);
  }
}

type PortalGroup = {
  /**
   * names the group's portal, so a room with one link per direction keeps
   * the same portal ids however its links are grouped
   */
  firstSubRoomId: string;
  /**
   * the bounding box of every sub-room in the group - covering any cells
   * between them when they are not a rectangle
   */
  footprint: FloorFootprint;
};

const addToPortalGroup = <RoomId extends string>(
  groups: Map<RoomId, PortalGroup>,
  toRoom: RoomId,
  subRoomId: string,
  { minX, maxX, minY, maxY }: FloorFootprint,
) => {
  const group = groups.getOrInsertComputed(toRoom, () => ({
    firstSubRoomId: subRoomId,
    footprint: { minX, maxX, minY, maxY },
  }));
  const { footprint } = group;
  footprint.minX = Math.min(footprint.minX, minX);
  footprint.maxX = Math.max(footprint.maxX, maxX);
  footprint.minY = Math.min(footprint.minY, minY);
  footprint.maxY = Math.max(footprint.maxY, maxY);
};
