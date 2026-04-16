import { useEffect, useRef, useState } from "react";

import { BitmapText } from "../../game/components/tailwindSprites/Sprite";
import { useAppSelector } from "../../store/hooks";
import { useSpritesOption } from "../../store/slices/gameMenus/gameMenusSelectors";
import { selectIsSpritesheetOverridden } from "../../store/slices/spritesheetOverrideSlice";
import { spritesheetUrlFromCssVar } from "./spritesheetUrlFromCssVar";

export const SpritesheetUrlDisplay = () => {
  const ref = useRef<HTMLSpanElement>(null);
  const spriteOption = useSpritesOption();
  const overridden = useAppSelector((state) =>
    selectIsSpritesheetOverridden(state, spriteOption.name),
  );
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (ref.current && !overridden) {
      setUrl(spritesheetUrlFromCssVar(ref.current));
    }
  }, [spriteOption, overridden]);

  return (
    <span ref={ref}>
      <BitmapText className="text-pastelBlue zx:text-zxCyan">
        {overridden ? "(overridden)" : url || " "}
      </BitmapText>
    </span>
  );
};
