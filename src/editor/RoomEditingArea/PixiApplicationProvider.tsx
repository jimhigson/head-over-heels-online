import { Application } from "pixi.js";
import { createContext } from "preact";
import { type PropsWithChildren } from "preact/compat";
import { useContext, useEffect, useState } from "preact/hooks";
import { type EmptyObject } from "type-fest";

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
        // transparent so the pane's checkerboard shows through as the void
        // around the room:
        backgroundAlpha: 0,
        // render at device pixels for crispness; the canvas is styled to fill
        // its pane in css pixels:
        resolution: window.devicePixelRatio,
        // the room editor ticks like any other pixi app, it doesn't just react to changes:
        sharedTicker: true,

        // the shadows filter requires a backbuffer
        useBackBuffer: true,
      })
      .then(() => {
        // the canvas always fills its pane; between debounced renderer resizes
        // it stretches, then sharpens once the resize lands:
        const canvasStyle = appThisEffect.canvas.style;
        canvasStyle.width = "100%";
        canvasStyle.height = "100%";
        canvasStyle.display = "block";
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
