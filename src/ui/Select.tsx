import type { CSSProperties, FC, ReactNode } from "react";
import { useRef, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { CssVariables } from "../game/components/CssVariables";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { Button } from "./button";
import { BitmapText } from "../game/components/tailwindSprites/Sprite";
import { emptyObject } from "../utils/empty";
import { cn } from "./cn";
import { useMouseWheelOptions } from "./useMouseWheel";

type OptionCommandItemComponent<Value extends string> = FC<{
  value: Value;
  onSelect: (value: string) => void;
}>;

export type SelectProps<Value extends string> = {
  /** undefined if no value is selected */
  value: Value | undefined;
  values: Readonly<Value[]>;
  OptionCommandItem?: OptionCommandItemComponent<Value>;
  triggerButtonClassName?: string;
  triggerButtonStyle?: CSSProperties;
  triggerButtonLabel?: ReactNode;
  onSelect: (value: Value) => void;
} & (
  | {
      disableCommandInput: undefined | false;
      placeholder: string;
    }
  | {
      disableCommandInput: true;
    }
);

const DefaultOptionCommandItem: OptionCommandItemComponent<string> = ({
  value,
  onSelect,
}) => (
  <CommandItem value={value} onSelect={onSelect} className="px-1">
    <BitmapText>{value}</BitmapText>
  </CommandItem>
);

export const Select = <Value extends string>(props: SelectProps<Value>) => {
  const {
    values,
    onSelect,
    triggerButtonClassName = "",
    triggerButtonStyle = emptyObject,
    triggerButtonLabel = "",
    OptionCommandItem = DefaultOptionCommandItem as OptionCommandItemComponent<Value>,
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
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          className={cn(
            `h-2 px-1 flex flex-row gap-1 justify-start leading-none`,
            triggerButtonClassName,
          )}
          style={triggerButtonStyle}
          ref={wheelElementRef}
        >
          {typeof triggerButtonLabel === "string" ?
            <BitmapText className="grow overflow-hidden text-left">
              {triggerButtonLabel}
            </BitmapText>
          : triggerButtonLabel}
          <BitmapText className="grow-0">{open ? "X" : "⬇"}</BitmapText>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <CssVariables scaleFactor={2}>
          <Command className="w-[--radix-popper-anchor-width]">
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
                  />
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </CssVariables>
      </PopoverContent>
    </Popover>
  );
};
