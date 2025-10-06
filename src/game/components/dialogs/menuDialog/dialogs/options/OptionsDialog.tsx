import { useAppSelector } from "../../../../../../store/hooks";
import {
  selectGameSpeed,
  selectIsCrtFilter,
  selectIsInfiniteDoughnutsPoke,
  selectIsInfiniteLivesPoke,
  selectShowFps,
  useIsGameRunning,
  useIsUncolourised,
} from "../../../../../../store/slices/gameMenus/gameMenusSelectors";
import {
  backToParentMenu,
  goToSubmenu,
  setGameSpeed,
  toggleUserSetting,
} from "../../../../../../store/slices/gameMenus/gameMenusSlice";
import { selectableGameSpeeds } from "../../../../../../store/slices/gameMenus/selectableGameSpeeds";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchActionCallback";
import { Border } from "../../../../../../ui/Border";
import { Dialog } from "../../../../../../ui/dialog";
import { DialogPortal } from "../../../../../../ui/DialogPortal";
import { Switch, SwitchN } from "../../../../../../ui/Switch";
import { BlockyMarkdown } from "../../../../BlockyMarkdown";
import { BitmapText } from "../../../../tailwindSprites/Sprite";
import { MenuItem } from "../../MenuItem";
import { MenuItems } from "../../MenuItems";
import { MenuItemSeparator } from "../../MenuItemSeparator";
import {
  optionsMenuItemColours,
  optionsMenuScrollClasses,
} from "../controlOptions/optionsMenuColours";
import { spriteLeaderClasses } from "../controlOptions/spriteLeaderClasses";
import { MobileStyleBackButton } from "../MobileStyleBackButton";
import { optionsHintMarkdownClassname } from "./optionsHintMarkdownClassname";

const colouriseMarkdown = `![](texture-animated-head_walking_towards?float-right&mt-1)**Off**: Original *two-tone* spectrum graphics

**On**: *16-colour* palette with colourised sprites`;

const crtEffectMarkdown = `Here for the nostalgia?

Make your fancy new screen look like it’s 1987 again.`;

const gameSpeedMarkdown = `Play at the original **1x** speed, **1.2x (default)** or faster **1.5x** or **2x** speeds`;

const infiniteLivesMarkdown = `Pokes can’t be set mid-game.

**Off**: *8* lives to start; extra life rabbits spread thinly through the game.

*A true hero leaves this* **off**.`;

const controlOptionsMarkdown = `*Select the keys* and other input settings`;

export const OptionsDialog = () => {
  return (
    <DialogPortal>
      <Border
        className="bg-lightGrey zx:bg-zxRedDimmed"
        onClick={useDispatchActionCallback(backToParentMenu)}
      />
      <Dialog
        fullScreen
        className={`bg-white zx:bg-zxWhite pl-1 py-0 ${optionsMenuItemColours}`}
      >
        <div
          className={
            "flex flex-col gap-1 " +
            "overflow-y-scroll scrollbar scrollbar-w-1 pr-1 " +
            "min-h-full " +
            optionsMenuScrollClasses
          }
        >
          <MobileStyleBackButton className="pt-half" />
          <BitmapText
            TagName="h1"
            className="ml-4 text-midRed zx:text-zxBlue sprites-double-height block"
          >
            Options
          </BitmapText>
          <MenuItems className={`gap-y-half`}>
            <MenuItem
              hintInline
              id="controlOptions"
              label="Controls"
              verticalAlignItemsCentre
              className="sprites-double-height"
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
              label="Sounds"
              className="sprites-double-height"
              verticalAlignItemsCentre
              onSelect={useDispatchActionCallback(goToSubmenu, "sound")}
              hint={
                <BlockyMarkdown
                  className={optionsHintMarkdownClassname}
                  markdown="Footsteps getting annoying?"
                />
              }
            />
            <MenuItem
              hintInline
              id="gameSpeed"
              label="Game Speed"
              className="sprites-double-height"
              valueElement={
                <SwitchN
                  className="ml-auto"
                  values={selectableGameSpeeds}
                  valueLabels={selectableGameSpeeds.map((n) => `${n}`)}
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
              className="sprites-double-height"
              id="colourise"
              label="Colourise"
              valueElement={
                <Switch className="ml-auto" value={!useIsUncolourised()} />
              }
              onSelect={useDispatchActionCallback(toggleUserSetting, {
                path: "displaySettings.uncolourised",
              })}
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
              className="sprites-double-height"
              id="crtFilter"
              verticalAlignItemsCentre
              label={
                <span className="align-top">
                  <span className="bg-shadow zx:bg-pureBlack inline-block">
                    <BitmapText className="text-midRed zx:text-zxRed">
                      C
                    </BitmapText>
                    <BitmapText className="text-moss zx:text-zxGreen">
                      R
                    </BitmapText>
                    <BitmapText className="text-pastelBlue zx:text-zxBlue">
                      T
                    </BitmapText>
                  </span>
                  <BitmapText>{" TV Effect"}</BitmapText>
                </span>
              }
              valueElement={
                <Switch
                  className="ml-auto"
                  value={useAppSelector(selectIsCrtFilter)}
                />
              }
              onSelect={useDispatchActionCallback(toggleUserSetting, {
                path: "displaySettings.crtFilter",
              })}
              hint={
                <BlockyMarkdown
                  className={optionsHintMarkdownClassname}
                  markdown={crtEffectMarkdown}
                />
              }
            />
            <MenuItem
              hintInline
              className="sprites-double-height"
              id="livesModel"
              verticalAlignItemsCentre
              label="∞ Lives Poke"
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
              onSelect={useDispatchActionCallback(toggleUserSetting, {
                path: "infiniteLivesPoke",
              })}
              disabled={useIsGameRunning()}
            />
            <MenuItem
              hintInline
              leader={
                <span
                  className={`${spriteLeaderClasses} sprite texture-doughnuts sprites-normal-height zx:sprite-revert-to-white`}
                />
              }
              className="sprites-double-height"
              verticalAlignItemsCentre
              id="infiniteDoughnutsPoke"
              label="∞ Doughnuts Poke"
              valueElement={
                <Switch
                  className="ml-auto"
                  value={useAppSelector(selectIsInfiniteDoughnutsPoke)}
                />
              }
              onSelect={useDispatchActionCallback(toggleUserSetting, {
                path: "infiniteDoughnutsPoke",
              })}
              disabled={useIsGameRunning()}
            />
            <MenuItem
              hintInline
              className="sprites-double-height"
              verticalAlignItemsCentre
              id="showFps"
              label="Show FPS"
              valueElement={
                <Switch
                  className="ml-auto"
                  value={useAppSelector(selectShowFps)}
                />
              }
              onSelect={useDispatchActionCallback(toggleUserSetting, {
                path: "showFps",
              })}
              hint={
                <BlockyMarkdown
                  className={optionsHintMarkdownClassname}
                  markdown={`Frames per second shown during gameplay.`}
                />
              }
            />
            <MenuItem
              hintInline
              className="sprites-double-height"
              id="emulatedResolution"
              label="Emulated Resolution"
              onSelect={useDispatchActionCallback(
                goToSubmenu,
                "emulatedResolution",
              )}
              verticalAlignItemsCentre
              hint={
                <BlockyMarkdown
                  className={optionsHintMarkdownClassname}
                  markdown={`See more of the room by choosing a higher resolution to emulate.`}
                />
              }
            />
            <MenuItemSeparator />
          </MenuItems>
        </div>
      </Dialog>
    </DialogPortal>
  );
};
