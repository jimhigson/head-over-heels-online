import { MultipleBitmapText } from "../../game/components/tailwindSprites/BitmapText";
import { useCurrentSpritesheetData } from "../../store/slices/gameMenus/gameMenusSelectors";

export const SpritesheetStats = () => {
  const currentSpritesheetData = useCurrentSpritesheetData();

  return (
    <MultipleBitmapText className="text-white zx:text-zxWhite">
      <span className="text-moss zx:text-zxGreenDimmed">
        {Object.keys(currentSpritesheetData.frames).length}
      </span>{" "}
      sprites,
      <span className="text-moss zx:text-zxGreenDimmed">
        {" " + Object.keys(currentSpritesheetData.animations).length}
      </span>{" "}
      animations
    </MultipleBitmapText>
  );
};
