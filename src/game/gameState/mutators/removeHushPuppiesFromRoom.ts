import { objectValues } from "iter-tools";
import { makeItemFadeOut } from "./makeItemFadeOut";
import type { GameState } from "../GameState";
import type { SceneryName } from "../../../sprites/planets";
import { iterate } from "../../../utils/iterate";
import { isItemType } from "../../physics/itemPredicates";
import type { RoomState } from "../../../model/RoomState";

export const removeHushPuppiesFromRoom = <RoomId extends string>(
  room: RoomState< RoomId>,
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
