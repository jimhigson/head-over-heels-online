import type { ItemInPlay, UnknownItemInPlay } from "@/model/ItemInPlay";
import { isItemType, isPlayableItem } from "@/model/ItemInPlay";
import type { Xyz } from "@/utils/vectors";
import { addXyz, doorAlongAxis, originXyz, xyzEqual } from "@/utils/vectors";
import { collision1toMany } from "../collision/aabbCollision";
import type { GameState } from "../gameState/GameState";
import { currentRoom } from "../gameState/GameState";
import type { PlanetName } from "@/sprites/planets";
import { iterate } from "@/utils/iterate";
import { objectValues } from "iter-tools";
import { handlePlayerTouchingPickup } from "./mechanics/handleTouch/handlePlayerTouchingPickup";
import { handlePlayerTouchingPortal } from "./mechanics/handleTouch/handlePlayerTouchingPortal";
import { isSolid } from "./isSolid";
import { slidingCollisionWithManyItems } from "./slidingCollision";

/*
 * colliding with doors is a special case - since they are so narrow, the playable character
 * slides sideways into their opening, to make them easier to walk through
 */
export const slideOnDoors = (
  xyzDelta: Xyz,
  collisionsWithSolids: Iterable<UnknownItemInPlay>,
): Xyz => {
  // it is only possible (at least in normal level design) to collide with one door at once
  // so take the first one:
  const doorPart = iterate(collisionsWithSolids).find(
    isItemType("doorFar", "doorNear"),
  );

  if (doorPart === undefined) {
    return originXyz;
  }

  const {
    type: typeC,
    config: { direction },
  } = doorPart;

  const axis = doorAlongAxis(direction);

  return (
    typeC === "doorFar" ?
      {
        x: axis === "x" ? -Math.abs(xyzDelta.y) : 0,
        y: axis === "y" ? -Math.abs(xyzDelta.x) : 0,
        z: 0,
      }
    : typeC === "doorNear" ?
      {
        x: axis === "x" ? Math.abs(xyzDelta.y) : 0,
        y: axis === "y" ? Math.abs(xyzDelta.x) : 0,
        z: 0,
      }
    : originXyz
  );
};

/**
 * @param subjectItem the item that is wanting to move
 * @param xyzDelta
 */
export const moveItem = <RoomId extends string>(
  subjectItem: UnknownItemInPlay<RoomId>,
  xyzDeltaPartial: Partial<Xyz>,
  gameState: GameState<RoomId>,
) => {
  const xyzDelta = addXyz(originXyz, xyzDeltaPartial);
  const room = currentRoom(gameState);
  const {
    state: { position: previousPosition },
  } = subjectItem;
  const targetPosition = addXyz(previousPosition, xyzDelta);

  const collisions = collision1toMany(
    {
      aabb: subjectItem.aabb,
      state: { position: targetPosition },
      id: subjectItem.id,
    },
    objectValues(room.items),
  );

  const solidItems = collisions.filter((collidedWith) =>
    isSolid(subjectItem, collidedWith, gameState),
  );

  if (isPlayableItem(subjectItem)) {
    const {
      portal = [],
      deadly = [],
      pickup = [],
    } = Object.groupBy(collisions, (colItem) => colItem.onTouch) as {
      portal: Array<ItemInPlay<"portal", PlanetName, RoomId>>;
      deadly: Array<
        | ItemInPlay<"baddie", PlanetName, RoomId>
        | ItemInPlay<"deadly-block", PlanetName, RoomId>
      >;
      pickup: Array<ItemInPlay<"pickup", PlanetName, RoomId>>;
    };

    const firstPortal = portal.at(0);
    if (
      firstPortal !== undefined &&
      // don't use portals if autowalking - otherwise would flip right back to the previous room
      subjectItem.state.autoWalkDistance === 0
    ) {
      handlePlayerTouchingPortal(gameState, subjectItem, firstPortal);
      return;
    }

    if (deadly?.length) {
      console.log("LOSE a life");
    }
    for (const p of pickup) {
      handlePlayerTouchingPickup(gameState, subjectItem, p);
    }
  }

  if (isItemType("pickup")(subjectItem)) {
    const player = collisions.find(isPlayableItem);
    if (player !== undefined) {
      handlePlayerTouchingPickup(gameState, player, subjectItem);
    }
  }

  // right now the only reaction to collisions is to not move as far. This could also be pushing the item,
  // or dying (if it is deadly), and maybe some others

  const correctedPosition1 = slidingCollisionWithManyItems(
    subjectItem,
    targetPosition,
    solidItems,
  );

  const correctedPosition2 =
    // only players slide on doors:
    isPlayableItem(subjectItem) ?
      addXyz(correctedPosition1, slideOnDoors(xyzDelta, solidItems))
    : correctedPosition1;

  if (!xyzEqual(correctedPosition2, previousPosition)) {
    subjectItem.state.position = correctedPosition2;
    subjectItem.renderPositionDirty = true;
  }
};
