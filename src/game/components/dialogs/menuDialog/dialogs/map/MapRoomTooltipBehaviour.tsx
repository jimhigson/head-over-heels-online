import { useEffect } from "preact/hooks";

import { TooltipFloating } from "../../../../../../ui/tooltip/Tooltip";
import { useTooltip } from "../../../../../../ui/tooltip/useTooltip";
import { type RoomBehaviourProps } from "./RoomDecoratorProps";

const MapRoomTooltipBehaviour = ({
  roomId,
  isCurrentRoom,
  interactiveAreaRef,
}: RoomBehaviourProps<string>) => {
  const { refs, floatingStyles, isOpen, getReferenceProps, getFloatingProps } =
    useTooltip({
      tooltipOffset: isCurrentRoom ? 32 : 0,
      tooltipPlacement: "bottom",
    });

  useEffect(() => {
    const el = interactiveAreaRef.current;
    if (!el) {
      return;
    }

    refs.setReference(el);

    const props = getReferenceProps();
    const keys = Object.keys(props);

    // props is supposed to be spread over a react/preact element, but we only have a ref to a
    // DOM element here, so assign in instead:
    Object.assign(el, props);

    return () => {
      // do our best to clean up, possibly removing stuff we didn't add in case of collisions:
      for (const key of keys) {
        delete el[key as keyof typeof el];
      }
    };
  }, [interactiveAreaRef, refs, getReferenceProps]);

  return (
    <TooltipFloating
      isOpen={isOpen}
      floatingStyles={floatingStyles}
      refs={refs}
      getFloatingProps={getFloatingProps}
      tooltipContent={<span class="text-single-line">{roomId}</span>}
    />
  );
};

export default MapRoomTooltipBehaviour;
