import { Application } from "pixi.js";
import { currentCharacter, GameState } from "./gameState/GameState";
import { addXyz, directions, directionVectors, Xyz } from "@/utils/vectors";
import { keys } from "@/utils/entries";
import { ItemInPlay, ItemState, UnknownItemInPlay } from "@/model/ItemState";
import { ItemType } from "@/model/Item";

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

const moveItem = (item: UnknownItemInPlay, xyzDelta: Xyz) => {
  // TODO: allow to check for positions first
  item.position = addXyz(item.position, xyzDelta);
  item.events.emit("move");
};

export const gameEngineTicks = <RoomId extends string>(
  app: Application,
  gameState: GameState<RoomId>,
) => {
  app.ticker.add((_time) => {
    const { inputState } = gameState;

    const currentCharacterItem = currentCharacter(gameState).item;

    const directionPressed = directions.find((d) => {
      return inputState[d] === true;
    });

    if (directionPressed !== undefined) {
      maybeUpdateItemState(currentCharacterItem, {
        facing: directionPressed,
        movement: "moving",
      });
      moveItem(currentCharacterItem, directionVectors[directionPressed]);
    } else {
      maybeUpdateItemState(currentCharacterItem, { movement: "idle" });
    }
  });
};
