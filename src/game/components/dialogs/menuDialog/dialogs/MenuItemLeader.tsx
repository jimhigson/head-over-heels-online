import { BitmapText } from "../../../tailwindSprites/Sprite";

export const MenuItemLeader = ({
  flip = false,
  focussed = false,
  verticalAlignItemsCentre = false,
}: {
  flip?: boolean;
  focussed?: boolean;
  verticalAlignItemsCentre?: boolean;
}) => {
  return (
    <BitmapText
      // bring flipped up one px because there is a gap at the bottom of the sprite:
      className={
        `inline-block col-start-1 ` +
        // min width and mx-auto centers, in case is sharing a menu with wider, custom leaders:
        `w-min ml-auto ` +
        (flip ? "scale-x-[-1] relative bottom-oneScaledPix" : "") +
        (verticalAlignItemsCentre === true ? "flex items-center h-3" : "")
      }
    >
      {focussed ? "⏩⏩" : "⁌⁍"}
    </BitmapText>
  );
};
