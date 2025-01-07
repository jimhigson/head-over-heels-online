import { type ItemInPlay } from "@/model/ItemInPlay";
import { unitMechanicalResult, type MechanicResult } from "../MechanicResult";
import type { GameState } from "@/game/gameState/GameState";
import type { PlanetName } from "@/sprites/planets";
import { moveSpeedPixPerMs } from "../mechanicsConstants";
import { unitVectors } from "@/utils/vectors/unitVectors";
import type { DirectionXy8, Xyz } from "@/utils/vectors/vectors";
import {
  directionsXy4,
  directions8Xy,
  directionsXyDiagonal,
  distanceSquaredXy,
  originXy,
  originXyz,
  perpendicularAxisXy,
  scaleXyz,
  subXy,
  unitVector,
  xyEqual,
  xyzEqual,
  lengthXy,
} from "@/utils/vectors/vectors";
import { mtv } from "../slidingCollision";
import type { RoomState, UnknownRoomState } from "@/model/modelTypes";
import type { ItemTouchEvent } from "../handleTouch/ItemTouchEvent";
import { isBaddie, isSolid } from "../itemPredicates";
import { blockSizePx } from "@/sprites/spritePivots";

const randomFromArray = <T>(array: Readonly<T[]> | T[]): T =>
  array[Math.floor(Math.random() * array.length)];

type ItemWithMovement<RoomId extends string> =
  | ItemInPlay<"baddie", PlanetName, RoomId>
  | ItemInPlay<"movableBlock", PlanetName, RoomId>;

const notWalking = Object.freeze({
  movementType: "vel",
  vels: { walking: originXyz },
} as const satisfies MechanicResult<"baddie", string> satisfies MechanicResult<
  "movableBlock",
  string
>);

const speedForItem = (itemWithMovement: ItemWithMovement<string>) => {
  if (isBaddie(itemWithMovement)) {
    return moveSpeedPixPerMs[itemWithMovement.config.which];
  } else {
    return moveSpeedPixPerMs[itemWithMovement.type];
  }
};

