import { BitmapText } from "../../../Sprite";
import { type Menu } from "../menus";
import { MenuItems } from "../MenuItems";
import { useAppSelector } from "../../../../../store/hooks";
import type { TailwindPalette } from "../../../../../../tailwind.config";
import { MainMenuFooter } from "./MainMenuFooter";
import { MainMenuHeading } from "./MainMenuHeading";

export const mainMenuCycle = [
  "text-pink zx:text-zxCyan",
  "text-highlightBeige zx:text-zxYellow",
  "text-moss zx:text-zxWhite",
] satisfies Array<`text-${TailwindPalette} zx:text-${TailwindPalette}`>;

const PlayGameLabel = () => {
  const gameRunning = useAppSelector((state) => state.gameRunning);

  return (
    <BitmapText>{gameRunning ? "Resume the game" : "Play the game"}</BitmapText>
  );
};

export const mainMenu: Menu = {
  dialogClassName: "bg-metallicBlueHalfbrite zx:bg-zxRed gap-y-2",
  borderClassName: "bg-metallicBlue zx:bg-zxRed",
  Content() {
    return (
      <>
        <MainMenuHeading />
        <MenuItems className="text-highlightBeige zx:text-zxCyan selectedMenuItem:text-white" />
        <MainMenuFooter />
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
};
