import type { SceneryName } from "../../../../../../sprites/planets";

export const mapColours: Record<
  SceneryName,
  { bg: string; textClassName: string }
> = {
  blacktooth: {
    bg: "bg-moss",
    textClassName: "text-shadow",
  },
  bookworld: {
    bg: "bg-redShadow",
    textClassName: "text-highlightBeige",
  },
  jail: {
    bg: "bg-shadow",
    textClassName: "text-lightGrey",
  },
  egyptus: {
    bg: "bg-midRed",
    textClassName: "text-highlightBeige",
  },
  moonbase: {
    bg: "bg-pastelBlue",
    textClassName: "text-metallicBlue",
  },
  market: {
    bg: "bg-metallicBlue",
    textClassName: "text-highlightBeige",
  },
  penitentiary: {
    bg: "bg-shadow",
    textClassName: "text-moss",
  },
  safari: {
    bg: "bg-redShadow",
    textClassName: "text-moss",
  },
};
