import { useEffect, useRef, useState } from "preact/hooks";

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
      <span class="text-pastelBlue zx:text-zxCyan toppy:text-toppyCool2 text-single-line">
        {overridden ? "(overridden)" : url || " "}
      </span>
    </span>
  );
};
