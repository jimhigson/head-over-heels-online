import { spritesheetPalette } from "gfx/spritesheetPalette";
import { BitmapText, ImgSprite } from "../../../Sprite";
import type { Menu } from "../menus";

export const colourCycle = [
  spritesheetPalette.lightGrey,
  spritesheetPalette.highlightBeige,
  spritesheetPalette.metallicBlue,
];

export const mainMenu: Menu = {
  background: "midRed",
  itemColour: "metallicBlue",
  selectedColour: "white",
  heading: (
    <div className="ml-2">
      <div className="flex">
        <div className="flex flex-col">
          <BitmapText colour={spritesheetPalette.highlightBeige} doubleHeight>
            Head
          </BitmapText>
          <ImgSprite className="ml-1" textureId="head.walking.right.2" />
        </div>
        <BitmapText colour={colourCycle} className="mt-1">
          over
        </BitmapText>
        <div className="flex flex-col">
          <BitmapText colour={spritesheetPalette.highlightBeige} doubleHeight>
            Heels
          </BitmapText>
          <ImgSprite className="ml-1" textureId="heels.walking.towards.2" />
        </div>
        <BitmapText colour={colourCycle} className="mt-1">
          online
        </BitmapText>
      </div>
    </div>
  ),
  footer: (
    <>
      <div className="flex gap-3">
        <div className="flex flex-col">
          <BitmapText
            className="ml-1"
            colour={spritesheetPalette.redShadow}
            noSpaceAfter
          >
            1987 original
          </BitmapText>
          <div className="flex gap-2">
            <div className="flex flex-col">
              <BitmapText className="ml-1" colour={colourCycle} noSpaceAfter>
                Jon
              </BitmapText>
              <BitmapText colour={colourCycle} noSpaceAfter>
                Ritman
              </BitmapText>
            </div>
            <div className="flex flex-col">
              <BitmapText className="ml-1" colour={colourCycle} noSpaceAfter>
                Bernie
              </BitmapText>
              <BitmapText colour={colourCycle} noSpaceAfter>
                Drummand
              </BitmapText>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <BitmapText colour={spritesheetPalette.redShadow} noSpaceAfter>
            2025 remake
          </BitmapText>
          <div className="flex">
            <div className="flex flex-col ml-3">
              <BitmapText className="ml-1" colour={colourCycle} noSpaceAfter>
                Jim
              </BitmapText>
              <BitmapText colour={colourCycle} noSpaceAfter>
                Higson
              </BitmapText>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-1">
        <ImgSprite className="mr-1" textureId="cube" />
        <BitmapText colour={spritesheetPalette.redShadow} noSpaceAfter>
          https://
        </BitmapText>
        <BitmapText colour={spritesheetPalette.lightGrey} noSpaceAfter>
          block
        </BitmapText>
        <BitmapText colour={spritesheetPalette.highlightBeige} noSpaceAfter>
          stack
        </BitmapText>
        <BitmapText colour={spritesheetPalette.metallicBlue} noSpaceAfter>
          .
        </BitmapText>
        <BitmapText colour={spritesheetPalette.lightGrey} noSpaceAfter>
          ing
        </BitmapText>
      </div>
    </>
  ),
  items: [
    { label: "Play the game", type: "toGame" },
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
