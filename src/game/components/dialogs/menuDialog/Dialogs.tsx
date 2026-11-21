import { useEffect, useReducer, useState } from "preact/hooks";
import { type EmptyObject } from "type-fest";

import { type MarkdownPageName } from "../../../../manual/pages";
import { loadSoundCategory } from "../../../../sound/soundsLoader";
import { useAppSelector } from "../../../../store/hooks";
import { AssetLoading } from "../../../../store/slices/assetsLoading/AssetLoading";
import { type OpenMenu } from "../../../../store/slices/gameMenus/gameMenusSlice";
import {
  msUntilDrawnMenuChanges,
  selectMenuToDraw,
} from "../../../../store/slices/gameMenus/selectDrawnMenu";
import { Dialog } from "../../../../ui/Dialog";
import { appTicker } from "../../../../utils/ticker/appTickerInstance";
import { type DialogId } from "./DialogId";
import { LazyAboutDialog } from "./dialogs/about/AboutDialog.lazy";
import { LazyCommunityGamesDialog } from "./dialogs/communityGames/CommunityGamesDialog.lazy";
import { LazyControlOptionsDialog } from "./dialogs/controlOptions/ControlOptionsDialog.lazy";
import { LazyCrownsDialog } from "./dialogs/crowns/CrownsDialog.lazy";
import { LazyDeathDialog } from "./dialogs/death/DeathDialog.lazy";
import { LazyDisplayOptionsDialog } from "./dialogs/displayOptions/DisplayOptionsDialog.lazy";
import { LazyEmulatedResolutionDialog } from "./dialogs/emulatedResolution/EmulatedResolutionDialog.lazy";
import { ErrorCaughtDialog } from "./dialogs/errorCaught/ErrorCaughtDialog";
import { LazyHoldDialog } from "./dialogs/hold/HoldDialog.lazy";
import { LazyInputPresetDialog } from "./dialogs/inputPreset/InputPresetDialog.lazy";
import { LazyInstallDialog } from "./dialogs/install/InstallDialog.lazy";
import { MainMenuDialog } from "./dialogs/mainMenu/MainMenuDialog";
import { LazyMapDialog } from "./dialogs/map/MapDialog.lazy";
import { LazyMarkdownDialog } from "./dialogs/markdown/MarkdownDialog.lazy";
import { LazyNeedRefreshDialog } from "./dialogs/needRefresh/NeedRefreshDialog.lazy";
import { LazyOfferReincarnationDialog } from "./dialogs/offerReincarnation/OfferReincarnationDialog.lazy";
import { LazyOptionsDialog } from "./dialogs/options/OptionsDialog.lazy";
import { LazyProclaimEmperorDialog } from "./dialogs/proclaimEmperor/ProclaimEmperorDialog.lazy";
import { LazyQuitGameConfirmDialog } from "./dialogs/quitGameConfirm/QuitGameConfirmDialog.lazy";
import { LazyReadTheManualDialog } from "./dialogs/ReadTheManualDialog.lazy";
import { LazyReincarnatedRestartDialog } from "./dialogs/reincarnatedRestart/ReincarnatedRestartDialog.lazy";
import { LazyScoreDialog } from "./dialogs/score/ScoreDialog.lazy";
import { SmoothingDialog } from "./dialogs/smoothing/SmoothingDialog";
import { LazySoundDialog } from "./dialogs/sound/SoundDialog.lazy";
import { WhichGameDialog } from "./dialogs/whichGame/WhichGameDialog";

const isMarkdownPage = <D extends DialogId>(
  menuId: D,
): menuId is Extract<D, `markdown/${string}`> => menuId.startsWith("markdown/");

/**
 * the menu to draw now, re-rendering whenever a show delay runs out - the
 * store doesn't change then, so nothing else would
 */
