import clsx from "clsx";
import {
  toggleColourise,
  toggleCrtFilter,
  toggleLivesModel,
} from "../../../../../store/gameMenusSlice";
import { BitmapText } from "../../../Sprite";
import { MenuItems } from "../MenuItems";
import { SelectedItemHint } from "../SelectedItemHint";
import { Dialog } from "../../../../../components/ui/dialog";
import { MenuItem } from "../MenuItem";
import { useDispatchActionCallback } from "../../../../../store/useDispatchCallback";
import { BackMenuItem } from "../BackMenuItem";
import { MenuItemSeparator } from "../MenuItemSeparator";
import { useAppSelector } from "../../../../../store/hooks";
import Portal from "@mutabazia/react-portal";

const ValueSwitch = ({
  className,
  value,
}: {
  value: boolean;
  className?: string;
}) => {
  return (
    <div>
      <BitmapText
        className={clsx(
          "inline-block",
          value ?
            "bg-shadowHalfbrite text-moss zx:bg-zxBlack zx:text-zxGreen"
          : "bg-redShadowHalfbrite text-midRed zx:bg-zxBlack zx:text-zxRed",
          className,
        )}
        noSlitWords
      >
        {value ? "  ON" : "OFF "}
      </BitmapText>
    </div>
  );
};

export const ModernisationOptionsDialog = () => {
  return (
    <Dialog className="bg-pinkHalfbrite zx:bg-zxBlue" borderClassName="bg-moss">
      <Portal.Provider>
        <BitmapText className="ml-3 text-moss zx:text-zxGreen sprites-double-height">
          Modernisation options
        </BitmapText>
        <MenuItems className="text-lightGrey zx:text-zxWhite selectedMenuItem:text-white zx:selectedMenuItem:text-zxGreen">
          <MenuItem
            doubleHeightWhenFocussed
            id="colourise"
            label="Colourise"
            valueElement={
              <ValueSwitch
                value={useAppSelector(
                  (state) => state.userSettings.displaySettings.colourise,
                )}
              />
            }
            onSelect={useDispatchActionCallback(toggleColourise)}
            hint="Original two-tone spectrum-like graphics, or 16-colour colourised"
          />
          <MenuItem
            doubleHeightWhenFocussed
            id="livesModel"
            label="Infinite Lives poke"
            hint={`The original game gave 8 lives to start, with extra life pickups spread thinly through the game.

        A true hero leaves this setting alone.
        
        This can't be changed mid-game.`}
            valueElement={
              <ValueSwitch
                value={useAppSelector(
                  (state) => state.userSettings.livesModel === "infinite",
                )}
              />
            }
            onSelect={useDispatchActionCallback(toggleLivesModel)}
          />
          <MenuItem
            doubleHeightWhenFocussed
            id="extraItems"
            label="Extra items"
            valueElement={<ValueSwitch value={true} />}
            hint={`toggle extra features in the rooms that modernise the gameplay slightly 
        - none of these fundamentally change the gameplay.
        
        Turn off to be completely faithful to the original rooms.`}
          />
          <MenuItem
            doubleHeightWhenFocussed
            id="showFps"
            label="Show FPS"
            valueElement={<ValueSwitch value={false} />}
            hint={`show frame rate`}
          />
          <MenuItem
            doubleHeightWhenFocussed
            id="analogueControl"
            label="Analogue control"
            valueElement={<ValueSwitch value={true} />}
            hint={`**off**: walk in the original 4 directions: *⬅, ➡, ⬆, ⬇*.
      
      controller/joystick with analogue sticks: "on" to walk in any direction, not just along the two axes.
      
      Or, with a keyboard/dpad, "on" allows walking in eight directions. This makes some original rooms easier.`}
          />
          <MenuItem
            doubleHeightWhenFocussed
            id="crtFilter"
            label="CRT TV effect"
            valueElement={
              <ValueSwitch
                value={useAppSelector(
                  (state) => state.userSettings.displaySettings.crtFilter,
                )}
              />
            }
            onSelect={useDispatchActionCallback(toggleCrtFilter)}
            hint="Screen glows a bit like an old tv"
          />
          <MenuItem
            doubleHeightWhenFocussed
            id="emulatedResolution"
            label="Emulated resolution"
            valueElement={<BitmapText className="mr-1">specy</BitmapText>}
            hint="zx spectrum (256x192) or Amiga/c64/Atari ST PAL (320x256)"
          />
          <MenuItemSeparator />
          <BackMenuItem />
        </MenuItems>
        <SelectedItemHint className="text-moss zx:text-zxGreen" />
      </Portal.Provider>
    </Dialog>
  );
};
