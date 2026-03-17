import { useEffect } from "react";

import {
  BitmapText,
  MultipleBitmapText,
} from "../../game/components/tailwindSprites/Sprite";
import { useAppDispatch } from "../../store/hooks";
import { useSpritesOption } from "../../store/slices/gameMenus/gameMenusSelectors";
import {
  nextSpritesOption,
  setSpritesOption,
  spriteOptionValues,
} from "../../store/slices/gameMenus/gameMenusSlice";
import { Select } from "../../ui/Select";

export const SpriteOptionSelect = () => {
  const dispatch = useAppDispatch();
  const spriteOption = useSpritesOption();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "F10") {
        e.preventDefault();
        dispatch(nextSpritesOption());
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [dispatch]);

  return (
    <div className="text-white zx:text-zxWhite flex-row flex gap-x-1">
      <MultipleBitmapText>
        <span className="text-midRed zx:text-zxRed">F10</span>to cycle skins, or
        choose:
      </MultipleBitmapText>
      <Select
        value={spriteOption}
        triggerButtonLabel={
          <BitmapText className="w-16">{spriteOption}</BitmapText>
        }
        values={[...spriteOptionValues]}
        onSelect={(value) => dispatch(setSpritesOption(value))}
        disableCommandInput
      />
    </div>
  );
};
