import { BitmapText } from "../../../Sprite";
import { useAppSelector } from "../../../../../store/hooks";
import { multilineTextClass } from "../multilineTextClass";
import { CurrentKeyAssignments } from "../CurrentKeyAssignment";

const highlightTextClass = "text-pink zx:text-zxCyan";

export const SelectKeysMenuFooter = () => {
  const actionBeingAssigned = useAppSelector(
    (store) => store.assigningInput?.action,
  );

  if (actionBeingAssigned === undefined) {
    return null;
  }

  return (
    <div
      className={`
        bg-metallicBlueHalfbrite text-white
        zx:bg-zxBlueDimmed zx:text-zxCyanDimmed

        ${multilineTextClass} inline-block absolute inset-x-0 bottom-0 h-min pt-1 px-1`}
    >
      <BitmapText>Press </BitmapText>
      <CurrentKeyAssignments
        className={`inline ${highlightTextClass}`}
        action="menu_openOrExit"
        keyClassName="me-1"
      />
      <BitmapText>when done selecting keys for </BitmapText>
      <BitmapText className={highlightTextClass}>
        {actionBeingAssigned}
      </BitmapText>
    </div>
  );
};
