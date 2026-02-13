import type { EmptyObject } from "type-fest";

import { isAnyOf } from "@reduxjs/toolkit";
import { useCallback, useEffect, useState } from "react";

import { useAppSelector, useAppStore } from "../../../../../../store/hooks";
import { startAppListening } from "../../../../../../store/listenerMiddleware";
import { useGetAllUsersLatestCampaignsQuery } from "../../../../../../store/slices/campaigns/campaignsApiSlice";
import {
  useEmulatedResolutionName,
  useIsGameRunning,
} from "../../../../../../store/slices/gameMenus/gameMenusSelectors";
import {
  closeAllMenus,
  goToSubmenu,
  menuOpenOrExitPressed,
  setFocussedMenuItemId,
} from "../../../../../../store/slices/gameMenus/gameMenusSlice";
import { persistor } from "../../../../../../store/store";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchActionCallback";
import { Border } from "../../../../../../ui/Border";
import { Dialog } from "../../../../../../ui/dialog";
import { DialogPortal } from "../../../../../../ui/DialogPortal";
import { detectDeploymentType } from "../../../../../../utils/detectEnv/detectDeploymentType";
import { detectDeviceType } from "../../../../../../utils/detectEnv/detectDeviceType";
import { importTauriProcess } from "../../../../../../utils/tauri/dynamicLoad";
import { dispatchSaveGame } from "../../../../../gameState/saving/dispatchSaveGame";
import { isInPlaytestMode } from "../../../../../isInPlaytestMode";
import { useMaybeGameApi } from "../../../../GameApiContext";
import {
  BitmapText,
  MultipleBitmapText,
} from "../../../../tailwindSprites/Sprite";
import { MenuItem } from "../../MenuItem";
import { GitRepoInfo } from "./GitRepoInfo";
import { MainMenuFooter } from "./MainMenuFooter";
import { MainMenuHeading } from "./MainMenuHeading";
import { MaybeTwoColumnMenuitems } from "./MaybeTwoColumnMenuitems";
import { MenuSeparator } from "./MenuSeparator";

