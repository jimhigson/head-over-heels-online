import type { Action } from "@/game/input/InputState";
import type { ReactNode } from "react";
import { BitmapText } from "../../Sprite";
import { spritesheetPalette } from "gfx/spritesheetPalette";

export type Menu = {
  heading: ReactNode;
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
      submenu: Menu;
    }
  | { type: "toGame" }
  | { type: "key"; action: Action }
  | { type: "todo" }
);
export const mainMenu: Menu = {
  background: "midRed",
  itemColour: "metallicBlue",
  selectedColour: "white",
  heading: (
    <>
      <div>
        <BitmapText color={spritesheetPalette.highlightBeige} doubleHeight>
          Head
        </BitmapText>
        <BitmapText>over</BitmapText>
        <BitmapText color={spritesheetPalette.highlightBeige} doubleHeight>
          Heels
        </BitmapText>
        <BitmapText>online</BitmapText>
      </div>
      <BitmapText>blockstack.ing</BitmapText>
    </>
  ),
  items: [
    { label: "Play the game", type: "toGame" },
    {
      label: "Select the keys",

      type: "submenu",
      submenu: {
        background: "lightGrey",
        itemColour: "metallicBlue",
        selectedColour: "moss",
        heading: (
          <BitmapText color={spritesheetPalette.metallicBlue} doubleHeight>
            Select the keys
          </BitmapText>
        ),
        items: [
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
    },
    { label: "Modernisation options", type: "todo" },
    { label: "Read the manual", type: "todo" },
  ],
};
