import { MultipleBitmapText } from "../../game/components/tailwindSprites/BitmapText";
import { useCurrentSpritesheetData } from "../../store/slices/gameMenus/gameMenusSelectors";

export const SpritesheetStats = () => {
  const currentSpritesheetData = useCurrentSpritesheetData();

  return (
    <MultipleBitmapText className="text-white zx:text-zxWhite toppy:text-toppyWarm1">
      <span className="text-moss zx:text-zxGreenDimmed toppy:text-toppyCool2">
        {Object.keys(currentSpritesheetData.frames).length}
      </span>{" "}
      sprites,
      <span className="text-moss zx:text-zxGreenDimmed toppy:text-toppyCool2">
        {" " + Object.keys(currentSpritesheetData.animations).length}
      </span>{" "}
      animations
    </MultipleBitmapText>
  );
};
