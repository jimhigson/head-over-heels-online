import { isItemType } from "@/game/physics/itemPredicates";
import { iterate } from "@/utils/iterate";
import { objectValues } from "iter-tools";
import { makeItemFadeOut } from "./makeItemFadeOut";
import type { SceneryName } from "@/sprites/planets";
import type { RoomState } from "@/model/modelTypes";
import type { GameState } from "../GameState";

export const removeHushPuppiesFromRoom = <RoomId extends string>(
  room: RoomState<SceneryName, RoomId>,
  gameState: GameState<RoomId>,
) => {
  const hushPuppyInRoomIter = iterate(objectValues(room.items)).filter(
    isItemType("hushPuppy"),
  );
  // hush puppies don't like head:
  for (const hushPuppyBye of hushPuppyInRoomIter) {
    makeItemFadeOut({ touchedItem: hushPuppyBye, gameState, room });
  }
};
