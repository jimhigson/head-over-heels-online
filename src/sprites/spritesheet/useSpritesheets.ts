import { useEffect, useState } from "preact/hooks";

import { Spritesheets } from "./Spritesheets";

/**
 * create a Spritesheets owned by this component, destroyed with it. The
 * caller starts the image load itself (via loadImage) once it has a renderer
 * to bake with
 */
export const useSpritesheets = (): Spritesheets => {
  const [spritesheets] = useState<Spritesheets>(() => new Spritesheets());

  useEffect(() => {
    return () => {
      spritesheets.destroy();
    };
  }, [spritesheets]);

  return spritesheets;
};
