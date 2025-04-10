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
import { detectIsPwa } from "../../../../../../utils/detectDeviceType";
import { VersionDebugInfo } from "./VersionDebugInfo";

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

const QuitGameMenuItem = () => {
  const isGameRunning = useIsGameRunning();

  return (
    <MenuItem
      id="quitGame"
      label="Quit"
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
          <MenuItems className="w-max mx-auto">
            <MenuItem
              id="playGame"
              label={<PlayGameLabel />}
              doubleHeightWhenFocussed
              onSelect={useDispatchActionCallback(gameStarted)}
            />
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
            <QuitGameMenuItem />
          </MenuItems>
          <div className="flex flex-row justify-center gap-2">
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
          <MenuItems></MenuItems>
        </div>
        {!isGameRunning && <MainMenuFooter />}
      </Dialog>
      <VersionDebugInfo />
    </DialogPortal>
  );
};
