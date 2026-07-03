import { useEffect } from "preact/hooks";

import { spriteOptionValues } from "../../sprites/spritesheet/spritesheetData/spritesheetMetaData";
import { useAppDispatch } from "../../store/hooks";
import { useSpritesOption } from "../../store/slices/gameMenus/gameMenusSelectors";
import {
  nextSpritesOption,
  setSpritesOption,
  type SpriteOption,
} from "../../store/slices/userSettings/userSettingsSlice";
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
    <div className="text-white zx:text-zxWhite toppy:text-toppyWarm1 flex-row flex gap-x-1">
      <span className="text-single-line">
        <span className="text-midRed zx:text-zxRed toppy:text-toppyPink2">
          F10
        </span>
        to cycle skins, or choose:
      </span>
      <Select
        value={currentLabel}
        triggerButtonLabel={
          <span className="w-16 text-single-line">{currentLabel}</span>
        }
        values={[...spriteOptionLabels]}
        onSelect={(label) => {
          const matched = spriteOptionValues.find(
            (v) => spriteOptionLabel(v) === label,
          );
          if (matched) {
            dispatch(setSpritesOption(matched));
          }
        }}
        disableCommandInput
      />
    </div>
  );
};
