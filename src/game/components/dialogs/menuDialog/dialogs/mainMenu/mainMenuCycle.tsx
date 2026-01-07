import type { TailwindColourName } from "../../../../../../../tailwind.config";

export const mainMenuCycle = [
  "text-midRed zx:text-zxCyan",
  "text-highlightBeige zx:text-zxYellow",
  "text-moss zx:text-zxWhite",
] satisfies Array<`text-${TailwindColourName} zx:text-${TailwindColourName}`>;
