import { useEffect, useRef, useState } from "preact/hooks";

import { useAppSelector } from "../../store/hooks";
import { useSpritesheetArtName } from "../../store/slices/gameMenus/gameMenusSelectors";
import { selectIsSpritesheetOverridden } from "../../store/slices/spritesheetOverrideSlice";
import { spritesheetArtUrlFromCssVar } from "./spritesheetArtUrlFromCssVar";

export const SpritesheetArtUrlDisplay = () => {
  const ref = useRef<HTMLSpanElement>(null);
  const spritesheetArtName = useSpritesheetArtName();
  const overridden = useAppSelector((state) =>
    selectIsSpritesheetOverridden(state, spritesheetArtName),
  );
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (ref.current && !overridden) {
      setUrl(spritesheetArtUrlFromCssVar(ref.current));
    }
  }, [spritesheetArtName, overridden]);

  return (
    <span ref={ref}>
      <span class="text-pastelBlue zx:text-zxCyan toppy:text-toppyCool2 text-single-line">
        {overridden ? "(overridden)" : url || " "}
      </span>
    </span>
  );
};
