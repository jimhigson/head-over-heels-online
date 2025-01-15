import type { Action } from "@/game/input/InputState";
import type { ReactNode } from "react";
import { BitmapText, ImgSprite } from "../../Sprite";
import { spritesheetPalette } from "gfx/spritesheetPalette";
import { objectEntriesIter } from "@/utils/entries";
import { keyAssignmentPresets } from "@/game/input/keyAssignmentPresets";
import { iterate } from "@/utils/iterate";

export type MenuId =
  | "mainMenu"
  | "selectKeys"
  | "inputPreset"
  | "modernisationOptions";

export type Menu = {
  heading: ReactNode;
  footer?: ReactNode;
  items: MenuItem[];
  background: keyof typeof spritesheetPalette;
  itemColour: keyof typeof spritesheetPalette;
  selectedColour: keyof typeof spritesheetPalette;
};
export type MenuItem = {
  label: string;
} & (
  | {
      type: "submenu";
      submenu: MenuId;
    }
  | { type: "toGame" }
  | { type: "switch" }
  | { type: "key"; action: Action }
  | { type: "todo" }
);

const colourCycle = [
  spritesheetPalette.lightGrey,
  spritesheetPalette.highlightBeige,
  spritesheetPalette.metallicBlue,
];

export const menus: Record<MenuId, Menu> = {
  mainMenu: {
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
            <BitmapText colour={spritesheetPalette.redShadow} noSpaceAfter>
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
  },
  selectKeys: {
    background: "lightGrey",
    itemColour: "metallicBlue",
    selectedColour: "moss",
    heading: (
      <BitmapText colour={spritesheetPalette.metallicBlue} doubleHeight>
        Select the keys
      </BitmapText>
    ),
    items: [
      {
        type: "submenu",
        label: "choose a preset",
        submenu: "inputPreset",
      },
      {
        type: "key",
        label: "Left ↖",
        action: "left",
      },
      {
        type: "key",
        label: "Right ↘",
        action: "right",
      },
      {
        type: "key",
        label: "Down ↙",
        action: "towards",
      },
      {
        type: "key",
        label: "Up ↗",
        action: "away",
      },
      {
        type: "key",
        label: "Jump",
        action: "jump",
      },
      {
        type: "key",
        label: "Carry",
        action: "carry",
      },
      {
        type: "key",
        label: "Fire",
        action: "fire",
      },
      {
        type: "key",
        label: "Swop",
        action: "swop",
      },
    ],
  },
  modernisationOptions: {
    background: "metallicBlue",
    itemColour: "lightGrey",
    selectedColour: "moss",
    heading: (
      <BitmapText doubleHeight colour={spritesheetPalette.moss}>
        Modernisation options
      </BitmapText>
    ),
    items: [
      { type: "switch", label: "Colourised" },
      { type: "switch", label: "Extra items" },
    ],
  },
  inputPreset: {
    background: "lightGrey",
    itemColour: "metallicBlue",
    selectedColour: "moss",
    heading: (
      <BitmapText colour={spritesheetPalette.metallicBlue} doubleHeight>
        Select the keys
      </BitmapText>
    ),
    items: [
      ...iterate(objectEntriesIter(keyAssignmentPresets)).map(
        ([presetName, _keyAssignment]): MenuItem => ({
          type: "todo",
          label: presetName,
        }),
      ),
    ],
  },
};
