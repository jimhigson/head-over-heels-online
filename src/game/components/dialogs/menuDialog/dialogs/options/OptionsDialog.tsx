import { useAppSelector } from "../../../../../../store/hooks";
import {
  selectGameSpeed,
  selectIsInfiniteDoughnutsPoke,
  selectIsInfiniteLivesPoke,
  useIsGameRunning,
} from "../../../../../../store/slices/gameMenus/gameMenusSelectors";
import {
  goToSubmenu,
  setGameSpeed,
  toggleUserSetting,
} from "../../../../../../store/slices/gameMenus/gameMenusSlice";
import { selectableGameSpeeds } from "../../../../../../store/slices/gameMenus/selectableGameSpeeds";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchActionCallback";
import { Dialog } from "../../../../../../ui/dialog";
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

const gameSpeedMarkdown = `Play at the original **1x** speed, **1.2x (default)** or faster **1.5x** or **2x** speeds`;

const infiniteLivesOffMarkdown = `**Off**: Start with *8 lives*

Extra life rabbits spread thinly through the game`;
const infiniteLivesOnMarkdown = `**On**: *Live forever*

Extra life rabbits have no effect`;

const controlOptionsMarkdown = `*Select the keys* and other input settings`;

const pokesMarkdown = `##Cheats

Magazines used to print memory locations to ‘*poke*’ values into so that readers could modify their games; usually to cheat.
                  
A true hero leaves these **off**! Then again, do modern gamers even know what lives are?`;

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
              hintInline
              id="controlOptions"
              label="Controls"
              verticalAlignItemsCentre
              className="sprites-double-height"
              onSelect={useDispatchActionCallback(
                goToSubmenu,
                "controlOptions",
              )}
              opensSubMenu={true}
              hint={
                <BlockyMarkdown
                  className={optionsHintMarkdownClassname}
                  markdown={controlOptionsMarkdown}
                />
              }
              leader={
                <span
                  className={`${spriteLeaderClasses} sprite texture-joystick_whole sprites-normal-height zx:sprite-revert-to-white`}
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
              opensSubMenu={true}
              hint={
                <BlockyMarkdown
                  className={optionsHintMarkdownClassname}
                  markdown="Footsteps getting annoying?"
                />
              }
            />
            <MenuItem
              hintInline
              id="display"
              label="Display"
              className="sprites-double-height"
              verticalAlignItemsCentre
              onSelect={useDispatchActionCallback(
                goToSubmenu,
                "displayOptions",
              )}
              opensSubMenu={true}
              hint={
                <BlockyMarkdown
                  className={optionsHintMarkdownClassname}
                  markdown="Change how the game looks"
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

            <div className="col-span-3 pb-1">
              <BlockyMarkdown
                markdown={pokesMarkdown}
                className={optionsHintMarkdownClassname}
              />
            </div>
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
            <MenuItemSeparator />
          </MenuItems>
        </div>
      </Dialog>
    </DialogPortal>
  );
};
