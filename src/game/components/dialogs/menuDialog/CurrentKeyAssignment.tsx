import type { AssignableInput } from "../../../input/InputState";
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
  inputs,
  deliminatorClassName,
  keyClassName,
  className,
  flashingCursor = false,
}: {
  inputs: Readonly<AssignableInput[]>;
  deliminatorClassName?: string;
  keyClassName?: string;
  className?: string;
  flashingCursor?: boolean;
}) => {
  return (
    <div className={className}>
      {inputs.map((k, i) => {
        const isNotLast = i < inputs.length - 1;
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
