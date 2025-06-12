import { Button } from "../../ui/button";

import type { PropsWithChildren } from "react";
import { buttonSizeClassNames } from "./buttonSizeClassNames";

type ToolbarButtonProps = {
  onClick: () => void;
  className?: string;
  isCurrentTool?: boolean;
  disabled?: boolean;
};

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
