import type { PropsWithChildren } from "react";
import type { EmptyObject } from "type-fest";

import { Application } from "pixi.js";
import { createContext, useContext, useEffect, useState } from "react";

import { spritesheetPalette } from "../../sprites/palette/spritesheetPalette";
import { stopAppAutoRendering } from "../../utils/pixi/stopAppAutoRendering";

const PixiApplicationContext = createContext<Application>(
  // don't support root context:
  null as unknown as Application,
);

export const PixiApplicationProvider = ({
  children,
}: PropsWithChildren<EmptyObject>) => {
  const [initialisedApp, setInitialisedApp] = useState<Application | null>(
    null,
  );

  useEffect(() => {
    //let unmounted = false;
    const appThisEffect = new Application();

    appThisEffect
      .init({
        background: spritesheetPalette.pureBlack,
        // the room editor ticks like any other pixi app, it doesn't just react to changes:
        sharedTicker: true,

        // the shadows filter requires a backbuffer
        useBackBuffer: true,
      })
      .then(() => {
        // don't ever destroy the app - this is forever once it is made
        // if (unmounted) {
        //   //appThisEffect.destroy();
        //   setInitialisedApp(null);
        // } else {
        stopAppAutoRendering(appThisEffect);
        setInitialisedApp(appThisEffect);
        // }
      });

    return () => {
      //if (appThisEffect.renderer) {
      // destroying an app fails if it can't call .destroy on its renderer,
      // but if component is unmounted before app has finished init'ing,
      // we can't destroy it yet
      //appThisEffect.destroy();
      //setInitialisedApp(null);
      //}
      //unmounted = true;
    };
  }, []);

  if (initialisedApp === null) {
    // not initialised yet, act as a gate
    return null;
  }
  return (
    <PixiApplicationContext value={initialisedApp}>
      {children}
    </PixiApplicationContext>
  );
};

export const useProvidedPixiApplication = () => {
  return useContext(PixiApplicationContext);
};
