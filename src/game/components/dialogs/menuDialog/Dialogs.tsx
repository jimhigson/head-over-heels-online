import type { EmptyObject } from "type-fest";
import { useAppSelector } from "../../../../store/hooks";
import { ReadTheManualDialog } from "./menus/readTheManualDialog";
import type { DialogId } from "./menus";
import { MarkdownDialog } from "./menus/markdown/MarkdownDialog";
import type { MarkdownPageName } from "../../../../manual/pages";
import { CrownsDialog } from "./menus/crowns/crownsDialog";
import { MainMenuDialog } from "./menus/mainMenu/mainMenuDialog";
import { QuitGameConfirmDialog } from "./menus/quitGameConfirmDialog";
import { ScoreDialog } from "./menus/gameOver/gameOverDialog";
import { HoldDialog } from "./menus/holdDialog";
import { ModernisationOptionsDialog } from "./menus/modernisationOptions/modernisationOptionsDialog";
import { ControlOptionsDialog } from "./menus/controlOptions/ControlOptionsDialog";
import { Dialog } from "../../../../ui/dialog";
import { BitmapText } from "../../Sprite";
import { InputPresetDialog } from "./menus/inputPreset/InputPresetDialog";
import { ProclaimEmperorDialog } from "./menus/proclaimEmperor/proclaimEmperorDialog";

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
    case "gameOver":
      return <ScoreDialog />;
    case "hold":
      return <HoldDialog />;
    case "modernisationOptions":
      return <ModernisationOptionsDialog />;
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
