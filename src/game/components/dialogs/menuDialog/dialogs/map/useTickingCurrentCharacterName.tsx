import { useEffect, useState } from "preact/hooks";

import { type CharacterName } from "../../../../../../model/modelTypes";
import { appTicker } from "../../../../../../utils/ticker/appTickerInstance";
import { swopPlayablesIfInput } from "../../../../../mainLoop/swopPlayablesIfInput";
import { useGameApi } from "../../../../GameApiContext";

/**
 * Select the current character name from the game state, keep sync'd
 * and re-render the component when it changes.
 *
 * This polling works around the current character name
 * not being in the store, or this would be unnecessary. Still, the engine
 * is for the game first and the menus (like the map) secondarily.
 */
export const useTickingCurrentCharacterName = <RoomId extends string>() => {
  const gameApi = useGameApi<RoomId>();

  const [currentCharacterName, setCurrentCharacterName] =
    useState<CharacterName>(gameApi.gameState.currentCharacterName);

  useEffect(() => {
    const syncCharacterNameToState = () => {
      setCurrentCharacterName(gameApi.gameState.currentCharacterName);
    };
    appTicker.add(syncCharacterNameToState);
    return () => {
      appTicker.remove(syncCharacterNameToState);
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
    appTicker.add(maybeSwopOnThisTick);
    return () => {
      appTicker.remove(maybeSwopOnThisTick);
    };
  }, [gameApi.gameState]);
};
