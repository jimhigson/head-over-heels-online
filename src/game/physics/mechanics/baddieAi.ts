import type { AnyItemInPlay, ItemInPlayType } from "@/model/ItemInPlay";
import { type ItemInPlay } from "@/model/ItemInPlay";
import { unitMechanicalResult, type MechanicResult } from "../MechanicResult";
import type { GameState } from "@/game/gameState/GameState";
import type { PlanetName } from "@/sprites/planets";
import { walkSpeedPixPerMs } from "../mechanicsConstants";
import { unitVectors } from "@/utils/vectors/unitVectors";
import type { DirectionXy8, Xyz } from "@/utils/vectors/vectors";
import {
  directionsXy8,
  directionsXyDiagonal,
  distanceXySquared,
  originXy,
  originXyz,
  perpendicularAxisXy,
  scaleXyz,
  subXy,
  xyEqual,
  xyzEqual,
} from "@/utils/vectors/vectors";
import { mtv } from "../slidingCollision";
import type { RoomState } from "@/model/modelTypes";
import type { JsonItemConfig } from "@/model/json/JsonItem";
import type { ItemTouchEvent } from "../handleTouch/ItemTouchEvent";

const randomFromArray = <T>(array: Readonly<T[]> | T[]): T =>
  array[Math.floor(Math.random() * array.length)];

const notWalking = Object.freeze({
  movementType: "vel",
  vels: { walking: originXyz },
} as const satisfies MechanicResult<"baddie", string>);

export const initBaddieWalk = (
  config: JsonItemConfig<"baddie", PlanetName, string>,
): Xyz => {
  switch (config.which) {
    case "dalek":
    case "bubble-robot":
      return scaleXyz(unitVectors.towards, walkSpeedPixPerMs[config.which]);
    case "turtle":
    case "american-football-head":
      return scaleXyz(
        unitVectors[config.startDirection],
        walkSpeedPixPerMs[config.which],
      );

    default:
      return originXyz;
  }
};

export const walkTowardsPlayer = <RoomId extends string>(
  { state: { position, standingOn } }: ItemInPlay<"baddie", PlanetName, RoomId>,
  room: RoomState<PlanetName, RoomId>,
  _gameState: GameState<RoomId>,
  _deltaMS: number,
): MechanicResult<"baddie", RoomId> => {
  const speed = walkSpeedPixPerMs.cyberman;

  if (standingOn === null) {
    return notWalking;
  }

  // find closest player in the room:
  const {
    items: { head: headInRoom, heels: heelsInRoom },
  } = room;
  const headDistance =
    headInRoom === undefined ? undefined : (
      distanceXySquared(headInRoom.state.position, position)
    );
  const heelsDistance =
    heelsInRoom === undefined ? undefined : (
      distanceXySquared(heelsInRoom.state.position, position)
    );

  const closestPlayable =
    headDistance === undefined ? heelsInRoom
    : heelsDistance === undefined ? headInRoom
    : headDistance < heelsDistance ? headInRoom
    : heelsInRoom;

  if (closestPlayable === undefined) {
    // no players in this room; stay still - not expecting this in normal play
    return unitMechanicalResult;
  }

  const vectorXyToClosestPlayer = subXy(
    closestPlayable?.state.position,
    position,
  );

  // rule is: go along the axis of shortest distance towards the player, unless it is (close to) zero; then, go along the longer.
  const axisOfShortestDistance =
    Math.abs(vectorXyToClosestPlayer.x) < Math.abs(vectorXyToClosestPlayer.y) ?
      "x"
    : "y";

  const travelAxis =
    Math.abs(vectorXyToClosestPlayer[axisOfShortestDistance]) > 1 ?
      axisOfShortestDistance
    : perpendicularAxisXy(axisOfShortestDistance);

  return {
    movementType: "vel",
    vels: {
      walking: {
        [travelAxis]: vectorXyToClosestPlayer[travelAxis] > 0 ? speed : -speed,
      },
    },
  };
};

export const randomlyChangeDirection = <RoomId extends string>(
  {
    state: {
      vels: { walking },
      standingOn,
    },
    config: { which },
  }: ItemInPlay<"baddie", PlanetName, RoomId>,
  _room: RoomState<PlanetName, RoomId>,
  _gameState: GameState<RoomId>,
  deltaMS: number,
  directions: Readonly<Array<DirectionXy8>>,
): MechanicResult<"baddie", RoomId> => {
  if (standingOn === null) {
    return notWalking;
  }

  const produceNewWalk =
    xyzEqual(walking, originXyz) || Math.random() < deltaMS / 1000;
  const newWalking =
    produceNewWalk ?
      scaleXyz(
        unitVectors[randomFromArray(directions)],
        walkSpeedPixPerMs[which],
      )
    : walking;

  /*walking: accelerateToSpeed({
        acc: 0.000_1,
        crossComponentFade: 0.000_1,
        deltaMS,
        maxSpeed: walkSpeedPixPerMs[which],
        minVelocity: walkSpeedPixPerMs[which] / 4,
        unitD:
          produceNewWalk ?
            unitVectors[randomFromArray(directions)]
          : unitVector(walking),
        vel: walking,
      }),*/

  return {
    movementType: "vel",
    vels: {
      walking: newWalking,
    },
  };
};

