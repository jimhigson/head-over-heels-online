import { BitmapText } from "../../../Sprite";
import type { Menu } from "../menus";
import type { MenuItem } from "../MenuItem";
import { objectEntriesIter } from "../../../../../utils/entries";
import { iterate } from "../../../../../utils/iterate";
import { keyAssignmentPresets } from "../../../../input/keyAssignmentPresets";
import { withProps } from "../withClassName";
import { MenuItems } from "../MenuItems";
import { backMenuItem } from "../backMenuItem";
import { SelectedItemHint } from "../SelectedItemHint";

export const inputPresetMenu: Menu = {
  backgroundClassName: "bg-lightGrey",
  borderClassName: "bg-midGrey",
  sections: [
    <BitmapText className="text-metallicBlue sprites-double-height">
      Key presets
    </BitmapText>,
    withProps(MenuItems, {
      className: "text-metallicBlue",
      selectedClassName: "text-moss",
    }),
    withProps(SelectedItemHint, { className: "text-shadow" }),
  ],
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
