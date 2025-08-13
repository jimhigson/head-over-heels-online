import type { EmptyObject } from "type-fest";
import {
  gameStarted,
  goToSubmenu,
} from "../../../../../../store/slices/gameMenusSlice";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchCallback";
import { MenuItem } from "../../MenuItem";
import { MenuItems } from "../../MenuItems";
import { MainMenuFooter } from "./MainMenuFooter";
import { MainMenuHeading } from "./MainMenuHeading";
import { BitmapText } from "../../../../tailwindSprites/Sprite";
import { Dialog } from "../../../../../../ui/dialog";
import { useIsGameRunning } from "../../../../../../store/selectors";
import { DialogPortal } from "../../../../../../ui/DialogPortal";
import { useCallback } from "react";
import { Border } from "../../../../../../ui/Border";
import { nerdFontDiscordChar } from "../../../../../../sprites/hudSritesheetData";
import {
  detectDeviceType,
  detectIsPwa,
} from "../../../../../../utils/detectDeviceType";
import { VersionDebugInfo } from "./VersionDebugInfo";
import { useAppSelector } from "../../../../../../store/hooks";

const PlayGameLabel = () => {
  const isGameRunning = useIsGameRunning();

  return (
    <BitmapText>
      {isGameRunning ? "Resume the game" : "Play the game"}
    </BitmapText>
  );
};

const InstallMenuItem = () => {
  return (
    <MenuItem
      id="installGuide"
      label="Install"
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
    />
  );
};

const QuitGameMenuItem = () => {
  const isGameRunning = useIsGameRunning();
  const hasReincarnationPoint = useAppSelector(
    (state) => state.gameMenus.reincarnationPoint !== undefined,
  );

  return (
    <MenuItem
      id="quitGame"
      label={hasReincarnationPoint ? "quit / reincarnate" : "quit the game"}
      className="text-midRed zx:text-zxYellow"
      onSelect={useDispatchActionCallback(goToSubmenu, "quitGameConfirm")}
      doubleHeightWhenFocussed
      hidden={!isGameRunning}
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

  return (
    <DialogPortal>
      <Border className="bg-metallicBlueHalfbrite zx:bg-zxRed" />
      <Dialog className="bg-metallicBlueHalfbrite zx:bg-zxRed gap-y-2 resHandheld:gap-y-1 justify-center">
        <MainMenuHeading
          noSubtitle={isGameRunning}
          className={isGameRunning ? "resHandheld:hidden" : ""}
        />
        <div className="text-highlightBeige zx:text-zxCyan selectedMenuItem:text-white resHandheld:mt-half flex flex-col gap-1">
          <MenuItems className="w-24 mx-auto">
            <MenuItem
              id="playGame"
              label={<PlayGameLabel />}
              doubleHeightWhenFocussed
              onSelect={useDispatchActionCallback(gameStarted)}
            />
            {!isGameRunning && detectDeviceType() === "desktop" && (
              <LevelEditorMenuItem />
            )}
            <MenuItem
              id="map"
              label="use the Map"
              onSelect={useDispatchActionCallback(goToSubmenu, "map")}
              doubleHeightWhenFocussed
              hidden={!isGameRunning}
            />
            <MenuItem
              id="viewCrowns"
              label="Progress so far"
              onSelect={showProgress}
              doubleHeightWhenFocussed
              hidden={!isGameRunning}
            />
          </MenuItems>
          <div className="flex flex-row justify-between gap-2 w-24 mx-auto">
            <MenuItems>
              <MenuItem
                id="modernisationOptions"
                label="Options"
                doubleHeightWhenFocussed
                onSelect={useDispatchActionCallback(
                  goToSubmenu,
                  "modernisationOptions",
                )}
              />
              <MenuItem
                id="readTheManual"
                label="Manual"
                doubleHeightWhenFocussed
                onSelect={useDispatchActionCallback(
                  goToSubmenu,
                  "readTheManual",
                )}
              />
            </MenuItems>
            <MenuItems>
              {detectIsPwa() || <InstallMenuItem />}

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
            </MenuItems>
          </div>
          <MenuItems className="w-24 mx-auto">
            <QuitGameMenuItem />
          </MenuItems>
        </div>
        {!isGameRunning && <MainMenuFooter />}
      </Dialog>
      <VersionDebugInfo />
    </DialogPortal>
  );
};
