import clsx from "clsx";
import { BitmapText } from "../game/components/tailwindSprites/Sprite";
import type { MouseEvent } from "react";
import { cn } from "./cn";
import { useKeyboardShortcut, type ShortcutKeys } from "./useKeyboardShortcut";

export type SwitchProps = {
  value: boolean;
  className?: string;
  onChange?: (newValue: boolean, e?: MouseEvent<HTMLElement>) => void;
  trueLabel?: string;
  falseLabel?: string;
  label?: string;
  shortcutKeys?: ShortcutKeys | undefined;
};

export const Switch = ({
  className,
  value,
  onChange,
  trueLabel = "ON",
  falseLabel = "OFF",
  label,
  shortcutKeys,
}: SwitchProps) => {
  const labelLength = Math.max(trueLabel.length, falseLabel.length) + 1;
  const trueLabelPadded = trueLabel.padStart(labelLength, " ");
  const falseLabelPadded = falseLabel.padEnd(labelLength, " ");

  useKeyboardShortcut(shortcutKeys, false, () => {
    onChange?.(!value, undefined);
  });

  return (
    <span
      onClick={(e) => onChange?.(!value, e)}
      className={cn("inline-flex justify-between", className)}
    >
      {label && (
        <BitmapText className="inline-block mr-1 text-lightGrey" noSlitWords>
          {label}
        </BitmapText>
      )}
      <BitmapText
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
