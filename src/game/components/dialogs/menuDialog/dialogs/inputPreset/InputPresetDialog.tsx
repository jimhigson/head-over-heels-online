import { Dialog } from "../../../../../../ui/dialog";
import { DialogPortal } from "../../../../../../ui/DialogPortal";
import { keys } from "../../../../../../utils/entries";
import { keyAssignmentPresets } from "../../../../../input/keyAssignmentPresets";
import { MenuItems } from "../../MenuItems";
import { DialogTitleBar } from "../DialogTitleBar";
import {
  optionsDialogClasses,
  optionsMenuScrollClasses,
  titleBarClasses,
} from "../options/optionsMenuColours";
import { InputPresetMenuItem } from "./InputPresetMenuItem";

export const InputPresetDialog = () => {
  return (
    <DialogPortal>
      <Dialog fullScreen className={optionsDialogClasses}>
        <DialogTitleBar
          path={["Options", "Controls", "Presets"]}
          className={titleBarClasses}
        />
        <div className={optionsMenuScrollClasses}>
          <MenuItems>
            {keys(keyAssignmentPresets).map((presetName) => (
              <InputPresetMenuItem key={presetName} presetName={presetName} />
            ))}
          </MenuItems>
        </div>
      </Dialog>
    </DialogPortal>
  );
};
