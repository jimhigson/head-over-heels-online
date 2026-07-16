import { type PropsWithChildren } from "preact/compat";

import { Button } from "../../../ui/Button";

export type ConsoleDumpButtonProps = PropsWithChildren<{
  class?: string;
  "data-test-id"?: string;
  /** perform the dump: write to the console */
  log: () => void;
  /** the text to copy to the clipboard when the button is clicked */
  copyText: () => string;
}>;

/**
 * a cheats-panel button that dumps some game internals: on click it writes to
 * the console (via {@link ConsoleDumpButtonProps.log}), and also copies the
 * text form to the clipboard for convenience.
 */
export const ConsoleDumpButton = ({
  class: className = "flex-grow h-3",
  "data-test-id": dataTestId,
  log,
  copyText,
  children,
}: ConsoleDumpButtonProps) => (
  <Button
    class={className}
    data-test-id={dataTestId}
    onClick={(e) => {
      log();
      // clipboard can reject in an unfocused/insecure context - a copy failure
      // must not swallow the console dump, so ignore it:
      void navigator.clipboard?.writeText(copyText()).catch(() => {});
      (e?.currentTarget as HTMLElement | undefined)?.blur();
    }}
  >
    {children}
  </Button>
);
