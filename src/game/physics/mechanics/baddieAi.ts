import type { UnknownItemInPlay } from "@/model/ItemInPlay";
import { type ItemInPlay } from "@/model/ItemInPlay";
import { type MechanicResult } from "../MechanicResult";
import type { GameState } from "@/game/gameState/GameState";
import type { PlanetName } from "@/sprites/planets";
import { walkSpeedPixPerMs } from "../mechanicsConstants";
import { unitVectors } from "@/utils/vectors/unitVectors";
import type { DirectionXyDiagonal, Xyz } from "@/utils/vectors/vectors";
import { directionsXyDiagonal, scaleXyz } from "@/utils/vectors/vectors";
import { mtv } from "../slidingCollision";

const { dalek: dalekSpeed } = walkSpeedPixPerMs;

const randomFromArray = <T>(array: Readonly<T[]> | T[]): T =>
  array[Math.floor(Math.random() * array.length)];

export const initBaddieWalk = (): Xyz =>
  scaleXyz(unitVectors.towards, dalekSpeed);

/**
 * 'ai' is maybe a bit much :-)
 */
export const tickBaddie = <RoomId extends string>(
  {
    state: {
      vels: { walking },
    },
  }: ItemInPlay<"baddie", PlanetName, RoomId>,
  _gameState: GameState<RoomId>,
  deltaMS: number,
): MechanicResult<"baddie"> => {
  const newWalking =
    Math.random() < deltaMS / 1_000 ?
      scaleXyz(
        unitVectors[randomFromArray<DirectionXyDiagonal>(directionsXyDiagonal)],
        dalekSpeed,
      )
    : walking;

  return {
    vels: {
      walking: newWalking,
    },
  };
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
    },
    aabb,
  } = baddieItem;
  const m = mtv(position, aabb, toucheePosition, toucheeAabb);

  if (m.z) return;

  const newWalking = {
    x: m.x === 0 ? walking.x : -walking.x,
    y: m.y === 0 ? walking.y : -walking.y,
    z: 0,
  };

  baddieItem.state.vels.walking = newWalking;
};
