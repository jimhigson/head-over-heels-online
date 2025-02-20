import {
  backToParentMenu,
  toggleBoolean,
} from "../../../../../../store/gameMenusSlice";
import { BitmapText } from "../../../../Sprite";
import { MenuItems } from "../../MenuItems";
import { SelectedItemHint } from "../../SelectedItemHint";
import { Border, Dialog } from "../../../../../../components/ui/dialog";
import { DialogPortal } from "../../../../../../components/ui/DialogPortal";
import { MenuItem } from "../../MenuItem";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchCallback";
import { BackMenuItem } from "../../BackMenuItem";
import { MenuItemSeparator } from "../../MenuItemSeparator";
import { useAppSelector } from "../../../../../../store/hooks";
import Portal from "@mutabazia/react-portal";
import { BlockyMarkdown } from "../../../../BlockyMarkdown";
import {
  selectShowFps,
  useIsGameRunning,
} from "../../../../../../store/selectors";
import { Switch } from "../../../../../../components/ui/Switch";

const markdownClassname = "[&_.em]:text-lightBeige zx:[&_.em]:text-zxCyan";

const colouriseMarkdown = `![](texture-animated-head.walking.towards?float-right)**off**: Original *two-tone* spectrum graphics

**on**: *16-colour* palette with colourised sprites`;

const infiniteLivesMarkdown = `pokes can’t be set mid-game

**off**: *8* lives to start; extra life rabbits spread thinly through the game

*A true hero leaves this* **off**`;

const extraItemsMarkdown = `**off**: *faithful* to the original rooms

**on**: *extra items* slightly modernisess the gameplay.
none of these fundamentally change how the rooms play.`;

const resolutionHintMarkdown = `*zx spectrum* (**256**x**192**)

*Amiga*/*c64*/*Atari-ST* PAL (**320**x**256**)`;

export const ModernisationOptionsDialog = () => {
  return (
    <DialogPortal>
      <Border
        className="bg-moss zx:bg-zxGreenDimmed"
        onClick={useDispatchActionCallback(backToParentMenu)}
      />
      <Dialog className="bg-pinkHalfbrite zx:bg-zxBlue pr-1">
        <Portal.Provider>
          <BitmapText className="ml-3 text-moss zx:text-zxGreen sprites-double-height">
            Modernisation options
          </BitmapText>
          <MenuItems className="text-lightGrey zx:text-zxWhite selectedMenuItem:text-white disabledMenuItem:text-midGrey zx:selectedMenuItem:text-zxGreen">
            <MenuItem
              doubleHeightWhenFocussed
              id="colourise"
              label="Colourise"
              valueElement={
                <Switch
                  value={useAppSelector(
                    (state) => state.userSettings.displaySettings.colourise,
                  )}
                />
              }
              onSelect={useDispatchActionCallback(
                toggleBoolean,
                "userSettings.displaySettings.colourise",
              )}
              hint={
                <BlockyMarkdown
                  className={markdownClassname}
                  markdown={colouriseMarkdown}
                />
              }
            />
            <MenuItem
              doubleHeightWhenFocussed
              id="livesModel"
              label="Infinite Lives poke"
              hint={
                <BlockyMarkdown
                  className={markdownClassname}
                  markdown={infiniteLivesMarkdown}
                />
              }
              valueElement={
                <Switch
                  value={useAppSelector(
                    (state) => state.userSettings.infiniteLivesPoke,
                  )}
                />
              }
              onSelect={useDispatchActionCallback(
                toggleBoolean,
                "userSettings.infiniteLivesPoke",
              )}
              disabled={useIsGameRunning()}
            />
            <MenuItem
              doubleHeightWhenFocussed
              id="extraItems"
              label="Extra items"
              valueElement={<Switch value={true} />}
              hint={
                <BlockyMarkdown
                  className={markdownClassname}
                  markdown={extraItemsMarkdown}
                />
              }
              disabled={true}
            />
            <MenuItem
              doubleHeightWhenFocussed
              id="showFps"
              label="Show FPS"
              valueElement={
                <Switch value={useAppSelector(selectShowFps)} />
              }
              onSelect={useDispatchActionCallback(
                toggleBoolean,
                "userSettings.showFps",
              )}
              hint={`show frame rate (frames per second) in the top-left corner`}
            />
            <MenuItem
              doubleHeightWhenFocussed
              id="crtFilter"
              label="CRT TV effect"
              valueElement={
                <Switch
                  value={useAppSelector(
                    (state) => state.userSettings.displaySettings.crtFilter,
                  )}
                />
              }
              onSelect={useDispatchActionCallback(
                toggleBoolean,
                "userSettings.displaySettings.crtFilter",
              )}
              hint="Subtle screen glow a bit like an old tv"
            />
            <MenuItem
              doubleHeightWhenFocussed
              id="emulatedResolution"
              label="Emulated resolution"
              valueElement={<BitmapText className="mr-1">specy</BitmapText>}
              hint={
                <BlockyMarkdown
                  className={markdownClassname}
                  markdown={resolutionHintMarkdown}
                />
              }
              disabled={true}
            />
            <MenuItemSeparator />
            <BackMenuItem />
          </MenuItems>
          <SelectedItemHint className="text-moss zx:text-zxGreen" />
        </Portal.Provider>
      </Dialog>
    </DialogPortal>
  );
};
