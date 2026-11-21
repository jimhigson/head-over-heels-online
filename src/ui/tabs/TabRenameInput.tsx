import type { RefObject } from "preact";
import { useEffect, useRef } from "preact/hooks";

import { CssVariables } from "../../game/components/CssVariables";
import { useUniqueId } from "../../utils/preact/useUniqueId";
import { useAutoFocus } from "../useAutoFocus";
import type { TabRename } from "./Tab";

export type TabRenameInputProps = {
  rename: TabRename;
  editedName: string;
  onEdit: (editedName: string) => void;
  /** renaming has finished, taken or cancelled */
  onDone: () => void;
};

/**
 * a popover shown under the input, anchored to it, while there is a reason
 * the name can't be taken
 */
const useWhyNotTakeablePopover = (
  inputRef: RefObject<HTMLInputElement | null>,
  whyNotTakeable: string | undefined,
) => {
  const popoverRef = useRef<HTMLDivElement>(null);
  const isShown = whyNotTakeable !== undefined;
  useEffect(() => {
    const popover = popoverRef.current;
    const input = inputRef.current;
    if (popover === null || input === null) {
      return;
    }
    if (isShown) {
      // the input as source makes it the popover's anchor:
      popover.showPopover({ source: input });
    } else if (popover.matches(":popover-open")) {
      popover.hidePopover();
    }
  }, [inputRef, isShown]);
  return popoverRef;
};

/** a tab's name being edited in place */
export const TabRenameInput = ({
  rename: { name, validate, onRename },
  editedName,
  onEdit,
  onDone,
}: TabRenameInputProps) => {
  const ref = useAutoFocus<HTMLInputElement>(true);
  const isUnchanged = editedName === name;
  const whyNotTakeable = isUnchanged ? undefined : validate(editedName);
  const isTakeable = whyNotTakeable === undefined;
  const errorPopoverRef = useWhyNotTakeablePopover(ref, whyNotTakeable);
  const errorId = useUniqueId();

  return (
    <>
      <input
        ref={ref}
        type="text"
        aria-label={`Rename ${name}`}
        aria-invalid={!isTakeable}
        aria-describedby={isTakeable ? undefined : errorId}
        value={editedName}
        // as wide as the name, so the tab doesn't jump in size:
        size={Math.max(editedName.length, 1)}
        spellcheck={false}
        // typing a name isn't pressing the editor's shortcut keys:
        class="no-keyboard-shortcuts text-single-line bg-transparent outline-none underline aria-invalid:text-midRed"
        onInput={(inputEvent) => onEdit(inputEvent.currentTarget.value)}
        onKeyDown={(keyboardEvent) => {
          if (keyboardEvent.key === "Enter" && isTakeable) {
            if (!isUnchanged) {
              onRename(editedName);
            }
            onDone();
          } else if (keyboardEvent.key === "Escape") {
            onDone();
          }
        }}
        onBlur={onDone}
      />
      <CssVariables scaleFactor={2}>
        <div
          id={errorId}
          ref={errorPopoverRef}
          popover="manual"
          role="alert"
          class="tip bg-lightBeige zx:bg-zxYellowDimmed toppy:bg-toppyWarm2 text-midRed p-1 drop-shadow-oneBlock"
        >
          {whyNotTakeable}
        </div>
      </CssVariables>
    </>
  );
};
