import type { ZxSpectrumRoomColour } from "../../../../../../originalGame";
import type { SceneryName } from "../../../../../../sprites/planets";

export const mapColours: Record<SceneryName, { bgClassName: string }> = {
  blacktooth: {
    bgClassName:
      "bg-moss zx:bg-zxGreenDimmed text-shadow zx:text-zxWhite scrollbar-track-moss zx:scrollbar-track-zxGreenDimmed scrollbar-thumb-shadow zx:scrollbar-thumb-zxWhite",
  },
  bookworld: {
    bgClassName:
      "bg-redShadow zx:bg-zxBlue text-highlightBeige zx:text-zxWhite scrollbar-track-redShadow zx:scrollbar-track-zxBlue scrollbar-thumb-highlightBeige zx:scrollbar-thumb-zxWhite",
  },
  jail: {
    bgClassName:
      "bg-shadow zx:bg-zxBlue text-lightGrey zx:text-zxWhite scrollbar-track-shadow zx:scrollbar-track-zxBlue scrollbar-thumb-lightGrey zx:scrollbar-thumb-zxWhite",
  },
  egyptus: {
    bgClassName:
      "bg-midRed zx:bg-zxRedDimmed text-highlightBeige zx:text-zxYellow scrollbar-track-midRed zx:scrollbar-track-zxBlue zx:scrollbar-track-zxRedDimmed scrollbar-thumb-highlightBeige zx:scrollbar-thumb-zxYellow",
  },
  moonbase: {
    bgClassName:
      "bg-pastelBlue zx:bg-zxBlue text-metallicBlue zx:text-zxWhite scrollbar-track-pastelBlue zx:scrollbar-track-zxBlue scrollbar-thumb-metallicBlue zx:scrollbar-thumb-zxWhite",
  },
  market: {
    bgClassName:
      "bg-metallicBlue zx:bg-zxBlue text-highlightBeige zx:text-zxWhite scrollbar-track-metallicBlue zx:scrollbar-track-zxBlue scrollbar-thumb-highlightBeige zx:scrollbar-thumb-zxWhite",
  },
  penitentiary: {
    bgClassName:
      "bg-shadow zx:bg-zxBlue text-moss zx:text-zxWhite scrollbar-track-shadow zx:scrollbar-track-zxBlue scrollbar-thumb-moss zx:scrollbar-thumb-zxWhite",
  },
  safari: {
    bgClassName:
      "bg-redShadow zx:bg-zxBlue text-moss zx:text-zxWhite scrollbar-track-redShadow zx:scrollbar-track-zxBlue scrollbar-thumb-moss zx:scrollbar-thumb-zxWhite",
  },
};
export const roomAccentColourClass = (color: ZxSpectrumRoomColour) => {
  switch (color.hue) {
    case "cyan":
      return {
        floor: "fill-pastelBlue zx:fill-zxCyan",
        awayWall: "fill-pastelBlueHalfbrite zx:fill-zxCyanDimmed",
      };
    case "green":
      return {
        floor: "fill-moss zx:fill-zxGreen",
        awayWall: "fill-mossHalfbrite zx:fill-zxGreenDimmed",
      };
    case "magenta":
      return {
        floor: "fill-pink zx:fill-zxMagenta",
        awayWall: "fill-pinkHalfbrite zx:fill-zxMagentaDimmed",
      };
    case "white":
      return {
        floor: "fill-lightGrey zx:fill-zxWhiteDimmed",
        awayWall: "fill-lightGreyHalfbrite zx:fill-zxBlack",
      };
    case "yellow":
      return {
        floor: "fill-highlightBeige zx:fill-zxYellow",
        awayWall: "fill-highlightBeigeHalfbrite zx:fill-zxYellowDimmed",
      };
    default:
      color.hue satisfies never;
  }
};
