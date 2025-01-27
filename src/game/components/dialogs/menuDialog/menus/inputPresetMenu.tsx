import { BitmapText } from "../../../Sprite";
import type { Menu } from "../menus";
import type { MenuItem } from "../MenuItem";
import { objectEntriesIter } from "../../../../../utils/entries";
import { iterate } from "../../../../../utils/iterate";
import { keyAssignmentPresets } from "../../../../input/keyAssignmentPresets";
import { MenuItems } from "../MenuItems";
import { backMenuItem } from "../backMenuItem";
import { SelectedItemHint } from "../SelectedItemHint";

export const inputPresetMenu: Menu = {
  dialogClassName: "bg-white",
  borderClassName: "bg-midGrey",
  Content() {
    return (
      <>
        <BitmapText className="text-midRed zx:text-zxRedDimmed sprites-double-height ml-3">
          Key presets
        </BitmapText>
        <MenuItems className="text-metallicBlue zx:text-zxBlueDimmed selectedMenuItem:text-moss zx:selectedMenuItem:text-zxGreenDimmed" />
        <SelectedItemHint className="text-shadow zx:text-zxWhiteDimmed" />
      </>
    );
  },
  items: [
    ...iterate(objectEntriesIter(keyAssignmentPresets)).map(
      ([presetName, { description }]): MenuItem => ({
        type: "keyPreset",
        preset: presetName,
        label: presetName,
        hint: description,
      }),
    ),
    backMenuItem,
  ],
};
