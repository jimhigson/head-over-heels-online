import { useEffect, useState, Suspense, lazy } from "react";
import { type GameApi } from "../../game/GameApi.tsx";

// setting TextureStyle this helps containers with cacheAsTexture turned on to not go blurry when rendered:
import { GameApiProvider } from "../../game/components/GameApiContext.tsx";
import { useAppSelector } from "../../store/hooks.ts";
import { ConnectInputToStore } from "../../store/storeFlow/ConnectInputToStore.tsx";
import { Dialogs } from "../../game/components/dialogs/menuDialog/Dialogs.tsx";
import { useInputStateTracker } from "../../game/input/InputStateProvider.tsx";
import { useCheatsOn, useIsGameRunning } from "../../store/selectors.ts";
import type Cheats from "../../game/components/cheats/Cheats.tsx";
import { importCheats } from "../../game/components/cheats/Cheats.import.ts";
import { importGameMain } from "../../game/gameMain.import.ts";
import { loadSpritesheet } from "../../sprites/spriteSheet.ts";
import {
  manualLoadingStarted,
  manualLoadingFinished,
} from "../../store/slices/manualLoadingSlice.ts";
import { importOnce } from "../../utils/importOnce.ts";
import { loadSounds } from "../../sound/soundsLoader.ts";
import { useCanvasInlineStyle } from "../../utils/scaledRendering/useCanvasInlineStyle.tsx";
import { store } from "../../store/store.ts";
import { errorCaught } from "../../store/slices/gameMenusSlice.ts";
import { createSerialisableErrors } from "../../utils/redux/createSerialisableErrors.ts";
import { usePageAsAnApp } from "./usePageAsAnApp.tsx";
import { selectCanvasSize } from "../../store/slices/upscale/upscaleSlice.ts";
import { DispatchingErrorBoundary } from "../../utils/react/DispatchingErrorBoundary.tsx";

const LazyCheats = lazy(importCheats) as typeof Cheats;

const loadGameAssets = importOnce(() => {
  return Promise.all([importGameMain(), loadSpritesheet(), loadSounds()]);
});

const useCreateGameApi = (): GameApi<string> | undefined => {
  const [gameApi, setGameApi] = useState<GameApi<string> | undefined>();
  const isGameRunning = useIsGameRunning();
  const currentCampaignLocator = useAppSelector(
    (store) => store.gameMenus.gameInPlay.campaignLocator,
  );
  const inputState = useInputStateTracker();

  useEffect(() => {
    if (!isGameRunning) {
      setGameApi(undefined);
      // the game isn't running, but we will pre-load the assets.
      // they can't load twice so this is safe to call any time
      loadGameAssets();
      return;
    }

    let thisEffectCancelled = false;
    let thisEffectGameApi: GameApi<string> | undefined;

    const go = async () => {
      let startedLoading = false;
      try {
        if (currentCampaignLocator === undefined) {
          throw new Error(
            "game is marked as running, but we have no campaign locator, no way to know which campaign to load",
          );
        }

        startedLoading = true;
        store.dispatch(manualLoadingStarted());
        const [{ default: gameMain }] = await loadGameAssets();
        store.dispatch(manualLoadingFinished());

        if (!thisEffectCancelled) {
          thisEffectGameApi = await gameMain(
            currentCampaignLocator,
            inputState,
          );
          setGameApi(thisEffectGameApi);
        }
      } catch (thrown) {
        if (startedLoading) {
          store.dispatch(manualLoadingFinished());
        }
        // also put on console - sometimes stack trace is easier to read there
        console.error(thrown);
        store.dispatch(
          errorCaught(
            createSerialisableErrors(
              new Error("error in loading game assets or state", {
                cause: thrown,
              }),
            ),
          ),
        );
      }
    };

    go();

    return () => {
      thisEffectGameApi?.stop();
      thisEffectCancelled = true;
    };
  }, [isGameRunning, inputState, currentCampaignLocator]);

  return gameApi;
};

/**
 * React wrapper to give a space to pixi.js and start the rest of the game engine
 */
export const GamePage = () => {
  const [renderArea, setRenderArea] = useState<HTMLDivElement | null>(null);

  const cheatsOn = useCheatsOn();
  const gameApi = useCreateGameApi();
  const canvasSize = useAppSelector(selectCanvasSize);

  const canvasInlineStyle = useCanvasInlineStyle();

  usePageAsAnApp();
  useEffect(() => {
    if (renderArea === null || gameApi === undefined) return;

    gameApi.renderIn(renderArea);

    // disable the ios magnifier/text select thing on double-tap (withing the game only)
    renderArea.addEventListener("touchstart", (e) => e.preventDefault(), {
      passive: false,
    });
  }, [gameApi, renderArea]);

  useEffect(() => {
    gameApi?.resizeTo(canvasSize);
  }, [canvasSize, gameApi]);

  return (
    <>
      {/* 👇👇 where the magic happens - the element the game plays in! 👇👇 */}
      <div
        // without tabIndex here, Chrome doesn't allow tab key to be used to open the map
        // (or anything else) because it moves focus to the address bar
        tabIndex={0}
        style={canvasInlineStyle}
        ref={setRenderArea}
      />
      <GameApiProvider gameApi={gameApi}>
        <DispatchingErrorBoundary>
          <ConnectInputToStore />
          <Dialogs />
        </DispatchingErrorBoundary>
        {gameApi && cheatsOn && (
          <Suspense fallback={null}>
            <LazyCheats />
          </Suspense>
        )}
      </GameApiProvider>
    </>
  );
};
