import { twMerge } from "tailwind-merge";

import { multilineTextClass } from "./multilineTextClass";
import { BitmapText } from "../../Sprite";
import {
  useCurrentMenu,
  useCurrentMenuSelectedItemIndex,
} from "../../../../store/menuSelectors";

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
