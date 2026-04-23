import type { TailwindTextColourClassname } from "../../../../../../tailwind/tailwindColours";

export const mainMenuCycle = [
  (
    [
      "text-midRed",
      "zx:text-zxCyan",
      "toppy:text-toppyPink2",
    ] satisfies Array<TailwindTextColourClassname>
  ).join(" "),
  (
    [
      "text-highlightBeige",
      "zx:text-zxYellow",
      "toppy:text-toppyWarm2",
    ] satisfies Array<TailwindTextColourClassname>
  ).join(" "),
  (
    [
      "text-moss",
      "zx:text-zxWhite",
      "toppy:text-toppyCool1",
    ] satisfies Array<TailwindTextColourClassname>
  ).join(" "),
];
