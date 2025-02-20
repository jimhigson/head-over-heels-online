import clsx from "clsx";
import { BitmapText } from "../../game/components/Sprite";
import type { MouseEvent } from "react";

export const Switch = ({
  className,
  value,
  onClick,
}: {
  value: boolean;
  className?: string;
  onClick?: (e: MouseEvent<HTMLElement>, newValue: boolean) => void;
}) => {
  return (
    <BitmapText
      onClick={(e) => onClick?.(e, !value)}
      className={clsx(
        "inline-block w-min h-min",
        value ?
          "bg-shadowHalfbrite text-moss zx:bg-zxBlack zx:text-zxGreen"
        : "bg-redShadowHalfbrite text-midRed zx:bg-zxBlack zx:text-zxRed",
        className,
      )}
      noSlitWords
    >
      {value ? "  ON" : "OFF "}
    </BitmapText>
  );
};
