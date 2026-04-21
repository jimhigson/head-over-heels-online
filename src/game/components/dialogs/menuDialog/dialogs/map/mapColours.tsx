import type { ZxSpectrumRoomColour } from "../../../../../../originalGame";
import type { SceneryName } from "../../../../../../sprites/planets";

export type MapClasses = {
  bgClassName: string;
  containerClassName: string;
};

export const mapClasses: Record<"freedom" | SceneryName, MapClasses> = {
  blacktooth: {
    bgClassName:
      "fill-redShadow zx:fill-zxGreenDimmed toppy:fill-toppyWarm5 text-lightGrey zx:text-zxWhite toppy:text-toppyGrey1",
    containerClassName:
      // bg- here ensures the dialog outside of the svg (including bounce-back scrolling)
      // matches the colour of the svg's background rect
      "bg-moss zx:bg-zxGreenDimmed toppy:bg-toppyWarm5 scrollbar-track-moss zx:scrollbar-track-zxGreenDimmed toppy:scrollbar-track-toppyWarm5 scrollbar-thumb-shadow zx:scrollbar-thumb-zxWhite toppy:scrollbar-thumb-toppyGrey1",
  },
  bookworld: {
    bgClassName:
      "fill-redShadow zx:fill-zxBlue toppy:fill-toppyWarm6 text-highlightBeige zx:text-zxWhite toppy:text-toppyWarm3",
    containerClassName:
      "bg-redShadow zx:bg-zxBlue toppy:bg-toppyWarm6 scrollbar-track-redShadow zx:scrollbar-track-zxBlue toppy:scrollbar-track-toppyWarm6 scrollbar-thumb-highlightBeige zx:scrollbar-thumb-zxWhite toppy:scrollbar-thumb-toppyWarm3",
  },
  jail: {
    bgClassName:
      "fill-shadow zx:fill-zxBlue toppy:fill-toppyGrey3 text-black zx:text-zxWhite toppy:text-toppyGrey1",
    containerClassName:
      "bg-shadow zx:bg-zxBlue toppy:bg-toppyGrey3 scrollbar-track-shadow zx:scrollbar-track-zxBlue toppy:scrollbar-track-toppyGrey3 scrollbar-thumb-lightGrey zx:scrollbar-thumb-zxWhite toppy:scrollbar-thumb-toppyGrey1",
  },
  egyptus: {
    bgClassName:
      "fill-midRed zx:fill-zxRedDimmed toppy:fill-toppyWarm4 text-highlightBeige zx:text-zxYellow toppy:text-toppyWarm1",
    containerClassName:
      "bg-midRed zx:bg-zxRedDimmed toppy:bg-toppyWarm4 scrollbar-track-midRed zx:scrollbar-track-zxBlue zx:scrollbar-track-zxRedDimmed toppy:scrollbar-track-toppyWarm4 scrollbar-thumb-highlightBeige zx:scrollbar-thumb-zxYellow toppy:scrollbar-thumb-toppyWarm1",
  },
  moonbase: {
    bgClassName:
      "fill-pastelBlue zx:fill-zxBlue toppy:fill-toppyCool2 text-metallicBlue zx:text-zxWhite toppy:text-toppyCool4",
    containerClassName:
      "bg-pastelBlue zx:bg-zxBlue toppy:bg-toppyCool2 scrollbar-track-pastelBlue zx:scrollbar-track-zxBlue toppy:scrollbar-track-toppyCool2 scrollbar-thumb-metallicBlue zx:scrollbar-thumb-zxWhite toppy:scrollbar-thumb-toppyCool4",
  },
  market: {
    bgClassName:
      "fill-metallicBlueHalfbrite zx:fill-zxCyan toppy:fill-toppyCool1 text-highlightBeige zx:text-zxBlack toppy:text-toppyCool4",
    containerClassName:
      "bg-metallicBlueHalfbrite zx:bg-zxCyan toppy:bg-toppyCool1 scrollbar-track-metallicBlueHalfbrite zx:scrollbar-track-zxBlue toppy:scrollbar-track-toppyCool1 scrollbar-thumb-highlightBeige zx:scrollbar-thumb-zxBlack toppy:scrollbar-thumb-toppyCool4",
  },
  penitentiary: {
    bgClassName:
      "fill-shadow zx:fill-zxBlue toppy:fill-toppyCool4 text-moss zx:text-zxWhite toppy:text-toppyCool1",
    containerClassName:
      "bg-shadow zx:bg-zxBlue toppy:bg-toppyCool4 scrollbar-track-shadow zx:scrollbar-track-zxBlue toppy:scrollbar-track-toppyCool4 scrollbar-thumb-moss zx:scrollbar-thumb-zxWhite toppy:scrollbar-thumb-toppyCool1",
  },
  safari: {
    bgClassName:
      "fill-redShadow zx:fill-zxBlue toppy:fill-toppyWarm5 text-moss zx:text-zxWhite toppy:text-toppyCool2",
    containerClassName:
      "bg-redShadow zx:bg-zxBlue toppy:bg-toppyWarm5 scrollbar-track-redShadow zx:scrollbar-track-zxBlue toppy:scrollbar-track-toppyWarm5 scrollbar-thumb-moss zx:scrollbar-thumb-zxWhite toppy:scrollbar-thumb-toppyCool2",
  },
  freedom: {
    bgClassName:
      "fill-moss zx:fill-zxGreen toppy:fill-toppyCool2 text-metallicBlue zx:text-zxBlack toppy:text-toppyBlack",
    containerClassName:
      "bg-moss zx:bg-zxGreen toppy:bg-toppyCool2 scrollbar-track-moss zx:scrollbar-track-zxGreen toppy:scrollbar-track-toppyCool2 scrollbar-thumb-moss zx:scrollbar-thumb-zxBlack toppy:scrollbar-thumb-toppyBlack",
  },
};
export const roomAccentColourClass = (color: ZxSpectrumRoomColour) => {
  switch (color.hue) {
    case "cyan":
      return (
        "[--roomHintColor:theme(colors.pastelBlue)] " +
        "[--roomHintColorDarker:theme(colors.pastelBlueHalfbrite)] " +
        "zx:[--roomHintColor:theme(colors.zxCyan)] " +
        "zx:[--roomHintColorDarker:theme(colors.zxCyanDimmed)] " +
        "toppy:[--roomHintColor:theme(colors.toppyCool1)] " +
        "toppy:[--roomHintColorDarker:theme(colors.toppyCool2)]"
      );
    case "green":
      return (
        "[--roomHintColor:theme(colors.moss)] " +
        "[--roomHintColorDarker:theme(colors.mossHalfbrite)] " +
        "zx:[--roomHintColor:theme(colors.zxGreen)] " +
        "zx:[--roomHintColorDarker:theme(colors.zxGreenDimmed)] " +
        "toppy:[--roomHintColor:theme(colors.toppyCool2)] " +
        "toppy:[--roomHintColorDarker:theme(colors.toppyCool3)]"
      );
    case "magenta":
      return (
        "[--roomHintColor:theme(colors.pink)] " +
        "[--roomHintColorDarker:theme(colors.pinkHalfbrite)] " +
        "zx:[--roomHintColor:theme(colors.zxMagenta)] " +
        "zx:[--roomHintColorDarker:theme(colors.zxMagentaDimmed)] " +
        "toppy:[--roomHintColor:theme(colors.toppyPink1)] " +
        "toppy:[--roomHintColorDarker:theme(colors.toppyPink2)]"
      );
    case "white":
      return (
        "[--roomHintColor:theme(colors.lightGrey)] " +
        "[--roomHintColorDarker:theme(colors.lightGreyHalfbrite)] " +
        "zx:[--roomHintColor:theme(colors.zxWhiteDimmed)] " +
        "zx:[--roomHintColorDarker:theme(colors.zxBlack)] " +
        "toppy:[--roomHintColor:theme(colors.toppyGrey1)] " +
        "toppy:[--roomHintColorDarker:theme(colors.toppyGrey2)]"
      );
    case "yellow":
      return (
        "[--roomHintColor:theme(colors.highlightBeige)] " +
        "[--roomHintColorDarker:theme(colors.highlightBeigeHalfbrite)] " +
        "zx:[--roomHintColor:theme(colors.zxYellow)] " +
        "zx:[--roomHintColorDarker:theme(colors.zxYellowDimmed)] " +
        "toppy:[--roomHintColor:theme(colors.toppyWarm3)] " +
        "toppy:[--roomHintColorDarker:theme(colors.toppyWarm4)]"
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
