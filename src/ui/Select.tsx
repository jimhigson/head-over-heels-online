import { type ComponentChildren } from "preact";
import { type CSSProperties, type FC } from "preact/compat";
import { useId, useRef, useState } from "preact/hooks";

import { emptyObject } from "../utils/empty";
import { Button } from "./Button";
import { cn } from "./cn";
import { Command } from "./command/Command";
import { CommandEmpty } from "./command/CommandEmpty";
import { CommandGroup } from "./command/CommandGroup";
import { CommandInput } from "./command/CommandInput";
import { CommandItem } from "./command/CommandItem";
import { CommandList } from "./command/CommandList";
import { CommandMatch } from "./command/CommandMatch";
import { PopoverPanel } from "./PopoverPanel";
import { useMouseWheelOptions } from "./useMouseWheel";

type OptionCommandItemComponent<Value extends string> = FC<{
  itemValue: Value;
  currentValue: undefined | Value;
  onSelect: (value: string) => void;
  valueDisplayFormat?: (value: Value) => string;
}>;

export type SelectProps<Value extends string> = {
  /** undefined if no value is selected */
  value: undefined | Value;
  values: Readonly<Value[]>;
  OptionCommandItem?: OptionCommandItemComponent<Value>;
  triggerButtonClassName?: string;
  triggerButtonStyle?: CSSProperties;
  triggerButtonLabel?: ComponentChildren;
  onSelect: (value: Value) => void;
  tooltipContent?: ComponentChildren;
  valueDisplayFormat?: (value: Value) => string;
} & (
  | {
      disableCommandInput: true;
    }
  | {
      disableCommandInput?: false | undefined;
      placeholder: string;
    }
);

const DefaultOptionCommandItem: OptionCommandItemComponent<string> = ({
  itemValue: value,
  onSelect,
  valueDisplayFormat = (value) => value,
}) => {
  return (
    <CommandItem value={value} onSelect={onSelect} class="px-1">
      <CommandMatch text={valueDisplayFormat(value)} />
    </CommandItem>
  );
};

export const Select = <Value extends string>(props: SelectProps<Value>) => {
  const {
    value,
    values,
    onSelect,
    triggerButtonClassName = "",
    triggerButtonStyle = emptyObject,
    triggerButtonLabel = "",
    OptionCommandItem = DefaultOptionCommandItem as OptionCommandItemComponent<Value>,
    tooltipContent,
    valueDisplayFormat,
  } = props;

  const [open, setOpen] = useState(false);
  const popoverId = useId();

  const wheelElementRef = useRef<HTMLButtonElement | null>(null);
  useMouseWheelOptions(
    wheelElementRef,
    values,
    (value) => {
      onSelect(value);
    },
    !open,
  );

  return (
    <>
      <Button
        class={cn(
          `h-2 px-1 flex flex-row gap-1 justify-start leading-none`,
          triggerButtonClassName,
        )}
        style={triggerButtonStyle}
        ref={wheelElementRef}
        popovertarget={popoverId}
        tooltipContent={!open && tooltipContent}
      >
        {typeof triggerButtonLabel === "string" ?
          <span class="grow overflow-hidden text-left text-single-line">
            {triggerButtonLabel}
          </span>
        : triggerButtonLabel}
        <span class="grow-0 text-single-line">{open ? "X" : "⬇"}</span>
      </Button>
      <PopoverPanel id={popoverId} open={open} onOpenChange={setOpen}>
        <Command defaultValue={value} class="w-full">
          {props.disableCommandInput === true ? null : (
            <CommandInput autoFocus placeholder={props.placeholder} />
          )}
          <CommandList>
            <CommandEmpty>
              <span>Nothing found</span>
            </CommandEmpty>
            <CommandGroup>
              {values.map((itemValue) => (
                <OptionCommandItem
                  key={itemValue}
                  itemValue={itemValue}
                  currentValue={value}
                  onSelect={(newValue) => {
                    setOpen(false);
                    onSelect(newValue as Value);
                  }}
                  valueDisplayFormat={valueDisplayFormat}
                />
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverPanel>
    </>
  );
};
