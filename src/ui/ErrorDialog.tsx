import type { ReactNode } from "react";

import { useEffect } from "react";

import type { SerialisableError } from "../utils/redux/createSerialisableErrors";

import { BitmapText } from "../game/components/tailwindSprites/BitmapText";
import { Border } from "./Border";
import { Dialog } from "./Dialog";
import { DialogPortal } from "./DialogPortal";
import { StackTracesWithLinks } from "./StackTracesWithLinks";

const parseErrorForDisplay = (
  error: SerialisableError,
): { message: string; sanitizedStack: string } => {
  const { message, stack } = error;

  if (!stack) {
    return { message, sanitizedStack: "" };
  }

  const errorPrefixPattern = /^(?:[A-Z]\w*)?Error:\s*/;
  const stackStartsWithError = errorPrefixPattern.test(stack);

  let sanitizedStack = stack;

  if (stackStartsWithError) {
    sanitizedStack = sanitizedStack.replace(errorPrefixPattern, "");
  }

  if (sanitizedStack.startsWith(message)) {
    sanitizedStack = sanitizedStack.slice(message.length);
    sanitizedStack = sanitizedStack.replace(/^\n/, "");
  }

  const firstLineEnd = sanitizedStack.indexOf("\n");
  if (firstLineEnd !== -1) {
    const firstLine = sanitizedStack.slice(0, firstLineEnd);
    if (firstLine === message || firstLine === `Error: ${message}`) {
      sanitizedStack = sanitizedStack.slice(firstLineEnd + 1);
    }
  }

  sanitizedStack = sanitizedStack
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .join("\n");

  return { message, sanitizedStack };
};

export const writeErrorReport = (errors: SerialisableError[]) => {
  return errors.toReversed().map((error) => {
    const { message, sanitizedStack } = parseErrorForDisplay(error);
    return `
${message}

${sanitizedStack}
  `;
  }).join(`

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯
⬆ ERROR        CAUGHT, WRAPPED, & RETHROWN ⬇
⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

`);
};

export type ErrorDialogProps = {
  errors: SerialisableError[];
  /** intro content shown before the error actions */
  intro: ReactNode;
  /** render prop receiving the error report text for actions like copy-to-clipboard */
  children: (errorsReportText: string) => ReactNode;
};

export const ErrorDialog = ({ errors, intro, children }: ErrorDialogProps) => {
  const errorsReportText = writeErrorReport(errors);

  useEffect(() => {
    console.error("ErrorDialog: Showing Report:", errorsReportText);
  }, [errorsReportText]);

  return (
    <DialogPortal>
      <Border className="loading-border zx:zx-loading-border toppy:toppy-loading-border" />
      <Dialog
        className="bg-white zx:bg-zxRed toppy:bg-toppyWarm1 gap-y-0 text-redShadow zx:text-zxBlack toppy:text-toppyCool4 px-1"
        tall
        wide
        dialogId="errorCaught"
      >
        <div
          className={
            "overflow-y-scroll h-full " +
            "scrollbar scrollbar-w-1 pl-1 " +
            "scrollbar-thumb-midRed scrollbar-track-highlightBeige " +
            "zx:scrollbar-thumb-zxCyanDimmed zx:scrollbar-track-zxCyan " +
            "toppy:scrollbar-thumb-toppyCool3 toppy:scrollbar-track-toppyCool1"
          }
        >
          {intro}
          <hr className="bg-pastelBlue zx:bg-zxWhite toppy:bg-toppyCool2 h-1 my-1 border-none" />
          {children(errorsReportText)}
          <hr className="bg-pastelBlue zx:bg-zxWhite toppy:bg-toppyCool2 h-1 my-1 border-none" />
          <BitmapText className="block sprites-double-height my-1 text-midRed zx:text-zxWhite toppy:text-toppyPink2">
            Error message for nerds:
          </BitmapText>
          <pre
            className={`bg-shadow zx:bg-zxBlack toppy:bg-toppyGrey3 text-white zx:text-zxWhite toppy:text-toppyWarm1 leading-[1em] [&_a]:text-pastelBlue px-1 w-max min-w-full`}
          >
            <StackTracesWithLinks>{errorsReportText}</StackTracesWithLinks>
          </pre>
        </div>
      </Dialog>
    </DialogPortal>
  );
};
