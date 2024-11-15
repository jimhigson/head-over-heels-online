// if the period of the frame rate is less than this value, each rendering tick
// will be split into multiple physics ticks down to this size:
// this needs to be small enough that the fastest movement
// (jumping: 2px per frame in original game @25fps, so 50px per second)
// can be guaranteed to take up every half-pixel position.

import type { UnknownItemInPlay, AnyItemInPlay } from "@/model/ItemInPlay";
import { itemFalls } from "@/model/ItemInPlay";
import type { RoomState } from "@/model/modelTypes";
import type { PlanetName } from "@/sprites/planets";
import { iterate } from "@/utils/iterate";
import { objectValues } from "iter-tools";
import type { GameState } from "../gameState/GameState";
import { currentRoom } from "../gameState/GameState";
import { tickItem } from "./tickItem";

//  So, 10ms = 0.01s, at 50px/s gives 0.01 * 50 = 0.5px
const maximumDeltaMS = 10;

const itemHasExpired = <RoomId extends string>(
  item: UnknownItemInPlay,
  gameState: GameState<RoomId>,
) =>
  item.state.expires !== undefined && item.state.expires < gameState.gameTime;

const deleteItemFromRoom = <RoomId extends string>(
  room: RoomState<PlanetName, RoomId>,
  itemToDelete: AnyItemInPlay<RoomId>,
) => {
  if (itemToDelete.positionContainer !== undefined) {
    itemToDelete.positionContainer.destroy();
  }
  delete room.items[itemToDelete.id];

  // check if anything was standing on this item:
  for (const item of iterate(objectValues(room.items))) {
    if (itemFalls(item) && item.state.standingOn === itemToDelete) {
      item.state.standingOn = null;
    }
  }
};

export const progressGameState = <RoomId extends string>(
  gameState: GameState<RoomId>,
  deltaMS: number,
) => {
  const physicsTickCount = Math.ceil(deltaMS / maximumDeltaMS);
  const physicsTickMs = deltaMS / physicsTickCount;

  for (let i = 0; i < physicsTickCount; i++) {
    const room = currentRoom(gameState);

    for (const item of objectValues(room.items)) {
      if (itemHasExpired(item, gameState)) {
        deleteItemFromRoom(room, item);
      }
    }

    for (const item of objectValues(room.items)) {
      tickItem(item, gameState, physicsTickMs);
    }

    gameState.gameTime += physicsTickMs;
  }
};
