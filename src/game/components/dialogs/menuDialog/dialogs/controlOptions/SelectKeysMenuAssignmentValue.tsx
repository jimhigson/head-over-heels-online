import { twMerge } from "tailwind-merge";

import type { BooleanAction } from "../../../../../input/actions";

import { useAppSelector } from "../../../../../../store/hooks";
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
    (store) => store.gameMenus.assigningInput?.action === action,
  );

  return (
    <CurrentKeyAssignments
      className={twMerge(
        "flex flex-wrap gap-y-oneScaledPix gap-x-1 ml-2",
        className,
      )}
      action={action}
      keyClassName={controlMenuValueClass}
      flashingCursor={assigning}
    />
  );
};
