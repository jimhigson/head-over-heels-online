import { isAnyOf } from "@reduxjs/toolkit";
import { useCallback, useEffect, useState } from "preact/hooks";
import { type EmptyObject } from "type-fest";

import { useAppDispatch, useAppSelector } from "../../../../../../store/hooks";
import { startAppListening } from "../../../../../../store/listenerMiddleware";
import { useGetAllUsersLatestCampaignsQuery } from "../../../../../../store/slices/campaigns/gameCampaignsApiSlice";
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
import { Dialog } from "../../../../../../ui/Dialog";
import { DialogPortal } from "../../../../../../ui/DialogPortal";
import { detectDeploymentType } from "../../../../../../utils/detectEnv/detectDeploymentType";
import { detectDeviceType } from "../../../../../../utils/detectEnv/detectDeviceType";
import { importTauriProcess } from "../../../../../../utils/tauri/dynamicLoad";
import { saveGameThunk } from "../../../../../gameState/saving/saveGameThunk";
import { useMaybeGameApi } from "../../../../GameApiContext";
import { MenuItem } from "../../MenuItem";
import { useCustomTextLeader } from "../CustomTextLeader";
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
        label="Back to the game"
        doubleHeightWhenFocussed
        onSelect={resume}
      />
    );
  }

  return (
    <MenuItem
      id="playGame"
      label="Play the game"
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
      className="text-moss zx:text-zxGreen toppy:text-toppyCool2"
      label={deviceType === "mobile" ? "Install" : "Download & Install"}
      doubleHeightWhenFocussed
      leader={useCustomTextLeader("⬇")}
      subMenuId={
        deviceType === "mobile" ?
          // currently only have pwa builds on mobile:
          "markdown/installPwa"
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
    (state) => state.gameInPlay.gameInPlay.reincarnationPoint !== undefined,
  );

  return (
    <MenuItem
      id="quitGame"
      label={hasReincarnationPoint ? "End game / reincarnate" : "End game"}
      className="text-midRed zx:text-zxYellow toppy:text-toppyPink2"
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
  const dispatch = useAppDispatch();

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
      className={
        selectedOnce ?
          "selectedMenuItem:text-midRed toppy:selectedMenuItem:text-toppyPink2"
        : ""
      }
      leader={
        <span className="text-center inline-block text-single-line">
          {selectedOnce ? "!" : "X"}
        </span>
      }
      onSelect={async () => {
        if (!selectedOnce) {
          setSelectedOnce(true);
        } else {
          if (isGameRunning) {
            dispatch(saveGameThunk(gameApi!.gameState));
            await persistor.flush();
          }
          // the build-time constant keeps the tauri api out of web builds;
          // this item is only shown when running in tauri anyway
          if (import.meta.env.TAURI_ENV_PLATFORM) {
            const { exit } = await importTauriProcess();
            exit();
          }
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

  useEffect(() => {
    // readiness signal for network-cost measurement (true-site-size)
    performance.mark("menu-ready");
  }, []);

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

  // only the tauri (native) app can reliably exit itself. In browsers the
  // user can just close the tab, and pwas have no dependable programmatic
  // close: chrome refuses window.close() on os-launched pwa windows (safari
  // allows it, but there's no clean way to tell them apart)
  const showExitApp = deploymentType === "tauri";

  return (
    <DialogPortal>
      <Border className="bg-metallicBlueHalfbrite zx:bg-zxRed toppy:bg-toppyCool4" />
      <Dialog
        className="bg-metallicBlueHalfbrite zx:bg-zxRed toppy:bg-toppyCool4 gap-y-0 pt-0 pb-oneScaledPix resHandheld:w-30"
        dialogId="mainMenu"
      >
        <MainMenuHeading
          noSubtitle={isGameRunning}
          className={`${isGameRunning ? "resHandheld:hidden pt-3" : "pt-2"} resHandheld:pt-half`}
        />
        <div className="flex-grow justify-around text-highlightBeige zx:text-zxCyan toppy:text-toppyWarm3 selectedMenuItem:text-white toppy:selectedMenuItem:text-toppyWarm1 flex flex-col gap-oneScaledPix mobile:gap-[calc(var(--scale)*2px)]">
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
                  label="View Map"
                  subMenuId="map"
                  doubleHeightWhenFocussed
                  hidden={!isGameRunning}
                />
                <MenuItem
                  id="viewCrowns"
                  label={
                    <>
                      <span className="resHandheld:hidden">Check </span>Progress
                    </>
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
                    <>
                      About<span className="resHandheld:hidden"> & Links</span>
                    </>
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
