import { type TextureTailwindClass } from "../../../../../../sprites/spritesheet/spritesheetData/TextureTailwindClass";
import { useAppSelector } from "../../../../../../store/hooks";
import {
  selectGameSpeed,
  selectIsInfiniteDoughnutsPoke,
  selectIsInfiniteLivesPoke,
  useIsGameRunning,
} from "../../../../../../store/slices/gameMenus/gameMenusSelectors";
import { selectableGameSpeeds } from "../../../../../../store/slices/userSettings/selectableGameSpeeds";
import {
  setGameSpeed,
  toggleUserSetting,
} from "../../../../../../store/slices/userSettings/userSettingsSlice";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchActionCallback";
import { Dialog } from "../../../../../../ui/Dialog";
import { DialogPortal } from "../../../../../../ui/DialogPortal";
import { Switch, SwitchN } from "../../../../../../ui/Switch";
import { BlockyMarkdown } from "../../../../BlockyMarkdown";
import {
  optionsDialogClasses,
  optionsHintMarkdownClassname,
  optionsMenuScrollClasses,
  spriteLeaderClasses,
  titleBarClasses,
} from "../../../dialogClasses";
import { MenuItem } from "../../MenuItem";
import { MenuItems } from "../../MenuItems";
import { MenuItemSeparator } from "../../MenuItemSeparator";
import { DialogTitleBar } from "../DialogTitleBar";
import { ClearAllDataMenuSection } from "./ClearAllDataMenuSection";

const gameSpeedMarkdown = `Play at the original **1x** speed, **1.2x (default)** or faster **1.5x** or **2x** speeds`;

const infiniteLivesOffMarkdown = `**Off**: Start with *8 lives*

Extra life rabbits spread thinly through the game`;
const infiniteLivesOnMarkdown = `**On**: *Live forever*

Extra life rabbits have no effect`;

const controlOptionsMarkdown = `*Select the keys* and other input settings`;

const pokesMarkdown = `##Cheats

Magazines used to print memory locations to ‘*poke*’ values into so that readers could modify their games; usually to cheat.

A true hero leaves these **off**, but do modern gamers even know what lives are?`;

export const OptionsDialog = () => {
  const infiniteLivesPokeOn = useAppSelector(selectIsInfiniteLivesPoke);
  return (
    <DialogPortal>
      <Dialog
        fullScreen
        className={optionsDialogClasses}
        dialogId="modernisationOptions"
      >
        <DialogTitleBar path={["Options"]} className={titleBarClasses} />
        <div className={optionsMenuScrollClasses}>
          <MenuItems className={`gap-y-half`}>
            <MenuItem
              id="controlOptions"
              label="Controls"
              verticalAlignItemsCentre
              doubleHeight
              subMenuId="controlOptions"
              hint={
                <BlockyMarkdown
                  className={optionsHintMarkdownClassname}
                  markdown={controlOptionsMarkdown}
                />
              }
              leader={
                <span
                  className={`${spriteLeaderClasses} sprite ${"texture-joystick_whole" satisfies TextureTailwindClass} sprites-normal-height zx:sprite-revert-to-white`}
                />
              }
            />
            <MenuItem
              id="sound"
              label="Sounds"
              doubleHeight
              verticalAlignItemsCentre
              subMenuId="sound"
              hint={
                <BlockyMarkdown
                  className={optionsHintMarkdownClassname}
                  markdown="Footsteps getting annoying?"
                />
              }
            />
            <MenuItem
              id="display"
              label="Display"
              doubleHeight
              verticalAlignItemsCentre
              subMenuId="displayOptions"
              hint={
                <BlockyMarkdown
                  className={optionsHintMarkdownClassname}
                  markdown="Change how the game looks"
                />
              }
            />
            <MenuItem
              id="gameSpeed"
              label="Game Speed"
              doubleHeight
              valueElement={
                <SwitchN
                  className="ml-auto"
                  values={selectableGameSpeeds}
                  valueLabels={selectableGameSpeeds.map((n) =>
                    `${n}`.replace(".", "\uff0e"),
                  )}
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

            <div className="col-span-3 pb-1 mt-2">
              <BlockyMarkdown
                markdown={pokesMarkdown}
                className={optionsHintMarkdownClassname}
              />
            </div>
            <MenuItem
              doubleHeight
              id="livesModel"
              verticalAlignItemsCentre
              label="∞ Lives Poke"
              leader={
                <span
                  className={`${spriteLeaderClasses} sprite ${"texture-whiteRabbit_extra-life" satisfies TextureTailwindClass} sprites-normal-height zx:sprite-revert-to-white`}
                />
              }
              hint={
                <BlockyMarkdown
                  className={optionsHintMarkdownClassname}
                  markdown={
                    infiniteLivesPokeOn ?
                      infiniteLivesOnMarkdown
                    : infiniteLivesOffMarkdown
                  }
                />
              }
              valueElement={
                <Switch className="ml-auto" value={infiniteLivesPokeOn} />
              }
              onSelect={useDispatchActionCallback(toggleUserSetting, {
                path: "pokesEnabled.infiniteLives",
              })}
              disabled={useIsGameRunning()}
            />
            <MenuItem
              leader={
                <span
                  className={`${spriteLeaderClasses} sprite ${"texture-doughnuts" satisfies TextureTailwindClass} sprites-normal-height zx:sprite-revert-to-white`}
                />
              }
              doubleHeight
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
                path: "pokesEnabled.infiniteDoughnuts",
              })}
              disabled={useIsGameRunning()}
            />

            <ClearAllDataMenuSection />
            <MenuItemSeparator />
          </MenuItems>
        </div>
      </Dialog>
    </DialogPortal>
  );
};
