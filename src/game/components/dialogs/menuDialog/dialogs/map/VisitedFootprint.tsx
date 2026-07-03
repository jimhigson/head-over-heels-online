import { projectWorldXyzToScreenXy } from "../../../../../render/projections";
import { roomWorldPosition } from "./roomWorldPosition";

const dotSize = 0.15;
const roomCentreScreenXy = projectWorldXyzToScreenXy(
  roomWorldPosition({
    x: 0.5,
    y: 0.5,
    z: 0,
  }),
);

const spotXy = projectWorldXyzToScreenXy(
  roomWorldPosition({
    x: dotSize,
    y: 0,
    z: 0,
  }),
);
const spotBgXy = projectWorldXyzToScreenXy(
  roomWorldPosition({
    x: dotSize * 1.66,
    y: 0,
    z: 0,
  }),
);

export const VisitedFootprint = ({ class: className }: { class: string }) => {
  return (
    <>
      <ellipse
        class={"fill-white"}
        cx={roomCentreScreenXy.x}
        cy={roomCentreScreenXy.y}
        rx={Math.abs(spotBgXy.x)}
        ry={Math.abs(spotBgXy.y)}
      />
      <ellipse
        class={className}
        cx={roomCentreScreenXy.x}
        cy={roomCentreScreenXy.y}
        rx={Math.abs(spotXy.x)}
        ry={Math.abs(spotXy.y)}
      />
    </>
  );
};
