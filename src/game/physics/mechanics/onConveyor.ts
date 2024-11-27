import {
  isItemType,
  isPlayableItem,
  type FreeItemTypes,
  type ItemInPlay,
} from "@/model/ItemInPlay";
import { type MechanicResult } from "../MechanicResult";
import {
  conveyorSpeedPixPerMs,
  playerWalkTerminalSpeedPixPerMs,
} from "../mechanicsConstants";
import type { GameState } from "@/game/gameState/GameState";
import type { PlanetName } from "@/sprites/planets";
import {
  addXyz,
  oppositeDirection,
  originXyz,
  scaleXyz,
  unitVectors,
  xyzEqual,
} from "@/utils/vectors/vectors";
import { blockSizePx } from "@/sprites/spritePivots";

const resetConveyorStateForItem = {
  vels: {
    movingFloor: originXyz,
  },
  stateDelta: {
    activeConveyor: null,
  },
};

/**
 * since conveyors can lead to other conveyors, sort them so that the
 * active conveyor will always be the first one in the chain when two
 * are stood on at once. This allows objects to be nicely moved around
 * conveyor corners (see blacktooth26)
 */
const conveyorOrderComparator = (
  a: ItemInPlay<"conveyor">,
  b: ItemInPlay<"conveyor">,
) => {
  const aLeadsTo = addXyz(
    a.state.position,
    scaleXyz(unitVectors[a.config.direction], blockSizePx.w * a.config.count),
  );

  if (xyzEqual(aLeadsTo, b.state.position)) {
    return -1;
  }

  const bLeadsTo = addXyz(
    b.state.position,
    scaleXyz(unitVectors[b.config.direction], blockSizePx.w * b.config.count),
  );

  if (xyzEqual(bLeadsTo, a.state.position)) {
    return 1;
  }

  return 0;
};

/**
 * handle *only* the vertical speed downwards, and recognising
 * when the fall is done
 *
 * The item can be anything - a player, a pickup etc
 */
export const onConveyor = <RoomId extends string>(
  item: ItemInPlay<FreeItemTypes, PlanetName, RoomId>,
  _gameState: GameState<RoomId>,
  _deltaMS: number,
): MechanicResult<FreeItemTypes> => {
  if (isPlayableItem(item) && item.state.teleporting !== null) {
    return resetConveyorStateForItem;
  }

  const {
    state: { standingOn },
  } = item;

  const stoodOnConveyors = standingOn.filter(isItemType("conveyor"));

  /*
  if (
    standingOn.length > stoodOnConveyors.length &&
    stoodOnConveyors.every((conv) => itemXyOverlapFraction(item, conv) < 0.5)
  ) {
    return resetConveyorStateForItem;
  }*/

  const activeConveyorItem = stoodOnConveyors
    .sort(conveyorOrderComparator)
    .at(0);

  if (activeConveyorItem === undefined) {
    return resetConveyorStateForItem;
  }

  const {
    config: { direction },
  } = activeConveyorItem;

  /**
   * conveyors magically move quicker when heels is fighting against them, so that all
   * characters can only just stay still when walking against them, regardless of how
   * fast the character walks
   */
  const heelsWalkingAgainst =
    isItemType("heels")(item) &&
    item.state.action === "moving" &&
    item.state.facing === oppositeDirection(direction);

  const conveyorSpeed =
    heelsWalkingAgainst ?
      playerWalkTerminalSpeedPixPerMs.heels
    : conveyorSpeedPixPerMs;

  const conveyorVelocity = scaleXyz(unitVectors[direction], conveyorSpeed);

  return {
    vels: {
      movingFloor: conveyorVelocity,
    },
    stateDelta: {
      activeConveyor: activeConveyorItem,
    },
  };
};
