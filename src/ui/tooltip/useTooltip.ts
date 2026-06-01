import {
  autoUpdate,
  flip,
  offset,
  type Placement,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import { useState } from "preact/hooks";

export type UseTooltipOptions = {
  tooltipOffset?: number;
  tooltipPlacement?: Placement;
};

export const useTooltip = ({
  tooltipOffset = 0,
  tooltipPlacement = "bottom-end",
}: UseTooltipOptions = {}) => {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: tooltipPlacement,
    whileElementsMounted: autoUpdate,
    middleware: [offset(tooltipOffset), flip(), shift()],
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useHover(context, { delay: { open: 450, close: 0 } }),
    useFocus(context),
    useDismiss(context),
    useRole(context, { role: "tooltip" }),
  ]);

  return { refs, floatingStyles, isOpen, getReferenceProps, getFloatingProps };
};
