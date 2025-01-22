import { useAppSelector } from "../../../../../store/hooks";
import { objectEntriesIter } from "../../../../../utils/entries";
import { iterate } from "../../../../../utils/iterate";
import type { KeyAssignmentPreset } from "../../../../input/keyAssignmentPresets";
import { keyAssignmentPresets } from "../../../../input/keyAssignmentPresets";
import { BitmapText } from "../../../Sprite";
import type { Menu } from "../menus";
import nanoEqual from "nano-equal";
import { SelectKeysMenuFooter } from "./SelectKeysMenuFooter";
import { MenuItems } from "../MenuItems";
import { backMenuItem } from "../backMenuItem";
import { SelectedItemHint } from "../SelectedItemHint";
import { multilineTextClass } from "../multilineTextClass";

const ChoosePresetLabel = ({ selected }: { selected: boolean }) => {
  const currentPresetName = useAppSelector(
    (state): KeyAssignmentPreset | undefined => {
      for (const [name, preset] of iterate(
        objectEntriesIter(keyAssignmentPresets),
      )) {
        if (
          nanoEqual(preset.inputAssignment, state.userSettings.inputAssignment)
        ) {
          return name;
        }
      }
      return undefined;
    },
  );

  return (
    <>
      <BitmapText className="me-1">preset:</BitmapText>

      <BitmapText
        className={`text-nowrap ${selected ? "text-redShadow" : "text-midRed"}`}
      >
        {currentPresetName ?? "custom"}
      </BitmapText>
    </>
  );
};

export const selectKeysMenu: Menu = {
  dialogClassName: "bg-lightGrey",
  borderClassName: "bg-redShadow",
  Content() {
    return (
      <>
        <BitmapText className="text-metallicBlue sprites-double-height">
          Select the keys
        </BitmapText>
        <div
          className={
            "overflow-y-scroll " +
            "scrollbar scrollbar-thumb-midGrey scrollbar-w-1 scrollbar-track-lightGrey"
          }
        >
          <div className={`mb-1 ${multilineTextClass}`}>
            <BitmapText className="text-midRed">Note: </BitmapText>
            <BitmapText className="text-midGrey">
              some puzzles require you to jump and pick up simultaneously -
              assign a key for both jump and carry
            </BitmapText>
          </div>
          <MenuItems
            className="text-metallicBlue !gap-y-1"
            selectedClassName="text-shadow"
          />
        </div>
        <SelectedItemHint className="text-metallicBlue" />
        <SelectKeysMenuFooter />
      </>
    );
  },
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
      label: "Hold",
      action: "hold",
    },
    {
      type: "key",
      label: "Menu",
      action: "menu",
    },
    backMenuItem,
  ],
};
