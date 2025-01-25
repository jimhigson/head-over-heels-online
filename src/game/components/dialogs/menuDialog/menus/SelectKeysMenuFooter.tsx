import { BitmapText } from "../../../Sprite";
import { useAppSelector } from "../../../../../store/hooks";
import { multilineTextClass } from "../multilineTextClass";

const highlightTextClass = "text-midRed zx:text-zxCyan";

export const SelectKeysMenuFooter = () => {
  const assigningKeys = useAppSelector(
    (store) => store.actionBeingAssignedKeys,
  );

  if (assigningKeys === undefined) {
    return null;
  }

  return (
    <div
      className={`
        bg-metallicBlueHalfbrite text-highlightBeige
        zx:bg-zxBlueDimmed zx:text-zxCyanDimmed

        ${multilineTextClass} inline-block absolute inset-x-0 bottom-0 h-min pt-1 px-1`}
    >
      <BitmapText>Press</BitmapText>
      <BitmapText className={highlightTextClass}> escape </BitmapText>
      <BitmapText>when done selecting keys for </BitmapText>
      <BitmapText className={highlightTextClass}>{assigningKeys}</BitmapText>
    </div>
  );
};
