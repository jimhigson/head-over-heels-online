import { useAppDispatch } from "../../../store/hooks";
import { useShowBoundingBoxes } from "../../../store/selectors";
import { setShowBoundingBoxes } from "../../../store/slices/gameMenusSlice";
import { Switch } from "../../../ui/Switch";
import { BitmapText } from "../tailwindSprites/Sprite";

export const ShowBoundingBoxSwitches = () => {
  const dispatch = useAppDispatch();
  const showBoundingBoxes = useShowBoundingBoxes();

  return (
    <>
      <label htmlFor="showbbs">
        <BitmapText>BB:</BitmapText>
      </label>
      <Switch
        value={showBoundingBoxes !== "none"}
        onClick={(e, newValue) => {
          dispatch(setShowBoundingBoxes(newValue ? "non-wall" : "none"));
          e.currentTarget.blur();
        }}
      />

      <BitmapText>WallBB:</BitmapText>
      <Switch
        value={showBoundingBoxes === "all"}
        onClick={(e, newValue) => {
          dispatch(setShowBoundingBoxes(newValue ? "all" : "non-wall"));
          e.currentTarget.blur();
        }}
      />
    </>
  );
};
