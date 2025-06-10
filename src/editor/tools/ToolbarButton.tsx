import { Button } from "../../ui/button";

import type { PropsWithChildren } from "react";

type ToolbarButtonProps = {
  onClick: () => void;
  className?: string;
  isCurrentTool?: boolean;
  disabled?: boolean;
};

// want to fit into the block grid with an outline, so 3blocks minus one (scales) pixel
const buttonSizeClassNames =
  "h-[calc(3*var(--block)-1px*var(--scale))] w-[calc(3*var(--block)-1px*var(--scale))]";

export const ToolbarButton = ({
  className,
  onClick,
  children,
  disabled = false,
  isCurrentTool = false,
}: PropsWithChildren<ToolbarButtonProps>) => {
  return (
    <Button
      disabled={disabled}
      data-iscurrenttool={isCurrentTool}
      className={`active:pt-oneScaledPix ${buttonSizeClassNames} gap-0 inline-flex overflow-hidden ${isCurrentTool ? "bg-pastelBlue" : ""} ${disabled ? "bg-midGrey text-lightGrey" : ""} ${className ?? ""}`}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};
