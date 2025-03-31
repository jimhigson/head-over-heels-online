import { useEffect, useState } from "react";
import type { Campaign } from "../../../../../../model/modelTypes";
import { useCanvasInlineStyle } from "../../../../../../utils/scaledRendering/useCanvasInlineStyle";
import { mapMain } from "./mapMain";
import { useGameApi } from "../../../../GameApiContext";
import type { Application } from "pixi.js";
import { SyncAppWithStoreScale } from "../../../../../../utils/scaledRendering/SyncAppWithStoreScale";

export const Map = <RoomId extends string>({
  className,
}: {
  className?: string;
  campaign: Campaign<RoomId>;
  fromRoomId: RoomId;
}) => {
  const { gameState } = useGameApi();
  const [div, setDiv] = useState<HTMLDivElement | null>(null);
  const [app, setApp] = useState<Application | null>(null);

  useEffect(() => {
    if (div === null) {
      return;
    }
    const setup = async () => {
      const app = await mapMain(gameState);
      setApp(app);
      div.appendChild(app.canvas);
    };
    setup();
  }, [div, gameState]);

  const canvasInlineStyle = useCanvasInlineStyle();

  return (
    <div
      ref={(e) => setDiv(e)}
      className={`  ${className}`}
      style={canvasInlineStyle}
    >
      {app !== null && <SyncAppWithStoreScale app={app} />}
    </div>
  );
};
