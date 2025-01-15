import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
  lazy,
  Suspense,
} from "react";
import type { Campaign } from "../../model/modelTypes";
import { type GameApi } from "../GameApi";
import { Dialogs } from "./dialogs/Dialogs";
import { gameMain } from "../gameMain";

// setting TextureStyle this helps containers with cacheAsTexture turned on to not go blurry when rendered:
import { TextureStyle } from "pixi.js";
import { useRenderOptions } from "@/store/selectors";
import type { EmptyObject } from "type-fest";
import { Flow } from "@/store/storeFlow/Flow";
import { GameApiProvider } from "./GameApiContext";
import type Cheats from "./cheats/Cheats.tsx";

TextureStyle.defaultOptions.scaleMode = "nearest";

const LazyCheats = lazy(() => import("./cheats/Cheats.tsx")) as typeof Cheats;

const useCheatsEnabled = (): boolean => {
  const params = new URLSearchParams(window.location.search);
  return params.has("cheats");
};

const useGame = <RoomId extends string>(
  campaign: Campaign<RoomId>,
): GameApi<RoomId> | undefined => {
  const [gameApi, setGameApi] = useState<GameApi<RoomId>>();
  const renderOptions = useRenderOptions<RoomId>();

  useEffect(
    function createGame() {
      let stopped = false;
      let thisEffectGameApi: GameApi<RoomId> | undefined;
      const go = async () => {
        console.log("creating game with renderOptions", renderOptions);
        thisEffectGameApi = await gameMain(campaign, renderOptions);
        if (stopped) {
          thisEffectGameApi.stop();
          return;
        }
        setGameApi(thisEffectGameApi);
      };

      go();

      return () => {
        thisEffectGameApi?.stop();
        stopped = true;
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps -- we don't want to recreate the whole game every time renderOptions changes, only when the campaign changes. New renderopions are passed to the gameApi in an effect below
    [campaign],
  );

  useEffect(
    function setRenderOptionsOnGameApi() {
      if (gameApi === undefined) return;

      console.log("changing renderOptions", renderOptions);

      gameApi.renderOptions = renderOptions;
    },
    [gameApi, renderOptions],
  );

  return gameApi;
};

/**
 * React wrapper to give a space to pixi.js and start the rest of the game engine
 */
export const Game = <RoomId extends string>(campaign: Campaign<RoomId>) =>
  forwardRef<GameApi<RoomId> | undefined, EmptyObject>(
    (_emptyProps, gameApiRef) => {
      const [gameDiv, setGameDiv] = useState<HTMLDivElement | null>(null);
      const gameApi = useGame(campaign);
      const cheatsEnabled = useCheatsEnabled();
      useImperativeHandle(gameApiRef, () => gameApi || undefined);

      useEffect(() => {
        if (gameDiv === null || gameApi === undefined) return;
        gameApi.renderIn(gameDiv);
      }, [gameApi, gameDiv]);

      return (
        <>
          <div className="h-screen w-screen bg-slate-700" ref={setGameDiv} />
          {gameApi && (
            <GameApiProvider gameApi={gameApi}>
              <Flow />
              <Dialogs />
              {cheatsEnabled && (
                <Suspense fallback={null}>
                  <LazyCheats />
                </Suspense>
              )}
            </GameApiProvider>
          )}
        </>
      );
    },
  );
Game.displayName = "Game";
