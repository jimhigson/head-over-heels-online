import type { UnknownItemInPlay } from "@/model/ItemInPlay";
import { type ItemInPlay } from "@/model/ItemInPlay";
import { unitMechanicalResult, type MechanicResult } from "../MechanicResult";
import type { GameState } from "@/game/gameState/GameState";
import type { PlanetName } from "@/sprites/planets";
import { walkSpeedPixPerMs } from "../mechanicsConstants";
import { unitVectors } from "@/utils/vectors/unitVectors";
import type { DirectionXyDiagonal, Xyz } from "@/utils/vectors/vectors";
import {
  directionsXyDiagonal,
  distanceXySquared,
  originXyz,
  perpendicularAxisXy,
  scaleXyz,
  subXy,
} from "@/utils/vectors/vectors";
import { mtv } from "../slidingCollision";
import type { RoomState } from "@/model/modelTypes";
import type { BaddieType } from "@/model/json/JsonItem";

const randomFromArray = <T>(array: Readonly<T[]> | T[]): T =>
  array[Math.floor(Math.random() * array.length)];

export const initBaddieWalk = (which: BaddieType): Xyz => {
  if (which === "dalek") {
    return scaleXyz(unitVectors.towards, walkSpeedPixPerMs[which]);
  }
  return originXyz;
};

export const cybermanAi = <RoomId extends string>(
  { state: { position } }: ItemInPlay<"baddie", PlanetName, RoomId>,
  room: RoomState<PlanetName, RoomId>,
  _gameState: GameState<RoomId>,
  _deltaMS: number,
): MechanicResult<"baddie", RoomId> => {
  const speed = walkSpeedPixPerMs.cyberman;

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
    vels: {
      walking: {
        [travelAxis]: vectorXyToClosestPlayer[travelAxis] > 0 ? speed : -speed,
      },
    },
  };
};

export const dalekAi = <RoomId extends string>(
  {
    state: {
      vels: { walking },
    },
  }: ItemInPlay<"baddie", PlanetName, RoomId>,
  _room: RoomState<PlanetName, RoomId>,
  _gameState: GameState<RoomId>,
  deltaMS: number,
): MechanicResult<"baddie", RoomId> => {
  const speed = walkSpeedPixPerMs.dalek;
  const newWalking =
    Math.random() < deltaMS / 1_000 ?
      scaleXyz(
        unitVectors[randomFromArray<DirectionXyDiagonal>(directionsXyDiagonal)],
        speed,
      )
    : walking;

  return {
    vels: {
      walking: newWalking,
    },
  };
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
  if (!item.state.activated) return unitMechanicalResult;

  switch (item.config.which) {
    case "dalek": {
      return dalekAi(item, room, gameState, deltaMS);
    }
    case "cyberman": {
      return cybermanAi(item, room, gameState, deltaMS);
    }
    default:
      return unitMechanicalResult;
  }
};

export const handleBaddieTouchingItem = <RoomId extends string>(
  baddieItem: ItemInPlay<"baddie", PlanetName, RoomId>,
  {
    state: { position: toucheePosition },
    aabb: toucheeAabb,
  }: UnknownItemInPlay<RoomId>,
  _movementVector: Xyz,
  _gameState: GameState<RoomId>,
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

  if (m.z) return;

  const newWalking = {
    x: m.x === 0 ? walking.x : -walking.x,
    y: m.y === 0 ? walking.y : -walking.y,
    z: 0,
  };

  baddieItem.state.vels.walking = newWalking;
};
