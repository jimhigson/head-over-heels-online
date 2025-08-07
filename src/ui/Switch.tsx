import clsx from "clsx";
import { BitmapText } from "../game/components/tailwindSprites/Sprite";
import { useCallback, type MouseEvent, type ReactNode } from "react";
import { cn } from "./cn";
import { useKeyboardShortcut, type ShortcutKeys } from "./useKeyboardShortcut";
import { Tooltip } from "./Tooltip";
import { enhanceTooltipWithHotkeys } from "./hotkeyTooltip";

export type SwitchProps = {
  value: boolean;
  className?: string;
  onChange?: (newValue: boolean, e?: MouseEvent<HTMLElement>) => void;
  trueLabel?: string;
  falseLabel?: string;
  label?: string;
  shortcutKeys?: ShortcutKeys | undefined;
  tooltipContent?: ReactNode;
};

export const Switch = ({
  className,
  value,
  onChange,
  trueLabel = "ON",
  falseLabel = "OFF",
  label,
  shortcutKeys,
  tooltipContent,
}: SwitchProps) => {
  const labelLength = Math.max(trueLabel.length, falseLabel.length) + 1;
  const trueLabelPadded = trueLabel.padStart(labelLength, " ");
  const falseLabelPadded = falseLabel.padEnd(labelLength, " ");

  useKeyboardShortcut(shortcutKeys, false, () => {
    onChange?.(!value, undefined);
  });

  const element = (
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

  const finalTooltipContent =
    enhanceTooltipWithHotkeys(
      typeof tooltipContent === "string" ? tooltipContent : undefined,
      shortcutKeys,
    ) ?? tooltipContent;

  return (
    <Tooltip triggerContent={element} tooltipContent={finalTooltipContent} />
  );
};

export type Switch3Props<TValue extends string | number> = {
  value: TValue;
  className?: string;
  onChange?: (newValue: TValue, e?: MouseEvent<HTMLElement>) => void;
  values: Readonly<[TValue, TValue, TValue]>;
  valueLabels?: Readonly<[string, string, string]>;
  label?: string;
  shortcutKeys?: ShortcutKeys | undefined;
  tooltipContent?: ReactNode;
};

export const Switch3 = <TValue extends string | number>({
  className,
  value,
  onChange,
  values,
  valueLabels = [`${values[0]}`, `${values[1]}`, `${values[2]}`],
  label,
  shortcutKeys,
  tooltipContent,
}: Switch3Props<TValue>) => {
  const valueIndex = values.indexOf(value);

  const labelLength =
    Math.max(
      valueLabels[0].length,
      valueLabels[1].length + 2,
      valueLabels[2].length,
    ) + 1;

  const goToNextValue = useCallback(() => {
    const nextIndex = (valueIndex + 1) % 3;
    onChange?.(values[nextIndex], undefined);
  }, [onChange, valueIndex, values]);

  useKeyboardShortcut(shortcutKeys, false, () => {
    goToNextValue();
  });

  const element = (
    <span
      onClick={goToNextValue}
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
          valueIndex === 0 ?
            "bg-redShadowHalfbrite text-highlightBeige zx:bg-zxBlack zx:text-zxGreen"
          : valueIndex === 1 ?
            "bg-metallicBlueHalfbrite text-pastelBlue zx:bg-zxBlack zx:text-zxBlue"
          : "bg-pinkHalfbrite text-pink zx:bg-zxBlack zx:text-zxRed",
        )}
        noSlitWords
      >
        {valueIndex === 0 ?
          valueLabels[0].padEnd(labelLength, " ")
        : valueIndex === 1 ?
          valueLabels[1]
            .padStart(Math.ceil((labelLength + valueLabels[1].length) / 2), " ")
            .padEnd(labelLength, " ")
        : valueLabels[2].padStart(labelLength, " ")}
      </BitmapText>
    </span>
  );

  const finalTooltipContent =
    enhanceTooltipWithHotkeys(
      typeof tooltipContent === "string" ? tooltipContent : undefined,
      shortcutKeys,
    ) ?? tooltipContent;

  return (
    <Tooltip triggerContent={element} tooltipContent={finalTooltipContent} />
  );
};
