import type { SpritesheetPaletteColourName } from "gfx/spritesheetPalette";
import { BitmapText } from "../../../Sprite";
import { type Menu } from "../menus";
import { MenuItems } from "../MenuItems";
import { useAppSelector } from "../../../../../store/hooks";

export const mainMenuCycle = [
  "text-metallicBlue zx:text-zxCyan",
  "text-highlightBeige zx:text-zxYellow",
  "text-lightGrey zx:text-zxWhite",
] satisfies Array<`text-${SpritesheetPaletteColourName} ${string}`>;

const PlayGameLabel = () => {
  const gameRunning = useAppSelector((state) => state.gameRunning);

  return (
    <BitmapText>{gameRunning ? "Resume the game" : "Play the game"}</BitmapText>
  );
};

export const MainMenuHeading = () => (
  <div className="flex text-highlightBeige zx:text-zxYellow ml-3">
    <div className="flex flex-col gap-y-oneScaledPix">
      <BitmapText className="sprites-double-height me-1">Head</BitmapText>
      <div className="mt-1 relative">
        <span className="sprite texture-animated-head.idle.right hover:texture-animated-head.walking.right relative z-topSprite" />
        <span className="sprite texture-shadow.smallRound absolute left-0 top-[calc(var(--scale)*1px)] opacity-halfBrite" />
      </div>
    </div>
    <BitmapText classnameCycle={mainMenuCycle} className="mt-1 me-1">
      over
    </BitmapText>
    <div className="flex flex-col">
      <BitmapText className="sprites-double-height me-1">Heels</BitmapText>
      <div className="mt-1 ml-2 relative">
        <span className="sprite texture-heels.walking.towards.2 hover:texture-animated-heels.walking.towards relative z-topSprite" />
        <span className="sprite texture-shadow.smallRound absolute left-0 top-[calc(var(--scale)*1px)] opacity-halfBrite" />
      </div>
    </div>
    <BitmapText classnameCycle={mainMenuCycle} className="mt-1">
      online
    </BitmapText>
  </div>
);

const MainMenuFooter = () => (
  <>
    <div className="flex gap-3 leading-none">
      <div className="flex flex-col gap-y-oneScaledPix">
        <BitmapText className="text-redShadow zx:text-zxRedDimmed ml-2">
          1987 original
        </BitmapText>
        <div className="flex gap-2">
          <div className="flex flex-col gap-y-oneScaledPix">
            <BitmapText className="ml-1" classnameCycle={mainMenuCycle}>
              Jon
            </BitmapText>
            <BitmapText classnameCycle={mainMenuCycle}>Ritman</BitmapText>
          </div>
          <div className="flex flex-col gap-y-oneScaledPix">
            <BitmapText className="ml-1" classnameCycle={mainMenuCycle}>
              Bernie
            </BitmapText>
            <BitmapText classnameCycle={mainMenuCycle}>Drummand</BitmapText>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-oneScaledPix">
        <BitmapText className="text-redShadow zx:text-zxRedDimmed">
          2025 remake
        </BitmapText>
        <div className="flex">
          <div className="flex flex-col gap-y-oneScaledPix ml-3">
            <BitmapText className="ml-1" classnameCycle={mainMenuCycle}>
              Jim
            </BitmapText>
            <BitmapText classnameCycle={mainMenuCycle}>Higson</BitmapText>
          </div>
        </div>
      </div>
    </div>
    <div className="absolute bottom-1">
      <BitmapText className="text-redShadow zx:text-zxRedDimmed">
        https://
      </BitmapText>
      <BitmapText className="text-lightGrey zx:text-zxBlack">block</BitmapText>
      <BitmapText className="text-highlightBeige zx:text-zxBlueDimmed">
        stack
      </BitmapText>
      <BitmapText className="text-metallicBlue zx:text-zxRedDimmed">
        .
      </BitmapText>
      <BitmapText className="text-lightGrey zx:text-zxBlack">ing</BitmapText>
    </div>
  </>
);

export const mainMenu: Menu = {
  dialogClassName: "bg-midRed zx:bg-zxRed",
  borderClassName: "bg-metallicBlue zx:bg-zxBlue",
  Content() {
    return (
      <>
        <MainMenuHeading />
        <MenuItems
          className="text-metallicBlue zx:text-zxCyan"
          selectedClassName="text-white"
        />
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
