import { BitmapText } from "../../../Sprite";

export const MenuItemLeader = ({
  flip = false,
  focussed = false,
}: {
  flip?: boolean;
  focussed?: boolean;
}) => {
  return (
    <BitmapText
      // bring flipped up one px because there is a gap at the bottom of the sprite:
      className={`inline-block col-start-1 ${flip ? "scale-[-1] relative bottom-oneScaledPix" : ""}`}
    >
      {focussed ? "⏩⏩" : "⁌⁍"}
    </BitmapText>
  );
};
