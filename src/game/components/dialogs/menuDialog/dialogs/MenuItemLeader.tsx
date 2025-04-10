import { BitmapText } from "../../../tailwindSprites/Sprite";

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
      className={
        `inline-block col-start-1 ` +
        // min width and mx-auto centers, in case is sharing a menu with wider, custom leaders:
        `w-min mx-auto ` +
        (flip ? "scale-[-1] relative bottom-oneScaledPix" : "")
      }
    >
      {focussed ? "⏩⏩" : "⁌⁍"}
    </BitmapText>
  );
};
