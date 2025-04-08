import type { ZxSpectrumRoomColour } from "../../../../../../originalGame";
import type { SceneryName } from "../../../../../../sprites/planets";

export type MapClasses = {
  bgClassName: string;
  containerClassName: string;
};

export const mapClasses: Record<SceneryName | "freedom", MapClasses> = {
  blacktooth: {
    bgClassName: "fill-moss zx:fill-zxGreenDimmed text-shadow zx:text-zxWhite",
    containerClassName:
      // bg- here ensures the dialog outside of the svg (including bounce-back scrolling)
      // matches the colour of the svg's background rect
      "bg-moss zx:bg-zxGreenDimmed scrollbar-track-moss zx:scrollbar-track-zxGreenDimmed scrollbar-thumb-shadow zx:scrollbar-thumb-zxWhite",
  },
  bookworld: {
    bgClassName:
      "fill-redShadow zx:fill-zxBlue text-highlightBeige zx:text-zxWhite",
    containerClassName:
      "bg-redShadow zx:bg-zxBlue scrollbar-track-redShadow zx:scrollbar-track-zxBlue scrollbar-thumb-highlightBeige zx:scrollbar-thumb-zxWhite",
  },
  jail: {
    bgClassName: "fill-shadow zx:fill-zxBlue text-lightGrey zx:text-zxWhite",
    containerClassName:
      "bg-shadow zx:bg-zxBlue scrollbar-track-shadow zx:scrollbar-track-zxBlue scrollbar-thumb-lightGrey zx:scrollbar-thumb-zxWhite",
  },
  egyptus: {
    bgClassName:
      "fill-midRed zx:fill-zxRedDimmed text-highlightBeige zx:text-zxYellow",
    containerClassName:
      "bg-midRed zx:bg-zxRedDimmed scrollbar-track-midRed zx:scrollbar-track-zxBlue zx:scrollbar-track-zxRedDimmed scrollbar-thumb-highlightBeige zx:scrollbar-thumb-zxYellow",
  },
  moonbase: {
    bgClassName:
      "fill-pastelBlue zx:fill-zxBlue text-metallicBlue zx:text-zxWhite",
    containerClassName:
      "bg-pastelBlue zx:bg-zxBlue scrollbar-track-pastelBlue zx:scrollbar-track-zxBlue scrollbar-thumb-metallicBlue zx:scrollbar-thumb-zxWhite",
  },
  market: {
    bgClassName:
      "fill-metallicBlueHalfbrite zx:fill-zxBlue text-highlightBeige zx:text-zxWhite",
    containerClassName:
      "bg-metallicBlueHalfbrite zx:bg-zxBlue scrollbar-track-metallicBlueHalfbrite zx:scrollbar-track-zxBlue scrollbar-thumb-highlightBeige zx:scrollbar-thumb-zxWhite",
  },
  penitentiary: {
    bgClassName: "fill-shadow zx:fill-zxBlue text-moss zx:text-zxWhite",
    containerClassName:
      "bg-shadow zx:bg-zxBlue scrollbar-track-shadow zx:scrollbar-track-zxBlue scrollbar-thumb-moss zx:scrollbar-thumb-zxWhite",
  },
  safari: {
    bgClassName: "fill-redShadow zx:fill-zxBlue text-moss zx:text-zxWhite",
    containerClassName:
      "bg-redShadow zx:bg-zxBlue scrollbar-track-redShadow zx:scrollbar-track-zxBlue scrollbar-thumb-moss zx:scrollbar-thumb-zxWhite",
  },
  freedom: {
    bgClassName:
      "fill-highlightBeige zx:fill-zxGreen text-white zx:text-zxWhite",
    containerClassName:
      "bg-highlightBeige zx:bg-zxGreen scrollbar-track-highlightBeige zx:scrollbar-track-zxGreen scrollbar-thumb-moss zx:scrollbar-thumb-zxWhite",
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
