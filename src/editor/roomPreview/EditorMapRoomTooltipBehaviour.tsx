import { useEffect } from "preact/hooks";

import { type RoomBehaviourProps } from "../../game/components/dialogs/menuDialog/dialogs/map/RoomDecoratorProps";
import { BitmapText } from "../../game/components/tailwindSprites/BitmapText";
import { TooltipFloating } from "../../ui/tooltip/Tooltip";
import { useTooltip } from "../../ui/tooltip/useTooltip";
import { type EditorRoomId } from "../editorTypes";
import { RoomPreview } from "./RoomPreview";

const EditorMapRoomTooltipBehaviour = ({
  roomId,
  isCurrentRoom,
  interactiveAreaRef,
}: RoomBehaviourProps<EditorRoomId>) => {
  const { refs, floatingStyles, isOpen, getReferenceProps, getFloatingProps } =
    useTooltip({
      tooltipOffset: isCurrentRoom ? 32 : 16,
      tooltipPlacement: "bottom",
      // faster for this one since it has a useful preview, not just help text
      hoverDelay: 50,
    });

  useEffect(() => {
    const el = interactiveAreaRef.current;
    if (!el) {
      return;
    }

    refs.setReference(el);

    const props = getReferenceProps();
    const keys = Object.keys(props);

    Object.assign(el, props);

    return () => {
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
      tooltipContent={
        <div className="flex flex-col gap-y-1">
          <BitmapText>{roomId}</BitmapText>
          {!isCurrentRoom && <RoomPreview roomId={roomId} />}
        </div>
      }
    />
  );
};

export default EditorMapRoomTooltipBehaviour;
