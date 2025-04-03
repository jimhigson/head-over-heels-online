import type { SceneryName } from "../../../../../../sprites/planets";

export const mapColours: Record<SceneryName, { bgClassName: string }> = {
  blacktooth: {
    bgClassName:
      "bg-moss text-shadow scrollbar-track-moss scrollbar-thumb-shadow",
  },
  bookworld: {
    bgClassName:
      "bg-redShadow text-highlightBeige scrollbar-track-redShadow scrollbar-thumb-highlightBeige",
  },
  jail: {
    bgClassName:
      "bg-shadow text-lightGrey scrollbar-track-shadow scrollbar-thumb-lightGrey",
  },
  egyptus: {
    bgClassName:
      "bg-midRed text-highlightBeige scrollbar-track-midRed scrollbar-thumb-highlightBeige",
  },
  moonbase: {
    bgClassName:
      "bg-pastelBlue text-metallicBlue scrollbar-track-pastelBlue scrollbar-thumb-metallicBlue",
  },
  market: {
    bgClassName:
      "bg-metallicBlue text-highlightBeige scrollbar-track-metallicBlue scrollbar-thumb-highlightBeige",
  },
  penitentiary: {
    bgClassName:
      "bg-shadow text-moss scrollbar-track-shadow scrollbar-thumb-moss",
  },
  safari: {
    bgClassName:
      "bg-redShadow text-moss scrollbar-track-redShadow scrollbar-thumb-moss",
  },
};
