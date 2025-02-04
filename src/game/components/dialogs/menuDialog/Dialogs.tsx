import type { EmptyObject } from "type-fest";
import { useAppSelector } from "../../../../store/hooks";
import { ReadTheManualMenu } from "./menus/readTheManualMenu";
import type { DialogId } from "./menus";
import { MarkdownDialog } from "./MarkdownDialog";
import type { MarkdownPageName } from "../../../../manual/pages";
import { CrownsDialog } from "./menus/crowns/crownsDialog";
import { MainMenuDialog } from "./menus/mainMenu/mainMenuDialog";
import { QuitGameConfirmDialog } from "./menus/quitGameConfirmDialog";
import { GameOverDialog } from "./menus/gameOver/gameOverDialog";
import { HoldDialog } from "./menus/holdDialog";
import { ModernisationOptionsDialog } from "./menus/modernisationOptionsMenu";
import { SelectKeysDialog } from "./menus/selectKeys/SelectKeysDialog";
import { Dialog } from "../../../../components/ui/dialog";
import { BitmapText } from "../../Sprite";
import { InputPresetDialog } from "./menus/inputPreset/InputPresetDialog";

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
      return <ReadTheManualMenu />;
    case "crowns":
      return <CrownsDialog />;
    case "gameOver":
      return <GameOverDialog />;
    case "hold":
      return <HoldDialog />;
    case "modernisationOptions":
      return <ModernisationOptionsDialog />;
    case "selectKeys":
      return <SelectKeysDialog />;
    case "inputPreset":
      return <InputPresetDialog />;
    default:
      dialogId satisfies never;
      return (
        <Dialog>
          <BitmapText>{`unknown dialog ${dialogId}`}</BitmapText>
        </Dialog>
      );
  }
};
