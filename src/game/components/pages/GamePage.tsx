import { useEffect, useState, lazy, Suspense } from "react";
import type { Campaign } from "../../../model/modelTypes.ts";
import { type GameApi } from "../../GameApi.tsx";
import { gameMain } from "../../gameMain.ts";

// setting TextureStyle this helps containers with cacheAsTexture turned on to not go blurry when rendered:
import { TextureStyle } from "pixi.js";
import { GameApiProvider } from "../GameApiContext.tsx";
import type Cheats from "../cheats/Cheats.tsx";
import { CssVariables } from "../CssVariables.tsx";
import { useAppSelector } from "../../../store/hooks.ts";
import { Flow } from "../../../store/storeFlow/Flow.tsx";
import { testCampaign } from "../../../testCampaign.ts";
import { campaign as originalCampaign } from "../../../_generated/originalCampaign/campaign.ts";
import { MenuDialog } from "../dialogs/menuDialog/MenuDialog.tsx";

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

  useEffect(
    function createGame() {
      let stopped = false;
      let thisEffectGameApi: GameApi<RoomId> | undefined;
      const go = async () => {
        thisEffectGameApi = await gameMain(campaign);
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
  const { cssUpscale, canvasSize } = useAppSelector((state) => state.upscale);

  useEffect(() => {
    if (gameDiv === null || gameApi === undefined) return;
    gameApi.renderIn(gameDiv);
  }, [gameApi, gameDiv]);

  useEffect(() => {
    gameApi?.resizeTo(canvasSize);
  });

  return (
    <>
      <div
        style={{
          // using scale3d (not scale) to try to force hardware acceleration of the scaling
          transform: `scale3d(${cssUpscale}, ${cssUpscale}, 1)`,
          width: canvasSize.x,
          height: canvasSize.y,
        }}
        className="origin-top-left"
        ref={setGameDiv}
      />
      {gameApi && (
        <GameApiProvider gameApi={gameApi}>
          <Flow />
          <MenuDialog />
          {cheatsEnabled && (
            <Suspense fallback={null}>
              <CssVariables>
                <LazyCheats />
              </CssVariables>
            </Suspense>
          )}
        </GameApiProvider>
      )}
    </>
  );
};
