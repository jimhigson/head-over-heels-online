import { collision1toMany } from "@/game/collision/aabbCollision";
import type {
  ItemInPlay,
  FreeItemTypes,
  UnknownItemInPlay,
} from "@/model/ItemInPlay";
import type { PlanetName } from "@/sprites/planets";
import { iterate } from "@/utils/iterate";
import { addXyz } from "@/utils/vectors/vectors";
import type { RoomPickupsCollected } from "../gameState/GameState";
import { isSolid } from "../physics/isSolid";
import { itemXyOverlapArea } from "./xyRectangleOverlap";

const standingTolerance = 0.001;

export const findStandingOn = <RoomId extends string>(
  standee: ItemInPlay<FreeItemTypes, PlanetName, RoomId>,
  items: Iterable<UnknownItemInPlay<RoomId>>,
  roomPickupsCollected: RoomPickupsCollected,
): Array<UnknownItemInPlay<RoomId>> => {
  const {
    state: {
      position,
      vels: {
        gravity: { z: gravityVelZ },
      },
    },
    aabb,
    id,
  } = standee;

  if (gravityVelZ > 0) {
    // we're jumping and can't be standing on anything while travelling upwards
    return [];
  }

  const positionJustBelowItem = addXyz(position, { z: -standingTolerance });
  const collisions = collision1toMany(
    {
      state: { position: positionJustBelowItem },
      aabb,
      id,
    },
    iterate(items).filter((item) =>
      isSolid(standee, item, roomPickupsCollected),
    ),
  );

  return collisions
    .filter((collisionItem) => {
      const collisionItemTop =
        collisionItem.state.position.z + collisionItem.aabb.z;

      // is the top of the collision item the same z as the bottom of the standee?
      return collisionItemTop - position.z < standingTolerance * 2;
    })
    .sort((collisionA, collisionB) => {
      return (
        itemXyOverlapArea(standee as UnknownItemInPlay<RoomId>, collisionB) -
        itemXyOverlapArea(standee as UnknownItemInPlay<RoomId>, collisionA)
      );
    });
};

/*
export const findStandingOnIds = <RoomId extends string>(
  standee: ItemInPlay<FreeItemTypes, PlanetName, RoomId>,
  items: Iterable<UnknownItemInPlay<RoomId>>,
  roomPickupsCollected: RoomPickupsCollected,
): string[] => {
  return findStandingOn2(standee, items, roomPickupsCollected).map(
    (item) => item.id,
  );
};
*/
