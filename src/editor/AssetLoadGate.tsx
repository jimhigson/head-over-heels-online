import { useEffect, useState, type ReactNode } from "react";
import { loadSpritesheet } from "../sprites/spriteSheet";

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

export const LoadSpritesheetGate = AssetLoadGateHoc(loadSpritesheet);
