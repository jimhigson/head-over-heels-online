import { useTotalUpscale } from "../../../../../../store/selectors";
import { BitmapText } from "../../../../Sprite";
import { mapSvgMargin } from "./mapConstants";

export const MapBackgroundSection = ({
  mapTitle,
  y = 0,
  className,
  textOnly = false,
}: {
  mapTitle: string;
  y?: number;
  className: string;
  textOnly?: boolean;
}) => {
  const scale = useTotalUpscale();
  return (
    <g className={className}>
      {textOnly || <rect y={y} width={10_000} height={10_000} />}
      <foreignObject
        width={scale * (mapTitle.length + 2) * 8}
        height={scale * 16}
        x={mapSvgMargin}
        y={y + mapSvgMargin}
      >
        {/* ml-2 keeps content off the camera notch on phones like iphone x ... 17 ... ? */}
        <BitmapText className="ml-2 sprites-double-height">
          {mapTitle}
        </BitmapText>
      </foreignObject>
    </g>
  );
};
