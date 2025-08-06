import { Dialog } from "../../../../../../ui/dialog";
import { DialogPortal } from "../../../../../../ui/DialogPortal";
import { Border } from "../../../../../../ui/Border";
import { MenuItems } from "../../MenuItems";
import { MenuItem } from "../../MenuItem";
import { BlockyMarkdown } from "../../../../BlockyMarkdown";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchCallback";
import type { SerialisableError } from "src/utils/redux/createSerialisableErrors";
import {
  errorDismissed,
  reincarnationAccepted,
} from "../../../../../../store/slices/gameMenusSlice";
import { useAppSelector } from "../../../../../../store/hooks";
import { multilineTextClass } from "../../multilineTextClass";
import { BitmapText } from "../../../../tailwindSprites/Sprite";
import { useState } from "react";
import { StackTracesWithLinks } from "./StackTraceWithLinks";

/**
 * Parses an error to extract the message and sanitized stack.
 * Some browsers include the error message in the stack trace, so this function
 * removes the message from the stack if it's included to avoid duplication.
 */
const parseErrorForDisplay = (
  error: SerialisableError,
): { message: string; sanitizedStack: string } => {
  const { message, stack } = error;

  if (!stack) {
    return { message, sanitizedStack: "" };
  }

  // Check if the stack includes the message
  // Different browsers format this differently:
  // Chrome/V8: "Error: message\n    at ..."
  // Firefox: "functionName@file:line:column\n..."
  // Safari: "message@file:line:column\n..."

  // First, check if the stack starts with the error type and message
  const errorPrefixPattern =
    /^(?:Error|TypeError|ReferenceError|SyntaxError|RangeError|EvalError|URIError):\s*/;
  const stackStartsWithError = errorPrefixPattern.test(stack);

  let sanitizedStack = stack;

  if (stackStartsWithError) {
    // Remove "Error: " prefix if present
    sanitizedStack = sanitizedStack.replace(errorPrefixPattern, "");
  }

  // Check if the (remaining) stack starts with the message
  if (sanitizedStack.startsWith(message)) {
    // Remove the message from the beginning
    sanitizedStack = sanitizedStack.slice(message.length);

    // Also remove any immediate newline after the message
    sanitizedStack = sanitizedStack.replace(/^\n/, "");
  }

  // Some browsers put the message as the first line without "Error:" prefix
  // Check if the first line of the stack is exactly the message
  const firstLineEnd = sanitizedStack.indexOf("\n");
  if (firstLineEnd !== -1) {
    const firstLine = sanitizedStack.slice(0, firstLineEnd);
    if (firstLine === message || firstLine === `Error: ${message}`) {
      sanitizedStack = sanitizedStack.slice(firstLineEnd + 1);
    }
  }

  // Trim whitespace from each line of the stack
  sanitizedStack = sanitizedStack
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .join("\n");

  return { message, sanitizedStack };
};

const markdown = `##The game crashed!
You could:

* open an [issue on github](https://github.com/jimhigson/head-over-heels-online/issues)
* email [jim@blockstack.ing](mailto:jim@blockstack.ing)
* rant on the [discord server](https://discord.gg/XmV9QNWY)
* play [the msx remake](https://www.file-hunter.com/Homebrew/?id=headoverheels) instead`;

export const ErrorCaughtDialog = ({
  errors,
}: {
  errors: Array<SerialisableError>;
}) => {
  const hasReincarnationPoint = useAppSelector(
    (state) => state.gameMenus.reincarnationPoint !== undefined,
  );
  const [copied, setCopied] = useState<boolean>(false);
  const reincarnateCallback = useDispatchActionCallback(reincarnationAccepted);

  const errorsReportText = errors.toReversed().map((error) => {
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

  return (
    <DialogPortal>
      <Border className="loading-border" />
      <Dialog
        className="bg-white zx:bg-zxRed gap-y-0 text-redShadow zx:text-zxBlack px-1"
        tall
        wide
      >
        <div
          className={
            "overflow-y-scroll h-full " +
            "scrollbar scrollbar-w-1 pl-1 " +
            "scrollbar-thumb-midRed scrollbar-track-highlightBeige " +
            "zx:scrollbar-thumb-zxCyanDimmed zx:scrollbar-track-zxCyan"
          }
        >
          <BlockyMarkdown markdown={markdown} />
          <hr className="bg-pastelBlue zx:bg-zxWhite h-1 my-1 border-none" />
          <MenuItems
            className={`text-lightGrey zx:text-zxWhite mt-1 resHandheld:mt-0 selectedMenuItem:text-midRed zx:selectedMenuItem:text-zxYellow resHandheld:!gap-y-1 ${multilineTextClass}`}
          >
            <MenuItem
              doubleHeightWhenFocussed
              id="tryContinue"
              label="Ignore, hope it goes away"
              onSelect={useDispatchActionCallback(errorDismissed, "ignore")}
            />
            {hasReincarnationPoint && (
              <MenuItem
                doubleHeightWhenFocussed
                id="reincarnate"
                label="Try reincarnating"
                onSelect={reincarnateCallback}
              />
            )}
            <MenuItem
              doubleHeightWhenFocussed
              id="clearAllData"
              label="Clear all data, start again"
              onSelect={useDispatchActionCallback(
                errorDismissed,
                "clearAllData",
              )}
            />
            {copied ?
              <BitmapText className="text-metallicBlue col-span-2 sprites-double-height ml-3">
                Error report copied
              </BitmapText>
            : <MenuItem
                doubleHeightWhenFocussed
                id="copyClipboard"
                label="Copy error to clipboard"
                onSelect={() =>
                  navigator.clipboard
                    .writeText(errorsReportText)
                    .then(() => setCopied(true))
                }
              />
            }
          </MenuItems>
          <hr className="bg-pastelBlue zx:bg-zxWhite h-1 my-1 border-none" />
          <BitmapText className="block sprites-double-height my-1 text-midRed zx:text-zxWhite`">
            Error message for nerds:
          </BitmapText>
          <pre
            className={`bg-shadow zx:bg-zxBlack text-white zx:text-zxWhite leading-[1em] [&_a]:text-pastelBlue px-1 w-max`}
          >
            <StackTracesWithLinks>{errorsReportText}</StackTracesWithLinks>
          </pre>
        </div>
      </Dialog>
    </DialogPortal>
  );
};