const useDrawnMenu = (): OpenMenu | undefined => {
  const [renders, rerender] = useReducer(
    (count: number, _rerendered: void) => count + 1,
    0,
  );
  const gameMenus = useAppSelector((state) => state.gameMenus);
  // a new selector each render, so it is read again at the time of the render
  const drawnMenu = useAppSelector((state) =>
    selectMenuToDraw(state, appTicker.time),
  );

  useEffect(() => {
    const changesInMs = msUntilDrawnMenuChanges(gameMenus, appTicker.time);
    if (changesInMs === undefined) {
      return;
    }
    return appTicker.setTimeout(changesInMs, rerender);
  }, [gameMenus, renders]);

  return drawnMenu;
};

export const Dialogs = (_emptyProps: EmptyObject) => {
  const topOpenMenu = useDrawnMenu();
  const [areSoundsLoaded, setAreSoundsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const maybePromise = loadSoundCategory("loadForMenus");

    if (maybePromise === undefined) {
      setAreSoundsLoaded(true);
    } else {
      maybePromise.then(() => setAreSoundsLoaded(true));
    }
  }, []);

  if (topOpenMenu === undefined) {
    // no dialog to load
    return null;
  }
  if (
    !areSoundsLoaded &&
    // make an exception for the error dialog - want to show errors even if
    // sounds fail to load and/or are still loading:
    topOpenMenu.menuId !== "errorCaught"
  ) {
    // is a dialog to show but we are still loading the sounds so wait until
    // they are ready
    return <AssetLoading />;
  }

  if (isMarkdownPage(topOpenMenu.menuId)) {
    if (topOpenMenu.menuId === "markdown/inline") {
      // inline markdown pages are passed the markdown content directly - this is for scrolls added
      // in the level editor, since they can contain any text the room creator wants
      return (
        <LazyMarkdownDialog
          source="inline"
          markdown={topOpenMenu.menuParam.markdown}
          dialogId="markdown/inline"
        />
      );
    }
    // standard manual pages:
    const pageName = topOpenMenu.menuId.slice(
      "markdown/".length,
    ) as MarkdownPageName;
    return (
      <LazyMarkdownDialog
        source="manual"
        pageName={pageName}
        dialogId={topOpenMenu.menuId}
      />
    );
  }

  switch (topOpenMenu.menuId) {
    case "about":
      return <LazyAboutDialog />;
    case "cmdk":
      // rendered by the cheats, which only exist while cheating
      return null;
    case "communityGames":
      return <LazyCommunityGamesDialog />;
    case "death":
      return <LazyDeathDialog {...topOpenMenu.menuParam} />;
    case "controlOptions":
      return <LazyControlOptionsDialog />;
    case "crowns":
      return <LazyCrownsDialog playMusic={topOpenMenu.menuParam.playMusic} />;
    case "emulatedResolution":
      return <LazyEmulatedResolutionDialog />;
    case "errorCaught":
      return <ErrorCaughtDialog />;
    case "hold":
      return <LazyHoldDialog />;
    case "inputPreset":
      return <LazyInputPresetDialog />;
    case "mainMenu":
      return <MainMenuDialog />;
    case "map":
      return <LazyMapDialog />;
    case "needRefresh":
      return <LazyNeedRefreshDialog />;
    case "modernisationOptions":
      return <LazyOptionsDialog />;
    case "offerReincarnation":
      return <LazyOfferReincarnationDialog />;
    case "proclaimEmperor":
      return <LazyProclaimEmperorDialog />;
    case "quitGameConfirm":
      return <LazyQuitGameConfirmDialog />;
    case "readTheManual":
      return <LazyReadTheManualDialog />;
    case "reincarnatedRestart":
      return <LazyReincarnatedRestartDialog />;
    case "score":
      return <LazyScoreDialog />;
    case "displayOptions":
      return <LazyDisplayOptionsDialog />;
    case "smoothing":
      return <SmoothingDialog />;
    case "sound":
      return <LazySoundDialog />;
    case "whichGame":
      return <WhichGameDialog />;
    case "installGuide":
      return <LazyInstallDialog />;

    default:
      topOpenMenu.menuId satisfies never;
      return (
        <Dialog>
          <span class="text-single-line pl-1">{`unknown dialog: ‘${topOpenMenu.menuId}’`}</span>
        </Dialog>
      );
  }
};