export const keepWalkingInSameDirection = <RoomId extends string>(
  {
    state: {
      vels: { walking },
      standingOn,
    },
    config,
  }: ItemInPlay<"baddie", PlanetName, RoomId>,
  _room: RoomState<PlanetName, RoomId>,
  _gameState: GameState<RoomId>,
  _deltaMS: number,
): MechanicResult<"baddie", RoomId> => {
  if (standingOn === null) {
    return notWalking;
  }

  return xyEqual(walking, originXy) ?
      {
        movementType: "vel",
        vels: {
          walking:
            // ie, we might have fallen and landed and not be walking:
            initBaddieWalk(config),
        },
      }
    : unitMechanicalResult;
};

/**
 * 'ai' is maybe a bit much :-)
 */
export const tickBaddie = <RoomId extends string>(
  item: ItemInPlay<"baddie", PlanetName, RoomId>,
  room: RoomState<PlanetName, RoomId>,
  gameState: GameState<RoomId>,
  deltaMS: number,
): MechanicResult<"baddie", RoomId> => {
  if (!item.state.activated) return notWalking;

  switch (item.config.which) {
    case "dalek": {
      // randomly move in 4 diagonals::
      return randomlyChangeDirection(
        item,
        room,
        gameState,
        deltaMS,
        directionsXyDiagonal,
      );
    }
    case "bubble-robot":
    case "helicopter-bug": {
      // randomly move in 8 directions:
      return randomlyChangeDirection(
        item,
        room,
        gameState,
        deltaMS,
        directionsXy8,
      );
    }
    case "cyberman": {
      return walkTowardsPlayer(item, room, gameState, deltaMS);
    }
    case "turtle":
    case "american-football-head": {
      return keepWalkingInSameDirection(item, room, gameState, deltaMS);
    }
    default:
      return notWalking;
  }
};

const handleBaddieTouchingItemByTurningClockwise = <RoomId extends string>(
  baddieItem: ItemInPlay<"baddie", PlanetName, RoomId>,
  {
    state: { position: toucheePosition },
    aabb: toucheeAabb,
  }: AnyItemInPlay<RoomId>,
) => {
  const {
    state: {
      position,
      vels: { walking },
      activated,
    },
    aabb,
  } = baddieItem;

  if (!activated) return;

  const m = mtv(position, aabb, toucheePosition, toucheeAabb);

  // purely vertical touches don't change direction:
  if (m.x === 0 && m.y === 0) return;

  const newWalking = {
    x: -walking.y,
    y: walking.x,
    z: 0,
  };

  baddieItem.state.vels.walking = newWalking;
};

const handleBaddieTouchingItemByTurningToOppositeDirection = <
  RoomId extends string,
>(
  baddieItem: ItemInPlay<"baddie", PlanetName, RoomId>,
  {
    state: { position: toucheePosition },
    aabb: toucheeAabb,
  }: AnyItemInPlay<RoomId>,
) => {
  const {
    state: {
      position,
      vels: { walking },
      activated,
    },
    aabb,
  } = baddieItem;

  if (!activated) return;

  const m = mtv(position, aabb, toucheePosition, toucheeAabb);

  // purely vertical touches don't change direction:
  if (m.x === 0 && m.y === 0) return;

  const newWalking = {
    x: m.x === 0 ? walking.x : -walking.x,
    y: m.y === 0 ? walking.y : -walking.y,
    z: 0,
  };

  baddieItem.state.vels.walking = newWalking;
};

export const handleBaddieTouchingItem = <RoomId extends string>({
  movingItem: baddieItem,
  touchedItem: otherItem,
}: ItemTouchEvent<RoomId, "baddie", ItemInPlayType>) => {
  switch (baddieItem.config.which) {
    case "dalek":
    case "helicopter-bug":
    case "bubble-robot":
    case "american-football-head": {
      handleBaddieTouchingItemByTurningToOppositeDirection(
        baddieItem,
        otherItem,
      );
      break;
    }
    case "turtle":
      handleBaddieTouchingItemByTurningClockwise(baddieItem, otherItem);
  }
  return false;
};
