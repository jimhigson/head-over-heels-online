import { useEffect, useState } from "react";
import { Application } from "pixi.js";
import { resize } from "./resize";
import { RoomId } from "../modelTypes";
import { campaign as originalCampaign } from "../_generated/originalCampaign/campaign";
import { testCampaign } from "../testCampaign";
import { renderWorld } from "./render/renderWorld";

const allCampaigns = {
  ...originalCampaign,
  ...testCampaign(),
};

/**
 * React wrapper to give a space to pixi.js and start the rest of the game engine
 */
export const Game = () => {
  const [app, setApp] = useState<Application>();
  const [gameArea, setGameArea] = useState<HTMLDivElement | null>(null);
  const [roomId, setRoomId] = useState<RoomId>("blacktooth16");

  useEffect(() => {
    if (gameArea === null) return;

    let app: Application | undefined;

    const go = async () => {
      app = new Application();
      await app.init({ background: "#000000", resizeTo: window });
      // todo: load assets in parallel with init
      gameArea.appendChild(app.canvas);
      setApp(app);
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
    if (app === undefined || app.stage === null) {
      return;
    }

    return renderWorld(app, allCampaigns[roomId], {
      onPortalClick(roomId: RoomId) {
        console.log("Game: going to toom", roomId);
        setRoomId(roomId);
      },
    });
  }, [app, roomId]);

  return (
    <div
      className="h-screen w-screen bg-slate-700"
      id="game"
      ref={setGameArea}
    />
  );
};
