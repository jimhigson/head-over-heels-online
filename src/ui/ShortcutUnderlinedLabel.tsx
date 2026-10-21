import { type ShortcutKeys } from "./useKeyboardShortcut";

const isLetterKey = (shortcutKey: string) => /^[a-z]$/i.test(shortcutKey);

export type ShortcutUnderlinedLabelProps = {
  text: string;
  shortcutKeys: ShortcutKeys | undefined;
};

/**
 * a label's text with the first letter matching its single-letter shortcut
 * key (ignoring case) underlined, if it has one
 */
export const ShortcutUnderlinedLabel = ({
  text,
  shortcutKeys,
}: ShortcutUnderlinedLabelProps) => {
  const letterKey = shortcutKeys?.find(isLetterKey);
  const underlinedIndex =
    letterKey === undefined ? -1 : (
      text.toLowerCase().indexOf(letterKey.toLowerCase())
    );
  if (underlinedIndex === -1) {
    return <>{text}</>;
  }
  return (
    <>
      {text.slice(0, underlinedIndex)}
      <span class="text-underline">{text[underlinedIndex]}</span>
      {text.slice(underlinedIndex + 1)}
    </>
  );
};
