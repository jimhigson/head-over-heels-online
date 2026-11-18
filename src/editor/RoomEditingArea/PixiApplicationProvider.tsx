import { Application } from "pixi.js";
import { createContext } from "preact";
import { type PropsWithChildren } from "preact/compat";
import { useContext, useEffect, useState } from "preact/hooks";
import { type EmptyObject } from "type-fest";

import { installAppTickerAsPixiShared } from "../../game/mainLoop/installAppTickerAsPixiShared";
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
    let unmounted = false;
    let initialised = false;
    // before init, which reads Ticker.shared and would otherwise create pixi's
    // own ticker rather than taking ours:
    installAppTickerAsPixiShared();

    const appThisEffect = new Application();

    // after everything inside has cleaned up its pixi objects (children clean
    // up after their parents):
    const destroyAppAfterChildrenUnmount = () =>
      queueMicrotask(() => appThisEffect.destroy());

    appThisEffect
      .init({
        // transparent so the pane's background shows through as the void
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
        initialised = true;
        if (unmounted) {
          // an app can only be destroyed once it has finished initialising:
          appThisEffect.destroy();
          return;
        }
        // the canvas always fills its pane; between debounced renderer resizes
        // it stretches, then sharpens once the resize lands:
        const canvasStyle = appThisEffect.canvas.style;
        canvasStyle.width = "100%";
        canvasStyle.height = "100%";
        canvasStyle.display = "block";
        stopAppAutoRendering(appThisEffect);
        setInitialisedApp(appThisEffect);
      });

    return () => {
      unmounted = true;
      if (initialised) {
        destroyAppAfterChildrenUnmount();
      }
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
