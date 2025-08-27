import type { PropsWithChildren } from "react";

import { createContext, useContext } from "react";

import type { GameApi } from "../GameApi";

const GameApiContext = createContext<
  | GameApi<string>
  // null means outside of context
  | null
  // undefined means no game in progress
  | undefined
>(null);
export type GameApiProviderProps<RoomId extends string> = PropsWithChildren<{
  gameApi?: GameApi<RoomId>;
}>;

export const GameApiProvider = <RoomId extends string>({
  gameApi,
  children,
}: GameApiProviderProps<RoomId>) => {
  return (
    // TODO: callbacks in GameApi are making this terrible cast necessary
    <GameApiContext value={gameApi as unknown as GameApi<string>}>
      {children}
    </GameApiContext>
  );
};

export const useGameApi = <RoomId extends string = string>() => {
  const gameApi = useContext(GameApiContext);
  if (gameApi === null) {
    throw new Error("useGameApi must be used within a GameApiProvider");
  }
  if (gameApi === undefined) {
    throw new Error("useGameApi must be called once we have a GameApi");
  }
  // TODO: callbacks in GameApi are making this terrible cast necessary
  return gameApi as unknown as GameApi<RoomId>;
};

/**
 * gets the game api, if there is one, otherwise undefined
 */
export const useMaybeGameApi = <RoomId extends string = string>():
  | GameApi<RoomId>
  | undefined => {
  const gameApi = useContext(GameApiContext);
  if (gameApi === null) {
    throw new Error("useGameApi must be used within a GameApiProvider");
  }
  // TODO: callbacks in GameApi are making this terrible cast necessary
  return gameApi as unknown as GameApi<RoomId> | undefined;
};
