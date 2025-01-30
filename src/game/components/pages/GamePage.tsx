import { useEffect, useState, lazy, Suspense } from "react";
import { type GameApi } from "../../GameApi.tsx";

// setting TextureStyle this helps containers with cacheAsTexture turned on to not go blurry when rendered:
import { GameApiProvider } from "../GameApiContext.tsx";
import type Cheats from "../cheats/Cheats.tsx";
import { CssVariables } from "../CssVariables.tsx";
import { useAppSelector } from "../../../store/hooks.ts";
import { ConnectInputToStore } from "../../../store/storeFlow/ConnectInputToStore.tsx";
import { MenuDialog } from "../dialogs/menuDialog/MenuDialog.tsx";
import { useInputStateInterpretation } from "../../input/InputStateProvider.tsx";
import { useCheatsOn } from "../../../store/selectors.ts";
import type { OriginalCampaignRoomId } from "../../../_generated/originalCampaign/OriginalCampaignRoomId.ts";

const LazyCheats = lazy(() => import("../cheats/Cheats.tsx")) as typeof Cheats;

const useGame = (): GameApi<OriginalCampaignRoomId> | undefined => {
  const [gameApi, setGameApi] = useState<
    GameApi<OriginalCampaignRoomId> | undefined
  >();
  const gameRunning = useAppSelector((state) => state.gameRunning);
  const inputState = useInputStateInterpretation();
  const cheatsOn = useCheatsOn();

  useEffect(() => {
    if (!gameRunning) {
      setGameApi(undefined);
      return;
    }

    let stopped = false;
    let thisEffectGameApi: GameApi<OriginalCampaignRoomId> | undefined;

    const go = async () => {
      // lazy-load things we need to play the game
      const [{ gameMain }, originalCampaignImport, testCampaignImport] =
        await Promise.all([
          import("../../gameMain.ts"),
          import("../../../_generated/originalCampaign/campaign.ts"),
          cheatsOn ? import("../../../testCampaign.ts") : undefined,
        ]);

      const campaign = cheatsOn
        ? {
            rooms: {
              ...originalCampaignImport.campaign.rooms,
              ...testCampaignImport?.testCampaign.rooms,
            },
          }
        : originalCampaignImport.campaign;

      thisEffectGameApi = await gameMain(campaign, inputState);

      if (stopped) {
        thisEffectGameApi.stop();
      } else {
        setGameApi(thisEffectGameApi);
      }
    };

    go();

    return () => {
      thisEffectGameApi?.stop();
      stopped = true;
    };
  }, [cheatsOn, gameRunning, inputState]);

  return gameApi;
};

/**
 * React wrapper to give a space to pixi.js and start the rest of the game engine
 */
export const GamePage = () => {
  const [gameDiv, setGameDiv] = useState<HTMLDivElement | null>(null);

  const cheatsOn = useCheatsOn();
  const gameApi = useGame();
  const { cssUpscale, canvasSize } = useAppSelector((state) => state.upscale);

  useEffect(() => {
    if (gameDiv === null || gameApi === undefined) return;
    gameApi.renderIn(gameDiv);
  }, [gameApi, gameDiv]);

  useEffect(() => {
    gameApi?.resizeTo(canvasSize);
  }, [canvasSize, gameApi]);

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
      <ConnectInputToStore />
      <MenuDialog />
      {gameApi && (
        <GameApiProvider gameApi={gameApi}>
          {cheatsOn && (
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
