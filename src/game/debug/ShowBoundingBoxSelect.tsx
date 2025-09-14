import type { ShowBoundingBoxes } from "../../store/slices/gameMenus/gameMenusSlice";

import { useAppDispatch } from "../../store/hooks";
import { useShowBoundingBoxes } from "../../store/slices/gameMenus/gameMenusSelectors";
import {
  setShowBoundingBoxes,
  showBoundingBoxOptions,
} from "../../store/slices/gameMenus/gameMenusSlice";
import { Select } from "../../ui/Select";

export const ShowBoundingBoxSelect = () => {
  const dispatch = useAppDispatch();
  const showBoundingBoxes = useShowBoundingBoxes();

  return (
    <>
      <Select<ShowBoundingBoxes>
        value={showBoundingBoxes}
        values={showBoundingBoxOptions}
        onSelect={(newValue) => {
          dispatch(setShowBoundingBoxes(newValue));
        }}
        disableCommandInput
        triggerButtonLabel={showBoundingBoxes}
        triggerButtonClassName="w-13"
      />
    </>
  );
};
