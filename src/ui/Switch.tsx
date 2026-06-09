import clsx from "clsx";
import { useCallback, useEffect, useId, useRef, useState } from "preact/hooks";
import { type MouseEvent, type ReactNode } from "react";

import { exportedSfxUrls } from "../_generated/sfxdex/sfx";
import { BitmapText } from "../game/components/tailwindSprites/BitmapText";
import { twClass } from "../utils/twClass";
import { cn } from "./cn";
import { enhanceTooltipWithHotkeys } from "./enhanceTooltipWithHotkeys";
import { getSwitchPaddedLabels } from "./getSwitchPaddedLabels";
import { Tooltip } from "./tooltip/Tooltip";
import { type ShortcutKeys, useKeyboardShortcut } from "./useKeyboardShortcut";

const uiSoundVolume = 0.3;

const SwitchLabel = ({
  label,
  htmlFor,
}: {
  label: ReactNode;
  htmlFor: string;
}) =>
  typeof label === "string" ?
    <BitmapText
      TagName="label"
      htmlFor={htmlFor}
      className="inline-block mr-1 text-lightGrey py-half"
      noSlitWords
    >
      {label}
    </BitmapText>
  : <label htmlFor={htmlFor} className="inline-block mr-1 py-half">
      {label}
    </label>;

type OnSwitchChange = (newValue: boolean, e?: MouseEvent) => void;

export type SwitchProps = {
  value: boolean;
  className?: string;
  onChange?: OnSwitchChange;
  trueLabel?: string;
  falseLabel?: string;
  label?: ReactNode;
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
  const switchId = useId();
  const labelLength = Math.max(trueLabel.length, falseLabel.length) + 1;
  const trueLabelPadded = trueLabel.padStart(labelLength, " ");
  const falseLabelPadded = falseLabel.padEnd(labelLength, " ");

  const prevValueRef = useRef(value);
  const [hasChanged, setHasChanged] = useState(false);

  useEffect(() => {
    if (prevValueRef.current !== value) {
      setHasChanged(true);
    }
    prevValueRef.current = value;
  }, [value]);

  useKeyboardShortcut(shortcutKeys, false, () => {
    onChange?.(!value, undefined);
  });

  const element = (
    <span
      onClick={(e) => onChange?.(!value, e)}
      className={cn("inline-flex justify-between leading-none", className)}
    >
      {hasChanged && (
        <audio
          src={value ? exportedSfxUrls.setting1 : exportedSfxUrls.setting0}
          key={`${value}`}
          autoPlay
          ref={(el) => {
            if (el) {
              el.volume = uiSoundVolume;
            }
          }}
        />
      )}
      {label && <SwitchLabel label={label} htmlFor={switchId} />}
      <BitmapText
        id={switchId}
        role="switch"
        className={clsx(
          "inline-block w-min h-min py-half px-half sprites-uppercase",
          value ?
            "bg-shadowHalfbrite text-moss zx:bg-zxBlack zx:text-zxGreen toppy:bg-toppyGrey3 toppy:text-toppyCool2"
          : "bg-redShadowHalfbrite text-midRed zx:bg-zxBlack zx:text-zxRed toppy:bg-toppyGrey3 toppy:text-toppyPink2",
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
  onChange?: (newValue: TValue, e?: MouseEvent) => void;
  values: readonly TValue[];
  valueLabels?: readonly string[];
  label?: ReactNode;
  shortcutKeys?: ShortcutKeys | undefined;
  tooltipContent?: ReactNode;
};

const switchNColours = twClass([
  "bg-redShadowHalfbrite text-highlightBeige zx:bg-zxBlack zx:text-zxGreen toppy:bg-toppyGrey3 toppy:text-toppyCool2",
  "bg-metallicBlueHalfbrite text-pastelBlue zx:bg-zxBlack zx:text-zxBlue toppy:bg-toppyGrey3 toppy:text-toppyCool3",
  "bg-pinkHalfbrite text-pink zx:bg-zxBlack zx:text-zxYellow toppy:bg-toppyGrey3 toppy:text-toppyWarm3",
  "bg-redShadowHalfbrite text-midRed zx:bg-zxBlack zx:text-zxRed toppy:bg-toppyGrey3 toppy:text-toppyPink2",
]);
const switchNErrorColours = twClass(
  "bg-white text-midRed zx:bg-zxWhite zx:text-zxRed toppy:bg-toppyGrey1 toppy:text-toppyPink2",
);

const settingSounds = [
  exportedSfxUrls.setting0,
  exportedSfxUrls.setting1,
  exportedSfxUrls.setting2,
  exportedSfxUrls.setting3,
] as const;

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
  const switchId = useId();
  const valueIndex = values.indexOf(value);

  const notFound = valueIndex === -1;
  if (notFound) {
    console.error(
      `SwitchN: value ${JSON.stringify(value)} is not in values ${JSON.stringify(values)}`,
    );
  }

  const numValues = values.length;

  const prevValueRef = useRef(value);
  const [hasChanged, setHasChanged] = useState(false);

  useEffect(() => {
    if (prevValueRef.current !== value) {
      setHasChanged(true);
    }
    prevValueRef.current = value;
  }, [value]);

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
      {hasChanged && !notFound && (
        <audio
          src={settingSounds[valueIndex % settingSounds.length]}
          key={`${value}`}
          autoPlay
          ref={(el) => {
            if (el) {
              el.volume = uiSoundVolume;
            }
          }}
        />
      )}
      {label && <SwitchLabel label={label} htmlFor={switchId} />}
      <BitmapText
        id={switchId}
        role="switch"
        className={clsx(
          "inline-block w-min h-min py-half px-half sprites-uppercase",
          notFound ? switchNErrorColours : (
            (switchNColours[colorIndex] ?? switchNColours[0])
          ),
        )}
        noSlitWords
      >
        {notFound ? `${value}` : paddedLabels[valueIndex]}
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
  onChange?: (newValue: TValue, e?: MouseEvent) => void;
  values: Readonly<[TValue, TValue, TValue]>;
  valueLabels?: Readonly<[string, string, string]>;
  label?: string;
  shortcutKeys?: ShortcutKeys | undefined;
  tooltipContent?: ReactNode;
};

export const Switch3 = <TValue extends number | string>(
  props: Switch3Props<TValue>,
) => <SwitchN {...props} />;
