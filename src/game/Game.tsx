import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Application } from "pixi.js";
import { resize } from "./resize";
import { AnyRoomJson, Campaign } from "../modelTypes";
import { gameMain } from "./gameMain";
import { type GameApi } from "./gameMain";
import { EmptyObject } from "type-fest";

const useGame = <RoomId extends string>(
  campaign: Campaign<RoomId>,
): GameApi<RoomId> => {
  const [gameApi] = useState(() => gameMain(campaign));

  useEffect(() => {
    return () => {
      gameApi.stop();
    };
  }, [gameApi]);

  return gameApi;
};

const useHashSyncedWithRoom = <R extends string>(gameApi: GameApi<R>): void => {
  useEffect(() => {
    if (window.location.hash)
      gameApi.goToRoom(window.location.hash.substring(1) as R);

    const onHashChange = (e: HashChangeEvent) => {
      gameApi.goToRoom(new URL(e.newURL).hash.substring(1) as R);
    };
    const onRoomChange = ({ id }: AnyRoomJson) => {
      window.location.hash = id;
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
  forwardRef<GameApi<RoomId>, EmptyObject>(
    (_props: EmptyObject, gameApiRef) => {
      const [gameDiv, setGameDiv] = useState<HTMLDivElement | null>(null);
      const gameApi = useGame(campaign);
      useHashSyncedWithRoom(gameApi);
      useImperativeHandle(gameApiRef, () => gameApi);

      useEffect(() => {
        if (gameDiv === null) return;

        let app: Application | undefined;

        const makeAppOnDiv = async () => {
          app = new Application();
          await app.init({ background: "#000000", resizeTo: window });
          // todo: load assets in parallel with init
          gameDiv.appendChild(app.canvas);
          gameApi.renderIn(app);

          resize(app);
        };

        makeAppOnDiv();

        return () => {
          if (app === undefined) return;

          gameDiv.removeChild(app.canvas);
          app.destroy();
        };
      }, [gameApi, gameDiv]);

      return (
        <div className="h-screen w-screen bg-slate-700" ref={setGameDiv} />
      );
    },
  );
