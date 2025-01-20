import type { EmptyObject } from "type-fest";
import { BitmapText } from "../../../Sprite";
import { useAppSelector } from "../../../../../store/hooks";

export const SelectKeysMenuFooter = (_emptyProps: EmptyObject) => {
  const assigningKeys = useAppSelector(
    (store) => store.actionBeingAssignedKeys,
  );

  if (assigningKeys === undefined) {
    return null;
  }

  return (
    <div className="bg-metallicBlue text-lightGrey leading-multilineText inline-block absolute inset-x-0 bottom-0 h-min pt-1 px-1">
      <BitmapText>Press</BitmapText>
      <BitmapText className="text-midRed"> escape </BitmapText>
      <BitmapText>when done assigning for </BitmapText>
      <BitmapText className="text-midRed">{assigningKeys}</BitmapText>
    </div>
  );
};
