import type { SpritesheetPaletteColourName } from "gfx/spritesheetPalette";
import { BitmapText, ImgSprite } from "../../../Sprite";
import type { Menu } from "../menus";
import { useGameApi } from "@/game/components/GameApiContext";

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
  itemClassName: "sprite-tint-metallicBlue",
  selectedClassName: "sprite-tint-white",
  heading: (
    <div className="ml-2">
      <div className="flex sprite-tint-highlightBeige">
        <div className="flex flex-col gap-y-oneScaledPix">
          <BitmapText className="sprites-double-height">Head</BitmapText>
          <ImgSprite className="ml-1" textureId="head.walking.right.2" />
        </div>
        <BitmapText colourCycle={colourCycle} className="mt-1">
          over
        </BitmapText>
        <div className="flex flex-col">
          <BitmapText className="sprites-double-height">Heels</BitmapText>
          <ImgSprite className="ml-1" textureId="heels.walking.towards.2" />
        </div>
        <BitmapText colourCycle={colourCycle} className="mt-1">
          online
        </BitmapText>
      </div>
    </div>
  ),
  footer: (
    <>
      <div className="flex gap-3 leading-none">
        <div className="flex flex-col gap-y-oneScaledPix">
          <BitmapText className="sprite-tint-redShadow ml-l" noSpaceAfter>
            1987 original
          </BitmapText>
          <div className="flex gap-2">
            <div className="flex flex-col gap-y-oneScaledPix">
              <BitmapText
                className="ml-1"
                colourCycle={colourCycle}
                noSpaceAfter
              >
                Jon
              </BitmapText>
              <BitmapText colourCycle={colourCycle} noSpaceAfter>
                Ritman
              </BitmapText>
            </div>
            <div className="flex flex-col gap-y-oneScaledPix">
              <BitmapText
                className="ml-1"
                colourCycle={colourCycle}
                noSpaceAfter
              >
                Bernie
              </BitmapText>
              <BitmapText colourCycle={colourCycle} noSpaceAfter>
                Drummand
              </BitmapText>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-oneScaledPix">
          <BitmapText className="sprite-tint-redShadow" noSpaceAfter>
            2025 remake
          </BitmapText>
          <div className="flex">
            <div className="flex flex-col gap-y-oneScaledPix ml-3">
              <BitmapText
                className="ml-1"
                colourCycle={colourCycle}
                noSpaceAfter
              >
                Jim
              </BitmapText>
              <BitmapText colourCycle={colourCycle} noSpaceAfter>
                Higson
              </BitmapText>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-1">
        <ImgSprite className="mr-1" textureId="cube" />
        <BitmapText className="sprite-tint-redShadow" noSpaceAfter>
          https://
        </BitmapText>
        <BitmapText className="sprite-tint-lightGrey" noSpaceAfter>
          block
        </BitmapText>
        <BitmapText className="sprite-tint-highlightBeige" noSpaceAfter>
          stack
        </BitmapText>
        <BitmapText className="sprite-tint-metallicBlue" noSpaceAfter>
          .
        </BitmapText>
        <BitmapText className="sprite-tint-lightGrey" noSpaceAfter>
          ing
        </BitmapText>
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
