import {
  menuLeaderBackChar,
  menuLeaderFocussedChar,
  menuLeaderUnfocussedChar,
} from "../../../../../sprites/spritesheet/spritesheetData/hudSritesheetData";

export const StandardMenuItemLeader = ({
  isBack = false,
  focussed = false,
  verticalAlignItemsCentre = false,
  doubleHeight = false,
}: {
  isBack?: boolean;
  focussed?: boolean;
  verticalAlignItemsCentre?: boolean;
  doubleHeight?: boolean;
}) => {
  // the unfocussed glyph is horizontally symmetric, so it needs no reversed
  // variant; only the focussed glyph has a dedicated reversed (back) char
  const glyphs =
    focussed ?
      isBack ? menuLeaderBackChar
      : menuLeaderFocussedChar
    : menuLeaderUnfocussedChar;
  return (
    <span
      className={
        `inline-block col-start-1 ` +
        // min width and mx-auto centers, in case is sharing a menu with wider, custom leaders:
        `w-min ml-auto ` +
        (verticalAlignItemsCentre === true ? "flex items-center h-3" : "")
      }
    >
      {doubleHeight ?
        <span className="text-double-height">{glyphs}</span>
      : glyphs}
    </span>
  );
};
