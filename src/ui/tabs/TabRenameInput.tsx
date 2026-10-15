import { useAutoFocus } from "../useAutoFocus";
import { type TabRename } from "./Tab";

export type TabRenameInputProps = {
  rename: TabRename;
  editedName: string;
  onEdit: (editedName: string) => void;
  /** renaming has finished, taken or cancelled */
  onDone: () => void;
};

/** a tab's name being edited in place */
export const TabRenameInput = ({
  rename: { name, isValid, onRename },
  editedName,
  onEdit,
  onDone,
}: TabRenameInputProps) => {
  const ref = useAutoFocus<HTMLInputElement>(true);
  const isUnchanged = editedName === name;
  const isTakeable = isUnchanged || isValid(editedName);

  return (
    <input
      ref={ref}
      type="text"
      aria-label={`Rename ${name}`}
      aria-invalid={!isTakeable}
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
  );
};
