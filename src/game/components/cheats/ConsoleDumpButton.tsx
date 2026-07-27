import { type PropsWithChildren } from "preact/compat";

import { Button } from "../../../ui/Button";

export type ConsoleDumpButtonProps = PropsWithChildren<{
  /** writes the dump to the console (and any window globals) */
  log: () => void;
  /** the same dump as text, for the adjacent cpy button */
  copyText: () => string;
  "data-test-id"?: string;
}>;

/**
 * a "write to console" cheat: the main button logs, and a small paired "cpy"
 * button puts the same dump on the clipboard as text instead
 */
export const ConsoleDumpButton = ({
  log,
  copyText,
  children,
  "data-test-id": testId,
}: ConsoleDumpButtonProps) => (
  <div class="flex flex-row basis-1/3 flex-grow">
    <Button
      data-test-id={testId}
      class="flex-grow h-3"
      onClick={(e) => {
        log();
        (e?.currentTarget as HTMLElement | undefined)?.blur();
      }}
    >
      {children}
    </Button>
    <Button
      class="h-3 bg-pastelBlue text-shadow zx:bg-zxCyan zx:text-zxBlack toppy:bg-toppyCool1 toppy:text-toppyGrey4"
      onClick={(e) => {
        void navigator.clipboard.writeText(copyText());
        (e?.currentTarget as HTMLElement | undefined)?.blur();
      }}
    >
      cpy
    </Button>
  </div>
);
