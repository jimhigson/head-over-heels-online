import { twMerge } from "tailwind-merge";
import { useAppSelector } from "../../../../../../store/hooks";
import { type BooleanAction } from "src/game/input/actions";
import { CurrentKeyAssignments } from "../../CurrentKeyAssignment";
import { controlMenuValueClass } from "./controlMenuValueClass";

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
      keyClassName={controlMenuValueClass}
      flashingCursor={assigning}
    />
  );
};
