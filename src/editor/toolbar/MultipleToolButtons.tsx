import { cloneElement, type VNode } from "preact";
import { useRef, useState } from "preact/hooks";

import { useMouseWheelOptions } from "../../ui/useMouseWheel";
import { type CommandToolbarButtonProps } from "../commands/CommandToolbarButton";
import { MenuButton } from "./buttons/MenuButton";

export interface MultipleToolButtonsProps {
  children: VNode<Pick<CommandToolbarButtonProps, "onClick">>[];
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
    <MenuButton main={selectedChild} ref={wheelElementRef}>
      {children.map((child, index) => {
        if (index === buttonIndex) {
          return null; // Skip the currently selected button
        }
        return (
          <div
            key={index}
            class="leading-none"
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
