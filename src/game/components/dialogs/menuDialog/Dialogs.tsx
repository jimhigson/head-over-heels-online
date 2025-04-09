import type { EmptyObject } from "type-fest";
import { useAppSelector } from "../../../../store/hooks";
import { ReadTheManualDialog } from "./dialogs/readTheManualDialog";
import type { DialogId } from "./menus";
import { MarkdownDialog } from "./dialogs/markdown/MarkdownDialog";
import type { MarkdownPageName } from "../../../../manual/pages";
import { CrownsDialog } from "./dialogs/crowns/crownsDialog";
import { MainMenuDialog } from "./dialogs/mainMenu/mainMenuDialog";
import { QuitGameConfirmDialog } from "./dialogs/quitGameConfirm/quitGameConfirmDialog";
import { ScoreDialog } from "./dialogs/score/ScoreDialog";
import { HoldDialog } from "./dialogs/holdDialog";
import { ModernisationOptionsDialog } from "./dialogs/modernisationOptions/modernisationOptionsDialog";
import { ControlOptionsDialog } from "./dialogs/controlOptions/ControlOptionsDialog";
import { Dialog } from "../../../../ui/dialog";
import { BitmapText } from "../../Sprite";
import { InputPresetDialog } from "./dialogs/inputPreset/InputPresetDialog";
import { ProclaimEmperorDialog } from "./dialogs/proclaimEmperor/proclaimEmperorDialog";
import { EmulatedResolutionDialog } from "./dialogs/emulatedResolution/EmulatedResolutionDialog";
import { OfferReincarnationDialog } from "./dialogs/offerReincarnation/OfferReincarnationDialog";
import { ErrorCaughtDialog } from "./dialogs/errorCaught/ErrorCaughtDialog";
import { MapDialog } from "./dialogs/map/MapDialog";
import { withErrorBoundary } from "../../../../utils/react/ErrorBoundary";

const isMarkdownPage = <D extends DialogId>(
  menuId: D,
): menuId is Extract<D, `markdown/${string}`> => menuId.startsWith("markdown/");

export const Dialogs = withErrorBoundary((_emptyProps: EmptyObject) => {
  const topOpenMenu = useAppSelector((state) =>
    state.gameMenus.openMenus.at(0),
  );

  if (topOpenMenu === undefined) {
    return null;
  }

  if (isMarkdownPage(topOpenMenu.menuId)) {
    return (
      <MarkdownDialog
        pageName={
          topOpenMenu.menuId.slice("markdown/".length) as MarkdownPageName
        }
      />
    );
  }

  switch (topOpenMenu.menuId) {
    case "controlOptions":
      return <ControlOptionsDialog />;
    case "crowns":
      return <CrownsDialog playMusic={topOpenMenu.menuParam.playMusic} />;
    case "emulatedResolution":
      return <EmulatedResolutionDialog />;
    case "errorCaught":
      return <ErrorCaughtDialog {...topOpenMenu.menuParam} />;
    case "hold":
      return <HoldDialog />;
    case "inputPreset":
      return <InputPresetDialog />;
    case "installGuide":
      return <MarkdownDialog pageName="installGuide" />;
    case "mainMenu":
      return <MainMenuDialog />;
    case "map":
      return <MapDialog />;
    case "modernisationOptions":
      return <ModernisationOptionsDialog />;
    case "offerReincarnation":
      return <OfferReincarnationDialog />;
    case "proclaimEmperor":
      return <ProclaimEmperorDialog />;
    case "quitGameConfirm":
      return <QuitGameConfirmDialog />;
    case "readTheManual":
      return <ReadTheManualDialog />;
    case "score":
      return <ScoreDialog />;
    default:
      topOpenMenu.menuId satisfies never;
      return (
        <Dialog>
          <BitmapText>{`unknown dialog ${topOpenMenu}`}</BitmapText>
        </Dialog>
      );
  }
});
