import { BitmapText } from "../../../../Sprite";
import { keys } from "../../../../../../utils/entries";
import { keyAssignmentPresets } from "../../../../../input/keyAssignmentPresets";
import { MenuItems } from "../../MenuItems";
import { SelectedItemHint } from "../../SelectedItemHint";
import { Dialog } from "../../../../../../ui/dialog";
import { Border } from "../../../../../../ui/Border";
import { DialogPortal } from "../../../../../../ui/DialogPortal";
import { InputPresetMenuItem } from "./InputPresetMenuItem";
import Portal from "@mutabazia/react-portal";
import { BackMenuItem } from "../../BackMenuItem";
import { backToParentMenu } from "../../../../../../store/slices/gameMenusSlice";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchCallback";
import { MenuItemSeparator } from "../../MenuItemSeparator";

export const InputPresetDialog = () => {
  return (
    <DialogPortal>
      <Border
        className="bg-midGrey zx:bg-zxWhiteDimmed"
        onClick={useDispatchActionCallback(backToParentMenu)}
      />
      <Dialog className="bg-white">
        <Portal.Provider>
          <BitmapText
            TagName="h1"
            className="text-midRed zx:text-zxRed sprites-double-height ml-3"
          >
            Key presets
          </BitmapText>
          <MenuItems className="text-metallicBlue zx:text-zxBlue selectedMenuItem:text-moss zx:selectedMenuItem:text-zxMagenta">
            {keys(keyAssignmentPresets).map((presetName) => (
              <InputPresetMenuItem key={presetName} presetName={presetName} />
            ))}
            <MenuItemSeparator />
            <BackMenuItem />
          </MenuItems>
          <SelectedItemHint className="text-midGrey zx:text-zxMagenta" />
        </Portal.Provider>
      </Dialog>
    </DialogPortal>
  );
};
