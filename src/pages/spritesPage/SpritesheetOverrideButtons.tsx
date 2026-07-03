import { useCallback, useRef } from "preact/hooks";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useSpritesOption } from "../../store/slices/gameMenus/gameMenusSelectors";
import {
  clearSpritesheetOverride,
  selectIsSpritesheetOverridden,
  setSpritesheetOverride,
} from "../../store/slices/spritesheetOverrideSlice";
import { Button } from "../../ui/Button";

export const SpritesheetOverrideButtons = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const spriteOption = useSpritesOption();
  const overridden = useAppSelector((state) =>
    selectIsSpritesheetOverridden(state, spriteOption.name),
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const [file] = e.target.files ?? [];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          dispatch(
            setSpritesheetOverride({
              spriteOption: spriteOption.name,
              dataUrl: reader.result as string,
            }),
          );
        };
        reader.readAsDataURL(file);
      }
    },
    [dispatch, spriteOption.name],
  );

  return overridden ?
      <Button
        className="px-1 bg-pink zx:bg-zxMagenta toppy:bg-toppyPink1"
        onClick={() => dispatch(clearSpritesheetOverride(spriteOption.name))}
      >
        <span className="text-single-line">x Clear override</span>
      </Button>
    : <>
        <input
          ref={inputRef}
          type="file"
          accept=".webp,.png"
          className="hidden"
          onChange={handleFileChange}
        />
        <Button
          className="px-1 bg-pink zx:bg-zxMagenta toppy:bg-toppyPink1"
          onClick={() => inputRef.current?.click()}
          tooltipContent="Upload a local WebP/PNG to temporarily override the spritesheet image. The override persists across page reloads but is stored in your browser only."
        >
          <span className="text-single-line">⬆ Override</span>
        </Button>
      </>;
};
