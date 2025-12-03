import { type ReactNode, useEffect, useState } from "react";

import { loadSpritesheetAssets } from "../sprites/spritesheet/loadedSpriteSheet";

export const AssetLoadGateHoc = (load: () => Promise<unknown>) => {
  const LoadGate = ({ children }: { children: ReactNode }) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
      load().then(() => {
        setLoaded(true);
      });
    });

    if (loaded) {
      return children;
    } else {
      return null;
    }
  };
  return LoadGate;
};

export const LoadSpritesheetGate = AssetLoadGateHoc(loadSpritesheetAssets);
