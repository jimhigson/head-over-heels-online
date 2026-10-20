import { useEffect } from "preact/hooks";

import { spritesheetNameValues } from "../../sprites/spritesheet/spritesheetData/spritesheetMetaData";
import { useAppDispatch } from "../../store/hooks";
import { useSpritesheetName } from "../../store/slices/gameMenus/gameMenusSelectors";
import {
  nextSpritesheetName,
  setSpritesheetName,
} from "../../store/slices/userSettings/userSettingsSlice";
import { Select } from "../../ui/Select";

export const SpritesheetSelect = () => {
  const dispatch = useAppDispatch();
  const spritesheetName = useSpritesheetName();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "F10") {
        e.preventDefault();
        dispatch(nextSpritesheetName());
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [dispatch]);

  return (
    <div class="text-white zx:text-zxWhite toppy:text-toppyWarm1 flex-row flex gap-x-1">
      <span class="text-single-line">
        <span class="text-midRed zx:text-zxRed toppy:text-toppyPink2">F10</span>
        to cycle skins, or choose:
      </span>
      <Select
        value={spritesheetName}
        triggerButtonLabel={
          <span class="w-16 text-single-line capitalize">
            {spritesheetName}
          </span>
        }
        values={spritesheetNameValues}
        onSelect={(selectedSpritesheetName) => {
          dispatch(setSpritesheetName(selectedSpritesheetName));
        }}
        disableCommandInput
      />
    </div>
  );
};
