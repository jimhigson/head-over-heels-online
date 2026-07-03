import clsx from "clsx";
import { type ComponentChildren } from "preact";
import { useCallback, useEffect, useId, useRef, useState } from "preact/hooks";

import { type ExportedSoundId } from "../_generated/sfxdex/sfx";
import { PlayAudio } from "../utils/sound/PlayAudio";
import { twClass } from "../utils/twClass";
import { cn } from "./cn";
import { enhanceTooltipWithHotkeys } from "./enhanceTooltipWithHotkeys";
import { getSwitchPaddedLabels, paddingChar } from "./getSwitchPaddedLabels";
import { Tooltip } from "./tooltip/Tooltip";
import { type ShortcutKeys, useKeyboardShortcut } from "./useKeyboardShortcut";

const uiSoundVolume = 0.3;

const SwitchLabel = ({
  label,
  htmlFor,
}: {
  label: ComponentChildren;
  htmlFor: string;
}) =>
  typeof label === "string" ?
    <label
      htmlFor={htmlFor}
      class="inline-block mr-1 text-lightGrey py-half whitespace-nowrap text-single-line"
    >
      {label}
    </label>
  : <label htmlFor={htmlFor} class="inline-block mr-1 py-half">
      {label}
    </label>;

type OnSwitchChange = (newValue: boolean, e?: MouseEvent) => void;

export type SwitchProps = {
  value: boolean;
  class?: string;
  onChange?: OnSwitchChange;
  trueLabel?: string;
  falseLabel?: string;
  label?: ComponentChildren;
  shortcutKeys?: ShortcutKeys | undefined;
  tooltipContent?: ComponentChildren;
  /**
   * stable accessible name describing the switch's purpose; the on/off state is
   * exposed separately via aria-checked. Without it the name falls back to the
   * value text (the visible label is not programmatically associated)
   */
  ariaLabel?: string;
  /** fuller description of what the switch is for, via aria-description */
  ariaDescription?: string;
};

export const Switch = ({
  class: className,
  value,
  onChange,
  trueLabel = "ON",
  falseLabel = "OFF",
  label,
  shortcutKeys,
  tooltipContent,
  ariaLabel,
  ariaDescription,
}: SwitchProps) => {
  const switchId = useId();
  const labelLength = Math.max(trueLabel.length, falseLabel.length) + 1;
  const trueLabelPadded = trueLabel.padStart(labelLength, paddingChar);
  const falseLabelPadded = falseLabel.padEnd(labelLength, paddingChar);

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
      class={cn("inline-flex justify-between leading-none", className)}
    >
      {hasChanged && (
        <PlayAudio
          soundId={value ? "setting1" : "setting0"}
          volume={uiSoundVolume}
          key={`${value}`}
        />
      )}
      {label && <SwitchLabel label={label} htmlFor={switchId} />}
      <span
        id={switchId}
        role="switch"
        aria-checked={value}
        aria-label={ariaLabel}
        aria-description={ariaDescription}
        class={clsx(
          "inline-block w-min h-min py-half px-half uppercase whitespace-pre text-single-line",
          value ?
            "bg-shadowHalfbrite text-moss zx:bg-zxBlack zx:text-zxGreen toppy:bg-toppyGrey3 toppy:text-toppyCool2"
          : "bg-redShadowHalfbrite text-midRed zx:bg-zxBlack zx:text-zxRed toppy:bg-toppyGrey3 toppy:text-toppyPink2",
        )}
      >
        {value ? trueLabelPadded : falseLabelPadded}
      </span>
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
  class?: string;
  onChange?: (newValue: TValue, e?: MouseEvent) => void;
  values: readonly TValue[];
  valueLabels?: readonly string[];
  label?: ComponentChildren;
  shortcutKeys?: ShortcutKeys | undefined;
  tooltipContent?: ComponentChildren;
  /** stable accessible name describing the control's purpose; the current value
   * is appended since this is multi-value (no binary aria-checked applies) */
  ariaLabel?: string;
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

const settingSoundIds = [
  "setting0",
  "setting1",
  "setting2",
  "setting3",
] as const satisfies readonly ExportedSoundId[];

export const SwitchN = <TValue extends number | string>({
  class: className,
  value,
  onChange,
  values,
  valueLabels = values.map((v) => `${v}`),
  label,
  shortcutKeys,
  tooltipContent,
  ariaLabel,
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
      class={cn("inline-flex justify-between leading-none", className)}
    >
      {hasChanged && !notFound && (
        <PlayAudio
          soundId={settingSoundIds[valueIndex % settingSoundIds.length]}
          volume={uiSoundVolume}
          key={`${value}`}
        />
      )}
      {label && <SwitchLabel label={label} htmlFor={switchId} />}
      <span
        id={switchId}
        role="switch"
        aria-label={
          ariaLabel === undefined ? undefined : (
            `${ariaLabel}: ${notFound ? value : valueLabels[valueIndex]}`
          )
        }
        class={clsx(
          "inline-block w-min h-min py-half px-half uppercase whitespace-pre text-single-line",
          notFound ? switchNErrorColours : (
            (switchNColours[colorIndex] ?? switchNColours[0])
          ),
        )}
      >
        {notFound ? `${value}` : paddedLabels[valueIndex]}
      </span>
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
  class?: string;
  onChange?: (newValue: TValue, e?: MouseEvent) => void;
  values: Readonly<[TValue, TValue, TValue]>;
  valueLabels?: Readonly<[string, string, string]>;
  label?: string;
  shortcutKeys?: ShortcutKeys | undefined;
  tooltipContent?: ComponentChildren;
  /** stable accessible name describing the control's purpose */
  ariaLabel?: string;
};

export const Switch3 = <TValue extends number | string>(
  props: Switch3Props<TValue>,
) => <SwitchN {...props} />;
