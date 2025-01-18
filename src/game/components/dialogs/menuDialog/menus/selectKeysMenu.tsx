import { BitmapText } from "../../../Sprite";
import type { Menu } from "../menus";
import { useAppSelector } from "@/store/hooks";
import nanoEqual from "nano-equal";
import type { KeyAssignmentPreset } from "@/game/input/keyAssignmentPresets";
import { keyAssignmentPresets } from "@/game/input/keyAssignmentPresets";
import { objectEntriesIter } from "@/utils/entries";
import { iterate } from "@/utils/iterate";

const ChoosePresetLabel = ({ selected }: { selected: boolean }) => {
  const currentPresetName = useAppSelector(
    (state): KeyAssignmentPreset | undefined => {
      for (const [name, preset] of iterate(
        objectEntriesIter(keyAssignmentPresets),
      )) {
        if (nanoEqual(preset.inputAssignment, state.inputAssignment)) {
          return name;
        }
      }
      return undefined;
    },
  );

  return (
    <>
      <BitmapText noSpaceAfter>choose a preset:</BitmapText>

      <BitmapText
        className={`text-nowrap indent-1 inline-block ${selected ? "text-redShadow" : "text-midRed"}`}
        noSpaceAfter
      >
        {currentPresetName ?? "custom"}
      </BitmapText>
    </>
  );
};

export const selectKeysMenu: Menu = {
  backgroundClassName: "bg-lightGrey",
  itemClassName: "text-metallicBlue",
  selectedClassName: "text-shadow",
  heading: (
    <BitmapText className="text-metallicBlue sprites-double-height">
      Select the keys
    </BitmapText>
  ),
  items: [
    {
      type: "submenu",
      label: ChoosePresetLabel,
      submenu: "inputPreset",
      disableDoubling: true,
    },
    {
      type: "key",
      label: "Left ↖",
      action: "left",
    },
    {
      type: "key",
      label: "Right ↘",
      action: "right",
    },
    {
      type: "key",
      label: "Down ↙",
      action: "towards",
    },
    {
      type: "key",
      label: "Up ↗",
      action: "away",
    },
    {
      type: "key",
      label: "Jump",
      action: "jump",
    },
    {
      type: "key",
      label: "Carry",
      action: "carry",
    },
    {
      type: "key",
      label: "Fire",
      action: "fire",
    },
    {
      type: "key",
      label: "Swop",
      action: "swop",
    },
    {
      type: "key",
      label: "Menu",
      action: "menu",
    },
  ],
};
