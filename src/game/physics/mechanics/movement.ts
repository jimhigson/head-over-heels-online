import type { Mechanic } from "../MechanicResult";
import { unitMechanicalResult, type MechanicResult } from "../MechanicResult";
import { moveSpeedPixPerMs } from "../mechanicsConstants";
import { mtv } from "../mtv";
import type { ItemTouchEvent } from "../handleTouch/ItemTouchEvent";
import { isMonster, isSolid } from "../itemPredicates";
import type { ItemInPlay } from "../../../model/ItemInPlay";
import { blockSizePx } from "../../../sprites/spritePivots";
import { unitVectors } from "../../../utils/vectors/unitVectors";
import type { Xyz, DirectionXy8 } from "../../../utils/vectors/vectors";
import {
  originXyz,
  xyEqual,
  originXy,
  subXy,
  perpendicularAxisXy,
  unitVector,
  scaleXyz,
  lengthXy,
  xyzEqual,
  directionsXyDiagonal,
  directionsXy8,
  directionsXy4,
} from "../../../utils/vectors/vectors";
import type { GameState } from "../../gameState/GameState";
import { emptyObject } from "../../../utils/empty";
import { playablesInRoom, type RoomState } from "../../../model/RoomState";
import { findClosestPlayable } from "../../gameState/gameStateSelectors/findClosestPlayable";
import { selectHasAllPlanetCrowns } from "../../../store/selectors";
import { store } from "../../../store/store";
import { objectValues } from "iter-tools";

// either how long it takes after touching an item to turn around, or how long has to
// pass between turning and turning again, depending on the movement pattern
const turnAroundTime = 150;

const randomFromArray = <T>(array: Readonly<T[]> | T[]): T =>
  array[Math.floor(Math.random() * array.length)];

type ItemWithMovement<RoomId extends string, RoomItemId extends string> =
  | ItemInPlay<"monster", RoomId, RoomItemId>
  | ItemInPlay<"movingPlatform", RoomId, RoomItemId>;

const notWalking = Object.freeze({
  movementType: "vel",
  vels: { walking: originXyz },
} as const satisfies MechanicResult<
  "monster",
  string,
  string
> satisfies MechanicResult<"movingPlatform", string, string>);

const speedForItem = (itemWithMovement: ItemWithMovement<string, string>) => {
  if (isMonster(itemWithMovement)) {
    return moveSpeedPixPerMs[itemWithMovement.config.which];
  } else {
    return moveSpeedPixPerMs[itemWithMovement.type];
  }
};

