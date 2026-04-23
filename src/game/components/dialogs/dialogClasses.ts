import { twClass } from "../../../utils/twClass";

export const optionsDialogClasses =
  "bg-white zx:bg-zxWhite toppy:bg-toppyCool1 py-0 gap-y-0 " +
  "text-metallicBlueHalfbrite zx:text-zxBlue toppy:text-toppyCool3 " +
  "disabledMenuItem:text-midGrey zx:disabledMenuItem:text-zxYellow toppy:disabledMenuItem:text-toppyGrey2 " +
  "selectedMenuItem:text-metallicBlue zx:selectedMenuItem:text-zxGreen toppy:selectedMenuItem:text-toppyCool4 " +
  // make all leaders on options dialogs 3 blocks wide - so it doesn't change when
  // switching between dialogs with larger custom leaders and those without
  "[--leader-col-width:theme(width.3)] ";

export const optionsMenuScrollClasses =
  "flex flex-col gap-1 p-1 " +
  "overflow-y-scroll scrollbar scrollbar-w-1 " +
  "scrollbar-thumb-midGrey scrollbar-track-white " +
  "zx:scrollbar-thumb-zxBlue zx:scrollbar-track-zxWhite " +
  "toppy:scrollbar-thumb-toppyCool3 toppy:scrollbar-track-toppyCool1 " +
  // bring away from any 'notch' on mobile devices:
  "mobile:px-3";

export const mainMenuScrollClasses =
  "flex flex-col gap-1 p-1 " +
  "overflow-y-scroll scrollbar scrollbar-w-1 " +
  "scrollbar-thumb-lightGrey scrollbar-track-metallicBlueHalfbrite " +
  "zx:scrollbar-thumb-zxBlue zx:scrollbar-track-zxWhite " +
  "toppy:scrollbar-thumb-toppyGrey1 toppy:scrollbar-track-toppyCool4 " +
  // bring away from any 'notch' on mobile devices:
  "mobile:px-3 ";

export const titleBarClasses =
  "bg-lightGrey zx:bg-zxWhiteDimmed toppy:bg-toppyGrey1 mobile:px-4";

export const spriteLeaderClasses =
  "sprite zx:sprite-revert-to-two-tone colourised:brightness-halfBrite selectedMenuItem:filter-none zx:selectedMenuItem:sprite-revert-zxYellow toppy:brightness-halfBrite toppy:selectedMenuItem:filter-none sprites-normal-height";

export const optionsHintMarkdownClassname = twClass(
  "[&_.em]:text-moss zx:[&_.em]:text-zxCyan toppy:[&_.em]:text-toppyCool2 [&_h2]:text-midRed zx:[&_h2]:text-zxBlue toppy:[&_h2]:text-toppyPink2 text-lightGrey zx:text-zxBlack toppy:text-toppyGrey3 sprites-normal-height",
);

export const selectGameHintMarkdownClassName =
  "text-lightGrey zx:text-zxWhite toppy:text-toppyGrey1 sprites-normal-height zx:[&_.strong]:text-zxYellow toppy:[&_.strong]:text-toppyWarm1";
