import { Application } from "pixi.js";
import { useState } from "react";
import { spritesheetPalette } from "../../../gfx/spritesheetPalette";

export const usePixiApplication = () => {
  const [application] = useState(() => {
    const a = new Application();

    a.init({
      background: spritesheetPalette.redShadow,
      // no shared ticking = manual re-rendering
      sharedTicker: false,
    });
    return a;
  });

  return application;
};
