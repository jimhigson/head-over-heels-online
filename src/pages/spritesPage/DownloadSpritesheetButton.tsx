import { useCallback, useRef } from "preact/hooks";

import { Button } from "../../ui/Button";
import { spritesheetUrlFromCssVar } from "./spritesheetUrlFromCssVar";

export const DownloadSpritesheetButton = () => {
  const ref = useRef<HTMLSpanElement>(null);

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
    <>
      <span ref={ref} class="hidden" />
      <Button
        class="px-1 bg-moss zx:bg-zxGreen zx:text-zxBlack toppy:bg-toppyCool2 toppy:text-toppyBlack"
        onClick={handleClick}
        tooltipContent={
          <span class="text-single-line">Download spritesheet image</span>
        }
      >
        <span class="text-single-line">⬇ Download</span>
      </Button>
    </>
  );
};
