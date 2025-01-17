import { keyAssignmentPresets } from "@/game/input/keyAssignmentPresets";
import { objectEntriesIter } from "@/utils/entries";
import { iterate } from "@/utils/iterate";
import { BitmapText } from "../../../Sprite";
import type { Menu } from "../menus";
import type { MenuItem } from "../MenuItem";

export const inputPresetMenu: Menu = {
  backgroundClassName: "bg-lightGrey",
  itemClassName: "sprite-tint-metallicBlue",
  selectedClassName: "sprite-tint-moss",
  hintClassName: "sprite-tint-shadow",
  heading: (
    <BitmapText className="sprite-tint-metallicBlue sprites-double-height">
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
