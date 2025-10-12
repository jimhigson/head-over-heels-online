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

/**
 * put the keys array into a more readable order for displaying on the mapping
 * choices screen
 */
export const sortKeys = (keys: Key[]): Key[] => {
  const keyCategory = (key: Key): number => {
    if (key.startsWith("Arrow")) {
      return 1;
    }
    if (key.startsWith("Numpad")) {
      return 2;
    }
    return 0;
  };

  return keys.toSorted((a, b) => {
    const categoryDiff = keyCategory(a) - keyCategory(b);
    if (categoryDiff !== 0) {
      return categoryDiff;
    }
    const aForSort = a === " " ? "Space" : a;
    const bForSort = b === " " ? "Space" : b;
    const lengthDiff = aForSort.length - bForSort.length;
    if (lengthDiff !== 0) {
      return lengthDiff;
    }
    return aForSort.localeCompare(bForSort);
  });
};

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
      return "Space";
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
      return "D-pad⬇";
    case "dPadUp":
      return "D-pad⬆";
    case "dPadLeft":
      return "D-pad⬅";
    case "dPadRight":
      return "D-pad➡";
    case "a":
      return (
        <span className="colourised:text-mossHalfbrite colourised:selectedMenuItem:text-moss zx:text-zxGreen">
          A
        </span>
      );
    case "b":
      return (
        <span className="colourised:text-midRedHalfbrite colourised:selectedMenuItem:text-midRed zx:text-zxRed">
          B
        </span>
      );
    case "x":
      return (
        <span className="colourised:text-metallicBlueHalfbrite colourised:selectedMenuItem:text-metallicBlue zx:text-zxBlue">
          X
        </span>
      );
    case "y":
      return (
        <span className="colourised:text-highlightBeigeHalfbrite colourised:selectedMenuItem:text-highlightBeige zx:text-zxYellow">
          Y
        </span>
      );
    case "start":
      return "Start";
    case "select":
      return "Select";
  }

  return standardControllerButtonNames[button]?.toUpperCase() ?? button;
};

type CurrentKeyAssignmentsProp = {
  action: BooleanAction;
  keyClassName?: string;
  className?: string;
  flashingCursor?: boolean;
  inline?: boolean;
};

export const CurrentKeyAssignments = ({
  action,
  keyClassName,
  className,
  flashingCursor = false,
  inline = false,
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

  const keyboardAssignments = (
    <>
      {sortKeys(pressAssignments.keys).map((k) => {
        return (
          <span
            className={twMerge(
              "text-nowrap h-[calc(10px*var(--scale))]",
              keyClassName,
            )}
            key={`key:${k}`}
          >
            <MultipleBitmapText>{friendlyKeyName(k)}</MultipleBitmapText>
          </span>
        );
      })}
      {flashingCursor && (
        <span className="sprite texture-hud_char_space bg-[currentColor] animate-flash" />
      )}
    </>
  );

  const controllerAssignments = (
    <>
      {axisAssignments.map((gamepadAxis: number) => {
        return (
          <span
            className={twMerge(
              "text-nowrap h-[calc(10px*var(--scale))]",
              keyClassName,
            )}
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
            className={twMerge(
              "text-nowrap h-[calc(10px*var(--scale))]",
              keyClassName,
            )}
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
    </>
  );

  return (
    <div className={twMerge(className, inline ? "inline" : "w-full pl-2")}>
      {inline ?
        keyboardAssignments
      : <div className="flex flex-col w-[50%] gap-y-oneScaledPix">
          {keyboardAssignments}
        </div>
      }
      {inline ?
        controllerAssignments
      : <div className="flex flex-col">{controllerAssignments}</div>}
    </div>
  );
};
