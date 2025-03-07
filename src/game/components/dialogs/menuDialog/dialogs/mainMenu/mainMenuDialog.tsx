import type { EmptyObject } from "type-fest";
import {
  gameStarted,
  goToSubmenu,
} from "../../../../../../store/gameMenusSlice";
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
import { detectDeviceType } from "../../../../../../utils/detectDeviceType";
import { Border } from "../../../../../../ui/Border";

const PlayGameLabel = () => {
  const isGameRunning = useIsGameRunning();

  return (
    <BitmapText>
      {isGameRunning ? "Resume the game" : "Play the game"}
    </BitmapText>
  );
};

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
      <Dialog className="bg-metallicBlueHalfbrite zx:bg-zxRed gap-y-2 resGameboy:gap-y-1">
        <MainMenuHeading
          noSubtitle={isGameRunning}
          className={isGameRunning ? "resGameboy:hidden" : ""}
        />
        <MenuItems className="text-highlightBeige zx:text-zxCyan selectedMenuItem:text-white w-max mx-auto">
          <MenuItem
            id="playGame"
            label={<PlayGameLabel />}
            doubleHeightWhenFocussed
            onSelect={useDispatchActionCallback(gameStarted)}
          />
          <MenuItem
            id="viewCrowns"
            label="Progress so far"
            onSelect={showProgress}
            doubleHeightWhenFocussed
            hidden={!isGameRunning}
          />

          {/* mobile menus are already quite spaced out so don't give them the separator */}
          {detectDeviceType() !== "mobile" && isGameRunning && (
            <MenuItemSeparator />
          )}
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
    </DialogPortal>
  );
};
