import type { EmptyObject } from "type-fest";

import type { MarkdownPageName } from "../../../../manual/pages";
import type { DialogId } from "./DialogId";

import { useAppSelector } from "../../../../store/hooks";
import { Dialog } from "../../../../ui/dialog";
import { BitmapText } from "../../tailwindSprites/Sprite";
import { CommunityGamesDialog } from "./dialogs/communityGames/CommunityGamesDialog";
import { ControlOptionsDialog } from "./dialogs/controlOptions/ControlOptionsDialog";
import { CrownsDialog } from "./dialogs/crowns/crownsDialog";
import { DisplayOptionsDialog } from "./dialogs/displayOptions/DisplayOptionsDialog";
import { EmulatedResolutionDialog } from "./dialogs/emulatedResolution/EmulatedResolutionDialog";
import { ErrorCaughtDialog } from "./dialogs/errorCaught/ErrorCaughtDialog";
import { HoldDialog } from "./dialogs/hold/holdDialog";
import { InputPresetDialog } from "./dialogs/inputPreset/InputPresetDialog";
import { MainMenuDialog } from "./dialogs/mainMenu/mainMenuDialog";
import { MapDialog } from "./dialogs/map/MapDialog";
import { MarkdownDialog } from "./dialogs/markdown/MarkdownDialog";
import { OfferReincarnationDialog } from "./dialogs/offerReincarnation/OfferReincarnationDialog";
import { OptionsDialog } from "./dialogs/options/OptionsDialog";
import { ProclaimEmperorDialog } from "./dialogs/proclaimEmperor/proclaimEmperorDialog";
import { QuitGameConfirmDialog } from "./dialogs/quitGameConfirm/quitGameConfirmDialog";
import { ReadTheManualDialog } from "./dialogs/readTheManualDialog";
import { ReincarnatedRestartDialog } from "./dialogs/reincarnatedRestart/ReincarnatedRestartDialog";
import { ScoreDialog } from "./dialogs/score/ScoreDialog";
import { SoundDialog } from "./dialogs/sound/SoundDialog";
import { SureWantEditorDialog } from "./dialogs/sureWantEditor/SureWantEditorDialog";
import { WhichGameDialog } from "./dialogs/whichGame/WhichGameDialog";

const isMarkdownPage = <D extends DialogId>(
  menuId: D,
): menuId is Extract<D, `markdown/${string}`> => menuId.startsWith("markdown/");

export const Dialogs = (_emptyProps: EmptyObject) => {
  const topOpenMenu = useAppSelector((state) =>
    state.gameMenus.openMenus.at(0),
  );

  if (topOpenMenu === undefined) {
    return null;
  }

  if (isMarkdownPage(topOpenMenu.menuId)) {
    if (topOpenMenu.menuId === "markdown/inline") {
      // inline markdown pages are passed the markdown content directly - this is for scrolls added
      // in the level editor, since they can contain any text the room creator wants
      return (
        <MarkdownDialog
          source="inline"
          markdown={topOpenMenu.menuParam.markdown}
        />
      );
    } else {
      // standard manual pages:
      return (
        <MarkdownDialog
          source="manual"
          pageName={
            topOpenMenu.menuId.slice("markdown/".length) as MarkdownPageName
          }
        />
      );
    }
  }

  switch (topOpenMenu.menuId) {
    case "communityGames":
      return <CommunityGamesDialog />;
    case "controlOptions":
      return <ControlOptionsDialog />;
    case "crowns":
      return <CrownsDialog playMusic={topOpenMenu.menuParam.playMusic} />;
    case "emulatedResolution":
      return <EmulatedResolutionDialog />;
    case "errorCaught":
      return <ErrorCaughtDialog errors={topOpenMenu.menuParam} />;
    case "hold":
      return <HoldDialog />;
    case "inputPreset":
      return <InputPresetDialog />;
    case "installGuide":
      return <MarkdownDialog source="manual" pageName="installGuide" />;
    case "mainMenu":
      return <MainMenuDialog />;
    case "map":
      return <MapDialog />;
    case "modernisationOptions":
      return <OptionsDialog />;
    case "offerReincarnation":
      return <OfferReincarnationDialog />;
    case "proclaimEmperor":
      return <ProclaimEmperorDialog />;
    case "quitGameConfirm":
      return <QuitGameConfirmDialog />;
    case "readTheManual":
      return <ReadTheManualDialog />;
    case "reincarnatedRestart":
      return <ReincarnatedRestartDialog />;
    case "score":
      return <ScoreDialog />;
    case "displayOptions":
      return <DisplayOptionsDialog />;
    case "sound":
      return <SoundDialog />;
    case "sureWantEditor":
      return <SureWantEditorDialog />;
    case "whichGame":
      return <WhichGameDialog />;
    default:
      topOpenMenu.menuId satisfies never;
      return (
        <Dialog>
          <BitmapText>{`unknown dialog ${topOpenMenu}`}</BitmapText>
        </Dialog>
      );
  }
};
