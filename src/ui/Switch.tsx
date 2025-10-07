import clsx from "clsx";
import { type MouseEvent, type ReactNode, useCallback } from "react";

import { twClass } from "../editor/twClass";
import { BitmapText } from "../game/components/tailwindSprites/Sprite";
import { cn } from "./cn";
import { getSwitchPaddedLabels } from "./getSwitchPaddedLabels";
import { enhanceTooltipWithHotkeys } from "./hotkeyTooltip";
import { Tooltip } from "./Tooltip";
import { type ShortcutKeys, useKeyboardShortcut } from "./useKeyboardShortcut";

const SwitchLabel = ({ label }: { label: string }) => (
  <BitmapText className="inline-block mr-1 text-lightGrey py-half" noSlitWords>
    {label}
  </BitmapText>
);

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
      className={cn("inline-flex justify-between leading-none", className)}
    >
      {label && <SwitchLabel label={label} />}
      <BitmapText
        role="switch"
        className={clsx(
          "inline-block w-min h-min py-half px-half sprites-uppercase",
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

export type SwitchNProps<TValue extends number | string> = {
  value: TValue;
  className?: string;
  onChange?: (newValue: TValue, e?: MouseEvent<HTMLElement>) => void;
  values: readonly TValue[];
  valueLabels?: readonly string[];
  label?: string;
  shortcutKeys?: ShortcutKeys | undefined;
  tooltipContent?: ReactNode;
};

const switchNColours = twClass([
  "bg-redShadowHalfbrite text-highlightBeige zx:bg-zxBlack zx:text-zxGreen",
  "bg-metallicBlueHalfbrite text-pastelBlue zx:bg-zxBlack zx:text-zxBlue",
  "bg-pinkHalfbrite text-pink zx:bg-zxBlack zx:text-zxYellow",
  "bg-redShadowHalfbrite text-midRed zx:bg-zxBlack zx:text-zxRed",
]);

export const SwitchN = <TValue extends number | string>({
  className,
  value,
  onChange,
  values,
  valueLabels = values.map((v) => `${v}`),
  label,
  shortcutKeys,
  tooltipContent,
}: SwitchNProps<TValue>) => {
  const valueIndex = values.indexOf(value);
  const numValues = values.length;

  const goToNextValue = useCallback(() => {
    const nextIndex = (valueIndex + 1) % numValues;
    onChange?.(values[nextIndex], undefined);
  }, [onChange, valueIndex, values, numValues]);

  useKeyboardShortcut(shortcutKeys, false, () => {
    goToNextValue();
  });

  // Get all padded labels
  const paddedLabels = getSwitchPaddedLabels(valueLabels);

  // Cycle through colors for 4+ options
  const colorIndex = numValues > 4 ? valueIndex % 4 : valueIndex;

  const element = (
    <span
      onClick={goToNextValue}
      className={cn("inline-flex justify-between leading-none", className)}
    >
      {label && <SwitchLabel label={label} />}
      <BitmapText
        role="switch"
        className={clsx(
          "inline-block w-min h-min py-half px-half sprites-uppercase",
          switchNColours[colorIndex] ?? switchNColours[0],
        )}
        noSlitWords
      >
        {paddedLabels[valueIndex]}
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

// Backwards compatibility: Switch3 as a wrapper around SwitchN
export type Switch3Props<TValue extends number | string> = {
  value: TValue;
  className?: string;
  onChange?: (newValue: TValue, e?: MouseEvent<HTMLElement>) => void;
  values: Readonly<[TValue, TValue, TValue]>;
  valueLabels?: Readonly<[string, string, string]>;
  label?: string;
  shortcutKeys?: ShortcutKeys | undefined;
  tooltipContent?: ReactNode;
};

export const Switch3 = <TValue extends number | string>(
  props: Switch3Props<TValue>,
) => <SwitchN {...props} />;
