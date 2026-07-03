import { useAppSelector } from "../../../../../../store/hooks";
import { CurrentKeyAssignments } from "../../CurrentKeyAssignments";

const highlightTextClass = "text-pink zx:text-zxCyan toppy:text-toppyPink1";

export const SelectKeysMenuFooter = () => {
  const actionBeingAssigned = useAppSelector(
    ({ userSettings }) => userSettings.assigningInput?.action,
  );

  if (actionBeingAssigned === undefined) {
    return null;
  }

  return (
    <div
      class={`
        bg-metallicBlueHalfbrite text-white
        zx:bg-zxBlueDimmed zx:text-zxCyanDimmed
        toppy:bg-toppyCool4 toppy:text-toppyCool1

        text-multi-line inline-block absolute inset-x-0 bottom-0 h-min pt-1 px-1`}
    >
      <span class="text-single-line">Press: </span>
      <CurrentKeyAssignments
        inline
        class={`${highlightTextClass}`}
        action="menu_openOrExit"
        keyClassName="me-1"
      />
      <span class="text-single-line">when done selecting keys for </span>
      <span class={`${highlightTextClass} text-single-line`}>
        {actionBeingAssigned}
      </span>
    </div>
  );
};
