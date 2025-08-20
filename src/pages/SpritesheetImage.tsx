import spritesheetUrl from "../../gfx/sprites.png";

export const SpritesheetImage = () => {
  return (
    <img
      src={spritesheetUrl}
      className="w-full cursor-crosshair [background:repeating-conic-gradient(#999_0_25%,_#888_0_50%)_50%_/_20px_20px] pixelated"
    />
  );
};
