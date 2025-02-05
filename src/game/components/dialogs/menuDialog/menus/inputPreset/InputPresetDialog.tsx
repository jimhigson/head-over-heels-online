import { BitmapText } from "../../../../Sprite";
import { keys } from "../../../../../../utils/entries";
import { keyAssignmentPresets } from "../../../../../input/keyAssignmentPresets";
import { MenuItems } from "../../MenuItems";
import { SelectedItemHint } from "../../SelectedItemHint";
import { Border, Dialog } from "../../../../../../components/ui/dialog";
import { InputPresetMenuItem } from "./InputPresetMenuItem";
import Portal from "@mutabazia/react-portal";
import { BackMenuItem } from "../../BackMenuItem";
import { backToParentMenu } from "../../../../../../store/gameMenusSlice";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchCallback";
import { MenuItemSeparator } from "../../MenuItemSeparator";

export const InputPresetDialog = () => {
  return (
    <>
      <Border
        className="bg-midGrey zx:bg-zxWhiteDimmed"
        onClick={useDispatchActionCallback(backToParentMenu)}
      />
      <Dialog className="bg-white">
        <Portal.Provider>
          <BitmapText className="text-midRed zx:text-zxRed sprites-double-height ml-3">
            Key presets
          </BitmapText>
          <MenuItems className="text-metallicBlue zx:text-zxBlue selectedMenuItem:text-moss zx:selectedMenuItem:text-zxMagenta">
            {keys(keyAssignmentPresets).map((presetName) => (
              <InputPresetMenuItem key={presetName} presetName={presetName} />
            ))}
            <MenuItemSeparator />
            <BackMenuItem />
          </MenuItems>
          <SelectedItemHint className="text-shadow zx:text-zxMagenta" />
        </Portal.Provider>
      </Dialog>
    </>
  );
};
