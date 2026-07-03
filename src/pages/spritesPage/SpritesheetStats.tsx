import { useCurrentSpritesheetData } from "../../store/slices/gameMenus/gameMenusSelectors";

export const SpritesheetStats = () => {
  const currentSpritesheetData = useCurrentSpritesheetData();

  return (
    <span class="text-white zx:text-zxWhite toppy:text-toppyWarm1 text-single-line">
      <span class="text-moss zx:text-zxGreenDimmed toppy:text-toppyCool2">
        {Object.keys(currentSpritesheetData.frames).length}
      </span>{" "}
      sprites,
      <span class="text-moss zx:text-zxGreenDimmed toppy:text-toppyCool2">
        {" " + Object.keys(currentSpritesheetData.animations).length}
      </span>{" "}
      animations
    </span>
  );
};
