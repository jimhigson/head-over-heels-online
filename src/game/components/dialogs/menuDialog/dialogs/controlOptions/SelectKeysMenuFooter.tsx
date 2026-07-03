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
      className={`
        bg-metallicBlueHalfbrite text-white
        zx:bg-zxBlueDimmed zx:text-zxCyanDimmed
        toppy:bg-toppyCool4 toppy:text-toppyCool1

        text-multi-line inline-block absolute inset-x-0 bottom-0 h-min pt-1 px-1`}
    >
      <span className="text-single-line">Press: </span>
      <CurrentKeyAssignments
        inline
        className={`${highlightTextClass}`}
        action="menu_openOrExit"
        keyClassName="me-1"
      />
      <span className="text-single-line">when done selecting keys for </span>
      <span className={`${highlightTextClass} text-single-line`}>
        {actionBeingAssigned}
      </span>
    </div>
  );
};
