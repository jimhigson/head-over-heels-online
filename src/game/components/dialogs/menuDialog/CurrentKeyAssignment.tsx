import type { AssignableInput, Action } from "@/game/input/InputState";
import { useAppSelector } from "@/store/hooks";
import { BitmapText } from "../../Sprite";

const friendlyName = (k: AssignableInput) => {
  const joystickRegex = /joystick:((?<button>\d+)|(?<axis>x|y))/;
  const joystickMatch = joystickRegex.exec(k);
  if (joystickMatch !== null) {
    const { button, axis } = joystickMatch.groups!;

    if (button) {
      return `🕹${button}`;
    }
    if (axis) {
      return `🕹${axis === "x" ? "⬅➡" : "⬆⬇"}`;
    }
  }

  switch (k) {
    case " ":
      return "space";
    case "ArrowDown":
      return "Cursor⬇";
    case "ArrowUp":
      return "Cursor⬆";
    case "ArrowLeft":
      return "Cursor⬅";
    case "ArrowRight":
      return "Cursor➡";
    default:
      return k;
  }
};

export const CurrentKeyAssignment = ({
  action,
  deliminatorClassName,
  keyClassName,
  className,
}: {
  action: Action;
  deliminatorClassName?: string;
  keyClassName?: string;
  className?: string;
}) => {
  const keys = useAppSelector((state) => {
    return state.inputAssignment[action];
  });

  return (
    <div className={className}>
      {keys.map((k, i) => {
        const isNotLast = i < keys.length - 1;
        return (
          <span className="text-nowrap" key={k}>
            <BitmapText className={keyClassName} noSpaceAfter={isNotLast}>
              {friendlyName(k)}
            </BitmapText>
            {isNotLast && (
              <BitmapText className={deliminatorClassName}>,</BitmapText>
            )}
          </span>
        );
      })}
    </div>
  );
};
