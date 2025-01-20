import { BitmapText } from "../../../Sprite";
import type { Menu } from "../menus";
import type { MenuItem } from "../MenuItem";
import { objectEntriesIter } from "../../../../../utils/entries";
import { iterate } from "../../../../../utils/iterate";
import { keyAssignmentPresets } from "../../../../input/keyAssignmentPresets";

export const inputPresetMenu: Menu = {
  backgroundClassName: "bg-lightGrey",
  itemsClassName: "text-metallicBlue",
  selectedClassName: "text-moss",
  hintClassName: "text-shadow",
  borderClassName: "bg-midGrey",
  heading: (
    <BitmapText className="text-metallicBlue sprites-double-height">
      Key presets
    </BitmapText>
  ),
  items: [
    ...iterate(objectEntriesIter(keyAssignmentPresets)).map(
      ([presetName, { description }]): MenuItem => ({
        type: "keyPreset",
        preset: presetName,
        label: presetName,
        hint: description,
      }),
    ),
  ],
};
