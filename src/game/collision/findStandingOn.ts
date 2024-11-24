import { collision1toMany } from "@/game/collision/aabbCollision";
import type {
  ItemInPlay,
  FallingItemTypes,
  UnknownItemInPlay,
} from "@/model/ItemInPlay";
import type { PlanetName } from "@/sprites/planets";
import { iterate } from "@/utils/iterate";
import { addXyz } from "@/utils/vectors/vectors";
import type { RoomPickupsCollected } from "../gameState/GameState";
import { isSolid } from "../physics/isSolid";

const standingTolerance = 0.001;

export const findStandingOn = <RoomId extends string>(
  standee: ItemInPlay<FallingItemTypes, PlanetName, RoomId>,
  items: Iterable<UnknownItemInPlay<RoomId>>,
  roomPickupsCollected: RoomPickupsCollected,
): UnknownItemInPlay<RoomId> | null => {
  const {
    state: { position, standingOn },
    aabb,
    id,
  } = standee;

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

  // the item we were standing on before is still in the list of things we could potentially be standing on,
  // so preferentially keep it for sticky-standing:
  const potentiallyStandingOn = collisions.filter((collisionItem) => {
    const collisionItemTop =
      collisionItem.state.position.z + collisionItem.aabb.z;

    // is the top of the collision item the same z as the bottom of the standee?
    return collisionItemTop - position.z < standingTolerance * 2;
  });

  // the item we were standing on before is still in the list of things we could potentially be standing on,
  // so preferentially keep it for sticky-standing:
  return (
    (standingOn !== null &&
      potentiallyStandingOn.find((potential) => potential === standingOn)) ||
    // otherwise, the first item we detected we could be stood on:
    potentiallyStandingOn.at(0) ||
    // ... or we're standing on nothing:
    null
  );
};
