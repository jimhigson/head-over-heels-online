import { useRef, useState } from "preact/hooks";
import { type CSSProperties, type FC, type ReactNode } from "react";

import { BitmapText } from "../game/components/tailwindSprites/BitmapText";
import { emptyObject } from "../utils/empty";
import { Button } from "./Button";
import { cn } from "./cn";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { Popover } from "./Popover";
import { useMouseWheelOptions } from "./useMouseWheel";

type OptionCommandItemComponent<Value extends string> = FC<{
  value: Value;
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
  triggerButtonLabel?: ReactNode;
  onSelect: (value: Value) => void;
  tooltipContent?: ReactNode;
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
  value,
  onSelect,
  valueDisplayFormat = (value) => value,
}) => {
  return (
    <CommandItem value={value} onSelect={onSelect} className="px-1">
      <BitmapText>{valueDisplayFormat(value)}</BitmapText>
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
    <Popover
      open={open}
      onOpenChange={setOpen}
      trigger={
        <Button
          className={cn(
            `h-2 px-1 flex flex-row gap-1 justify-start leading-none`,
            triggerButtonClassName,
          )}
          style={triggerButtonStyle}
          ref={wheelElementRef}
          tooltipContent={!open && tooltipContent}
        >
          {typeof triggerButtonLabel === "string" ?
            <BitmapText className="grow overflow-hidden text-left">
              {triggerButtonLabel}
            </BitmapText>
          : triggerButtonLabel}
          <BitmapText className="grow-0">{open ? "X" : "⬇"}</BitmapText>
        </Button>
      }
      contents={
        <Command value={value} className="w-[--popover-anchor-width]">
          {props.disableCommandInput === true ? null : (
            <CommandInput placeholder={props.placeholder} />
          )}
          <CommandList>
            <CommandEmpty>
              <BitmapText>Nothing found</BitmapText>
            </CommandEmpty>
            <CommandGroup>
              {values.map((value) => (
                <OptionCommandItem
                  key={value}
                  value={value}
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
      }
    />
  );
};
