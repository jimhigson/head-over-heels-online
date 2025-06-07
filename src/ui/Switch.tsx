import clsx from "clsx";
import { BitmapText } from "../game/components/tailwindSprites/Sprite";
import type { MouseEvent } from "react";

export type SwitchProps = {
  value: boolean;
  className?: string;
  onClick?: (e: MouseEvent<HTMLElement>, newValue: boolean) => void;
  trueLabel?: string;
  falseLabel?: string;
};

export const Switch = ({
  className,
  value,
  onClick,
  trueLabel = "ON",
  falseLabel = "OFF",
}: SwitchProps) => {
  const labelLength = Math.max(trueLabel.length, falseLabel.length) + 1;
  const trueLabelPadded = trueLabel.padStart(labelLength, " ");
  const falseLabelPadded = falseLabel.padEnd(labelLength, " ");

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
      {value ? trueLabelPadded : falseLabelPadded}
    </BitmapText>
  );
};
