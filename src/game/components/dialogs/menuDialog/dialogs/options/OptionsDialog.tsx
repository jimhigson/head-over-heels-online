import { twClass } from "../../../../../../editor/twClass";
import { useAppSelector } from "../../../../../../store/hooks";
import {
  selectGameSpeed,
  selectIsInfiniteDoughnutsPoke,
  selectIsInfiniteLivesPoke,
  selectShowFps,
  useIsGameRunning,
  useIsUncolourised,
} from "../../../../../../store/selectors";
import {
  backToParentMenu,
  goToSubmenu,
  setGameSpeed,
  toggleBoolean,
} from "../../../../../../store/slices/gameMenusSlice";
import { selectableGameSpeeds } from "../../../../../../store/slices/selectableGameSpeeds";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchActionCallback";
import { Border } from "../../../../../../ui/Border";
import { Dialog } from "../../../../../../ui/dialog";
import { DialogPortal } from "../../../../../../ui/DialogPortal";
import { Switch, SwitchN } from "../../../../../../ui/Switch";
import { isTouchDevice } from "../../../../../../utils/detectDeviceType";
import { BlockyMarkdown } from "../../../../BlockyMarkdown";
import { BitmapText } from "../../../../tailwindSprites/Sprite";
import { BackMenuItem } from "../../BackMenuItem";
import { MenuItem } from "../../MenuItem";
import { MenuItems } from "../../MenuItems";
import { MenuItemSeparator } from "../../MenuItemSeparator";
import {
  optionsMenuItemColours,
  optionsMenuScrollClasses,
} from "../controlOptions/optionsMenuColours";
import { spriteLeaderClasses } from "../controlOptions/spriteLeaderClasses";
import { MobileStyleBackButton } from "../MobileStyleBackButton";

const optionsHintMarkdownClassname = twClass(
  "[&_.em]:text-lightBeige zx:[&_.em]:text-zxCyan text-lightGrey zx:text-zxBlack sprites-normal-height",
);

const colouriseMarkdown = `![](texture-animated-head_walking_towards?float-right)**off**: Original *two-tone* spectrum graphics

**on**: *16-colour* palette with colourised sprites`;

const gameSpeedMarkdown = `Play at the original **1x** speed, **1.2x (default)** or faster **1.5x** or **2x** speeds`;

const infiniteLivesMarkdown = `pokes can’t be set mid-game

**off**: *8* lives to start; extra life rabbits spread thinly through the game

*A true hero leaves this* **off**`;

const controlOptionsMarkdown = `everything to *select the keys* and other input settings`;

/*
const extraItemsMarkdown = `**off**: *faithful* to the original rooms

**on**: *extra items* slightly modernisess the gameplay.
none of these fundamentally change how the rooms play.`;
*/

