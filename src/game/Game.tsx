import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Campaign } from "../modelTypes";
import { gameMain } from "./gameMain";
import { type GameApi } from "./gameMain";
import { EmptyObject } from "type-fest";

const useGame = <RoomId extends string>(
  campaign: Campaign<RoomId>,
): GameApi<RoomId> | undefined => {
  const [gameApi, setGameApi] = useState<GameApi<RoomId>>();

  useEffect(() => {
    let created: GameApi<RoomId> | undefined;
    const go = async () => {
      created = await gameMain(campaign);
      setGameApi(created);
    };

    go();

    return () => {
      created?.stop();
    };
  }, [campaign]);

  return gameApi;
};

const useHashSyncedWithRoom = <RoomId extends string>(
  gameApi: GameApi<RoomId> | undefined,
): void => {
  useEffect(() => {
    if (gameApi === undefined) {
      return;
    }

    if (window.location.hash)
      gameApi.viewRoom(window.location.hash.substring(1) as RoomId);

    const onHashChange = (e: HashChangeEvent) => {
      const hashContent = new URL(e.newURL).hash.substring(1);

      const newRoomId: RoomId =
        hashContent === ""
          ? gameApi.gameState.playableCharacters[
              gameApi.gameState.currentCharacter
            ].roomState.id
          : (hashContent as RoomId);

      gameApi.viewRoom(newRoomId);
    };
    const onRoomChange = (roomId: RoomId) => {
      window.location.hash = roomId;
    };

    window.addEventListener("hashchange", onHashChange);
    gameApi.events.on("roomChange", onRoomChange);

    return () => {
      window.removeEventListener("hashchange", onHashChange);
      gameApi.events.off("roomChange", onRoomChange);
    };
  }, [gameApi]);
};

/**
 * React wrapper to give a space to pixi.js and start the rest of the game engine
 */
export const Game = <RoomId extends string>(campaign: Campaign<RoomId>) =>
  forwardRef<GameApi<RoomId> | undefined, EmptyObject>(
    (_props: EmptyObject, gameApiRef) => {
      const [gameDiv, setGameDiv] = useState<HTMLDivElement | null>(null);
      const gameApi = useGame(campaign);
      useHashSyncedWithRoom(gameApi);
      useImperativeHandle(gameApiRef, () => gameApi || undefined);

      useEffect(() => {
        if (gameDiv === null || gameApi === undefined) return;
        gameApi.renderIn(gameDiv);
      }, [gameApi, gameDiv]);

      return (
        <div className="h-screen w-screen bg-slate-700" ref={setGameDiv} />
      );
    },
  );
