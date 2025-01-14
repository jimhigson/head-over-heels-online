import type { ReactNode } from "react";

export type Menu = {
  heading: ReactNode;
  items: MenuItem[];
};
export type MenuItem = {
  text: string;
};
export const menu: Menu = {
  heading: "main menu",
  items: [
    { text: "Play the game" },
    { text: "Select the keys" },
    { text: "Modernisation options" },
    { text: "Read the manual" },
  ],
};