export const OptionsDialog = () => {
  return (
    <DialogPortal>
      <Border
        className="bg-lightGrey zx:bg-zxRedDimmed"
        onClick={useDispatchActionCallback(backToParentMenu)}
      />
      <Dialog className="bg-white zx:bg-zxWhite pb-0 pl-1">
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
            className="ml-4 text-midRed zx:text-zxBlue sprites-double-height block"
          >
            Options
          </BitmapText>
          <MenuItems className={`${optionsMenuItemColours} gap-y-half`}>
            <MenuItem
              hintInline
              id="controlOptions"
              label="Control options"
              verticalAlignItemsCentre
              doubleHeightWhenFocussed
              onSelect={useDispatchActionCallback(
                goToSubmenu,
                "controlOptions",
              )}
              hint={
                <BlockyMarkdown
                  className={optionsHintMarkdownClassname}
                  markdown={controlOptionsMarkdown}
                />
              }
              leader={
                <span
                  className={`${spriteLeaderClasses} sprite texture-joystick sprites-normal-height zx:sprite-revert-to-white`}
                />
              }
            />
            <MenuItem
              hintInline
              id="sound"
              label="Sound options"
              doubleHeightWhenFocussed
              onSelect={useDispatchActionCallback(goToSubmenu, "sound")}
            />
            <MenuItem
              hintInline
              id="gameSpeed"
              label="Game speed"
              doubleHeightWhenFocussed
              valueElement={
                <SwitchN
                  values={selectableGameSpeeds}
                  valueLabels={selectableGameSpeeds.map((n) => `${n}x`)}
                  value={useAppSelector(selectGameSpeed)}
                />
              }
              onSelect={useDispatchActionCallback(setGameSpeed, undefined)}
              hint={
                <BlockyMarkdown
                  className={optionsHintMarkdownClassname}
                  markdown={gameSpeedMarkdown}
                />
              }
              verticalAlignItemsCentre
            />
            <MenuItem
              hintInline
              doubleHeightWhenFocussed
              id="colourise"
              label="Colourise"
              valueElement={
                <Switch className="ml-auto" value={!useIsUncolourised()} />
              }
              onSelect={useDispatchActionCallback(
                toggleBoolean,
                "userSettings.displaySettings.uncolourised",
              )}
              hint={
                <BlockyMarkdown
                  className={optionsHintMarkdownClassname}
                  markdown={colouriseMarkdown}
                />
              }
              verticalAlignItemsCentre
            />
            <MenuItem
              hintInline
              doubleHeightWhenFocussed
              id="livesModel"
              verticalAlignItemsCentre
              label="∞ Lives poke"
              leader={
                <span
                  className={`${spriteLeaderClasses} sprite texture-whiteRabbit sprites-normal-height zx:sprite-revert-to-white`}
                />
              }
              hint={
                <BlockyMarkdown
                  className={optionsHintMarkdownClassname}
                  markdown={infiniteLivesMarkdown}
                />
              }
              valueElement={
                <Switch
                  className="ml-auto"
                  value={useAppSelector(selectIsInfiniteLivesPoke)}
                />
              }
              onSelect={useDispatchActionCallback(
                toggleBoolean,
                "userSettings.infiniteLivesPoke",
              )}
              disabled={useIsGameRunning()}
            />
            <MenuItem
              hintInline
              leader={
                <span
                  className={`${spriteLeaderClasses} sprite texture-doughnuts sprites-normal-height zx:sprite-revert-to-white`}
                />
              }
              doubleHeightWhenFocussed
              verticalAlignItemsCentre
              id="infiniteDoughnutsPoke"
              label="∞ doughnuts poke"
              valueElement={
                <Switch
                  className="ml-auto"
                  value={useAppSelector(selectIsInfiniteDoughnutsPoke)}
                />
              }
              onSelect={useDispatchActionCallback(
                toggleBoolean,
                "userSettings.infiniteDoughnutsPoke",
              )}
              disabled={useIsGameRunning()}
            />
            <MenuItem
              hintInline
              doubleHeightWhenFocussed
              verticalAlignItemsCentre
              id="showFps"
              label="Show FPS"
              valueElement={
                <Switch
                  className="ml-auto"
                  value={useAppSelector(selectShowFps)}
                />
              }
              onSelect={useDispatchActionCallback(
                toggleBoolean,
                "userSettings.showFps",
              )}
              hint={
                <BlockyMarkdown
                  className={optionsHintMarkdownClassname}
                  markdown={`frames-per-second shown during gameplay`}
                />
              }
            />
            {/* <MenuItem
                hintInline
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
              /> */}
            <MenuItem
              hintInline
              doubleHeightWhenFocussed
              id="emulatedResolution"
              label="Emulated resolution"
              onSelect={useDispatchActionCallback(
                goToSubmenu,
                "emulatedResolution",
              )}
              hint={
                <BlockyMarkdown
                  className={optionsHintMarkdownClassname}
                  markdown={`see more of the room by choosing a higher resolution to emulate`}
                />
              }
            />
            <MenuItemSeparator />
            {isTouchDevice() || <BackMenuItem />}
          </MenuItems>
        </div>
      </Dialog>
    </DialogPortal>
  );
};
