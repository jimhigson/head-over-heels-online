import { useState } from "preact/hooks";

import { CssVariables } from "../../game/components/CssVariables";
import { typedURLSearchParams } from "../../options/queryParams";
import { loadHeadOverHeelsFont } from "../../sprites/loadHeadOverHeelsFont";
import { SpritesPageContent } from "./SpritesPageContent";
import { SpritesPageToolbar } from "./SpritesPageToolbar";

// the game only renders HeadOverHeels text on the sprites page, so register the
// webfont once when this page's code loads
loadHeadOverHeelsFont();

const defaultScale = 2;

export const SpritesPage = () => {
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
