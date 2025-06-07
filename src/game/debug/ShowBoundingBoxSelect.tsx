import { useAppDispatch } from "../../store/hooks";
import { useShowBoundingBoxes } from "../../store/selectors";
import type { ShowBoundingBoxes } from "../../store/slices/gameMenusSlice";
import {
  setShowBoundingBoxes,
  showBoundingBoxOptions,
} from "../../store/slices/gameMenusSlice";
import { Select } from "../../ui/Select";
import { BitmapText } from "../components/tailwindSprites/Sprite";

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
        triggerButtonLabel={
          <BitmapText className="">{showBoundingBoxes}</BitmapText>
        }
        triggerButtonClassName="w-13"
      />
    </>
  );
};
