import type { WheelEvent, CSSProperties, FC, ReactNode } from "react";
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
import normalizeWheel from "normalize-wheel-es";

type OptionCommandItemComponent<Value extends string> = FC<{
  value: Value;
  onSelect: (value: string) => void;
}>;

export type SelectProps<Value extends string> = {
  value: Value;
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
  <CommandItem value={value} onSelect={onSelect}>
    <BitmapText>{value}</BitmapText>
  </CommandItem>
);

export const Select = <Value extends string>(props: SelectProps<Value>) => {
  const {
    value,
    values,
    onSelect,
    triggerButtonClassName = "",
    triggerButtonStyle = emptyObject,
    triggerButtonLabel = "",
    OptionCommandItem = DefaultOptionCommandItem as OptionCommandItemComponent<Value>,
  } = props;

  const [open, setOpen] = useState(false);
  const wheelY = useRef(0);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          className={`h-2 px-1 justify-between ${triggerButtonClassName} gap-1`}
          style={triggerButtonStyle}
          onWheel={(e: WheelEvent<HTMLButtonElement>) => {
            const norm = normalizeWheel(e.nativeEvent);

            wheelY.current -= norm.spinY;

            if (wheelY.current >= 1 || wheelY.current <= -1) {
              // find currently selected item's index:
              const curIdx = values.indexOf(value);
              const newIndex =
                (Math.round(curIdx + wheelY.current) + 99 * values.length) %
                values.length;
              const newValue = values[newIndex];
              onSelect(newValue);
              wheelY.current = 0;
            }
          }}
        >
          {triggerButtonLabel}
          <BitmapText className="ml-half shrink-0">
            {open ? "X" : "⬇"}
          </BitmapText>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 z-popups">
        <CssVariables scaleFactor={1}>
          <Command className="w-[--radix-popper-anchor-width]">
            {props.disableCommandInput === true ? null : (
              <CommandInput placeholder={props.placeholder} />
            )}
            <CommandList>
              <CommandEmpty>No room found</CommandEmpty>
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
