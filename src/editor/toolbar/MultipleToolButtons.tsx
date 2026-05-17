import { useRef, useState } from "preact/hooks";
import { cloneElement, type ReactElement } from "react";

import { useMouseWheelOptions } from "../../ui/useMouseWheel";
import { MenuButton } from "./buttons/MenuButton";
import { type ToolbarButtonProps } from "./buttons/ToolbarButton";

export interface MultipleToolButtonsProps {
  children: ReactElement<ToolbarButtonProps>[];
}

export const MultipleToolButtons = ({ children }: MultipleToolButtonsProps) => {
  const [buttonIndex, setButtonIndex] = useState(0);
  const wheelElementRef = useRef<HTMLDivElement | null>(null);

  useMouseWheelOptions(
    wheelElementRef,
    children,
    (_newSelectedChild, newChildIndex) => {
      setButtonIndex(newChildIndex);
    },
  );

  const selectedChild = children[buttonIndex];

  return (
    <MenuButton main={selectedChild} closeOnSelect ref={wheelElementRef}>
      {children.map((child, index) => {
        if (index === buttonIndex) {
          return null; // Skip the currently selected button
        }
        return (
          <div
            key={index}
            className="leading-none"
            onClick={() => {
              setButtonIndex(index);
            }}
          >
            {child === null ? null : (
              cloneElement(child, {
                onClick() {
                  setButtonIndex(index);
                  child.props.onClick?.();
                },
              })
            )}
          </div>
        );
      })}
    </MenuButton>
  );
};
