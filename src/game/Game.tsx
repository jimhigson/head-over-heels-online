import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import type { Campaign } from "../model/modelTypes";
import { gameMain } from "./gameMain";
import { type GameApi } from "./GameApi";
import type { RenderOptions } from "./RenderOptions";

const useGame = <RoomId extends string>(
  campaign: Campaign<RoomId>,
  renderOptions: RenderOptions<RoomId>,
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

  useEffect(() => {
    if (gameApi === undefined) return;

    gameApi.renderOptions = renderOptions;
  }, [gameApi, renderOptions]);

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

    return <div className="h-screen w-screen bg-slate-700" ref={setGameDiv} />;
  });
