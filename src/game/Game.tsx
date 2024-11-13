import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import type { Campaign } from "../model/modelTypes";
import { type GameApi } from "./GameApi";
import type { RenderOptions } from "./RenderOptions";
import { load as loadPalette } from "@/sprites/samplePalette";
import { loadFont } from "./render/hud/loadHohFont";

const useGame = <RoomId extends string>(
  campaign: Campaign<RoomId>,
  renderOptions: RenderOptions<RoomId>,
): GameApi<RoomId> | undefined => {
  const [gameApi, setGameApi] = useState<GameApi<RoomId>>();
  const [loadedAssets, setLoadedAssets] = useState<boolean>();

  useEffect(() => {
    Promise.all([loadPalette(), loadFont()]).then(() => setLoadedAssets(true));
  }, []);

  useEffect(() => {
    if (!loadedAssets) return;

    let createdGameApi: GameApi<RoomId> | undefined;
    const go = async () => {
      // we don't import the game until we know the assets are loaded - it is
      // not safe to do so since some modules have top-level imports that rely on them
      const { gameMain } = await import("./gameMain");
      createdGameApi = await gameMain(campaign);
      setGameApi(createdGameApi);
    };

    go();

    return () => {
      createdGameApi?.stop();
    };
  }, [campaign, loadedAssets]);

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
