import { lazy, Suspense } from "preact/compat";
import { useEffect, useState } from "preact/hooks";
import { shallowEqual } from "react-redux";

import type Cheats from "../../game/components/cheats/Cheats.tsx";

import { AddAnalyticsToStore } from "../../analytics/AddAnalyticsToStore.tsx";
import { importCheats } from "../../game/components/cheats/Cheats.import.ts";
import { Dialogs } from "../../game/components/dialogs/menuDialog/Dialogs.tsx";
// setting TextureStyle this helps containers with cacheAsTexture turned on to not go blurry when rendered:
import { GameApiProvider } from "../../game/components/GameApiContext.tsx";
import { type GameApi } from "../../game/GameApi.tsx";
import { importGameMainOnce } from "../../game/gameMain.import.ts";
import { useInputStateTracker } from "../../game/input/InputStateProvider.tsx";
import { useAppSelector } from "../../store/hooks.ts";
import { withLoadingCaptured } from "../../store/slices/assetsLoading/assetsLoadingSlice.ts";
import {
  useCheatsOn,
  useIsGameRunning,
} from "../../store/slices/gameMenus/gameMenusSelectors.ts";
import { errorCaught } from "../../store/slices/gameMenus/gameMenusSlice.ts";
import {
  selectCanvasSize,
  selectRot90,
} from "../../store/slices/upscale/upscaleSlice.ts";
import { useUpdateUpscaleOnDisplaySettingsChange } from "../../store/slices/upscale/useUpdateUpscaleOnDisplaySettingsChange.ts";
import { useUpdateUpscaleWhenElementResizes } from "../../store/slices/upscale/useUpdateUpscaleWhenElementResizes.ts";
import { store } from "../../store/store.ts";
import { ConnectInputToStore } from "../../store/storeFlow/ConnectInputToStore.tsx";
import { DispatchingErrorBoundary } from "../../utils/preact/DispatchingErrorBoundary.tsx";
import { createSerialisableErrors } from "../../utils/redux/createSerialisableErrors.ts";
import {
  useCanvasInlineStyle,
  useMaybeRotated,
} from "../../utils/scaledRendering/useCanvasInlineStyle.tsx";
import { usePageAsAnApp } from "./usePageAsAnApp.tsx";

const LazyCheats = lazy(importCheats) as typeof Cheats;

const useCreateGameApi = (): GameApi<string> | undefined => {
  const [gameApi, setGameApi] = useState<GameApi<string> | undefined>();
  const isGameRunning = useIsGameRunning();
  // shallowEqual: don't re-run the effect on equivalent campaign locator objects
  // eg, if redux-persist rehydration replaces it with an equivalent one
  const currentCampaignLocator = useAppSelector(
    (store) => store.gameInPlay.gameInPlay.campaignLocator,
    shallowEqual,
  );
  const inputState = useInputStateTracker();

  useEffect(() => {
    if (!isGameRunning) {
      // no game running - the side effect removes the gameapi
      setGameApi(undefined);
      if (import.meta.env.MODE === "visual-regression") {
        window._e2e_gamePageGameAi = undefined;
      }
      // no asset pre-loading here, we're trusting the sw and the manifest to have these ready when we need them late
      return;
    }

    let thisEffectCancelled = false;
    let thisEffectGameApi: GameApi<string> | undefined;

    const go = async () => {
      try {
        if (currentCampaignLocator === undefined) {
          throw new Error(
            "game is marked as running, but we have no campaign locator, no way to know which campaign to load",
          );
        }

        // withLoadingCaptured shows the loading indicator for the whole load
        // (game code + campaign + sounds + pixi) and re-throws into the catch
        // below on failure
        thisEffectGameApi = await store.dispatch(
          withLoadingCaptured(async () => {
            const gameMain = (await importGameMainOnce()).default;
            return gameMain(currentCampaignLocator, inputState);
          }),
        );

        if (thisEffectCancelled) {
          // creating the game api is async, so while we were creating it is possible
          // it has already been cleaned up, ie if the effect is mounting/unmounting often.
          thisEffectGameApi.stop();
          return;
        }
        setGameApi(thisEffectGameApi);
        if (import.meta.env.MODE === "visual-regression") {
          window._e2e_gamePageGameAi = thisEffectGameApi;
        }
      } catch (thrown) {
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
  // an element sized by CSS to fill the screen; its size drives the upscale.
  // Measuring this via a ResizeObserver (rather than reading
  // window.innerWidth/innerHeight on the window 'resize' event) tracks the real
  // available area more reliably on iOS, where the standalone PWA viewport
  // settles late after rotation.
  const [renderSizingArea, setRenderSizingArea] =
    useState<HTMLDivElement | null>(null);

  const cheatsOn = useCheatsOn();
  const gameApi = useCreateGameApi();
  const canvasSize = useAppSelector(selectCanvasSize);
  const rot90 = useAppSelector(selectRot90);

  const canvasInlineStyle = useCanvasInlineStyle();

  usePageAsAnApp();
  useUpdateUpscaleWhenElementResizes(undefined, renderSizingArea ?? undefined);
  useUpdateUpscaleOnDisplaySettingsChange(
    undefined,
    renderSizingArea ?? undefined,
  );
  useEffect(() => {
    if (renderArea === null || gameApi === undefined) {
      return;
    }

    gameApi.renderIn(renderArea);

    // disable the ios magnifier/text select thing on double-tap (withing the game only)
    renderArea.addEventListener("touchstart", (e) => e.preventDefault(), {
      passive: false,
    });
  }, [gameApi, renderArea]);

  useEffect(() => {
    gameApi?.resizeTo(canvasSize, rot90);
  }, [canvasSize, gameApi, rot90]);

  return (
    <>
      {/* 👇👇 where the magic happens - the element the game plays in! 👇👇 */}
      {/* the sizing area fills the real screen via css; its measured size drives
          the upscale, so the backdrop covers the whole screen even if the
          upscale is briefly computed from a wrong viewport */}
      <div ref={setRenderSizingArea} class="fixed inset-0">
        <div
          // without tabIndex here, Chrome doesn't allow tab key to be used to open the map
          // (or anything else) because it moves focus to the address bar
          tabIndex={0}
          // without top-0/left-0, sometimes on MacOs Safari, after going to the map and back
          // the game's area is rendered scrolled up the screen
          class="absolute top-0 left-0"
          style={canvasInlineStyle}
          ref={setRenderArea}
        />
      </div>
      <GameApiProvider gameApi={gameApi}>
        <DispatchingErrorBoundary>
          <AddAnalyticsToStore />
          <ConnectInputToStore />

          {/*
          dialogs are html and therefore rotated using css, as opposed
          to the game engine which can be rotated using opengl transforms
          */}
          <div style={useMaybeRotated()}>
            <Dialogs />
          </div>
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
