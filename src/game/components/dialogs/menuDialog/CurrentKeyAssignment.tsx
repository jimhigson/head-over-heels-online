import { twMerge } from "tailwind-merge";

import type { BooleanAction } from "../../../input/actions";
import type { Key } from "../../../input/keys";

import { useAppSelector } from "../../../../store/hooks";
import { selectInputAssignment } from "../../../../store/slices/gameMenus/gameMenusSelectors";
import { emptyArray } from "../../../../utils/empty";
import { actionToAxis } from "../../../input/actionToAxis";
import { standardControllerButtonNames } from "../../../input/controllers";
import { MultipleBitmapText } from "../../tailwindSprites/Sprite";

const specialCharClassName =
  "text-mossHalfbrite zx:text-zxGreen selectedMenuItem:text-moss zx:selectedMenuItem:text-zxGreen";

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

const axisNames = ["⬅➡", "⬆⬇", "R⬅➡", "R⬆⬇"];
const friendlyAxisName = (axis: number) => {
  return axisNames[axis] ?? `axis${axis}`;
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
    case "a":
      return (
        <span className="colourised:text-mossHalfbrite colourised:selectedMenuItem:text-moss zx:text-zxGreen">
          a
        </span>
      );
    case "b":
      return (
        <span className="colourised:text-midRedHalfbrite colourised:selectedMenuItem:text-midRed zx:text-zxRed">
          b
        </span>
      );
    case "x":
      return (
        <span className="colourised:text-metallicBlueHalfbrite colourised:selectedMenuItem:text-metallicBlue zx:text-zxBlue">
          x
        </span>
      );
    case "y":
      return (
        <span className="colourised:text-highlightBeigeHalfbrite colourised:selectedMenuItem:text-highlightBeige zx:text-zxYellow">
          y
        </span>
      );
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
    state.gameMenus.assigningInput?.action === action ?
      // assigning input so show provisional:
      state.gameMenus.assigningInput?.presses
    : selectInputAssignment(state).presses[action],
  );

  const axisAssignments = useAppSelector((state) => {
    const axisForAction = actionToAxis(action);
    if (axisForAction === undefined) {
      return emptyArray;
    }
    if (state.gameMenus.assigningInput?.action === action) {
      return state.gameMenus.assigningInput.axes;
    } else {
      return selectInputAssignment(state).axes[axisForAction.axis];
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
        <span className="sprite texture-hud_char_space bg-[currentColor] animate-flash" />
      )}
    </div>
  );
};
