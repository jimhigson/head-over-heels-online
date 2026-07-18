import { useEffect, useState } from "preact/hooks";
import { type EmptyObject } from "type-fest";

import { type MarkdownPageName } from "../../../../manual/pages";
import { loadSoundCategory } from "../../../../sound/soundsLoader";
import { useAppSelector } from "../../../../store/hooks";
import { AssetLoading } from "../../../../store/slices/assetsLoading/AssetLoading";
import { Dialog } from "../../../../ui/Dialog";
import { type DialogId } from "./DialogId";
import { LazyAboutDialog } from "./dialogs/about/AboutDialog.lazy";
import { LazyCommunityGamesDialog } from "./dialogs/communityGames/CommunityGamesDialog.lazy";
import { LazyControlOptionsDialog } from "./dialogs/controlOptions/ControlOptionsDialog.lazy";
import { CrownsDialog } from "./dialogs/crowns/CrownsDialog";
import { DeathDialog } from "./dialogs/death/DeathDialog";
import { LazyDisplayOptionsDialog } from "./dialogs/displayOptions/DisplayOptionsDialog.lazy";
import { LazyEmulatedResolutionDialog } from "./dialogs/emulatedResolution/EmulatedResolutionDialog.lazy";
import { ErrorCaughtDialog } from "./dialogs/errorCaught/ErrorCaughtDialog";
import { HoldDialog } from "./dialogs/hold/HoldDialog";
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
import { ReincarnatedRestartDialog } from "./dialogs/reincarnatedRestart/ReincarnatedRestartDialog";
import { LazyScoreDialog } from "./dialogs/score/ScoreDialog.lazy";
import { LazySoundDialog } from "./dialogs/sound/SoundDialog.lazy";
import { LazySureWantEditorDialog } from "./dialogs/sureWantEditor/SureWantEditorDialog.lazy";
import { WhichGameDialog } from "./dialogs/whichGame/WhichGameDialog";

const isMarkdownPage = <D extends DialogId>(
  menuId: D,
): menuId is Extract<D, `markdown/${string}`> => menuId.startsWith("markdown/");

export const Dialogs = (_emptyProps: EmptyObject) => {
  const topOpenMenu = useAppSelector((state) =>
    state.gameMenus.openMenus.at(0),
  );
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
  if (!areSoundsLoaded) {
    // is a dialog to load but we are still loading the sounds
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
    case "communityGames":
      return <LazyCommunityGamesDialog />;
    case "death":
      return <DeathDialog {...topOpenMenu.menuParam} />;
    case "controlOptions":
      return <LazyControlOptionsDialog />;
    case "crowns":
      return <CrownsDialog playMusic={topOpenMenu.menuParam.playMusic} />;
    case "emulatedResolution":
      return <LazyEmulatedResolutionDialog />;
    case "errorCaught":
      return <ErrorCaughtDialog errors={topOpenMenu.menuParam} />;
    case "hold":
      return <HoldDialog />;
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
      return <ReincarnatedRestartDialog />;
    case "score":
      return <LazyScoreDialog />;
    case "displayOptions":
      return <LazyDisplayOptionsDialog />;
    case "sound":
      return <LazySoundDialog />;
    case "sureWantEditor":
      return <LazySureWantEditorDialog />;
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
