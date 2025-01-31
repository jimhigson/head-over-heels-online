import { twMerge } from "tailwind-merge";
import {
  useCurrentMenu,
  useCurrentMenuSelectedItemIndex,
} from "../../../../store/selectors";
import { multilineTextClass } from "./multilineTextClass";
import { BitmapText } from "../../Sprite";

export const SelectedItemHint = ({ className }: { className?: string }) => {
  const menu = useCurrentMenu();
  const selectedItemIndex = useCurrentMenuSelectedItemIndex();

  const selectedItemHint =
    menu === undefined || selectedItemIndex === undefined ?
      undefined
    : menu.items[selectedItemIndex].hint;

  if (selectedItemHint === undefined) {
    return null;
  }

  return (
    <BitmapText className={twMerge("block", multilineTextClass, className)}>
      {selectedItemHint}
    </BitmapText>
  );
};