const PlayGameMenuItem = () => {
  const isGameRunning = useIsGameRunning();
  const resume = useDispatchActionCallback(closeAllMenus);

  if (isGameRunning) {
    return (
      <MenuItem
        id="playGame"
        label={<BitmapText>Back to the game</BitmapText>}
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
      subMenuId="whichGame"
    />
  );
};

const DownloadOrInstallMenuItem = () => {
  const deviceType = detectDeviceType();

  return (
    <MenuItem
      id="installGuide"
      className="text-moss zx:text-zxGreen"
      label={deviceType === "mobile" ? "Install" : "Download & Install"}
      doubleHeightWhenFocussed
      leader={<BitmapText className="text-center w-2">⬇</BitmapText>}
      subMenuId={
        deviceType === "mobile" ?
          // currently only have pwa builds on mobile:
          "installGuidePwa"
        : "installGuide"
      }
    />
  );
};

const LevelEditorMenuItem = () => {
  return (
    <MenuItem
      id="levelEditor"
      label="Level Editor"
      doubleHeightWhenFocussed
      subMenuId="sureWantEditor"
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
      label={hasReincarnationPoint ? "End game / reincarnate" : "End game"}
      className="text-midRed zx:text-zxYellow"
      subMenuId="quitGameConfirm"
      doubleHeightWhenFocussed
      hidden={!isGameRunning}
    />
  );
};

const ExitAppMenuItem = () => {
  const [selectedOnce, setSelectedOnce] = useState(false);
  const isGameRunning = useIsGameRunning();
  const gameApi = useMaybeGameApi();
  const store = useAppStore();

  useEffect(() => {
    // selecting away from the exit item resets the selectedOnce state
    const unsub = startAppListening({
      matcher: isAnyOf(setFocussedMenuItemId, menuOpenOrExitPressed),
      effect() {
        setSelectedOnce(false);
      },
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <MenuItem
      id="exit"
      label={selectedOnce ? "Again to exit" : "Exit"}
      className={selectedOnce ? "selectedMenuItem:text-midRed" : ""}
      leader={
        <BitmapText className="text-center">
          {selectedOnce ? "!" : "X"}
        </BitmapText>
      }
      onSelect={async () => {
        if (!selectedOnce) {
          setSelectedOnce(true);
        } else {
          if (isGameRunning && !isInPlaytestMode()) {
            dispatchSaveGame(gameApi!.gameState, store);
            await persistor.flush();
          }
          const { exit } = await importTauriProcess();
          exit();
        }
      }}
      doubleHeightWhenFocussed
    />
  );
};

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

  const emulatedResolutionName = useEmulatedResolutionName();

  const deploymentType = detectDeploymentType();
  const deviceType = detectDeviceType();
  const offerDownloadOrInstall =
    deploymentType === "browser" &&
    (!isGameRunning || deviceType === "desktop");

  const showExitApp =
    // browsers don't show an exit option - the user can just close the tab
    // whereas PWAs and Tauri are basically native (ish) apps and they get it:
    deploymentType !== "browser" &&
    // however, it isn't the done thing to have close app options on mobile,
    // the user just swipes away with a gesture
    deviceType !== "mobile";

  return (
    <DialogPortal>
      <Border className="bg-metallicBlueHalfbrite zx:bg-zxRed" />
      <Dialog
        className="bg-metallicBlueHalfbrite zx:bg-zxRed gap-y-0 pt-0 pb-oneScaledPix resHandheld:w-30"
        dialogId="mainMenu"
      >
        <MainMenuHeading
          noSubtitle={isGameRunning}
          className={`${isGameRunning ? "resHandheld:hidden pt-3" : "pt-2"} resHandheld:pt-half`}
        />
        <div className="flex-grow justify-around text-highlightBeige zx:text-zxCyan selectedMenuItem:text-white flex flex-col gap-oneScaledPix mobile:gap-[calc(var(--scale)*2px)]">
          <MaybeTwoColumnMenuitems
            spaceOut={emulatedResolutionName !== "handheld"}
            columnCount={
              isGameRunning && emulatedResolutionName === "handheld" ? 2 : 1
            }
            topContents={
              <>
                <PlayGameMenuItem />
              </>
            }
            middleContents={
              <>
                <MenuItem
                  id="map"
                  label={<MultipleBitmapText>View Map</MultipleBitmapText>}
                  subMenuId="map"
                  doubleHeightWhenFocussed
                  hidden={!isGameRunning}
                />
                <MenuItem
                  id="viewCrowns"
                  label={
                    <MultipleBitmapText>
                      <span className="resHandheld:hidden">Check </span>Progress
                    </MultipleBitmapText>
                  }
                  onSelect={showProgress}
                  doubleHeightWhenFocussed
                  hidden={!isGameRunning}
                  opensSubMenu={true}
                />
                <MenuItem
                  id="options"
                  label="Options"
                  doubleHeightWhenFocussed
                  subMenuId="modernisationOptions"
                />
                <MenuItem
                  id="about"
                  label={
                    <MultipleBitmapText>
                      About<span className="resHandheld:hidden"> & Links</span>
                    </MultipleBitmapText>
                  }
                  doubleHeightWhenFocussed
                  subMenuId="about"
                />
              </>
            }
            bottomContents={
              <>
                {!isGameRunning && detectDeviceType() === "desktop" && (
                  <LevelEditorMenuItem />
                )}
                {offerDownloadOrInstall && <DownloadOrInstallMenuItem />}
                {isGameRunning && (
                  <>
                    <MenuSeparator />
                    <QuitGameMenuItem />
                  </>
                )}
                {showExitApp && (
                  <>
                    <MenuSeparator />
                    <ExitAppMenuItem />
                  </>
                )}
              </>
            }
          />
        </div>
        {!isGameRunning && emulatedResolutionName !== "handheld" && (
          <MainMenuFooter />
        )}
      </Dialog>
      <GitRepoInfo />
    </DialogPortal>
  );
};
