import type {
  AnyItemInPlay,
  FallingItemTypes,
  ItemInPlay,
  UnknownItemInPlay,
} from "@/model/ItemInPlay";
import { isItemType, isPlayableItem, itemFalls } from "@/model/ItemInPlay";
import type { Xyz } from "@/utils/vectors";
import {
  addXyz,
  doorAlongAxis,
  originXyz,
  scaleXyz,
  subXyz,
  xyzEqual,
} from "@/utils/vectors";
import { collision1toMany } from "../collision/aabbCollision";
import type { GameState } from "../gameState/GameState";
import { currentRoom } from "../gameState/GameState";
import type { PlanetName } from "@/sprites/planets";
import { iterate } from "@/utils/iterate";
import { objectValues } from "iter-tools";
import { handlePlayerTouchingPickup } from "./handleTouch/handlePlayerTouchingPickup";
import { handlePlayerTouchingPortal } from "./handleTouch/handlePlayerTouchingPortal";
import { isPushable, isSolid } from "./isSolid";
import { mtv, slidingCollisionWithManyItems } from "./slidingCollision";
import { characterFadeInOrOutDuration } from "../render/animationTimings";

/*
 * colliding with doors is a special case - since they are so narrow, the playable character
 * slides sideways into their opening, to make them easier to walk through
 */
export const slideOnDoorFrames = (
  xyzDelta: Xyz,
  obstructions: Iterable<UnknownItemInPlay>,
): Xyz => {
  // it is only possible (at least in normal level design) to collide with one door at once
  // so take the first one:
  const doorFrame = iterate(obstructions).find(isItemType("doorFrame"));

  if (doorFrame === undefined) {
    return originXyz;
  }

  const {
    config: { direction, nearness },
  } = doorFrame;

  const axis = doorAlongAxis(direction);

  return nearness === "far" ?
      {
        x: axis === "x" ? -Math.abs(xyzDelta.y) : 0,
        y: axis === "y" ? -Math.abs(xyzDelta.x) : 0,
        z: 0,
      }
    : {
        x: axis === "x" ? Math.abs(xyzDelta.y) : 0,
        y: axis === "y" ? Math.abs(xyzDelta.x) : 0,
        z: 0,
      };
};

const pushVector = (
  pusher: AnyItemInPlay,
  pusherTargetLocation: Xyz,
  pushee: AnyItemInPlay,
) => {
  const m = mtv(
    pushee.state.position,
    pushee.aabb,
    pusherTargetLocation,
    pusher.aabb,
  );
  // split the difference - the pushee moves half that far, and the pusher moves less by the same amount
  return scaleXyz(m, 0.5);
};

const findStandingOn = <RoomId extends string>(
  subjectItem: ItemInPlay<FallingItemTypes, PlanetName, RoomId>,
  targetPosition: Xyz,
  solidObstacles: Array<UnknownItemInPlay<RoomId>>,
): UnknownItemInPlay<RoomId> | null => {
  // check if still standing on the same item as before:
  const stillStandingOnTheSame = solidObstacles.find(
    (obstacle) => obstacle === subjectItem.state.standingOn,
  );
  if (stillStandingOnTheSame) {
    return stillStandingOnTheSame;
  }

  // TODO: sort by the items with the most overlap so that if we stand on two
  // simultaneously, it's the one we're most obviously on that we are standing on
  for (const obstacle of solidObstacles) {
    // check if we've standing on the collided item:
    const standingOn =
      mtv(
        targetPosition,
        subjectItem.aabb,
        obstacle.state.position,
        obstacle.aabb,
      ).z > 0;
    if (standingOn) {
      return obstacle;
    }
  }
  return null;
};

/**
 * @param subjectItem the item that is wanting to move
 * @param xyzDelta
 */
export const moveItem = <RoomId extends string>(
  subjectItem: UnknownItemInPlay<RoomId>,
  xyzDeltaPartial: Partial<Xyz>,
  gameState: GameState<RoomId>,
  /**
   * if given, the item that pushed this item to cause it to move. This is primarily a protection
   * against infinite loops where two items get stuck pushing each other
   */
  pusher?: AnyItemInPlay,
) => {
  let xyzDelta = addXyz(originXyz, xyzDeltaPartial);

  if (xyzEqual(xyzDelta, originXyz)) {
    return;
  }

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

  const solidObstacles = collisions.filter((collidedWith) =>
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

    if (deadly?.length > 0) {
      subjectItem.state.action = "death";
      subjectItem.state.expires =
        gameState.gameTime + characterFadeInOrOutDuration;
      return;
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

  if (itemFalls(subjectItem)) {
    subjectItem.state.standingOn = findStandingOn(
      subjectItem,
      targetPosition,
      solidObstacles,
    );
  }

  for (const obstacle of solidObstacles) {
    if (isPushable(obstacle) && pusher !== obstacle) {
      const pV = pushVector(subjectItem, targetPosition, obstacle);
      xyzDelta = subXyz(xyzDelta, pV);
      moveItem<RoomId>(obstacle, pV, gameState, subjectItem);
    }
  }

  // right now the only reaction to collisions is to not move as far. This could also be pushing the item,
  // or dying (if it is deadly), and maybe some others

  const correctedPosition1 = slidingCollisionWithManyItems(
    subjectItem,
    xyzDelta,
    solidObstacles,
  );

  const correctedPosition2 =
    // only players slide on doors:
    isPlayableItem(subjectItem) ?
      addXyz(correctedPosition1, slideOnDoorFrames(xyzDelta, solidObstacles))
    : correctedPosition1;

  if (!xyzEqual(correctedPosition2, previousPosition)) {
    subjectItem.state.position = correctedPosition2;
    subjectItem.renderPositionDirty = true;
  }
};
