import { BitmapText } from "../../../tailwindSprites/BitmapText";

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
        `col-start-1 ` +
        // min width and mx-auto centers, in case is sharing a menu with wider, custom leaders:
        `w-min ml-auto ` +
        (flip ? "scale-x-[-1] relative bottom-oneScaledPix " : "") +
        // inline-block and flex both set `display`; keep them mutually exclusive so the
        // centring doesn't depend on tailwind's utility ordering (v4 emits inline-block
        // after flex, so carrying both would let inline-block win and defeat items-center)
        (verticalAlignItemsCentre === true ?
          "flex items-center h-3"
        : "inline-block")
      }
    >
      {focussed ? "⏩⏩" : "⁌⁍"}
    </BitmapText>
  );
};
