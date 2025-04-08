import { Ticker } from "pixi.js";
import { useState, useEffect } from "react";
import type { CharacterName } from "../../../../../../model/modelTypes";
import { useGameApi } from "../../../../GameApiContext";
import { swopPlayablesIfInput } from "../../../../../mainLoop/swopPlayablesIfInput";

/**
 * Select the current character name from the game state, keep sync'd
 * and re-render the component when it changes.
 *
 * This polling works around the current character name
 * not being in the store, or this would be unnecessary. Still, the engine
 * is for the game first and the menus (like the map) secondarily.
 */
export const useCurrentCharacterName = () => {
  const gameApi = useGameApi<string>();
  const [currentCharacterName, setCurrentCharacterName] =
    useState<CharacterName>(gameApi.gameState.currentCharacterName);
  useEffect(() => {
    const syncCharacterNameToState = () => {
      setCurrentCharacterName(gameApi.gameState.currentCharacterName);
    };
    Ticker.shared.add(syncCharacterNameToState);
    return () => {
      Ticker.shared.remove(syncCharacterNameToState);
    };
  }, [gameApi.gameState]);
  return currentCharacterName;
};

/**
 * since the game engine isn't running while the map is shown, we
 * tie into the ticker to allow (only) the input of switching character
 */
export const useAllowCharacterSwopping = () => {
  const gameApi = useGameApi<string>();

  useEffect(() => {
    const maybeSwopOnThisTick = () => {
      swopPlayablesIfInput(gameApi.gameState);
    };
    Ticker.shared.add(maybeSwopOnThisTick);
    return () => {
      Ticker.shared.remove(maybeSwopOnThisTick);
    };
  }, [gameApi.gameState]);
};
