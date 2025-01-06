import { type ItemInPlay } from "@/model/ItemInPlay";
import { unitMechanicalResult, type MechanicResult } from "../MechanicResult";
import type { GameState } from "@/game/gameState/GameState";
import type { PlanetName } from "@/sprites/planets";
import { moveSpeedPixPerMs } from "../mechanicsConstants";
import { unitVectors } from "@/utils/vectors/unitVectors";
import type { Direction8Xy } from "@/utils/vectors/vectors";
import {
  directions4Xy,
  directions8Xy,
  directionsXyDiagonal,
  distanceXySquared,
  originXy,
  originXyz,
  perpendicularAxisXy,
  scaleXyz,
  subXy,
  unitVector,
  xyEqual,
  xyzEqual,
} from "@/utils/vectors/vectors";
import { mtv } from "../slidingCollision";
import type { RoomState } from "@/model/modelTypes";
import type { ItemTouchEventByItemType } from "../handleTouch/ItemTouchEvent";
import { isSolid } from "../itemPredicates";

const randomFromArray = <T>(array: Readonly<T[]> | T[]): T =>
  array[Math.floor(Math.random() * array.length)];

const notWalking = Object.freeze({
  movementType: "vel",
  vels: { walking: originXyz },
} as const satisfies MechanicResult<"baddie", string>);

export const rushTowardPlayerXy4 = <RoomId extends string>(
  {
    state: {
      position,
      vels: { walking },
    },
  }: ItemInPlay<"baddie", PlanetName, RoomId>,
  room: RoomState<PlanetName, RoomId>,
  _gameState: GameState<RoomId>,
  _deltaMS: number,
): MechanicResult<"baddie", RoomId> => {
  const speed = moveSpeedPixPerMs["headless-base"];

  if (!xyEqual(walking, originXy)) {
    return {
      movementType: "steady",
    };
  }

  const {
    items: { head: headInRoom, heels: heelsInRoom },
  } = room;

  for (const player of [headInRoom, heelsInRoom]) {
    if (player === undefined) continue;

    const vectorXyToPlayer = subXy(player.state.position, position);

    if (Math.abs(vectorXyToPlayer.y) < 2) {
      return {
        movementType: "vel",
        vels: {
          walking: {
            x: vectorXyToPlayer.x > 0 ? speed : -speed,
            y: 0,
            z: 0,
          },
        },
      };
    }

    if (Math.abs(vectorXyToPlayer.x) < 2) {
      return {
        movementType: "vel",
        vels: {
          walking: {
            x: 0,
            y: vectorXyToPlayer.y > 0 ? speed : -speed,
            z: 0,
          },
        },
      };
    }
  }
  return {
    movementType: "steady",
  };
};

