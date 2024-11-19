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
import { isSolid } from "./isSolid";
import { mtv, sortObstaclesAboutVector } from "./slidingCollision";
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

/**
 * @param subjectItem the item that is wanting to move
 * @param xyzDelta
 */
export const moveItem = <RoomId extends string>(
  subjectItem: ItemInPlay<FallingItemTypes>,
  xyzDeltaPartial: Partial<Xyz>,
  gameState: GameState<RoomId>,
  /**
   * if given, the item that pushed this item to cause it to move. This is primarily a protection
   * against infinite loops where two items get stuck pushing each other
   */
  pusher?: AnyItemInPlay,
) => {
  const xyzDelta = addXyz(originXyz, xyzDeltaPartial);

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

  if (isPlayableItem(subjectItem)) {
    const {
      portal = [],
      deadly = [],
      pickup = [],
    } = Object.groupBy(collisions, (item) => {
      switch (item.type) {
        case "baddie":
        case "deadly-block":
          return "deadly";
        case "floor":
          return item.config.deadly ? "deadly" : "other";
        case "portal":
          return "portal";
        case "pickup":
          return "pickup";
      }
      return "other"; // no special behaviour for player colliding with
    }) as {
      portal: Array<ItemInPlay<"portal", PlanetName, RoomId>>;
      deadly: Array<
        | ItemInPlay<"baddie", PlanetName, RoomId>
        | ItemInPlay<"deadly-block", PlanetName, RoomId>
        | ItemInPlay<"floor", PlanetName, RoomId>
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

  const solidObstacles = collisions.filter((collidedWith) =>
    isSolid(subjectItem, collidedWith, gameState),
  );

  // standing on is sticky, so if we are still in contact with the item we were previously
  // standing on, that relationship survives to the next generation, even if there's now
  // an item we could be better said to be standing on
  // TODO: this isn't quite right - it should check if they are overlapping or adjacent
  subjectItem.state.standingOn =
    solidObstacles.find((obs) => obs === subjectItem.state.standingOn) || null;

  const sortedObstacles = sortObstaclesAboutVector(xyzDelta, solidObstacles);

  /**
   * as we apply sliding collision, we need to do some other checks - this is
   * because these checks can only really be done once earlier obstacles have had a
   * chance to change the xyxDelta via sliding. Eg, if falling, we need to be able to
   * unsnag before we look for the standingOn, or we will declare ourselves as standing
   * on intermediate blocks while sliding down a tower of blocks
   */
  const correctedPosition1 = iterate(sortedObstacles).reduce<Xyz>(
    (posAc: Xyz, obstacle) => {
      let m = mtv(
        posAc,
        subjectItem.aabb,
        obstacle.state.position,
        obstacle.aabb,
      );

      if (itemFalls(obstacle) && obstacle !== pusher) {
        // split the difference - the pushee moves half that far, and the pusher moves less by the same amount
        const pushVector = scaleXyz(m, -0.5);

        moveItem<RoomId>(obstacle, pushVector, gameState, subjectItem);
        // scale back how far we want to push:
        posAc = subXyz(posAc, pushVector);
        // recalculate the mtv for the new pushee position, in case it couldn't move that far and we have to squash against it now:
        m = mtv(
          posAc,
          subjectItem.aabb,
          obstacle.state.position,
          obstacle.aabb,
        );
      }

      if (subjectItem.state.standingOn === null && m.z > 0) {
        subjectItem.state.standingOn = obstacle;
      }

      return addXyz(posAc, m);
    },
    // original target position:
    addXyz(previousPosition, xyzDelta),
  );

  const correctedPosition2 =
    // only players slide on doors:
    isPlayableItem(subjectItem) ?
      addXyz(correctedPosition1, slideOnDoorFrames(xyzDelta, solidObstacles))
    : correctedPosition1;

  if (!xyzEqual(correctedPosition2, previousPosition)) {
    subjectItem.state.position = correctedPosition2;
  }
};