const rushTripThreshold = blockSizePx.w / 2;
const rushTowardPlayerXy4 = <RoomId extends string, RoomItemId extends string>(
  {
    state: {
      position,
      vels: { walking },
    },
  }: ItemWithMovement<RoomId, RoomItemId>,
  room: RoomState<RoomId, RoomItemId>,
  _gameState: GameState<RoomId>,
  _deltaMS: number,
): MechanicResult<"monster", RoomId, RoomItemId> => {
  const speed = moveSpeedPixPerMs["homingBot"];

  if (!xyEqual(walking, originXy)) {
    return {
      movementType: "steady",
    };
  }

  for (const player of objectValues(playablesInRoom(room.items))) {
    if (player === undefined) continue;

    const vectorXyToPlayer = subXy(player.state.position, position);

    if (Math.abs(vectorXyToPlayer.y) < rushTripThreshold) {
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

    if (Math.abs(vectorXyToPlayer.x) < rushTripThreshold) {
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

const walkAlongShortestAxisTowardsPlayer = <
  RoomId extends string,
  RoomItemId extends string,
>(
  itemWithMovement: ItemWithMovement<RoomId, RoomItemId>,
  room: RoomState<RoomId, RoomItemId>,
  _gameState: GameState<RoomId>,
  _deltaMS: number,
): MechanicResult<"monster", RoomId, RoomItemId> => {
  const {
    state: { position, standingOnItemId, timeOfLastDirectionChange, facing },
  } = itemWithMovement;

  if (standingOnItemId === null) {
    return notWalking;
  }

  const closestPlayable = findClosestPlayable(position, room);

  if (closestPlayable === undefined) {
    // no players in this room; stay still - not expecting this in normal play
    return unitMechanicalResult;
  }

  if (timeOfLastDirectionChange + turnAroundTime > room.roomTime) {
    // only walk straight, already turned around recently:
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
    (
      Math.abs(vectorXyToClosestPlayer[axisOfShortestDistance]) >
      blockSizePx.w / 4
    ) ?
      axisOfShortestDistance
    : perpendicularAxisXy(axisOfShortestDistance);

  const speed = speedForItem(itemWithMovement);

  const walkVelocity = {
    ...originXyz,
    [travelAxis]: vectorXyToClosestPlayer[travelAxis] > 0 ? speed : -speed,
  };
  const newFacing = unitVector(walkVelocity);

  const changedDirection = !xyEqual(newFacing, facing);
  return {
    movementType: "vel",
    vels: {
      walking: walkVelocity,
    },
    stateDelta: {
      facing: newFacing,
      ...(changedDirection ?
        { timeOfLastDirectionChange: room.roomTime }
      : emptyObject),
    },
  };
};

const walkTowardIfInSquare = <RoomId extends string, RoomItemId extends string>(
  itemWithMovement: ItemWithMovement<RoomId, RoomItemId>,
  room: RoomState<RoomId, RoomItemId>,
  _gameState: GameState<RoomId>,
  _deltaMS: number,
  // set to true to run away instead of towards player
  opposite: boolean = false,
): MechanicResult<"monster", RoomId, RoomItemId> => {
  const {
    state: { position: monsterPosition, standingOnItemId },
  } = itemWithMovement;

  if (standingOnItemId === null) {
    return notWalking;
  }

  const closestPlayable = findClosestPlayable(monsterPosition, room);

  if (closestPlayable === undefined) {
    // no players in this room; stay still - not expecting this in normal play
    return notWalking;
  }

  const playablePosition = closestPlayable.state.position;

  const radius = blockSizePx.w * 3;
  const inSquare =
    monsterPosition.x > playablePosition.x - radius &&
    monsterPosition.x < playablePosition.x + radius &&
    monsterPosition.y > playablePosition.y - radius &&
    monsterPosition.y < playablePosition.y + radius;

  if (!inSquare) {
    // outside of a 5x5 square around the monster
    return notWalking;
  }

  const vectorXyToClosestPlayer = subXy(
    closestPlayable?.state.position,
    monsterPosition,
  );

  const monsterSpeed = speedForItem(itemWithMovement);
  // we allow movement here in arbitrary directions, not in the xy8 directions.
  // in the original game, the monster would move at their normal speed in axis-aligned directions, and sqrt(2) times that
  // in diagonal directions [ie, moving in vector (0,2) or (2,2) pixels in (x,y)]. Instead, I always move the average of these
  // two to keep the end result about the same without any strange-looking speed changes:
  const adjustCoefficient = (1 + Math.sqrt(2)) / 2;
  const adjustedSpeed = monsterSpeed * adjustCoefficient;

  const walkVelocity = scaleXyz(
    { ...vectorXyToClosestPlayer, z: 0 },
    (adjustedSpeed / lengthXy(vectorXyToClosestPlayer)) * (opposite ? -1 : 1),
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

const randomlyChangeDirection = <
  RoomId extends string,
  RoomItemId extends string,
>(
  itemWithMovement: ItemWithMovement<RoomId, RoomItemId>,
  _room: RoomState<RoomId, RoomItemId>,
  _gameState: GameState<RoomId>,
  deltaMS: number,
  directionNames: Readonly<Array<DirectionXy8>>,
): MechanicResult<"monster", RoomId, RoomItemId> => {
  const {
    state: {
      vels: { walking },
      standingOnItemId,
    },
  } = itemWithMovement;

  if (standingOnItemId === null) {
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

export const keepWalkingInSameDirection = <
  RoomId extends string,
  RoomItemId extends string,
>(
  itemWithMovement: ItemWithMovement<RoomId, RoomItemId>,
  _room: RoomState<RoomId, RoomItemId>,
  _gameState: GameState<RoomId>,
  _deltaMS: number,
): MechanicResult<"monster", RoomId, RoomItemId> => {
  const {
    state: {
      facing,
      vels: { walking },
      standingOnItemId,
    },
  } = itemWithMovement;

  if (standingOnItemId === null) {
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

const turnedVector = (walkVector: Xyz, mtv: Xyz, strategy: TurnStrategy) => {
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

const handleMonsterTouchingItemByTurning = <
  RoomId extends string,
  RoomItemId extends string,
>(
  {
    movingItem: itemWithMovement,
    touchedItem: {
      state: { position: touchedItemPosition },
      aabb: touchedItemAabb,
    },
    deltaMS,
  }: ItemTouchEvent<RoomId, RoomItemId, ItemWithMovement<RoomId, RoomItemId>>,
  turnStrategy: TurnStrategy,
) => {
  const {
    state: {
      position,
      vels: { walking },
      activated,
      facing,
    },
    aabb,
  } = itemWithMovement;

  if (!activated) return;

  itemWithMovement.state.durationOfTouch += deltaMS;

  if (itemWithMovement.state.durationOfTouch < turnAroundTime) return;

  const m = mtv(position, aabb, touchedItemPosition, touchedItemAabb);

  // purely vertical touches don't change direction:
  if (m.x === 0 && m.y === 0) return;

  itemWithMovement.state.vels.walking = turnedVector(walking, m, turnStrategy);
  // calc facing vector separately from walk, since walk can be (0,0,0) - usually if the item
  // is falling:
  itemWithMovement.state.facing = turnedVector(facing, m, turnStrategy);
  itemWithMovement.state.durationOfTouch = 0;
};

const handleMonsterTouchingItemByStopping = <
  RoomId extends string,
  RoomItemId extends string,
>({
  movingItem: itemWithMovement,
  movementVector,
}: ItemTouchEvent<
  RoomId,
  RoomItemId,
  ItemWithMovement<RoomId, RoomItemId>
>) => {
  if (movementVector.z < 0) {
    // don't stop if fell onto the item
    return;
  }

  itemWithMovement.state.vels.walking = originXyz;
};

/**
 * moves an item with the 'movement' config set, by one tick
 */
export const tickMovement: Mechanic<"monster" | "movingPlatform"> = <
  RoomId extends string,
  RoomItemId extends string,
>(
  itemWithMovement: ItemWithMovement<RoomId, RoomItemId>,
  room: RoomState<RoomId, RoomItemId>,
  gameState: GameState<RoomId>,
  deltaMS: number,
): MechanicResult<"monster" | "movingPlatform", RoomId, RoomItemId> => {
  if (
    !itemWithMovement.state.activated === true ||
    (isMonster(itemWithMovement) &&
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
        directionsXy8,
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
      return notWalking;

    case "towards-analogue":
      return walkTowardIfInSquare(itemWithMovement, room, gameState, deltaMS);
    case "towards-analogue-unless-planet-crowns":
      return walkTowardIfInSquare(
        itemWithMovement,
        room,
        gameState,
        deltaMS,
        selectHasAllPlanetCrowns(store.getState()),
      );

    default:
      itemWithMovement.config satisfies never;
      throw new Error("this should be unreachable");
  }
};

export const handleItemWithMovementTouchingItem = <
  RoomId extends string,
  RoomItemId extends string,
>(
  e: ItemTouchEvent<RoomId, RoomItemId, ItemWithMovement<RoomId, RoomItemId>>,
) => {
  const { movingItem: itemWithMovement, touchedItem } = e;

  //eg, monsters shouldn't change direction on touching a stopAutowalk item:
  if (!isSolid(touchedItem, itemWithMovement)) return;

  switch (itemWithMovement.config.movement) {
    case "patrol-randomly-xy4":
      handleMonsterTouchingItemByTurning(e, "perpendicular");
      break;
    case "back-forth":
    case "patrol-randomly-diagonal":
    case "patrol-randomly-xy8":
      handleMonsterTouchingItemByTurning(e, "opposite");
      break;
    case "clockwise":
      handleMonsterTouchingItemByTurning(e, "clockwise");
      break;
    case "towards-tripped-on-axis-xy4":
      handleMonsterTouchingItemByStopping(e);
      break;
    case "towards-on-shortest-axis-xy4":
    case "towards-analogue":
    case "towards-analogue-unless-planet-crowns":
    case "unmoving":
      // these don't need anything on touching:
      return;

    default:
      itemWithMovement.config satisfies never;
      throw new Error("this should be unreachable");
  }
};
