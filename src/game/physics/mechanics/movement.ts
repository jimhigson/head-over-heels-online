import { type ItemInPlay } from "../../../model/ItemInPlay";
import { playablesInRoom, type RoomState } from "../../../model/RoomState";
import { selectHasAllPlanetCrowns } from "../../../store/slices/gameMenus/gameMenusSelectors";
import { store } from "../../../store/store";
import { emptyObject } from "../../../utils/empty";
import { valuesIter } from "../../../utils/entries";
import { nonZero } from "../../../utils/epsilon";
import { hashNumberToNumber0to1 } from "../../../utils/maths/hashing";
import { smoothstep } from "../../../utils/maths/maths";
import {
  unitVectors,
  unitVectorsXy8Octants,
} from "../../../utils/vectors/unitVectors";
import {
  areInSameDirection,
  directionsXy4,
  directionsXy8,
  directionsXyDiagonal,
  type DirectionXy8,
  lengthXy,
  nonZeroClosestDirectionIndexXy4,
  originXy,
  originXyz,
  perpendicularAxisXy,
  scaleXyz,
  subXy,
  unitVector,
  xyEqual,
  xyzEqual,
} from "../../../utils/vectors/vectors";
import { type GameState } from "../../gameState/GameState";
import { findClosestPlayable } from "../../gameState/gameStateSelectors/findClosestPlayable";
import { type ItemTouchEvent } from "../handleTouch/ItemTouchEvent";
import { isMonster, isSolid } from "../itemPredicates";
import {
  type Mechanic,
  type MechanicResult,
  unitMechanicalResult,
} from "../MechanicResult";
import { blockSizePx, moveSpeedPixPerMs } from "../mechanicsConstants";
import { mtv } from "../mtv";
import { speedForItem } from "./speedForItem";
import { turnedVector, type TurnStrategy } from "./turnedVector";

// either how long it takes after touching an item to turn around, or how long has to
// pass between turning and turning again, depending on the movement pattern
const turnAroundTime = 150;

export type ItemWithMovement<RoomId extends string, RoomItemId extends string> =
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

