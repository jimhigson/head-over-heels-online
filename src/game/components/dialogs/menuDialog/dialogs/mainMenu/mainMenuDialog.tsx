import type { EmptyObject } from "type-fest";

import { useCallback } from "react";

import { useAppSelector } from "../../../../../../store/hooks";
import { useGetAllUsersLatestCampaignsQuery } from "../../../../../../store/slices/campaigns/campaignsApiSlice";
import { useIsGameRunning } from "../../../../../../store/slices/gameMenus/gameMenusSelectors";
import {
  closeAllMenus,
  goToSubmenu,
} from "../../../../../../store/slices/gameMenus/gameMenusSlice";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchActionCallback";
import { Border } from "../../../../../../ui/Border";
import { Dialog } from "../../../../../../ui/dialog";
import { DialogPortal } from "../../../../../../ui/DialogPortal";
import { BitmapText } from "../../../../tailwindSprites/Sprite";
import { MenuItem } from "../../MenuItem";
import { MenuItems } from "../../MenuItems";
import { GitRepoInfo } from "./GitRepoInfo";
import { MainMenuFooter } from "./MainMenuFooter";
import { MainMenuHeading } from "./MainMenuHeading";
import { detectDeploymentType } from "../../../../../../utils/detectEnv/detectDeploymentType";

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

const DownloadOrInstallMenuItem = () => {
  return (
    <MenuItem
      id="installGuide"
      className="text-moss"
      label="⬇ Download / Install"
      doubleHeightWhenFocussed
      onSelect={useDispatchActionCallback(goToSubmenu, "installGuide")}
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
      label={hasReincarnationPoint ? "Quit / reincarnate" : "Quit the game"}
      className="text-midRed zx:text-zxYellow"
      onSelect={useDispatchActionCallback(goToSubmenu, "quitGameConfirm")}
      doubleHeightWhenFocussed
      hidden={!isGameRunning}
      opensSubMenu={true}
    />
  );
};

export const MenuSeparator = () => <div className="h-half col-span-3" />;

export const MainMenuDialog = (_emptyProps: EmptyObject) => {
  /* 
    preload the community campaigns for when/if the user goes to that menu.
    Strictly speaking this is unnecessary, and even most players will never use
    this data. However, on the supabase free tier, they turn your app off if
    there isn't enough requests going to the db. For the ones who do go to that
    menu, this will cache it so it will have data faster, and on reliable networks
    it at least gives more chance to load and the loading bars look cool I guess
    ¯\_(ツ)_/¯
   */
  useGetAllUsersLatestCampaignsQuery({ publishedOnly: true });

  const isGameRunning = useIsGameRunning();

  const showCrowns = useDispatchActionCallback(goToSubmenu, "crowns");
  const showScore = useDispatchActionCallback(goToSubmenu, "score");

  const showProgress = useCallback(() => {
    showCrowns();
    showScore();
  }, [showCrowns, showScore]);

  const deploymentType = detectDeploymentType();
  const offerDownloadOrInstall = deploymentType === "browser";

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
        <div className="text-highlightBeige zx:text-zxCyan selectedMenuItem:text-white resHandheld:mt-half flex flex-col gap-1">
          <MenuItems className="mx-auto">
            <PlayGameMenuItem />
            <MenuSeparator />
            {!isGameRunning && detectDeviceType() === "desktop" && (
              <LevelEditorMenuItem />
            )}

            <MenuItem
              id="map"
              label="Use the Map"
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
              id="about"
              label="About / Links"
              doubleHeightWhenFocussed
              onSelect={useDispatchActionCallback(goToSubmenu, "about")}
              opensSubMenu={true}
            />
            {offerDownloadOrInstall && <DownloadOrInstallMenuItem />}

            {isGameRunning ?
              <>
                <MenuSeparator />
                <QuitGameMenuItem />
              </>
            : null}
          </MenuItems>
        </div>
        {!isGameRunning && <MainMenuFooter className="resHandheld:mt-1" />}
      </Dialog>
      <GitRepoInfo />
    </DialogPortal>
  );
};
