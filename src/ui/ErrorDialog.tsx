import { type UnknownAction } from "@reduxjs/toolkit";
import { type ComponentChildren } from "preact";
import { useEffect } from "preact/hooks";

import { useMaybeGameApi } from "../game/components/GameApiContext";
import { type GameApi } from "../game/GameApi";
import { getRecentActions } from "../store/recentActions";
import { describeRuntimeEnvironment } from "../utils/detectEnv/describeRuntimeEnvironment";
import { type SerialisableError } from "../utils/redux/createSerialisableErrors";
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

const writeErrorReport = (
  errors: SerialisableError[],
  maybeGameApi: GameApi | undefined,
) => {
  const recentActions: undefined | UnknownAction[] =
    import.meta.env.DEV ? getRecentActions() : undefined;

  const environmentPart = describeRuntimeEnvironment();

  const gameApiPart =
    maybeGameApi ?
      `Campaign Locator: ${JSON.stringify(maybeGameApi.campaign.locator)}`
    : "No game api loaded";

  const errorsPart = errors.toReversed().map((error) => {
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

  const recentActionsPart =
    recentActions && recentActions.length > 0 ?
      `Last ${recentActions.length} redux actions (oldest to newest):

      ${recentActions.map((a, i) => `${i}: ${JSON.stringify(a)}`).join("\n")}`
    : "No captured redux action";

  return `
${environmentPart}
${gameApiPart}    
${recentActionsPart}
${errorsPart}
  `;
};

export type ErrorDialogReportProps = {
  errors: SerialisableError[];
  /** intro content shown before the error actions */
  intro: ComponentChildren;
  children: (errorsReportText: string) => ComponentChildren;
};

export const ErrorDialogReport = ({
  errors,
  intro,
  children,
}: ErrorDialogReportProps) => {
  const errorsReportText = writeErrorReport(errors, useMaybeGameApi());

  useEffect(() => {
    console.error("ErrorDialogReport: Showing Report:", errorsReportText);
  }, [errorsReportText]);

  return (
    <div
      class={
        "bg-white zx:bg-zxRed toppy:bg-toppyWarm1 gap-y-0 text-redShadow zx:text-zxBlack toppy:text-toppyCool4 px-1 " +
        "overflow-y-scroll h-full w-full " +
        "scrollbar scrollbar-w-1 pl-1 " +
        "scrollbar-thumb-midRed scrollbar-track-highlightBeige " +
        "zx:scrollbar-thumb-zxCyanDimmed zx:scrollbar-track-zxCyan " +
        "toppy:scrollbar-thumb-toppyCool3 toppy:scrollbar-track-toppyCool1"
      }
    >
      {intro}
      <hr class="bg-pastelBlue zx:bg-zxWhite toppy:bg-toppyCool2 h-1 my-1 border-none" />
      {children(errorsReportText)}
      <hr class="bg-pastelBlue zx:bg-zxWhite toppy:bg-toppyCool2 h-1 my-1 border-none" />
      <span class="text-double-height my-1 text-midRed zx:text-zxWhite toppy:text-toppyPink2">
        Error message for nerds:
      </span>
      <pre
        data-test-id="error-report"
        class={`bg-shadow zx:bg-zxBlack toppy:bg-toppyGrey3 text-white zx:text-zxWhite toppy:text-toppyWarm1 leading-[1em] [&_a]:text-pastelBlue px-1 w-max min-w-full`}
      >
        <StackTracesWithLinks>{errorsReportText}</StackTracesWithLinks>
      </pre>
    </div>
  );
};

export type ErrorDialogProps = ErrorDialogReportProps;

export const ErrorDialog = (props: ErrorDialogProps) => (
  <DialogPortal>
    <Border class="loading-border zx:zx-loading-border toppy:toppy-loading-border" />
    <Dialog tall wide dialogId="errorCaught">
      <ErrorDialogReport {...props} />
    </Dialog>
  </DialogPortal>
);
