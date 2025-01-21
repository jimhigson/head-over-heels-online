import { twMerge } from "tailwind-merge";
import {
  useCurrentMenu,
  useCurrentMenuSelectedItemIndex,
} from "../../../../store/selectors";
import { BitmapText } from "../../Sprite";

export const SelectedItemHint = ({ className }: { className?: string }) => {
  const menu = useCurrentMenu();
  const selectedItemIndex = useCurrentMenuSelectedItemIndex();

  const selectedItemHint =
    menu === undefined || selectedItemIndex === undefined ?
      undefined
    : menu.items[selectedItemIndex].hint;

  if (selectedItemHint === undefined) {
    return <>No hint</>;
  }

  return (
    <BitmapText className={twMerge("block leading-multilineText", className)}>
      {selectedItemHint}
    </BitmapText>
  );
};
