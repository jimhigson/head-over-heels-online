import { useEffect, useState, lazy, Suspense } from "react";
import type { Campaign } from "../../../model/modelTypes.ts";
import { type GameApi } from "../../GameApi.tsx";
import { Dialogs } from "../dialogs/Dialogs.tsx";
import { gameMain } from "../../gameMain.tsx";

// setting TextureStyle this helps containers with cacheAsTexture turned on to not go blurry when rendered:
import { TextureStyle } from "pixi.js";
import { useRenderOptions } from "@/store/selectors";
import { Flow } from "@/store/storeFlow/Flow";
import { GameApiProvider } from "../GameApiContext.tsx";
import type Cheats from "../cheats/Cheats.tsx";
import { campaign as originalCampaign } from "@/_generated/originalCampaign/campaign.ts";
import { testCampaign } from "@/testCampaign.ts";
import { useAppSelector } from "@/store/hooks.ts";

TextureStyle.defaultOptions.scaleMode = "nearest";

const campaignWithTestRooms = {
  rooms: { ...originalCampaign.rooms, ...testCampaign.rooms },
};

const LazyCheats = lazy(() => import("../cheats/Cheats.tsx")) as typeof Cheats;

const useCheatsEnabled = (): boolean => {
  const params = new URLSearchParams(window.location.search);
  return params.has("cheats");
};

const useGame = <RoomId extends string>(
  campaign: Campaign<RoomId>,
): GameApi<RoomId> | undefined => {
  const [gameApi, setGameApi] = useState<GameApi<RoomId>>();
  const renderOptions = useRenderOptions();

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

  return gameApi;
};

/**
 * React wrapper to give a space to pixi.js and start the rest of the game engine
 */
export const GamePage = () => {
  const [gameDiv, setGameDiv] = useState<HTMLDivElement | null>(null);

  const cheatsEnabled = useCheatsEnabled();
  const campaign = cheatsEnabled ? campaignWithTestRooms : originalCampaign;
  const gameApi = useGame(campaign);
  const { cssUpscale, canvasSize } = useAppSelector(
    (state) => state.readerOptions.upscale,
  );

  useEffect(() => {
    if (gameDiv === null || gameApi === undefined) return;
    gameApi.renderIn(gameDiv);
  }, [gameApi, gameDiv]);

  return (
    <>
      <div
        style={{
          transform: `scale(${cssUpscale})`,
          width: canvasSize.x,
          height: canvasSize.y,
        }}
        className="origin-top-left bg-slate-700"
        ref={setGameDiv}
      />
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
};
