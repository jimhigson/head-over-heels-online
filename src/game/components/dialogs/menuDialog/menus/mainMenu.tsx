import type { SpritesheetPaletteColourName } from "gfx/spritesheetPalette";
import { BitmapText, ImgSprite } from "../../../Sprite";
import { type Menu } from "../menus";
import { useGameApi } from "../../../GameApiContext";

export const colourCycle: SpritesheetPaletteColourName[] = [
  "lightGrey",
  "highlightBeige",
  "metallicBlue",
];

const PlayGameLabel = () => {
  const gameApi = useGameApi();
  const gameStarted = gameApi.gameState.gameTime > 0;

  return (
    <BitmapText>{gameStarted ? "Resume the game" : "Play the game"}</BitmapText>
  );
};

export const mainMenu: Menu = {
  backgroundClassName: "bg-midRed",
  itemsClassName: "text-metallicBlue",
  selectedClassName: "text-white",
  borderClassName: "bg-metallicBlue",
  heading: (
    <div className="">
      <div className="flex text-highlightBeige">
        <div className="flex flex-col gap-y-oneScaledPix">
          <BitmapText className="sprites-double-height me-1">Head</BitmapText>
          <ImgSprite className="ml-1 mt-1 texture-head.walking.right.2" />
        </div>
        <BitmapText colourCycle={colourCycle} className="mt-1 me-1">
          over
        </BitmapText>
        <div className="flex flex-col">
          <BitmapText className="sprites-double-height me-1">Heels</BitmapText>
          <ImgSprite className="ml-1 mt-1 texture-heels.walking.towards.2" />
        </div>
        <BitmapText colourCycle={colourCycle} className="mt-1">
          online
        </BitmapText>
      </div>
    </div>
  ),
  footer: (
    <>
      <div className="flex gap-3 leading-none mt-1">
        <div className="flex flex-col gap-y-oneScaledPix">
          <BitmapText className="text-redShadow ml-l">1987 original</BitmapText>
          <div className="flex gap-2">
            <div className="flex flex-col gap-y-oneScaledPix">
              <BitmapText className="ml-1" colourCycle={colourCycle}>
                Jon
              </BitmapText>
              <BitmapText colourCycle={colourCycle}>Ritman</BitmapText>
            </div>
            <div className="flex flex-col gap-y-oneScaledPix">
              <BitmapText className="ml-1" colourCycle={colourCycle}>
                Bernie
              </BitmapText>
              <BitmapText colourCycle={colourCycle}>Drummand</BitmapText>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-oneScaledPix">
          <BitmapText className="text-redShadow">2025 remake</BitmapText>
          <div className="flex">
            <div className="flex flex-col gap-y-oneScaledPix ml-3">
              <BitmapText className="ml-1" colourCycle={colourCycle}>
                Jim
              </BitmapText>
              <BitmapText colourCycle={colourCycle}>Higson</BitmapText>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-1">
        <ImgSprite className="mr-1 texture-cube" />
        <BitmapText className="text-redShadow">https://</BitmapText>
        <BitmapText className="text-lightGrey">block</BitmapText>
        <BitmapText className="text-highlightBeige">stack</BitmapText>
        <BitmapText className="text-metallicBlue">.</BitmapText>
        <BitmapText className="text-lightGrey">ing</BitmapText>
      </div>
    </>
  ),
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
    { label: "Read the manual", type: "todo" },
  ],
};
