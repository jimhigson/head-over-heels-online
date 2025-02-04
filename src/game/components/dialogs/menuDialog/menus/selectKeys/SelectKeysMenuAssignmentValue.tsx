import { twMerge } from "tailwind-merge";
import { useAppSelector } from "../../../../../../store/hooks";
import { type BooleanAction } from "../../../../../input/InputState";
import { CurrentKeyAssignments } from "../../CurrentKeyAssignment";

export const SelectKeysMenuAssignmentValue = ({
  className,
  action,
}: {
  className?: string;
  action: BooleanAction;
}) => {
  const assigning = useAppSelector(
    (store) => store.assigningInput?.action === action,
  );

  return (
    <CurrentKeyAssignments
      className={twMerge(
        "flex flex-wrap gap-y-oneScaledPix gap-x-1",
        className,
      )}
      action={action}
      keyClassName={
        "text-pink zx:text-zxRed selectedMenuItem:text-pinkHalfbrite zx:selectedMenuItem:text-zxRed"
      }
      flashingCursor={assigning}
    />
  );
};
