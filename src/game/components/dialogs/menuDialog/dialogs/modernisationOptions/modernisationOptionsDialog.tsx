import {
  backToParentMenu,
  goToSubmenu,
  toggleBoolean,
} from "../../../../../../store/slices/gameMenusSlice";
import { BitmapText } from "../../../../Sprite";
import { MenuItems } from "../../MenuItems";
import { SelectedItemHint } from "../../SelectedItemHint";
import { Dialog } from "../../../../../../ui/dialog";
import { Border } from "../../../../../../ui/Border";
import { DialogPortal } from "../../../../../../ui/DialogPortal";
import { MenuItem } from "../../MenuItem";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchCallback";
import { BackMenuItem } from "../../BackMenuItem";
import { MenuItemSeparator } from "../../MenuItemSeparator";
import { useAppSelector } from "../../../../../../store/hooks";
import Portal from "@mutabazia/react-portal";
import { BlockyMarkdown } from "../../../../BlockyMarkdown";
import {
  selectIsCrtFilter,
  selectIsInfiniteDoughnutsPoke,
  selectIsInfiniteLivesPoke,
  selectShowFps,
  useIsColourised,
  useIsGameRunning,
} from "../../../../../../store/selectors";
import { Switch } from "../../../../../../ui/Switch";
import { MobileStyleBackButton } from "../MobileStyleBackButton";
import { isTouchDevice } from "../../../../../../utils/detectDeviceType";
import {
  optionsMenuItemColours,
  optionsMenuScrollClasses,
} from "../controlOptions/optionsMenuColours";

const markdownClassname = "[&_.em]:text-lightBeige zx:[&_.em]:text-zxCyan";

const colouriseMarkdown = `![](texture-animated-head.walking.towards?float-right)**off**: Original *two-tone* spectrum graphics

**on**: *16-colour* palette with colourised sprites`;

const infiniteLivesMarkdown = `pokes can’t be set mid-game

**off**: *8* lives to start; extra life rabbits spread thinly through the game

*A true hero leaves this* **off**`;

const controlOptionsMarkdown = `everything to *select the keys* and other input settings`;

/*
const extraItemsMarkdown = `**off**: *faithful* to the original rooms

**on**: *extra items* slightly modernisess the gameplay.
none of these fundamentally change how the rooms play.`;
*/

export const ModernisationOptionsDialog = () => {
  return (
    <DialogPortal>
      <Border
        className="bg-lightGrey zx:bg-zxRedDimmed"
        onClick={useDispatchActionCallback(backToParentMenu)}
      />
      <Dialog className="bg-white zx:bg-zxWhite pb-0 pl-1">
        <Portal.Provider>
          <div
            className={
              "flex flex-col gap-1 " +
              "overflow-y-scroll scrollbar scrollbar-w-1 " +
              "min-h-full " +
              optionsMenuScrollClasses
            }
          >
            {isTouchDevice() && (
              <MobileStyleBackButton className="text-highlightBeige" />
            )}
            <BitmapText
              TagName="h1"
              className="ml-3 text-midRed zx:text-zxBlue sprites-double-height block"
            >
              Options
            </BitmapText>
            <MenuItems className={optionsMenuItemColours}>
              <MenuItem
                id="controlOptions"
                label="Control options"
                doubleHeightWhenFocussed
                onSelect={useDispatchActionCallback(
                  goToSubmenu,
                  "controlOptions",
                )}
                hint={
                  <BlockyMarkdown
                    className={markdownClassname}
                    markdown={controlOptionsMarkdown}
                  />
                }
              />
              <MenuItem
                doubleHeightWhenFocussed
                id="colourise"
                label="Colourise"
                valueElement={<Switch value={useIsColourised()} />}
                onSelect={useDispatchActionCallback(
                  toggleBoolean,
                  "userSettings.displaySettings.uncolourised",
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
                label="∞ Lives poke"
                hint={
                  <BlockyMarkdown
                    className={markdownClassname}
                    markdown={infiniteLivesMarkdown}
                  />
                }
                valueElement={
                  <Switch value={useAppSelector(selectIsInfiniteLivesPoke)} />
                }
                onSelect={useDispatchActionCallback(
                  toggleBoolean,
                  "userSettings.infiniteLivesPoke",
                )}
                disabled={useIsGameRunning()}
              />
              <MenuItem
                doubleHeightWhenFocussed
                id="infiniteDoughnutsPoke"
                label="∞ doughnuts poke"
                valueElement={
                  <Switch
                    value={useAppSelector(selectIsInfiniteDoughnutsPoke)}
                  />
                }
                onSelect={useDispatchActionCallback(
                  toggleBoolean,
                  "userSettings.infiniteDoughnutsPoke",
                )}
                disabled={useIsGameRunning()}
              />
              {/* <MenuItem
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
              /> */}
              <MenuItem
                doubleHeightWhenFocussed
                id="showFps"
                label="Show FPS"
                valueElement={<Switch value={useAppSelector(selectShowFps)} />}
                onSelect={useDispatchActionCallback(
                  toggleBoolean,
                  "userSettings.showFps",
                )}
                hint={`show frame rate (frames per second) in the top-right corner`}
              />
              <MenuItem
                doubleHeightWhenFocussed
                id="crtFilter"
                label="CRT TV effect"
                valueElement={
                  <Switch value={useAppSelector(selectIsCrtFilter)} />
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
                onSelect={useDispatchActionCallback(
                  goToSubmenu,
                  "emulatedResolution",
                )}
              />
              <MenuItemSeparator />
              {isTouchDevice() || <BackMenuItem />}
            </MenuItems>
            {isTouchDevice() || (
              <SelectedItemHint className="text-moss zx:text-zxGreen" />
            )}
          </div>
        </Portal.Provider>
      </Dialog>
    </DialogPortal>
  );
};
