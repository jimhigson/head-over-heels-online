import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Application } from "pixi.js";
import { resize } from "./resize";
import { UnknownCampaign } from "../modelTypes";
import { gameMain } from "./gameMain";
import { type GameApi } from "./gameMain";
import { EmptyObject } from "type-fest";

/**
 * React wrapper to give a space to pixi.js and start the rest of the game engine
 */
export const Game = <C extends UnknownCampaign>(campaign: C) =>
  forwardRef<GameApi<C>, EmptyObject>((_props: EmptyObject, gameApiRef) => {
    const [gameArea, setGameArea] = useState<HTMLDivElement | null>(null);
    const gameApi = useRef(gameMain(campaign));
    useImperativeHandle(gameApiRef, () => gameApi.current);

    useEffect(() => {
      if (gameArea === null) return;

      let app: Application | undefined;

      const go = async () => {
        app = new Application();
        await app.init({ background: "#000000", resizeTo: window });
        // todo: load assets in parallel with init
        gameArea.appendChild(app.canvas);
        gameApi.current.renderIn(app);
        resize(app);
      };

      go();

      return () => {
        if (app === undefined) return;

        gameArea.removeChild(app.canvas);
        app.destroy();
      };
    }, [gameArea]);

    useEffect(() => {
      return () => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        gameApi.current.stop();
      };
    }, []);

    return <div className="h-screen w-screen bg-slate-700" ref={setGameArea} />;
  });
