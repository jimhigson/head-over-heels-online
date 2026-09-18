import { useState } from "preact/hooks";

import { CssVariables } from "../../game/components/CssVariables";
import { typedURLSearchParams } from "../../options/queryParams";
import { useUniversalKeys } from "../../store/storeFlow/useUniversalKeys";
import { SpritesPageContent } from "./SpritesPageContent";
import { SpritesPageToolbar } from "./SpritesPageToolbar";

const defaultScale = 2;

export const SpritesPage = () => {
  // so display shortcuts (eg toggle smooth sprites, CRT) can be tried
  // directly from this page while previewing their effect:
  useUniversalKeys();

  const scaleParam = typedURLSearchParams().get("scale");
  const [scale, setScale] = useState(
    scaleParam ? Number(scaleParam) : defaultScale,
  );
  const [spriteFilter, setSpriteFilter] = useState("");

  const handleScaleChange = (newScale: number) => {
    setScale(newScale);
    const url = new URL(window.location.href);
    url.searchParams.set("scale", `${newScale}`);
    window.history.replaceState(null, "", url);
  };

  return (
    <CssVariables scaleFactor={scale}>
      <title>Sprites</title>
      <SpritesPageToolbar
        scale={scale}
        onScaleChange={handleScaleChange}
        spriteFilter={spriteFilter}
        onSpriteFilterChange={setSpriteFilter}
      />
      <SpritesPageContent scale={scale} spriteFilter={spriteFilter} />
    </CssVariables>
  );
};

export default SpritesPage;
