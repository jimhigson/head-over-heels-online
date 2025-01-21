import { useAppSelector } from "../../../../store/hooks";
import type { Action, AssignableInput } from "../../../input/InputState";
import { BitmapText, CssSprite } from "../../Sprite";
import { twMerge } from "tailwind-merge";

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
  flashingCursor = false,
}: {
  action: Action;
  deliminatorClassName?: string;
  keyClassName?: string;
  className?: string;
  flashingCursor?: boolean;
}) => {
  const keys = useAppSelector((state) => {
    return state.userSettings.inputAssignment[action];
  });

  return (
    <div className={className}>
      {keys.map((k, i) => {
        const isNotLast = i < keys.length - 1;
        return (
          <span className="text-nowrap" key={k}>
            <BitmapText className={keyClassName}>{friendlyName(k)}</BitmapText>
            {isNotLast && (
              <BitmapText className={twMerge("me-1", deliminatorClassName)}>
                ,
              </BitmapText>
            )}
          </span>
        );
      })}
      {flashingCursor && (
        <CssSprite className="texture-hud.char.space bg-[currentColor] animate-flash" />
      )}
    </div>
  );
};
