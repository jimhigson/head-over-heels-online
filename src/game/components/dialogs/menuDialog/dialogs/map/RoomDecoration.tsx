import { type RoomDecoration as RoomDecorationName } from "../../../../../../model/RoomJson";
import {
  roomBack,
  roomFront,
  roomGridSizeXY,
  strokeWidth,
} from "./mapConstants";
import { project } from "./svgHelpers";

const crossoverPathD = `
M${project({ x: roomFront, y: roomFront })}
L${project({ x: roomBack, y: roomFront })}
L${project({ x: roomBack, y: roomFront - strokeWidth * 2 })}
L${project({ x: roomFront, y: roomFront - strokeWidth * 2 })}
z
M${project({ x: roomFront, y: roomBack })}
L${project({ x: roomBack, y: roomBack })}
L${project({ x: roomBack, y: roomBack + strokeWidth * 2 })}
L${project({ x: roomFront, y: roomBack + strokeWidth * 2 })}
z
`;

const arrowLeftPathD = `
M${project({ x: roomFront, y: roomGridSizeXY / 2 })}
L${project({ x: roomBack, y: roomGridSizeXY / 2 })}

M${project({ x: roomGridSizeXY / 2, y: roomFront })}
L${project({ x: roomBack, y: roomGridSizeXY / 2 })}

M${project({ x: roomGridSizeXY / 2, y: roomBack })}
L${project({ x: roomBack, y: roomGridSizeXY / 2 })}
`;

const divideAlongYPathD = `
M${project({ x: roomGridSizeXY / 2 - strokeWidth, y: 0 })}
L${project({ x: roomGridSizeXY / 2 + strokeWidth, y: 0 })}
L${project({ x: roomGridSizeXY / 2 + strokeWidth, y: roomGridSizeXY })}
L${project({ x: roomGridSizeXY / 2 - strokeWidth, y: roomGridSizeXY })}
z
`;

type RoomDecorationProps = {
  decoration: RoomDecorationName;
};

export const RoomDecoration = ({ decoration }: RoomDecorationProps) => {
  switch (decoration) {
    case "crossover":
      // everyone loves blacktooth11, so a set piece to keep the map interesting:
      return <path class="fill-[var(--roomHintColor)]" d={crossoverPathD} />;
    case "arrowLeft":
      return (
        <path
          class="stroke-[var(--roomHintColor)]"
          strokeWidth={strokeWidth * 2}
          d={arrowLeftPathD}
        />
      );
    case "divideAlongY":
      return (
        <path
          class="fill-[var(--roomHintColor)]"
          strokeWidth={1}
          d={divideAlongYPathD}
        />
      );
    default:
      return decoration satisfies never;
  }
};
