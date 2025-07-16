import { BitmapText } from "../../game/components/tailwindSprites/Sprite";
import { ToolbarButton } from "./ToolbarButton";

export const MapButton = () => {
  return (
    <ToolbarButton>
      <BitmapText className="relative leading-none">MAP</BitmapText>
    </ToolbarButton>
  );
};
