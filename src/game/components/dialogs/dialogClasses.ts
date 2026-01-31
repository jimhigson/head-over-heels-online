import { twClass } from "../../../editor/twClass";

export const optionsDialogClasses =
  "bg-white zx:bg-zxWhite py-0 gap-y-0 " +
  "text-metallicBlueHalfbrite zx:text-zxBlue " +
  "disabledMenuItem:text-midGrey zx:disabledMenuItem:text-zxYellow " +
  "selectedMenuItem:text-metallicBlue zx:selectedMenuItem:text-zxGreen " +
  // make all leaders on options dialogs 3 blocks wide - so it doesn't change when
  // switching between dialogs with larger custom leaders and those without
  "[--leader-col-width:theme(width.3)] ";

export const optionsMenuScrollClasses =
  "flex flex-col gap-1 p-1 " +
  "overflow-y-scroll scrollbar scrollbar-w-1 " +
  "scrollbar-thumb-midGrey scrollbar-track-white " +
  "zx:scrollbar-thumb-zxBlue zx:scrollbar-track-zxWhite " +
  // bring away from any 'notch' on mobile devices:
  "mobile:px-3";

export const mainMenuScrollClasses =
  "flex flex-col gap-1 p-1 " +
  "overflow-y-scroll scrollbar scrollbar-w-1 " +
  "scrollbar-thumb-lightGrey scrollbar-track-metallicBlueHalfbrite " +
  "zx:scrollbar-thumb-zxBlue zx:scrollbar-track-zxWhite " +
  // bring away from any 'notch' on mobile devices:
  "mobile:px-3 ";

export const titleBarClasses = "bg-lightGrey zx:bg-zxWhiteDimmed mobile:px-4";

export const spriteLeaderClasses =
  "sprite zx:sprite-revert-to-two-tone colourised:brightness-halfBrite selectedMenuItem:filter-none zx:selectedMenuItem:sprite-revert-zxYellow sprites-normal-height";

export const optionsHintMarkdownClassname = twClass(
  "[&_.em]:text-moss zx:[&_.em]:text-zxCyan [&_h2]:text-midRed zx:[&_h2]:text-zxBlue text-lightGrey zx:text-zxBlack sprites-normal-height",
);

export const selectGameHintMarkdownClassName =
  "text-lightGrey zx:text-zxWhite sprites-normal-height";
