import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import type { Campaign } from "../../model/modelTypes";
import { type GameApi } from "../GameApi";
import type { RenderOptions } from "../RenderOptions";
import { GameOverlayDialogs } from "./GameOverlayDialogs";

import { gameMain } from "../gameMain";

// setting TextureStyle this helps containers with cacheAsTexture turned on to not go blurry when rendered:
import { TextureStyle } from "pixi.js";
TextureStyle.defaultOptions.scaleMode = "nearest";

const useGame = <RoomId extends string>(
  campaign: Campaign<RoomId>,
  renderOptions: RenderOptions<RoomId>,
): GameApi<RoomId> | undefined => {
  const [gameApi, setGameApi] = useState<GameApi<RoomId>>();

  useEffect(
    function createGame() {
      let stopped = false;
      let thisEffectGameApi: GameApi<RoomId> | undefined;
      const go = async () => {
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
  forwardRef<
    GameApi<RoomId> | undefined,
    { renderOptions: RenderOptions<RoomId> }
  >(({ renderOptions }, gameApiRef) => {
    const [gameDiv, setGameDiv] = useState<HTMLDivElement | null>(null);
    const gameApi = useGame(campaign, renderOptions);
    useImperativeHandle(gameApiRef, () => gameApi || undefined);

    useEffect(() => {
      if (gameDiv === null || gameApi === undefined) return;
      gameApi.renderIn(gameDiv);
    }, [gameApi, gameDiv]);

    return (
      <>
        <div className="h-screen w-screen bg-slate-700" ref={setGameDiv} />
        {gameApi && <GameOverlayDialogs gameApi={gameApi} />}
      </>
    );
  });
Game.displayName = "Game";
