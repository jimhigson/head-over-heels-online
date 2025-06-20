import clsx from "clsx";
import { BitmapText } from "../game/components/tailwindSprites/Sprite";
import type { MouseEvent } from "react";
import { cn } from "./cn";

export type SwitchProps = {
  value: boolean;
  className?: string;
  onClick?: (e: MouseEvent<HTMLElement>, newValue: boolean) => void;
  trueLabel?: string;
  falseLabel?: string;
  label?: string;
};

export const Switch = ({
  className,
  value,
  onClick,
  trueLabel = "ON",
  falseLabel = "OFF",
  label,
}: SwitchProps) => {
  const labelLength = Math.max(trueLabel.length, falseLabel.length) + 1;
  const trueLabelPadded = trueLabel.padStart(labelLength, " ");
  const falseLabelPadded = falseLabel.padEnd(labelLength, " ");

  return (
    <span className={cn("inline-flex justify-between", className)}>
      {label && (
        <BitmapText className="inline-block mr-1 text-lightGrey" noSlitWords>
          {label}
        </BitmapText>
      )}
      <BitmapText
        onClick={(e) => onClick?.(e, !value)}
        className={clsx(
          "inline-block w-min h-min",
          value ?
            "bg-shadowHalfbrite text-moss zx:bg-zxBlack zx:text-zxGreen"
          : "bg-redShadowHalfbrite text-midRed zx:bg-zxBlack zx:text-zxRed",
        )}
        noSlitWords
      >
        {value ? trueLabelPadded : falseLabelPadded}
      </BitmapText>
    </span>
  );
};
