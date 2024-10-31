import { Application } from "pixi.js";
import { GameState } from "../gameState/GameState";
import { keys } from "@/utils/entries";
import { ItemInPlay, ItemState } from "@/model/ItemInPlay";
import { ItemType } from "@/model/Item";
import { blockSizePx } from "@/sprites/pixiSpriteSheet";
import { handleCharacterInput } from "./handleCharacterInput";

// original game timed at 5s to move 8 blocks
export const playerSpeedPixPerMs = {
  head: (blockSizePx.w * 8) / 5_000,
  // twice as fast (just a guess - TODO: implement acceleration and measure)
  heels: (blockSizePx.w * 8) / 2_500,
};

export const maybeUpdateItemState = <T extends ItemType>(
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

export const gameEngineTicks = <RoomId extends string>(
  app: Application,
  gameState: GameState<RoomId>,
) => {
  app.ticker.add(({ deltaMS }) => {
    const { inputState } = gameState;

    handleCharacterInput<RoomId>(gameState, inputState, deltaMS);
  });
};
