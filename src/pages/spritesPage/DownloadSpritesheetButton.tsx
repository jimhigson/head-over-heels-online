import { useCallback, useRef } from "react";

import { BitmapText } from "../../game/components/tailwindSprites/BitmapText";
import { Button } from "../../ui/Button";
import { spritesheetUrlFromCssVar } from "./spritesheetUrlFromCssVar";

export const DownloadSpritesheetButton = () => {
  const ref = useRef<HTMLButtonElement>(null);

  const handleClick = useCallback(() => {
    const rawUrl = spritesheetUrlFromCssVar(ref.current!);
    const { pathname } = new URL(rawUrl, location.href);
    const filename = pathname
      .split("/")
      .at(-1)!
      .replace(/-[\da-zA-Z]+(?=\.\w+$)/, "");
    const a = document.createElement("a");
    a.href = rawUrl;
    a.download = filename;
    a.click();
  }, []);

  return (
    <Button
      className="px-1 bg-moss zx:bg-zxGreen zx:text-zxBlack"
      ref={ref}
      onClick={handleClick}
      tooltipContent={<BitmapText>Download spritesheet image</BitmapText>}
    >
      <BitmapText>⬇ Download</BitmapText>
    </Button>
  );
};
