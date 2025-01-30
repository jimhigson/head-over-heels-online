import { twMerge } from "tailwind-merge";
import { useAppSelector } from "../../../../../store/hooks";
import type { BooleanAction } from "../../../../input/InputState";
import { CurrentKeyAssignments } from "../CurrentKeyAssignment";
import type { ValueComponent } from "../MenuItem";

export const SelectKeysMenuAssignmentValue =
  (action: BooleanAction): ValueComponent =>
  ({ className }) => {
    /* eslint-disable prettier/prettier, react-hooks/rules-of-hooks */
    const assigning = useAppSelector(
      (store) => store.assigningInput?.action === action,
    );
    /* eslint-enable prettier/prettier, react-hooks/rules-of-hooks */

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