const rushTowardPlayerXy4 = <RoomId extends string>(
  {
    state: {
      position,
      vels: { walking },
    },
  }: ItemWithMovement<RoomId>,
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

const findClosestPlayable = (position: Xyz, room: UnknownRoomState) => {
  // find closest player in the room:
  const {
    items: { head: headInRoom, heels: heelsInRoom },
  } = room;

  if (room.items.headOverHeels !== undefined) {
    return room.items.headOverHeels;
  }

  const headDistance =
    headInRoom === undefined ? undefined : (
      distanceSquaredXy(headInRoom.state.position, position)
    );
  const heelsDistance =
    heelsInRoom === undefined ? undefined : (
      distanceSquaredXy(heelsInRoom.state.position, position)
    );

  return (
    headDistance === undefined ? heelsInRoom
    : heelsDistance === undefined ? headInRoom
    : headDistance < heelsDistance ? headInRoom
    : heelsInRoom
  );
};

const walkAlongShortestAxisTowardsPlayer = <RoomId extends string>(
  itemWithMovement: ItemWithMovement<RoomId>,
  room: RoomState<PlanetName, RoomId>,
  _gameState: GameState<RoomId>,
  _deltaMS: number,
): MechanicResult<"baddie", RoomId> => {
  const {
    state: { position, standingOn },
  } = itemWithMovement;

  if (standingOn === null) {
    return notWalking;
  }

  const closestPlayable = findClosestPlayable(position, room);

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

  const speed = speedForItem(itemWithMovement);

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

const walkTowardIfInSquare = <RoomId extends string>(
  itemWithMovement: ItemWithMovement<RoomId>,
  room: RoomState<PlanetName, RoomId>,
  _gameState: GameState<RoomId>,
  _deltaMS: number,
): MechanicResult<"baddie", RoomId> => {
  const {
    state: { position: baddiePosition, standingOn },
  } = itemWithMovement;

  if (standingOn === null) {
    return notWalking;
  }

  const closestPlayable = findClosestPlayable(baddiePosition, room);

  if (closestPlayable === undefined) {
    // no players in this room; stay still - not expecting this in normal play
    return notWalking;
  }

  const playablePosition = closestPlayable.state.position;

  const radius = blockSizePx.w * 3;
  const inSquare =
    baddiePosition.x > playablePosition.x - radius &&
    baddiePosition.x < playablePosition.x + radius &&
    baddiePosition.y > playablePosition.y - radius &&
    baddiePosition.y < playablePosition.y + radius;

  if (!inSquare) {
    // outside of a 5x5 square around the baddie
    return notWalking;
  }

  const vectorXyToClosestPlayer = subXy(
    closestPlayable?.state.position,
    baddiePosition,
  );

  const baddieSpeed = speedForItem(itemWithMovement);
  // we allow movement here in arbitrary directions, not in the xy8 directions.
  // in the original game, the baddie would move at their normal speed in axis-aligned directions, and sqrt(2) times that
  // in diagonal directions [ie, moving in vector (0,2) or (2,2) pixels in (x,y)]. Instead, I always move the average of these
  // two to keep the end result about the same without any strange-looking speed changes:
  const adjustCoefficient = (1 + Math.sqrt(2)) / 2;
  const adjustedSpeed = baddieSpeed * adjustCoefficient;

  const walkVelocity = scaleXyz(
    { ...vectorXyToClosestPlayer, z: 0 },
    adjustedSpeed / lengthXy(vectorXyToClosestPlayer),
  );

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

const randomlyChangeDirection = <RoomId extends string>(
  itemWithMovement: ItemWithMovement<RoomId>,
  _room: RoomState<PlanetName, RoomId>,
  _gameState: GameState<RoomId>,
  deltaMS: number,
  directionNames: Readonly<Array<DirectionXy8>>,
): MechanicResult<"baddie", RoomId> => {
  const {
    state: {
      vels: { walking },
      standingOn,
    },
  } = itemWithMovement;

  if (standingOn === null) {
    return notWalking;
  }

  const produceNewWalk =
    xyzEqual(walking, originXyz) || Math.random() < deltaMS / 1000;

  if (!produceNewWalk) {
    return unitMechanicalResult;
  }

  const newDirectionName = randomFromArray(directionNames);

  return {
    movementType: "vel",
    vels: {
      walking: scaleXyz(
        unitVectors[newDirectionName],
        speedForItem(itemWithMovement),
      ),
    },
    stateDelta: {
      facing: unitVectors[newDirectionName],
    },
  };
};

export const keepWalkingInSameDirection = <RoomId extends string>(
  itemWithMovement: ItemWithMovement<RoomId>,
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
  } = itemWithMovement;

  if (standingOn === null) {
    return notWalking;
  }

  return xyEqual(walking, originXy) ?
      {
        movementType: "vel",
        vels: {
          walking:
            // ie, we might have fallen and landed and not be walking:
            scaleXyz(facing, speedForItem(itemWithMovement)),
        },
      }
    : unitMechanicalResult;
};

type TurnStrategy = "opposite" | "perpendicular" | "clockwise";

const turnedWalkVector = (
  walkVector: Xyz,
  mtv: Xyz,
  strategy: TurnStrategy,
) => {
  switch (strategy) {
    case "opposite":
      return {
        x: mtv.x === 0 ? walkVector.x : -walkVector.x,
        y: mtv.y === 0 ? walkVector.y : -walkVector.y,
        z: 0,
      };
    case "clockwise":
      return {
        x: -walkVector.y,
        y: walkVector.x,
        z: 0,
      };
    case "perpendicular": {
      const randomSign = randomFromArray([-1, 1]);
      return {
        x: mtv.x === 0 ? randomSign * walkVector.y : 0,
        y: mtv.y === 0 ? randomSign * walkVector.x : 0,
        z: 0,
      };
    }
  }
};

const handleBaddieTouchingItemByTurning = <RoomId extends string>(
  {
    movingItem: itemWithMovement,
    touchedItem: {
      state: { position: touchedItemPosition },
      aabb: touchedItemAabb,
    },
    deltaMS,
  }: ItemTouchEvent<RoomId, ItemWithMovement<RoomId>>,
  {
    touchDurationBeforeTurn,
    turnStrategy,
  }: { touchDurationBeforeTurn: number; turnStrategy: TurnStrategy },
) => {
  const {
    state: {
      position,
      vels: { walking },
      activated,
    },
    aabb,
  } = itemWithMovement;

  if (!activated) return;

  itemWithMovement.state.durationOfTouch += deltaMS;

  if (itemWithMovement.state.durationOfTouch < touchDurationBeforeTurn) return;

  const m = mtv(position, aabb, touchedItemPosition, touchedItemAabb);

  // purely vertical touches don't change direction:
  if (m.x === 0 && m.y === 0) return;

  const newWalking = turnedWalkVector(walking, m, turnStrategy);

  itemWithMovement.state.vels.walking = newWalking;
  itemWithMovement.state.facing = unitVector(newWalking);
  itemWithMovement.state.durationOfTouch = 0;
};

const handleBaddieTouchingItemByStopping = <RoomId extends string>({
  movingItem: itemWithMovement,
}: ItemTouchEvent<RoomId, ItemWithMovement<RoomId>>) => {
  itemWithMovement.state.vels.walking = originXyz;
};

/**
 * 'ai' is maybe a bit much :-)
 */
export const tickMovement = <RoomId extends string>(
  itemWithMovement: ItemWithMovement<RoomId>,
  room: RoomState<PlanetName, RoomId>,
  gameState: GameState<RoomId>,
  deltaMS: number,
): MechanicResult<"baddie", RoomId> => {
  if (
    !itemWithMovement.state.activated ||
    (isBaddie(itemWithMovement) &&
      itemWithMovement.state.busyLickingDoughnutsOffFace)
  )
    return notWalking;

  switch (itemWithMovement.config.movement) {
    case "patrol-randomly-diagonal": {
      return randomlyChangeDirection(
        itemWithMovement,
        room,
        gameState,
        deltaMS,
        directionsXyDiagonal,
      );
    }
    case "patrol-randomly-xy8": {
      return randomlyChangeDirection(
        itemWithMovement,
        room,
        gameState,
        deltaMS,
        directions8Xy,
      );
    }
    case "patrol-randomly-xy4": {
      return randomlyChangeDirection(
        itemWithMovement,
        room,
        gameState,
        deltaMS,
        directionsXy4,
      );
    }
    case "towards-tripped-on-axis-xy4":
      return rushTowardPlayerXy4(itemWithMovement, room, gameState, deltaMS);
    case "towards-on-shortest-axis-xy4":
      return walkAlongShortestAxisTowardsPlayer(
        itemWithMovement,
        room,
        gameState,
        deltaMS,
      );

    case "back-forth":
    case "clockwise": {
      return keepWalkingInSameDirection(
        itemWithMovement,
        room,
        gameState,
        deltaMS,
      );
    }
    case "unmoving":
    case "free":
      return notWalking;

    case "towards-when-in-square-xy8":
      return walkTowardIfInSquare(itemWithMovement, room, gameState, deltaMS);

    default:
      itemWithMovement.config satisfies never;
      throw new Error("this should be unreachable");
  }
};

export const handleItemWithMovementTouchingItem = <RoomId extends string>(
  e: ItemTouchEvent<RoomId, ItemWithMovement<RoomId>>,
) => {
  const { movingItem: itemWithMovement, touchedItem } = e;

  //eg, baddies shouldn't change direction on touching a stopAutowalk item:
  if (!isSolid(touchedItem)) return;

  switch (itemWithMovement.config.movement) {
    case "patrol-randomly-xy4":
      handleBaddieTouchingItemByTurning(e, {
        touchDurationBeforeTurn: 150,
        turnStrategy: "perpendicular",
      });
      break;
    case "back-forth":
    case "patrol-randomly-diagonal":
    case "patrol-randomly-xy8":
      handleBaddieTouchingItemByTurning(e, {
        touchDurationBeforeTurn: 150,
        turnStrategy: "opposite",
      });
      break;
    case "clockwise":
      handleBaddieTouchingItemByTurning(e, {
        touchDurationBeforeTurn: 150,
        turnStrategy: "clockwise",
      });
      break;
    case "towards-tripped-on-axis-xy4":
      handleBaddieTouchingItemByStopping(e);
      break;
    case "towards-on-shortest-axis-xy4":
    case "towards-when-in-square-xy8":
    case "unmoving":
    case "free":
      // these don't need anything on touching:
      return;

    default:
      itemWithMovement.config satisfies never;
      throw new Error("this should be unreachable");
  }
};
