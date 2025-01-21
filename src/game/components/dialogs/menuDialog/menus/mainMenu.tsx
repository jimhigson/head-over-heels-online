import type { SpritesheetPaletteColourName } from "gfx/spritesheetPalette";
import { BitmapText, CssSprite } from "../../../Sprite";
import { type Menu } from "../menus";
import { useGameApi } from "../../../GameApiContext";
import { MenuItems } from "../MenuItems";

export const classnameCycle = [
  "text-lightGrey",
  "text-highlightBeige",
  "text-metallicBlue",
] satisfies Array<`text-${SpritesheetPaletteColourName}`>;

const PlayGameLabel = () => {
  const gameApi = useGameApi();
  const gameStarted = gameApi.gameState.gameTime > 0;

  return (
    <BitmapText>{gameStarted ? "Resume the game" : "Play the game"}</BitmapText>
  );
};

const MainMenuHeading = () => (
  <div className="flex text-highlightBeige">
    <div className="flex flex-col gap-y-oneScaledPix">
      <BitmapText className="sprites-double-height me-1">Head</BitmapText>
      <CssSprite className="ml-1 mt-1 texture-head.walking.right.2" />
    </div>
    <BitmapText classnameCycle={classnameCycle} className="mt-1 me-1">
      over
    </BitmapText>
    <div className="flex flex-col">
      <BitmapText className="sprites-double-height me-1">Heels</BitmapText>
      <CssSprite className="ml-1 mt-1 texture-heels.walking.towards.2" />
    </div>
    <BitmapText classnameCycle={classnameCycle} className="mt-1">
      online
    </BitmapText>
  </div>
);

const MainMenuFooter = () => (
  <>
    <div className="flex gap-3 leading-none">
      <div className="flex flex-col gap-y-oneScaledPix">
        <BitmapText className="text-redShadow ml-2">1987 original</BitmapText>
        <div className="flex gap-2">
          <div className="flex flex-col gap-y-oneScaledPix">
            <BitmapText className="ml-1" classnameCycle={classnameCycle}>
              Jon
            </BitmapText>
            <BitmapText classnameCycle={classnameCycle}>Ritman</BitmapText>
          </div>
          <div className="flex flex-col gap-y-oneScaledPix">
            <BitmapText className="ml-1" classnameCycle={classnameCycle}>
              Bernie
            </BitmapText>
            <BitmapText classnameCycle={classnameCycle}>Drummand</BitmapText>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-oneScaledPix">
        <BitmapText className="text-redShadow">2025 remake</BitmapText>
        <div className="flex">
          <div className="flex flex-col gap-y-oneScaledPix ml-3">
            <BitmapText className="ml-1" classnameCycle={classnameCycle}>
              Jim
            </BitmapText>
            <BitmapText classnameCycle={classnameCycle}>Higson</BitmapText>
          </div>
        </div>
      </div>
    </div>
    <div>
      <CssSprite className="mr-1 texture-cube" />
      <BitmapText className="text-redShadow">https://</BitmapText>
      <BitmapText className="text-lightGrey">block</BitmapText>
      <BitmapText className="text-highlightBeige">stack</BitmapText>
      <BitmapText className="text-metallicBlue">.</BitmapText>
      <BitmapText className="text-lightGrey">ing</BitmapText>
    </div>
  </>
);

export const mainMenu: Menu = {
  dialogClassName: "bg-midRed",
  borderClassName: "bg-metallicBlue",
  Content() {
    return (
      <>
        <MainMenuHeading />
        <MenuItems
          className="text-metallicBlue"
          selectedClassName="text-white"
        />
        <MainMenuFooter />
      </>
    );
  },
  items: [
    { label: PlayGameLabel, type: "toGame" },
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
