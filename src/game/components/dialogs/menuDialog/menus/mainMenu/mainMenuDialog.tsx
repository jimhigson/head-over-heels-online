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
import { Border, Dialog } from "../../../../../../components/ui/dialog";
import { useIsGameRunning } from "../../../../../../store/selectors";
import { MenuItemSeparator } from "../../MenuItemSeparator";

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

  return (
    <>
      <Border className="bg-metallicBlueHalfbrite zx:bg-zxRed" />
      <Dialog className="bg-metallicBlueHalfbrite zx:bg-zxRed gap-y-2">
        <MainMenuHeading />
        <MenuItems className="text-highlightBeige zx:text-zxCyan selectedMenuItem:text-white">
          <MenuItem
            id="playGame"
            label={<PlayGameLabel />}
            doubleHeightWhenFocussed
            onSelect={useDispatchActionCallback(gameStarted)}
          />
          <MenuItem
            id="viewCrowns"
            label="View the crowns"
            onSelect={useDispatchActionCallback(goToSubmenu, "crowns")}
            doubleHeightWhenFocussed
            hidden={!isGameRunning}
          />
          <MenuItem
            id="selectKeys"
            label="Select the controls"
            doubleHeightWhenFocussed
            onSelect={useDispatchActionCallback(goToSubmenu, "selectKeys")}
          />
          <MenuItem
            id="modernisationOptions"
            label="Modernisation Options"
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
          <MenuItemSeparator />
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
    </>
  );
};
