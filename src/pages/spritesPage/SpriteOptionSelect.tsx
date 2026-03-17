import { useEffect } from "react";

import type { SpriteOption } from "../../store/slices/gameMenus/gameMenusSlice";

import {
  BitmapText,
  MultipleBitmapText,
} from "../../game/components/tailwindSprites/Sprite";
import { spriteOptionValues } from "../../sprites/spritesheet/spritesheetData/spritesheetMetaData";
import { useAppDispatch } from "../../store/hooks";
import { useSpritesOption } from "../../store/slices/gameMenus/gameMenusSelectors";
import {
  nextSpritesOption,
  setSpritesOption,
} from "../../store/slices/gameMenus/gameMenusSlice";
import { Select } from "../../ui/Select";

const spriteOptionLabel = (spriteOption: SpriteOption): string =>
  spriteOption.uncolourised ? "Speccy" : spriteOption.name;

const spriteOptionLabels = spriteOptionValues.map(
  spriteOptionLabel,
) as readonly string[];

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

  const currentLabel = spriteOptionLabel(spriteOption);

  return (
    <div className="text-white zx:text-zxWhite flex-row flex gap-x-1">
      <MultipleBitmapText>
        <span className="text-midRed zx:text-zxRed">F10</span>to cycle skins, or
        choose:
      </MultipleBitmapText>
      <Select
        value={currentLabel}
        triggerButtonLabel={
          <BitmapText className="w-16">{currentLabel}</BitmapText>
        }
        values={[...spriteOptionLabels]}
        onSelect={(label) => {
          const matched = spriteOptionValues.find(
            (v) => spriteOptionLabel(v) === label,
          );
          if (matched) dispatch(setSpritesOption(matched));
        }}
        disableCommandInput
      />
    </div>
  );
};
