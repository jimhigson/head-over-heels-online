import type { EmptyObject } from "type-fest";
import {
  gameStarted,
  goToSubmenu,
} from "../../../../../../store/gameMenusSlice";
import { useAppSelector } from "../../../../../../store/hooks";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchCallback";
import { MenuItem } from "../../MenuItem";
import { MenuItems } from "../../MenuItems";
import { MainMenuFooter } from "./MainMenuFooter";
import { MainMenuHeading } from "./MainMenuHeading";
import { BitmapText } from "../../../../Sprite";
import { Border, Dialog } from "../../../../../../components/ui/dialog";

const PlayGameLabel = () => {
  const gameRunning = useAppSelector((state) => state.gameRunning);

  return (
    <BitmapText>{gameRunning ? "Resume the game" : "Play the game"}</BitmapText>
  );
};

export const MainMenuDialog = (_emptyProps: EmptyObject) => {
  const gameRunning = useAppSelector((state) => state.gameRunning);

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
            id="quitGame"
            label="Quit this game"
            onSelect={useDispatchActionCallback(goToSubmenu, "quitGameConfirm")}
            doubleHeightWhenFocussed
            hidden={!gameRunning}
          />
          <MenuItem
            id="selectKeys"
            label="Select the keys"
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
        </MenuItems>
        <MainMenuFooter />
      </Dialog>
    </>
  );

  /*
  Content() {
    return (
      <>
        
      </>
    );
  },
  items: [
    { label: PlayGameLabel, type: "toGame" },
    {
      label: "Quit this game",
      type: "submenu",
      submenu: "quitGameConfirm",
      showIf: (state) => state.gameRunning,
    },
    {
      label: "Select the keys",

      type: "submenu",
      submenu: "selectKeys",
    },
    {
      label: "Modernisation options",
      type: "submenu",
      submenu: "modernisationOptions",
    },
    { label: "Read the manual", type: "submenu", submenu: "readTheManual" },
  ],
  */
};