const rushTripThreshold = blockSizePx.x / 2;
const rushTowardPlayerXy4 = <RoomId extends string, RoomItemId extends string>(
  {
    state: {
      box,
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

  for (const player of valuesIter(playablesInRoom(room.items))) {
    if (player === undefined) {
      continue;
    }

    const vectorXyToPlayer = subXy(player.state.box, box);

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

/**
 * turn towards the player, while staying still - creepy, and doesn't impact gameplay in any way
 */
const turnTowardsPlayer = <RoomId extends string, RoomItemId extends string>(
  itemWithMovement: ItemWithMovement<RoomId, RoomItemId>,
  room: RoomState<RoomId, RoomItemId>,
  _gameState: GameState<RoomId>,
  _deltaMS: number,
): MechanicResult<"monster", RoomId, RoomItemId> => {
  const {
    state: { box, facing },
  } = itemWithMovement;

  const closestPlayable = findClosestPlayable(box, room);

  if (closestPlayable === undefined) {
    // no players in this room; stay still - not expecting this in normal play
    return unitMechanicalResult;
  }

  const vectorXyToClosestPlayer = subXy(closestPlayable?.state.box, box);

  const newFacing =
    unitVectorsXy8Octants[
      nonZeroClosestDirectionIndexXy4(
        vectorXyToClosestPlayer.x,
        vectorXyToClosestPlayer.y,
      )
    ];

  const changedDirection = !xyEqual(newFacing, facing);

  if (changedDirection) {
    return {
      movementType: "steady",
      stateDelta: {
        facing: newFacing,
      },
    };
  }
  return unitMechanicalResult;
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
    state: { box, standingOnItemId, timeOfLastDirectionChange, facing },
  } = itemWithMovement;

  if (standingOnItemId === null) {
    return notWalking;
  }

  const closestPlayable = findClosestPlayable(box, room);

  if (closestPlayable === undefined) {
    // no players in this room; stay still - not expecting this in normal play
    return unitMechanicalResult;
  }

  if (timeOfLastDirectionChange + turnAroundTime > room.roomTime) {
    // only walk straight, already turned around recently:
    return unitMechanicalResult;
  }

  const vectorXyToClosestPlayer = subXy(closestPlayable?.state.box, box);

  // rule is: go along the axis of shortest distance towards the player, unless it is (close to) zero; then, go along the longer.
  const axisOfShortestDistance =
    Math.abs(vectorXyToClosestPlayer.x) < Math.abs(vectorXyToClosestPlayer.y) ?
      "x"
    : "y";

  const travelAxis =
    (
      Math.abs(vectorXyToClosestPlayer[axisOfShortestDistance]) >
      blockSizePx.x / 4
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

const walkTowardAnalogueIfInSquare = <
  RoomId extends string,
  RoomItemId extends string,
>(
  itemWithMovement: ItemWithMovement<RoomId, RoomItemId>,
  room: RoomState<RoomId, RoomItemId>,
  _gameState: GameState<RoomId>,
  _deltaMS: number,
  // set to true to run away instead of towards player
  opposite: boolean = false,
): MechanicResult<"monster", RoomId, RoomItemId> => {
  const {
    state: { box: moverBox, standingOnItemId },
  } = itemWithMovement;

  if (standingOnItemId === null) {
    return notWalking;
  }

  const closestPlayable = findClosestPlayable(moverBox, room);

  if (closestPlayable === undefined) {
    // no players in this room; stay still - not expecting this in normal play
    return notWalking;
  }

  const playableBox = closestPlayable.state.box;

  const moverCentreX = moverBox.x + moverBox.xd / 2;
  const moverCentreY = moverBox.y + moverBox.yd / 2;
  const playerCentreX = playableBox.x + playableBox.xd / 2;
  const playerCentreY = playableBox.y + playableBox.yd / 2;

  const maxDistance = blockSizePx.x * 3;
  const minDistance = 2;
  const rampWidth = blockSizePx.x * 0.5;

  const manhattanXy =
    Math.abs(moverCentreX - playerCentreX) +
    Math.abs(moverCentreY - playerCentreY);

  const rangeFactor =
    smoothstep(minDistance, minDistance + rampWidth, manhattanXy) *
    smoothstep(maxDistance, maxDistance - rampWidth, manhattanXy);

  if (rangeFactor === 0) {
    return notWalking;
  }

  const vectorXyToClosestPlayer = subXy(closestPlayable.state.box, moverBox);

  const monsterSpeed = speedForItem(itemWithMovement);
  // we allow movement here in arbitrary directions, not in the xy8 directions.
  // in the original game, the monster would move at their normal speed in axis-aligned directions, and sqrt(2) times that
  // in diagonal directions [ie, moving in vector (0,2) or (2,2) pixels in (x,y)]. Instead, I always move the average of these
  // two to keep the end result about the same without any strange-looking speed changes:
  const adjustCoefficient = (1 + Math.SQRT2) / 2;
  const adjustedSpeed = monsterSpeed * adjustCoefficient * rangeFactor;

  const walkVelocity = scaleXyz(
    { ...vectorXyToClosestPlayer, z: 0 },
    (adjustedSpeed / nonZero(lengthXy(vectorXyToClosestPlayer))) *
      (opposite ? -1 : 1),
  );

  return {
    movementType: "vel",
    vels: {
      walking: walkVelocity,
    },
    stateDelta: {
      // this isn't a unit vector, but since the walkVelocity can
      // be (0,0,0) seems safer not to convert it to one - not sure
      // anything uses this for the emperor's guardian anyway.
      facing: walkVelocity,
    },
  };
};

const randomlyChangeDirection = <
  RoomId extends string,
  RoomItemId extends string,
>(
  itemWithMovement: ItemWithMovement<RoomId, RoomItemId>,
  { roomTime }: RoomState<RoomId, RoomItemId>,
  _gameState: GameState<RoomId>,
  deltaMS: number,
  directionNames: Readonly<Array<DirectionXy8>>,
): MechanicResult<"monster", RoomId, RoomItemId> => {
  const {
    state: {
      vels: { walking },
      standingOnItemId,
    },
    hash: itemHash,
  } = itemWithMovement;

  if (standingOnItemId === null) {
    return notWalking;
  }

  const roll = hashNumberToNumber0to1(itemHash + roomTime);

  const produceNewWalk =
    xyzEqual(walking, originXyz) ?
      // standing on something but not walking - start walking, but only if any
      // game time is passing at all: choosing a direction writes facing into
      // the state, so a frozen world would still change what is drawn
      deltaMS !== 0
      // change direction probabilistically, about once per second
      // of game time on average
    : roll < deltaMS / 1_000;

  if (!produceNewWalk) {
    return unitMechanicalResult;
  }

  // re-hash the roll for the direction pick: using the roll directly would
  // correlate the pick with the roll passing its threshold (a passing roll is
  // always small, which would nearly always pick the first direction)
  const newDirectionName =
    directionNames[
      Math.floor(hashNumberToNumber0to1(roll) * directionNames.length)
    ];
  const newDirectionUnitVector = unitVectors[newDirectionName];

  if (import.meta.env.MODE === "visual-regression") {
    // turning is the only stochastic decision a monster makes, and it is
    // discrete - two machines agreeing on every input can still land either
    // side of the threshold and part company permanently from that moment.
    // Log the inputs, the moment, and the direction chosen, so a divergence
    // can be traced to the exact item and roomTime rather than inferred from
    // pixels
    console.log(
      `[monster-turn] ${itemWithMovement.id} at roomTime ${roomTime} now facing ${newDirectionName} (hash ${itemHash} roll ${roll} threshold ${deltaMS / 1_000})`,
    );
  }

  return {
    movementType: "vel",
    vels: {
      walking: scaleXyz(newDirectionUnitVector, speedForItem(itemWithMovement)),
    },
    stateDelta: {
      facing: unitVectors[newDirectionName],
    },
  };
};

const keepWalkingInSameDirection = <
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

  return (
      xyEqual(walking, originXy) ||
        // walking will usually be in the facing direction, but could have gotten out of
        // sync if a switch/button changed the facing of this item
        !areInSameDirection(walking, facing)
    ) ?
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

const handleMonsterTouchingItemByTurning = <
  RoomId extends string,
  RoomItemId extends string,
>(
  {
    movingItem: itemWithMovement,
    touchedItem: {
      state: { box: touchedItemBox },
    },
    deltaMS,
    room: { roomTime },
  }: ItemTouchEvent<RoomId, RoomItemId, ItemWithMovement<RoomId, RoomItemId>>,
  turnStrategy: TurnStrategy,
) => {
  const {
    state: {
      box,
      vels: { walking },
      activated,
      facing,
    },
    hash: itemHash,
  } = itemWithMovement;

  if (!activated) {
    return;
  }

  itemWithMovement.state.durationOfTouch += deltaMS;

  if (itemWithMovement.state.durationOfTouch < turnAroundTime) {
    return;
  }

  const m = mtv(box, touchedItemBox);

  // purely vertical touches don't change direction:
  if (m.x === 0 && m.y === 0) {
    return;
  }

  const turnRoll = hashNumberToNumber0to1(itemHash + roomTime);

  const newWalking = turnedVector(walking, m, turnStrategy, turnRoll);

  const newFacingUnscaled =
    newWalking === undefined ?
      // calc facing vector separately from walk, since walk can be (0,0,0) - usually if the item
      // is falling:
      turnedVector(facing, m, turnStrategy, turnRoll)
    : unitVector(newWalking);

  if (newFacingUnscaled === undefined) {
    // there is no direction to turn to - the touch does not block the way
    // ahead. Keep walking and facing as they are
    return;
  }

  itemWithMovement.state.vels.walking = newWalking ?? originXyz;

  const facingMaybeReverse =
    (
      turnStrategy === "perpendicular-or-reverse" &&
      // face backwards about a third of the time; re-hash the turn roll so
      // the reverse choice doesn't correlate with the turn side:
      hashNumberToNumber0to1(turnRoll) > 0.66
    ) ?
      -1
    : 1;

  itemWithMovement.state.facing = scaleXyz(
    newFacingUnscaled,
    facingMaybeReverse,
  );

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
  ) {
    return notWalking;
  }

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
    case "patrol-randomly-xy4":
    case "patrol-randomly-xy4-and-reverse": {
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
    case "forwards":
    case "anticlockwise":
    case "clockwise": {
      return keepWalkingInSameDirection(
        itemWithMovement,
        room,
        gameState,
        deltaMS,
      );
    }
    // ie, the stationary elephant heads - turn towards the player while not moving
    case "turn-to-player":
      return turnTowardsPlayer(itemWithMovement, room, gameState, deltaMS);

    case "towards-analogue":
      return walkTowardAnalogueIfInSquare(
        itemWithMovement,
        room,
        gameState,
        deltaMS,
      );

    // ie, emperor's guardian
    case "towards-analogue-unless-planet-crowns":
      return walkTowardAnalogueIfInSquare(
        itemWithMovement,
        room,
        gameState,
        deltaMS,
        selectHasAllPlanetCrowns(store.getState()),
      );

    default:
      itemWithMovement.config satisfies never;
      throw new Error(
        `this should be unreachable; movement= ${(itemWithMovement as ItemWithMovement<RoomId, RoomItemId>).config.movement}`,
      );
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
  if (!isSolid(touchedItem, itemWithMovement)) {
    return;
  }

  switch (itemWithMovement.config.movement) {
    case "patrol-randomly-xy4":
      handleMonsterTouchingItemByTurning(e, "perpendicular");
      break;
    case "patrol-randomly-xy4-and-reverse":
      handleMonsterTouchingItemByTurning(e, "perpendicular-or-reverse");
      break;
    case "back-forth":
    case "patrol-randomly-diagonal":
    case "patrol-randomly-xy8":
      handleMonsterTouchingItemByTurning(e, "opposite");
      break;
    case "anticlockwise":
    case "clockwise":
      handleMonsterTouchingItemByTurning(e, itemWithMovement.config.movement);
      break;
    case "towards-tripped-on-axis-xy4":
      handleMonsterTouchingItemByStopping(e);
      break;
    case "towards-on-shortest-axis-xy4":
    case "towards-analogue":
    case "towards-analogue-unless-planet-crowns":
    case "turn-to-player":
    case "forwards":
      // these don't need anything on touching:
      return;

    default:
      itemWithMovement.config satisfies never;
      throw new Error(
        `this should be unreachable; movement= ${(itemWithMovement as ItemWithMovement<RoomId, RoomItemId>).config.movement}`,
      );
  }
};
