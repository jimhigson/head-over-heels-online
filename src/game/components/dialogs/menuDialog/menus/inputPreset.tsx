import { keyAssignmentPresets } from "@/game/input/keyAssignmentPresets";
import { objectEntriesIter } from "@/utils/entries";
import { iterate } from "@/utils/iterate";
import { spritesheetPalette } from "gfx/spritesheetPalette";
import { BitmapText } from "../../../Sprite";
import type { Menu, MenuItem } from "../menus";

export const inputPreset: Menu = {
  background: "lightGrey",
  itemColour: "metallicBlue",
  selectedColour: "moss",
  heading: (
    <BitmapText colour={spritesheetPalette.metallicBlue} doubleHeight>
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
