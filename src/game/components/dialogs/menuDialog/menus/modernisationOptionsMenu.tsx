import clsx from "clsx";
import {
  toggleColourise,
  toggleCrtFilter,
  toggleLivesModel,
} from "../../../../../store/gameMenusSlice";
import { useAppSelector } from "../../../../../store/hooks";
import { BitmapText } from "../../../Sprite";
import { backMenuItem } from "../backMenuItem";
import { MenuItems } from "../MenuItems";
import type { Menu } from "../menus";
import { SelectedItemHint } from "../SelectedItemHint";
import type { RootState } from "../../../../../store/store";
import { always } from "../../../../../utils/always";
import type { ValueComponent } from "../MenuItem";

const switchCurrentValue =
  (selector: (store: RootState) => boolean): ValueComponent =>
  ({ className }) => {
    const value = useAppSelector(selector);

    return (
      <div>
        <BitmapText
          className={clsx(
            "inline-block",
            value ? "bg-shadow" : "bg-redShadow",
            value ? "text-moss" : "text-midRed",
            className,
          )}
          noSlitWords
        >
          {value ? "  ON" : "OFF "}
        </BitmapText>
      </div>
    );
  };

const LivesValue = () => {
  const livesModel = useAppSelector((state) => state.userSettings.livesModel);

  return (
    <BitmapText
      className={clsx(
        "inline-block",
        livesModel === "infinite" ? "bg-shadow" : "bg-redShadow",
      )}
    >
      {livesModel}
    </BitmapText>
  );
};

export const modernisationOptionsMenu: Menu = {
  dialogClassName: "bg-metallicBlue",
  borderClassName: "bg-moss",
  Content() {
    return (
      <>
        <BitmapText className="ml-3 text-moss sprites-double-height">
          Modernisation options
        </BitmapText>
        <MenuItems className="text-lightGrey" selectedClassName="text-moss" />
        <SelectedItemHint className="text-moss" />
      </>
    );
  },
  items: [
    {
      type: "switch",
      label: "Colourise",
      ValueComponent: switchCurrentValue(
        (state) => state.userSettings.displaySettings.colourise,
      ),
      dispatch: () => toggleColourise(),
      hint: "Original two-tone graphics, or 16-colour colourised",
    },
    {
      type: "switch",
      label: "Lives poke",
      hint: `The original game gave 8 lives to start, with extra life pickups spread thinly through the game.

        A true hero leaves this setting alone.
        
        This can't be changed mid-game.`,
      ValueComponent: LivesValue,
      dispatch: () => toggleLivesModel(),
    },
    {
      type: "switch",
      label: "Extra items",
      ValueComponent: switchCurrentValue(always),
      hint: `toggle extra features in the rooms that modernise the gameplay slightly 
        - none of these fundamentally change the gameplay.
        
        Turn off to be completely faithful to the original rooms.`,
    },
    {
      type: "switch",
      label: "CRT TV effect",
      ValueComponent: switchCurrentValue(
        (state) => state.userSettings.displaySettings.crtFilter,
      ),
      dispatch: () => toggleCrtFilter(),
      hint: "Screen glows a bit like an old tv",
    },
    {
      type: "todo",
      label: "Emulated resolution",
      hint: "zx spectrum (256x192) or Amiga/c64/Atari ST PAL (320x256)",
      ValueComponent: () => <BitmapText className="mr-1">specy</BitmapText>,
    },
    backMenuItem,
  ],
};