export const walkOnShortestAisTowardsPlayer = <RoomId extends string>(
  { state: { position, standingOn } }: ItemInPlay<"baddie", PlanetName, RoomId>,
  room: RoomState<PlanetName, RoomId>,
  _gameState: GameState<RoomId>,
  _deltaMS: number,
): MechanicResult<"baddie", RoomId> => {
  const speed = moveSpeedPixPerMs.cyberman;

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

  const walkVelocity = {
    ...originXyz,
    [travelAxis]: vectorXyToClosestPlayer[travelAxis] > 0 ? speed : -speed,
  };
  return {
    movementType: "vel",
    vels: {
      walking: walkVelocity,
    },
    stateDelta: {
      facing: unitVector(walkVelocity),
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
  directions: Readonly<Array<Direction8Xy>>,
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
        moveSpeedPixPerMs[which],
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
  baddieItem: ItemInPlay<"baddie", PlanetName, RoomId>,
  _room: RoomState<PlanetName, RoomId>,
  _gameState: GameState<RoomId>,
  _deltaMS: number,
): MechanicResult<"baddie", RoomId> => {
  const {
    state: {
      facing,
      vels: { walking },
      standingOn,
    },
    config,
  } = baddieItem;

  if (standingOn === null) {
    return notWalking;
  }

  return xyEqual(walking, originXy) ?
      {
        movementType: "vel",
        vels: {
          walking:
            // ie, we might have fallen and landed and not be walking:
            scaleXyz(facing, moveSpeedPixPerMs[config.which]),
        },
      }
    : unitMechanicalResult;
};

const handleBaddieTouchingItemByTurningClockwise = <RoomId extends string>(
  {
    movingItem: baddieItem,
    touchedItem: {
      state: { position: touchedItemPosition },
      aabb: touchedItemAabb,
    },
    deltaMS,
  }: ItemTouchEventByItemType<RoomId, "baddie">,
  { touchDurationBeforeTurn }: { touchDurationBeforeTurn: number },
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

  baddieItem.state.durationOfTouch += deltaMS;

  if (baddieItem.state.durationOfTouch < touchDurationBeforeTurn) return;

  const m = mtv(position, aabb, touchedItemPosition, touchedItemAabb);

  // purely vertical touches don't change direction:
  if (m.x === 0 && m.y === 0) return;

  const newWalking = {
    x: -walking.y,
    y: walking.x,
    z: 0,
  };

  baddieItem.state.vels.walking = newWalking;
  baddieItem.state.facing = unitVector(newWalking);
  baddieItem.state.durationOfTouch = 0;
};

const handleBaddieTouchingItemByStopping = <RoomId extends string>({
  movingItem: baddieItem,
}: ItemTouchEventByItemType<RoomId, "baddie">) => {
  baddieItem.state.vels.walking = originXyz;
};

const handleBaddieTouchingItemByTurningToOppositeDirection = <
  RoomId extends string,
>(
  {
    movingItem: baddieItem,
    touchedItem: {
      state: { position: touchedItemPosition },
      aabb: touchedItemAabb,
    },
    deltaMS,
  }: ItemTouchEventByItemType<RoomId, "baddie">,
  { touchDurationBeforeTurn }: { touchDurationBeforeTurn: number },
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

  baddieItem.state.durationOfTouch += deltaMS;

  if (baddieItem.state.durationOfTouch < touchDurationBeforeTurn) return;

  const m = mtv(position, aabb, touchedItemPosition, touchedItemAabb);

  // purely vertical touches don't change direction:
  if (m.x === 0 && m.y === 0) return;

  const newWalking = {
    x: m.x === 0 ? walking.x : -walking.x,
    y: m.y === 0 ? walking.y : -walking.y,
    z: 0,
  };

  baddieItem.state.vels.walking = newWalking;
  baddieItem.state.facing = unitVector(newWalking);
  baddieItem.state.durationOfTouch = 0;
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
  if (!item.state.activated || item.state.busyLickingDoughnutsOffFace)
    return notWalking;

  switch (item.config.movement) {
    case "patrol-randomly-diagonal": {
      return randomlyChangeDirection(
        item,
        room,
        gameState,
        deltaMS,
        directionsXyDiagonal,
      );
    }
    case "patrol-randomly-xy8": {
      return randomlyChangeDirection(
        item,
        room,
        gameState,
        deltaMS,
        directions8Xy,
      );
    }
    case "patrol-randomly-xy4": {
      return randomlyChangeDirection(
        item,
        room,
        gameState,
        deltaMS,
        directions4Xy,
      );
    }
    case "towards-tripped-on-axis-xy4":
      return rushTowardPlayerXy4(item, room, gameState, deltaMS);
    case "towards-on-shortest-axis-xy4":
      return walkOnShortestAisTowardsPlayer(item, room, gameState, deltaMS);

    case "back-forth":
    case "clockwise": {
      return keepWalkingInSameDirection(item, room, gameState, deltaMS);
    }
    case "unmoving":
      return notWalking;

    case "towards-when-in-square-xy8":
      // TODO!
      return notWalking;

    default:
      item.config satisfies never;
      throw new Error("this should be unreachable");
  }
};

export const handleBaddieTouchingItem = <RoomId extends string>(
  e: ItemTouchEventByItemType<RoomId, "baddie">,
) => {
  const { movingItem: baddieItem, touchedItem } = e;

  //eg, baddies shouldn't change direction on touching a stopAutowalk item:
  if (!isSolid(touchedItem)) return;

  switch (baddieItem.config.movement) {
    case "back-forth":
    case "patrol-randomly-diagonal":
    case "patrol-randomly-xy4":
    case "patrol-randomly-xy8": {
      handleBaddieTouchingItemByTurningToOppositeDirection(e, {
        touchDurationBeforeTurn: 150,
      });
      break;
    }
    case "towards-tripped-on-axis-xy4":
      handleBaddieTouchingItemByStopping(e);
      break;
    case "clockwise":
      handleBaddieTouchingItemByTurningClockwise(e, {
        touchDurationBeforeTurn: 150,
      });
      break;
    case "towards-on-shortest-axis-xy4":
    case "towards-when-in-square-xy8":
    case "unmoving":
      // these don't need anything on touching:
      return;

    default:
      baddieItem.config satisfies never;
      throw new Error("this should be unreachable");
  }
};
