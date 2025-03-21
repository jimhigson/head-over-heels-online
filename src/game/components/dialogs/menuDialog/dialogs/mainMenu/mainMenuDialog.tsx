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
import { BitmapText } from "../../../../Sprite";
import { Dialog } from "../../../../../../ui/dialog";
import { useIsGameRunning } from "../../../../../../store/selectors";
import { MenuItemSeparator } from "../../MenuItemSeparator";
import { DialogPortal } from "../../../../../../ui/DialogPortal";
import { useCallback } from "react";
import { Border } from "../../../../../../ui/Border";
import { multilineTextClass } from "../../multilineTextClass";
import { nerdFontDiscordChar } from "../../../../../../sprites/hudSritesheetData";

const PlayGameLabel = () => {
  const isGameRunning = useIsGameRunning();

  return (
    <BitmapText>
      {isGameRunning ? "Resume the game" : "Play the game"}
    </BitmapText>
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
      <Border className="bg-metallicBlue zx:bg-zxRed" />
      <Dialog className="bg-metallicBlueHalfbrite zx:bg-zxRed gap-y-2 resHandheld:gap-y-1">
        <MainMenuHeading
          noSubtitle={isGameRunning}
          className={isGameRunning ? "resHandheld:hidden" : ""}
        />
        <MenuItems className="text-highlightBeige zx:text-zxCyan selectedMenuItem:text-white w-max mx-auto resHandheld:mt-half">
          <MenuItem
            id="playGame"
            label={<PlayGameLabel />}
            doubleHeightWhenFocussed
            onSelect={useDispatchActionCallback(gameStarted)}
          />
          {isGameRunning && <MenuItemSeparator />}
          <MenuItem
            id="viewCrowns"
            label="Progress so far"
            onSelect={showProgress}
            doubleHeightWhenFocussed
            hidden={!isGameRunning}
          />

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
            label="Read the manual"
            doubleHeightWhenFocussed
            onSelect={useDispatchActionCallback(goToSubmenu, "readTheManual")}
          />
          <MenuItem
            id="discord"
            label={
              <a href={discordInviteUrl} target="_blank">
                <BitmapText>{`${nerdFontDiscordChar} Join the Discord`}</BitmapText>
              </a>
            }
            doubleHeightWhenFocussed
            onSelect={useCallback(() => {
              window.open(discordInviteUrl, "_blank");
            }, [])}
          />
          {isGameRunning && <MenuItemSeparator />}
          <MenuItem
            id="quitGame"
            label="Quit this game"
            className="text-midRed zx:text-zxYellow"
            onSelect={useDispatchActionCallback(goToSubmenu, "quitGameConfirm")}
            doubleHeightWhenFocussed
            hidden={!isGameRunning}
          />
        </MenuItems>
        {!isGameRunning && <MainMenuFooter />}
      </Dialog>
      {/* put a small debugging icon in the border or bottom-right */}
      <div className="flex bg-metallicBlueHalfbrite justify-end group absolute bottom-0 right-2 pl-1 pt-1 z-dialog">
        <BitmapText
          className={`text-pastelBlue hidden group-hover:block w-min ${multilineTextClass}`}
        >
          {__buildString__ || ""}
        </BitmapText>
        <BitmapText className="text-metallicBlue group-hover:hidden">
          *
        </BitmapText>
      </div>
    </DialogPortal>
  );
};
