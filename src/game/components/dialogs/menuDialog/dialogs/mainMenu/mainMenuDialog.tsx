import type { EmptyObject } from "type-fest";

import { isAnyOf } from "@reduxjs/toolkit";
import { useCallback, useEffect, useState } from "react";

import { useAppSelector, useAppStore } from "../../../../../../store/hooks";
import { startAppListening } from "../../../../../../store/listenerMiddleware";
import { useGetAllUsersLatestCampaignsQuery } from "../../../../../../store/slices/campaigns/campaignsApiSlice";
import { useIsGameRunning } from "../../../../../../store/slices/gameMenus/gameMenusSelectors";
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
      className="text-moss zx:text-zxGreen"
      label="Download & Install"
      doubleHeightWhenFocussed
      leader={<BitmapText className="text-center w-2">⬇</BitmapText>}
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
      label={hasReincarnationPoint ? "End game / reincarnate" : "End game"}
      className="text-midRed zx:text-zxYellow"
      onSelect={useDispatchActionCallback(goToSubmenu, "quitGameConfirm")}
      doubleHeightWhenFocussed
      hidden={!isGameRunning}
      opensSubMenu
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

  const deploymentType = detectDeploymentType();
  const deviceType = detectDeviceType();
  const offerDownloadOrInstall = deploymentType === "browser";

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
        className="bg-metallicBlueHalfbrite zx:bg-zxRed gap-y-2 resHandheld:gap-y-1 justify-around"
        dialogId="mainMenu"
      >
        <MainMenuHeading
          noSubtitle={isGameRunning}
          className={`${isGameRunning ? "resHandheld:hidden" : ""} pt-1 resHandheld:pt-half`}
        />
        <div className="text-highlightBeige zx:text-zxCyan selectedMenuItem:text-white flex flex-col gap-oneScaledPix mobile:gap-[calc(var(--scale)*2px)]">
          <MaybeTwoColumnMenuitems
            columnCount={detectDeviceType() === "mobile" ? 2 : 1}
            topContents={
              <>
                <PlayGameMenuItem />
              </>
            }
            middleContents={
              <>
                <MenuItem
                  id="map"
                  label={
                    <MultipleBitmapText>
                      <span className="resHandheld:hidden">Use the </span>Map
                    </MultipleBitmapText>
                  }
                  onSelect={useDispatchActionCallback(goToSubmenu, "map")}
                  doubleHeightWhenFocussed
                  hidden={!isGameRunning}
                  opensSubMenu={true}
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
                  onSelect={useDispatchActionCallback(
                    goToSubmenu,
                    "modernisationOptions",
                  )}
                  opensSubMenu={true}
                />
                <MenuItem
                  id="about"
                  label={
                    <MultipleBitmapText>
                      About<span className="resHandheld:hidden"> & Links</span>
                    </MultipleBitmapText>
                  }
                  doubleHeightWhenFocussed
                  onSelect={useDispatchActionCallback(goToSubmenu, "about")}
                  opensSubMenu={true}
                />
              </>
            }
            bottomContents={
              <>
                {!isGameRunning && detectDeviceType() === "desktop" && (
                  <LevelEditorMenuItem />
                )}
                {offerDownloadOrInstall && <DownloadOrInstallMenuItem />}
                {(isGameRunning || showExitApp) && <MenuSeparator />}
                {isGameRunning && <QuitGameMenuItem />}
                {showExitApp && <ExitAppMenuItem />}
              </>
            }
          />
        </div>
        {!isGameRunning && <MainMenuFooter />}
      </Dialog>
      <GitRepoInfo />
    </DialogPortal>
  );
};
