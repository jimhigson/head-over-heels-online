import type { EmptyObject } from "type-fest";
import { useAppSelector } from "../../../../store/hooks";
import { ReadTheManualDialog } from "./dialogs/readTheManualDialog";
import type { DialogId } from "./menus";
import { MarkdownDialog } from "./dialogs/markdown/MarkdownDialog";
import type { MarkdownPageName } from "../../../../manual/pages";
import { CrownsDialog } from "./dialogs/crowns/crownsDialog";
import { MainMenuDialog } from "./dialogs/mainMenu/mainMenuDialog";
import { QuitGameConfirmDialog } from "./dialogs/quitGameConfirmDialog";
import { ScoreDialog } from "./dialogs/score/ScoreDialog";
import { HoldDialog } from "./dialogs/holdDialog";
import { ModernisationOptionsDialog } from "./dialogs/modernisationOptions/modernisationOptionsDialog";
import { ControlOptionsDialog } from "./dialogs/controlOptions/ControlOptionsDialog";
import { Dialog } from "../../../../ui/dialog";
import { BitmapText } from "../../Sprite";
import { InputPresetDialog } from "./dialogs/inputPreset/InputPresetDialog";
import { ProclaimEmperorDialog } from "./dialogs/proclaimEmperor/proclaimEmperorDialog";
import { EmulatedResolutionDialog } from "./dialogs/emulatedResolution/EmulatedResolutionDialog";

const isMarkdownPage = <D extends DialogId>(
  menuId: D,
): menuId is Extract<D, `markdown/${string}`> => menuId.startsWith("markdown/");

export const Dialogs = (_emptyProps: EmptyObject) => {
  const dialogId = useAppSelector((state) => state.openMenus.at(0)?.menuId);

  if (dialogId === undefined) {
    return null;
  }

  if (isMarkdownPage(dialogId)) {
    return (
      <MarkdownDialog
        pageName={dialogId.slice("markdown/".length) as MarkdownPageName}
      />
    );
  }

  switch (dialogId) {
    case "mainMenu":
      return <MainMenuDialog />;
    case "quitGameConfirm":
      return <QuitGameConfirmDialog />;
    case "readTheManual":
      return <ReadTheManualDialog />;
    case "crowns":
      return <CrownsDialog />;
    case "score":
      return <ScoreDialog />;
    case "hold":
      return <HoldDialog />;
    case "modernisationOptions":
      return <ModernisationOptionsDialog />;
    case "emulatedResolution":
      return <EmulatedResolutionDialog />;
    case "controlOptions":
      return <ControlOptionsDialog />;
    case "inputPreset":
      return <InputPresetDialog />;
    case "proclaimEmperor":
      return <ProclaimEmperorDialog />;
    default:
      dialogId satisfies never;
      return (
        <Dialog>
          <BitmapText>{`unknown dialog ${dialogId}`}</BitmapText>
        </Dialog>
      );
  }
};
