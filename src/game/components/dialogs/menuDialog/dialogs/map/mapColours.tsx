import type { ZxSpectrumRoomColour } from "../../../../../../originalGame";
import type { SceneryName } from "../../../../../../sprites/planets";

export type MapClasses = {
  bgClassName: string;
  containerClassName: string;
};

export const mapClasses: Record<"freedom" | SceneryName, MapClasses> = {
  blacktooth: {
    bgClassName:
      "fill-redShadow zx:fill-zxGreenDimmed text-lightGrey zx:text-zxWhite",
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
    bgClassName: "fill-shadow zx:fill-zxBlue text-black zx:text-zxWhite",
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
      "fill-metallicBlueHalfbrite zx:fill-zxCyan text-highlightBeige zx:text-zxBlack",
    containerClassName:
      "bg-metallicBlueHalfbrite zx:bg-zxCyan scrollbar-track-metallicBlueHalfbrite zx:scrollbar-track-zxBlue scrollbar-thumb-highlightBeige zx:scrollbar-thumb-zxBlack",
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
    bgClassName: "fill-moss zx:fill-zxGreen text-metallicBlue zx:text-zxBlack",
    containerClassName:
      "bg-moss zx:bg-zxGreen scrollbar-track-moss zx:scrollbar-track-zxGreen scrollbar-thumb-moss zx:scrollbar-thumb-zxBlack",
  },
};
export const roomAccentColourClass = (color: ZxSpectrumRoomColour) => {
  switch (color.hue) {
    case "cyan":
      return (
        "[--roomHintColor:theme(colors.pastelBlue)] " +
        "[--roomHintColorDarker:theme(colors.pastelBlueHalfbrite)] " +
        "zx:[--roomHintColor:theme(colors.zxCyan)] " +
        "zx:[--roomHintColorDarker:theme(colors.zxCyanDimmed)]"
      );
    case "green":
      return (
        "[--roomHintColor:theme(colors.moss)] " +
        "[--roomHintColorDarker:theme(colors.mossHalfbrite)] " +
        "zx:[--roomHintColor:theme(colors.zxGreen)] " +
        "zx:[--roomHintColorDarker:theme(colors.zxGreenDimmed)]"
      );
    case "magenta":
      return (
        "[--roomHintColor:theme(colors.pink)] " +
        "[--roomHintColorDarker:theme(colors.pinkHalfbrite)] " +
        "zx:[--roomHintColor:theme(colors.zxMagenta)] " +
        "zx:[--roomHintColorDarker:theme(colors.zxMagentaDimmed)]"
      );
    case "white":
      return (
        "[--roomHintColor:theme(colors.lightGrey)] " +
        "[--roomHintColorDarker:theme(colors.lightGreyHalfbrite)] " +
        "zx:[--roomHintColor:theme(colors.zxWhiteDimmed)] " +
        "zx:[--roomHintColorDarker:theme(colors.zxBlack)]"
      );
    case "yellow":
      return (
        "[--roomHintColor:theme(colors.lightBeige)] " +
        "[--roomHintColorDarker:theme(colors.highlightBeigeHalfbrite)] " +
        "zx:[--roomHintColor:theme(colors.zxYellow)] " +
        "zx:[--roomHintColorDarker:theme(colors.zxYellowDimmed)]"
      );
    default:
      color.hue satisfies never;
      throw new Error("unknown hue");
  }
};

export const getMapColoursClass = (scenery?: SceneryName) =>
  (scenery && mapClasses[scenery]) ?? {
    bgClassName: "fill-shadow",
    containerClassName: "",
  };
