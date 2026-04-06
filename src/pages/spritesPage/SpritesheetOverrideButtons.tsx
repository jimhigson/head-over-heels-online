import { useCallback, useRef } from "react";

import type { LoadableSpriteOption } from "../../sprites/spritesheet/loadedSpriteSheet";

import { BitmapText } from "../../game/components/tailwindSprites/Sprite";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useSpritesOption } from "../../store/slices/gameMenus/gameMenusSelectors";
import {
  clearSpritesheetOverride,
  selectIsSpritesheetOverridden,
  setSpritesheetOverride,
} from "../../store/slices/spritesheetOverrideSlice";
import { Button } from "../../ui/button";

export const SpritesheetOverrideButtons = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const spriteOption = useSpritesOption();
  const loadable: LoadableSpriteOption =
    spriteOption === "Speccy" ? "BlockStack" : spriteOption;
  const overridden = useAppSelector((state) =>
    selectIsSpritesheetOverridden(state, loadable),
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const [file] = e.target.files ?? [];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          dispatch(
            setSpritesheetOverride({
              spriteOption: loadable,
              dataUrl: reader.result as string,
            }),
          );
        };
        reader.readAsDataURL(file);
      }
    },
    [dispatch, loadable],
  );

  return overridden ?
      <Button
        className="px-1 bg-pink zx:bg-zxMagenta"
        onClick={() => dispatch(clearSpritesheetOverride(loadable))}
      >
        <BitmapText>x Clear override</BitmapText>
      </Button>
    : <>
        <input
          ref={inputRef}
          type="file"
          accept=".png"
          className="hidden"
          onChange={handleFileChange}
        />
        <Button
          className="px-1 bg-pink zx:bg-zxMagenta"
          onClick={() => inputRef.current?.click()}
          tooltipContent="Upload a local PNG to temporarily override the spritesheet image. The override persists across page reloads but is stored in your browser only."
        >
          <BitmapText>⬆ Override</BitmapText>
        </Button>
      </>;
};
