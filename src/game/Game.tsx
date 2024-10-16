import { useEffect, useRef, useState } from 'react'
import { Application } from 'pixi.js';
import { renderWorld } from './renderWorld';
import { resize } from './resize';
import { tick } from './tick';
import { originalCampaign, RoomId } from '../originalCampaign';

/** 
 * React wrapper to give a space to pixi.js and start the rest of the game engine
 */
export const Game = () => {

  const [app, setApp] = useState<Application>();
  const [gameArea, setGameArea] = useState<HTMLDivElement | null>(null);
  const [roomId, setRoomId] = useState<RoomId>('blacktooth1head');

  useEffect(() => {

    if (gameArea === null)
      return;

    let app: Application | undefined;

    const go = async () => {
      app = new Application();
      await app.init({ background: '#000000', resizeTo: window });
      // todo: load assets in parallel with init
      gameArea.appendChild(app.canvas);
      setApp(app);
      resize(app);
    }

    go();

    return () => {
      if (app === undefined)
        return;

      gameArea.removeChild(app.canvas);
      app.destroy();
    }
  }, [gameArea]);

  useEffect(() => {
    if (app === undefined) {
      return;
    }
    return renderWorld(app, originalCampaign[roomId], {
      onPortalClick: (roomId: RoomId) => {
        setRoomId(roomId);
        console.log('going to', roomId);
      }
    });

  }, [app, roomId])

  return (
    <div className='h-screen w-screen bg-slate-700' id="game" ref={setGameArea} />
  )
}

