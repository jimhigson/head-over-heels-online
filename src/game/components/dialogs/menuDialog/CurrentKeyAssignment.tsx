import { twMerge } from "tailwind-merge";
import { useAppSelector } from "../../../../store/hooks";
import {
  standardControllerButtonClassnames,
  standardControllerButtonNames,
} from "../../../input/controllers";
import { actionToAxis, type BooleanAction } from "../../../input/InputState";
import type { Key } from "../../../input/keys";
import { MultipleBitmapText } from "../../Sprite";
import { emptyArray } from "../../../../utils/empty";

const specialCharClassName =
  "text-moss zx:text-zxGreen selectedMenuItem:text-mossHalfbrite zx:selectedMenuItem:text-zxGreen";

const friendlyKeyName = (key: Key) => {
  const match = /(Numpad|F)(.*)/.exec(key);
  if (match !== null) {
    return (
      <>
        <span className={specialCharClassName}>{match[1]}</span>
        {match[2]}
      </>
    );
  }

  switch (key) {
    case " ":
      return "space";
    case "ArrowDown":
      return (
        <>
          <span className={specialCharClassName}>Cursor</span>⬇
        </>
      );
    case "ArrowUp":
      return (
        <>
          <span className={specialCharClassName}>Cursor</span>⬆
        </>
      );
    case "ArrowLeft":
      return (
        <>
          <span className={specialCharClassName}>Cursor</span>⬅
        </>
      );
    case "ArrowRight":
      return (
        <>
          <span className={specialCharClassName}>Cursor</span>➡
        </>
      );
    default:
      return key;
  }
};
const friendlyAxisName = (axis: number) => {
  return (
    axis === 0 ? "⬅➡"
    : axis === 1 ? "⬆⬇"
    : `axis${axis}`
  );
};

const friendlyButtonName = (button: number) => {
  const buttonName = standardControllerButtonNames[button];

  switch (buttonName) {
    case "dPadDown":
      return "d-Pad⬇";
    case "dPadUp":
      return "d-Pad⬆";
    case "dPadLeft":
      return "d-Pad⬅";
    case "dPadRight":
      return "d-Pad➡";
  }

  const buttonClassname = (
    standardControllerButtonClassnames as Record<string, unknown>
  )[buttonName] as string;
  if (buttonClassname !== undefined) {
    return <span className={buttonClassname}>{buttonName}</span>;
  }

  return standardControllerButtonNames[button] ?? button;
};

type CurrentKeyAssignmentsProp = {
  action: BooleanAction;
  keyClassName?: string;
  className?: string;
  flashingCursor?: boolean;
};

export const CurrentKeyAssignments = ({
  action,
  keyClassName,
  className,
  flashingCursor = false,
}: CurrentKeyAssignmentsProp) => {
  const pressAssignments = useAppSelector((state) =>
    state.assigningInput?.action === action ?
      // assigning input so show provisional:
      state.assigningInput?.presses
    : state.userSettings.inputAssignment.presses[action],
  );

  const axisAssignments = useAppSelector((state) => {
    const axisForAction = actionToAxis(action);
    if (axisForAction === undefined) {
      return emptyArray;
    }
    if (state.assigningInput?.action === action) {
      return state.assigningInput.axes;
    } else {
      return state.userSettings.inputAssignment.axes[axisForAction.axis];
    }
  });

  return (
    <div className={className}>
      {pressAssignments.keys.map((k) => {
        return (
          <span
            className={twMerge("text-nowrap", keyClassName)}
            key={`key:${k}`}
          >
            <MultipleBitmapText>{friendlyKeyName(k)}</MultipleBitmapText>
          </span>
        );
      })}
      {axisAssignments.map((gamepadAxis: number) => {
        return (
          <span
            className={twMerge("text-nowrap", keyClassName)}
            key={`gamePadAxis:${gamepadAxis}`}
          >
            <MultipleBitmapText>
              <span className={specialCharClassName}>🕹</span>
              {friendlyAxisName(gamepadAxis)}
            </MultipleBitmapText>
          </span>
        );
      })}
      {pressAssignments.gamepadButtons.map((k) => {
        return (
          <span
            className={twMerge("text-nowrap", keyClassName)}
            key={`gamePadButton:${k}`}
          >
            <MultipleBitmapText>
              <span className={specialCharClassName}>🕹</span>
              {friendlyButtonName(k)}
            </MultipleBitmapText>
          </span>
        );
      })}
      {flashingCursor && (
        <span className="sprite texture-hud.char.space bg-[currentColor] animate-flash" />
      )}
    </div>
  );
};
