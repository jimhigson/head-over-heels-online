import type { PartialDeep } from "type-fest";
import type { InputAssignment } from "./InputState";
import { allActions } from "./actions";
import { emptyInputAssignment } from "./emptyInputAssignment";

const combineWithoutDuplicates = <T,>(
  a: T[] | undefined,
  b: T[] | undefined,
): T[] => Array.from(new Set([...(a ?? []), ...(b ?? [])]));

export type PartialInputAssignment = PartialDeep<InputAssignment>;

export function combineInputAssignments(
  ...assignments: PartialInputAssignment[]
): InputAssignment {
  return {
    presses: assignments.reduce(
      (
        ac: InputAssignment["presses"],
        curAssignment,
      ): InputAssignment["presses"] => {
        for (const action of allActions) {
          ac[action] = {
            keys: combineWithoutDuplicates(
              ac[action]?.keys,
              curAssignment?.presses?.[action]?.keys,
            ),
            gamepadButtons: combineWithoutDuplicates(
              ac[action]?.gamepadButtons,
              curAssignment?.presses?.[action]?.gamepadButtons,
            ),
          };
        }
        return ac;
      },
      structuredClone(emptyInputAssignment.presses),
    ),
    axes: {
      x: Array.from(
        new Set([
          ...emptyInputAssignment.axes.x,
          ...assignments.map((a) => a.axes?.x ?? []).flat(),
        ]),
      ),
      y: Array.from(
        new Set([
          ...emptyInputAssignment.axes.y,
          ...assignments.map((a) => a.axes?.y ?? []).flat(),
        ]),
      ),
    },
  };
}
