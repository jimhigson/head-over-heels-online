import type { EmptyObject } from "type-fest";

import { useCallback } from "react";

import { nerdFontDiscordChar } from "../../../../../../sprites/hudSritesheetData";
import { useAppSelector } from "../../../../../../store/hooks";
import { useIsGameRunning } from "../../../../../../store/slices/gameMenus/gameMenusSelectors";
import {
  closeAllMenus,
  goToSubmenu,
} from "../../../../../../store/slices/gameMenus/gameMenusSlice";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchActionCallback";
import { Border } from "../../../../../../ui/Border";
import { Dialog } from "../../../../../../ui/dialog";
import { DialogPortal } from "../../../../../../ui/DialogPortal";
import {
  detectDeviceType,
  detectIsPwa,
} from "../../../../../../utils/detectDeviceType";
import { BitmapText } from "../../../../tailwindSprites/Sprite";
import { MenuItem } from "../../MenuItem";
import { MenuItems } from "../../MenuItems";
import { GitRepoInfo } from "./GitRepoInfo";
import { MainMenuFooter } from "./MainMenuFooter";
import { MainMenuHeading } from "./MainMenuHeading";

const PlayGameMenuItem = () => {
  const isGameRunning = useIsGameRunning();
  const resume = useDispatchActionCallback(closeAllMenus);
  const goToWhichGameSubmenu = useDispatchActionCallback(
    goToSubmenu,
    "whichGame",
  );

  if (isGameRunning) {
    return (
      <MenuItem
        id="playGame"
        label={<BitmapText>Resume the game</BitmapText>}
        doubleHeightWhenFocussed
        onSelect={resume}
      />
    );
  }

  return (
    <MenuItem
      id="playGame"
      label={<BitmapText>Play the game</BitmapText>}
      doubleHeightWhenFocussed
      onSelect={goToWhichGameSubmenu}
      opensSubMenu={true}
    />
  );
};

const InstallMenuItem = () => {
  return (
    <MenuItem
      id="installGuide"
      label="Install"
      doubleHeightWhenFocussed
      onSelect={useDispatchActionCallback(goToSubmenu, "markdown/installGuide")}
      opensSubMenu={true}
    />
  );
};

const LevelEditorMenuItem = () => {
  return (
    <MenuItem
      id="levelEditor"
      label="Level Editor"
      doubleHeightWhenFocussed
      onSelect={useDispatchActionCallback(goToSubmenu, "sureWantEditor")}
      opensSubMenu={true}
    />
  );
};

const QuitGameMenuItem = () => {
  const isGameRunning = useIsGameRunning();
  const hasReincarnationPoint = useAppSelector(
    (state) => state.gameMenus.gameInPlay.reincarnationPoint !== undefined,
  );

  return (
    <MenuItem
      id="quitGame"
      label={hasReincarnationPoint ? "quit / reincarnate" : "quit the game"}
      className="text-midRed zx:text-zxYellow"
      onSelect={useDispatchActionCallback(goToSubmenu, "quitGameConfirm")}
      doubleHeightWhenFocussed
      hidden={!isGameRunning}
      opensSubMenu={true}
    />
  );
};

const discordInviteUrl = "https://discord.gg/Se5Jznc2jm";
export const MainMenuDialog = (_emptyProps: EmptyObject) => {
  const isGameRunning = useIsGameRunning();

  const showCrowns = useDispatchActionCallback(goToSubmenu, "crowns");
  const showScore = useDispatchActionCallback(goToSubmenu, "score");

  const showProgress = useCallback(() => {
    showCrowns();
    showScore();
  }, [showCrowns, showScore]);

  const offerInstall = detectIsPwa();

  return (
    <DialogPortal>
      <Border className="bg-metallicBlueHalfbrite zx:bg-zxRed" />
      <Dialog
        className="bg-metallicBlueHalfbrite zx:bg-zxRed gap-y-2 resHandheld:gap-y-1 justify-center"
        dialogId="mainMenu"
      >
        <MainMenuHeading
          noSubtitle={isGameRunning}
          className={isGameRunning ? "resHandheld:hidden" : ""}
        />
        <div className="text-highlightBeige zx:text-zxCyan selectedMenuItem:text-white resHandheld:mt-half flex flex-col gap-1 sprites-uppercase">
          <MenuItems className="w-24 mx-auto">
            <PlayGameMenuItem />
            {!isGameRunning && detectDeviceType() === "desktop" && (
              <LevelEditorMenuItem />
            )}
            <MenuItem
              id="map"
              label="use the Map"
              onSelect={useDispatchActionCallback(goToSubmenu, "map")}
              doubleHeightWhenFocussed
              hidden={!isGameRunning}
              opensSubMenu={true}
            />
            <MenuItem
              id="viewCrowns"
              label="Progress so far"
              onSelect={showProgress}
              doubleHeightWhenFocussed
              hidden={!isGameRunning}
              opensSubMenu={true}
            />
          </MenuItems>
          <div className="flex flex-row justify-between gap-2 w-24 mx-auto">
            <MenuItems>
              <MenuItem
                id="options"
                label="Options"
                doubleHeightWhenFocussed
                onSelect={useDispatchActionCallback(
                  goToSubmenu,
                  "modernisationOptions",
                )}
                opensSubMenu={true}
              />
              <MenuItem
                id="readTheManual"
                label="Manual"
                doubleHeightWhenFocussed
                onSelect={useDispatchActionCallback(
                  goToSubmenu,
                  "readTheManual",
                )}
                opensSubMenu={true}
              />
            </MenuItems>
            <MenuItems>
              {offerInstall ? null : <InstallMenuItem />}

              <MenuItem
                id="discord"
                leader={<BitmapText>{nerdFontDiscordChar}</BitmapText>}
                label={
                  <a href={discordInviteUrl} target="_blank">
                    <BitmapText>{`Discord`}</BitmapText>
                  </a>
                }
                doubleHeightWhenFocussed
                onSelect={useCallback(() => {
                  window.open(discordInviteUrl, "_blank");
                }, [])}
              />

              {offerInstall ?
                <>
                  {/* 
                  when install isn't shown, we need a placeholder to take up the space
                  to stop the layout jumping around. Since MenuItems is grid layout, we need
                  three
                  */}
                  <div className="h-1" />
                  <div className="h-1" />
                  <div className="h-1" />
                </>
              : null}
            </MenuItems>
          </div>
          {isGameRunning && (
            // don't even put the MenuItems in when the game isn't running (don't just skip the menuitems)
            // because even a zero-size element makes a gap in the flex parent container
            <MenuItems className="w-24 mx-auto">
              <QuitGameMenuItem />
            </MenuItems>
          )}
        </div>
        {!isGameRunning && <MainMenuFooter className="resHandheld:mt-1" />}
      </Dialog>
      <GitRepoInfo />
    </DialogPortal>
  );
};
