import { BitmapText } from "../../../../Sprite";
import { keys } from "../../../../../../utils/entries";
import { keyAssignmentPresets } from "../../../../../input/keyAssignmentPresets";
import { MenuItems } from "../../MenuItems";
import { SelectedItemHint } from "../../SelectedItemHint";
import { Dialog } from "../../../../../../components/ui/dialog";
import { InputPresetMenuItem } from "./InputPresetMenuItem";

export const InputPresetDialog = () => {
  return (
    <Dialog className="bg-white" borderClassName="bg-midGrey">
      <BitmapText className="text-midRed zx:text-zxRed sprites-double-height ml-3">
        Key presets
      </BitmapText>
      <MenuItems className="text-metallicBlue zx:text-zxBlue selectedMenuItem:text-moss zx:selectedMenuItem:text-zxMagenta">
        {keys(keyAssignmentPresets).map((presetName) => (
          <InputPresetMenuItem key={presetName} presetName={presetName} />
        ))}
      </MenuItems>
      <SelectedItemHint className="text-shadow zx:text-zxMagenta" />
    </Dialog>
  );
};
