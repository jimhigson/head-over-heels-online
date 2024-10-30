import { Application } from "pixi.js";
import { currentCharacter, GameState } from "./gameState/GameState";
import { addXyz, directions, directionVectors, Xyz } from "@/utils/vectors";
import { keys } from "@/utils/entries";
import { ItemInPlay, ItemState, UnknownItemInPlay } from "@/model/ItemInPlay";
import { ItemType } from "@/model/Item";
import { UnknownRoomState } from "@/model/modelTypes";
import { collision1toMany } from "./collision/aabbCollision";

const maybeUpdateItemState = <T extends ItemType>(
  item: ItemInPlay<T>,
  delta: Partial<ItemState<T>>,
) => {
  if (item.state === undefined) {
    throw new Error("item does not have state");
  }

  let changed = false;
  for (const k of keys<keyof ItemState<T>>(delta)) {
    const deltaVal = delta[k];

    if (item.state[k] !== deltaVal) {
      // cast needed because delta is partial (value can be undefined), but
      // here we know we have the value
      item.state[k] = deltaVal!;
      changed = true;
    }
  }

  if (changed) {
    item.events.emit("stateChange");
  }
};

/**
 *
 * @param item
 * @param xyzDelta
 * @param inRoom the room the item is moving in
 */
const moveItem = (
  item: UnknownItemInPlay,
  xyzDelta: Xyz,
  room: UnknownRoomState,
) => {
  const collisions = collision1toMany(item, room.items);

  console.log("collisions", collisions);

  item.position = addXyz(item.position, xyzDelta);
  item.events.emit("move");
};

export const gameEngineTicks = <RoomId extends string>(
  app: Application,
  gameState: GameState<RoomId>,
) => {
  app.ticker.add((_time) => {
    const { inputState } = gameState;

    const character = currentCharacter(gameState);
    const currentCharacterItem = character.item;

    const directionPressed = directions.find((d) => {
      return inputState[d] === true;
    });

    if (directionPressed !== undefined) {
      maybeUpdateItemState(currentCharacterItem, {
        facing: directionPressed,
        movement: "moving",
      });
      moveItem(
        currentCharacterItem,
        directionVectors[directionPressed],
        character.roomState,
      );
    } else {
      maybeUpdateItemState(currentCharacterItem, { movement: "idle" });
    }
  });
};
