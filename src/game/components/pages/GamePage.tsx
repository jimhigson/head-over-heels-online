import { useEffect, useState, lazy, Suspense } from "react";
import { type GameApi } from "../../GameApi.tsx";

// setting TextureStyle this helps containers with cacheAsTexture turned on to not go blurry when rendered:
import { GameApiProvider } from "../GameApiContext.tsx";
import type Cheats from "../cheats/Cheats.tsx";
import { useAppSelector } from "../../../store/hooks.ts";
import { ConnectInputToStore } from "../../../store/storeFlow/ConnectInputToStore.tsx";
import { Dialogs } from "../dialogs/menuDialog/Dialogs.tsx";
import { useInputStateTracker } from "../../input/InputStateProvider.tsx";
import { useCheatsOn, useIsGameRunning } from "../../../store/selectors.ts";
import type { OriginalCampaignRoomId } from "../../../_generated/originalCampaign/OriginalCampaignRoomId.ts";
import { importOnce } from "../../../utils/importOnce.ts";

const importCheats = importOnce(() => import("../cheats/Cheats.tsx"));
const importGameMain = importOnce(() => import("../../gameMain.ts"));
const importOriginalCampaign = importOnce(
  () => import("../../../_generated/originalCampaign/campaign.ts"),
);
const importTestCampaign = importOnce(() => import("../../../testCampaign.ts"));
const importSpritesheet = importOnce(
  () => import("../../../sprites/spriteSheet.ts"),
);

const LazyCheats = lazy(importCheats) as typeof Cheats;

const useGame = (): GameApi<OriginalCampaignRoomId> | undefined => {
  const [gameApi, setGameApi] = useState<
    GameApi<OriginalCampaignRoomId> | undefined
  >();
  const isGameRunning = useIsGameRunning();
  const inputState = useInputStateTracker();
  const cheatsOn = useCheatsOn();

  useEffect(() => {
    if (!isGameRunning) {
      setGameApi(undefined);
      return;
    }
    let stopped = false;
    let thisEffectGameApi: GameApi<OriginalCampaignRoomId> | undefined;

    const go = async () => {
      // to avoid top-level await in Safari, load the sprites early:

      const [
        spriteSheet,
        gameMain,
        originalCampaignImport,
        testCampaignImport,
      ] = await Promise.all([
        importSpritesheet(),
        importGameMain(),
        importOriginalCampaign(),
        cheatsOn ? importTestCampaign() : undefined,
      ]);

      // top-level await in safari is not great, so the spritesheet doesn't self-load
      await spriteSheet.load();

      const campaign =
        cheatsOn ?
          {
            rooms: {
              ...originalCampaignImport.campaign.rooms,
              ...testCampaignImport?.testCampaign.rooms,
            },
          }
        : originalCampaignImport.campaign;

      thisEffectGameApi = await gameMain.default(campaign, inputState);

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
  }, [cheatsOn, isGameRunning, inputState]);

  return gameApi;
};

const usePageAsAnApp = () => {
  useEffect(() => {
    document.body.classList.add(
      "overscroll-none",
      "overflow-hidden",
      "select-none",
    );
  }, []);
};

/**
 * React wrapper to give a space to pixi.js and start the rest of the game engine
 */
export const GamePage = () => {
  const [gameDiv, setGameDiv] = useState<HTMLDivElement | null>(null);

  const cheatsOn = useCheatsOn();
  const gameApi = useGame();
  const { cssUpscale, canvasSize } = useAppSelector((state) => state.upscale);

  usePageAsAnApp();
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
      <GameApiProvider gameApi={gameApi}>
        <Dialogs />
        {gameApi && cheatsOn && (
          <Suspense fallback={null}>
            <LazyCheats />
          </Suspense>
        )}
      </GameApiProvider>
    </>
  );
};
