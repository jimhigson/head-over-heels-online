import { Container, Graphics } from "pixi.js";

import { isWholeRoomSubRooms } from "../../../model/RoomJson";
import { paletteBlockstack } from "../../../sprites/palette/spritesheetPalette";
import { selectShowSubrooms } from "../../../store/slices/gameMenus/gameMenusSelectors";
import { store } from "../../../store/store";
import { objectEntriesIter } from "../../../utils/entries";
import { nearestQuarterAngle } from "../../../utils/vectors/cameraAngleVectors";
import { projectBlockXyzToScreenXy } from "../projections";
import { TextContainer } from "../text/TextContainer";
import { type DecorateRoomRenderer } from "./DecorateRoomRenderer";

const subRoomColours = [
  paletteBlockstack.metallicBlue,
  paletteBlockstack.midRed,
  paletteBlockstack.pink,
  paletteBlockstack.moss,
  paletteBlockstack.swop_cyan,
  paletteBlockstack.pastelBlue,
] as const;

export const subRoomBoundariesDecorateRoomRenderer: DecorateRoomRenderer = (
  renderContext,
) => {
  if (!selectShowSubrooms(store.getState())) {
    return undefined;
  }

  const subRooms = renderContext.room.roomJson.meta?.subRooms;
  if (!subRooms || isWholeRoomSubRooms(subRooms)) {
    return undefined;
  }

  const container = new Container({ label: "subRoomBoundaries" });
  const { pixiRenderer, cameraAngle, spritesheets } = renderContext.general;
  const cameraQuarterAngle = nearestQuarterAngle(cameraAngle);

  let colourIndex = 0;
  for (const [name, subRoom] of objectEntriesIter(subRooms)) {
    const { from, to } = subRoom.physicalPosition;
    const color = subRoomColours[colourIndex % subRoomColours.length];

    const graphics = new Graphics();

    graphics.poly([
      projectBlockXyzToScreenXy({ x: from.x, y: from.y }, cameraQuarterAngle),
      projectBlockXyzToScreenXy({ x: to.x, y: from.y }, cameraQuarterAngle),
      projectBlockXyzToScreenXy({ x: to.x, y: to.y }, cameraQuarterAngle),
      projectBlockXyzToScreenXy({ x: from.x, y: to.y }, cameraQuarterAngle),
    ]);

    graphics.stroke({ width: 2, color, alpha: 0.8 });

    const centre = projectBlockXyzToScreenXy(
      {
        x: (from.x + to.x) / 2,
        y: (from.y + to.y) / 2,
      },
      cameraQuarterAngle,
    );

    const label = new TextContainer({
      pixiRenderer,
      resolution: spritesheets.bakeFactor,
      text: `${name} (${subRoom.gridPosition.x},${subRoom.gridPosition.y})`,
      colour: color,
      outline: true,
      x: centre.x,
      y: centre.y,
    });

    container.addChild(graphics, label);
    colourIndex++;
  }

  return container;
};
