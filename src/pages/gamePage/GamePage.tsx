import { useEffect, useState, Suspense, lazy } from "react";
import { type GameApi } from "../../game/GameApi.tsx";

// setting TextureStyle this helps containers with cacheAsTexture turned on to not go blurry when rendered:
import { GameApiProvider } from "../../game/components/GameApiContext.tsx";
import { useAppSelector } from "../../store/hooks.ts";
import { ConnectInputToStore } from "../../store/storeFlow/ConnectInputToStore.tsx";
import { Dialogs } from "../../game/components/dialogs/menuDialog/Dialogs.tsx";
import { useInputStateTracker } from "../../game/input/InputStateProvider.tsx";
import {
  useCheatsOn,
  useEmulatedResolutionName,
  useIsGameRunning,
} from "../../store/selectors.ts";
import type { OriginalCampaignRoomId } from "../../_generated/originalCampaign/OriginalCampaignRoomId.ts";
import { detectDeviceType } from "../../utils/detectDeviceType.tsx";
import { resolutions } from "../../originalGame.ts";
import type Cheats from "../../game/components/cheats/Cheats.tsx";
import { importOriginalCampaign } from "../../_generated/originalCampaign/campaign.import.ts";
import { importCheats } from "../../game/components/cheats/Cheats.import.ts";
import { importGameMain } from "../../game/gameMain.import.ts";
import { loadSpritesheet } from "../../sprites/spriteSheet.ts";
import { importTestCampaign } from "../../testCampaign.import.ts";
import { useLoading } from "../../game/components/LoadingContext.tsx";
import { importOnce } from "../../utils/importOnce.ts";
import { loadSounds } from "../../sound/soundsLoader.ts";
import { useCanvasInlineStyle } from "../../utils/scaledRendering/useCanvasInlineStyle.tsx";
import { store } from "../../store/store.ts";
import { errorCaught } from "../../store/slices/gameMenusSlice.ts";
import { createSerialisableErrors } from "../../utils/redux/createSerialisableErrors.ts";

const LazyCheats = lazy(importCheats) as typeof Cheats;

const loadGameAssets = importOnce((cheatsOn: boolean) => {
  return Promise.all([
    importGameMain(),
    importOriginalCampaign(),
    cheatsOn ? importTestCampaign() : undefined,
    loadSpritesheet(),
    loadSounds(),
  ]);
});

const useGame = (): GameApi<OriginalCampaignRoomId> | undefined => {
  const [gameApi, setGameApi] = useState<
    GameApi<OriginalCampaignRoomId> | undefined
  >();
  const isGameRunning = useIsGameRunning();
  const inputState = useInputStateTracker();
  const cheatsOn = useCheatsOn();
  const { loadingStarted, loadingFinished } = useLoading();

  useEffect(() => {
    if (!isGameRunning) {
      setGameApi(undefined);
      // the game isn't running, but we will pre-load the assets.
      // they can't load twice so this is ok
      loadGameAssets(cheatsOn);
      return;
    }
    let thisEffectCancelled = false;
    let thisEffectGameApi: GameApi<OriginalCampaignRoomId> | undefined;

    const go = async () => {
      try {
        // to avoid top-level await in Safari, load the sprites early:
        loadingStarted();
        const [
          gameMain,
          originalCampaignImport,
          testCampaignImport,
          //spriteSheet,
        ] = await loadGameAssets(cheatsOn);
        loadingFinished();

        if (!thisEffectCancelled) {
          const campaign =
            cheatsOn ?
              {
                ...originalCampaignImport.campaign,
                rooms: {
                  ...originalCampaignImport.campaign.rooms,
                  ...testCampaignImport?.testCampaign.rooms,
                },
              }
            : originalCampaignImport.campaign;

          thisEffectGameApi = await gameMain.default(campaign, inputState);
          setGameApi(thisEffectGameApi);
        }
      } catch (thrown) {
        store.dispatch(errorCaught(createSerialisableErrors(thrown)));
      }
    };

    go();

    return () => {
      thisEffectGameApi?.stop();
      thisEffectCancelled = true;
    };
  }, [cheatsOn, isGameRunning, inputState, loadingStarted, loadingFinished]);

  return gameApi;
};

const resClassName = (str: string) =>
  `res${str[0].toUpperCase()}${str.slice(1)}`;

const usePageAsAnApp = () => {
  const resolutionName = useEmulatedResolutionName();
  const { rotate90 } = useAppSelector((state) => state.gameMenus.upscale);

  useEffect(() => {
    // unchanging classes:
    document.body.classList.add(
      "overscroll-none",
      "overflow-hidden",
      "select-none",
      detectDeviceType(),
    );
  }, []);
  useEffect(() => {
    document.body.classList.remove(
      ...Object.keys(resolutions).map(resClassName),
    );
    document.body.classList.add(resClassName(resolutionName));
    document.body.classList.toggle("portrait-rot", rotate90);
  }, [resolutionName, rotate90]);
};

/**
 * React wrapper to give a space to pixi.js and start the rest of the game engine
 */
export const GamePage = () => {
  const [gameDiv, setGameDiv] = useState<HTMLDivElement | null>(null);

  const cheatsOn = useCheatsOn();
  const gameApi = useGame();
  const canvasSize = useAppSelector(
    (state) => state.gameMenus.upscale.canvasSize,
  );

  const canvasInlineStyle = useCanvasInlineStyle();

  usePageAsAnApp();
  useEffect(() => {
    if (gameDiv === null || gameApi === undefined) return;

    gameApi.renderIn(gameDiv);

    // disable the ios magnifier/text select thing on double-tap (withing the game only)
    gameDiv.addEventListener("touchstart", (e) => e.preventDefault(), {
      passive: false,
    });
  }, [gameApi, gameDiv]);

  useEffect(() => {
    gameApi?.resizeTo(canvasSize);
  }, [canvasSize, gameApi]);

  return (
    <>
      <div style={canvasInlineStyle} ref={setGameDiv} />
      <GameApiProvider gameApi={gameApi}>
        <ConnectInputToStore />
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
