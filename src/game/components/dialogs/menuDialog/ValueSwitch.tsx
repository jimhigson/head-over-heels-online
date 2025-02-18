import clsx from "clsx";
import { BitmapText } from "../../Sprite";

export const ValueSwitch = ({
  className,
  value,
}: {
  value: boolean;
  className?: string;
}) => {
  return (
    <div>
      <BitmapText
        className={clsx(
          "inline-block",
          value ?
            "bg-shadowHalfbrite text-moss zx:bg-zxBlack zx:text-zxGreen"
          : "bg-redShadowHalfbrite text-midRed zx:bg-zxBlack zx:text-zxRed",
          className,
        )}
        noSlitWords
      >
        {value ? "  ON" : "OFF "}
      </BitmapText>
    </div>
  );
};
