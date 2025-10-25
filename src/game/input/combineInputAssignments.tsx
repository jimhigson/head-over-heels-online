import type { PartialDeep } from "type-fest";

import type { InputAssignment } from "./InputAssignment";
import type { Key } from "./keys";

import { allActions } from "./actions";
import { emptyInputAssignment } from "./emptyInputAssignment";

const combineWithoutDuplicates = <T,>(
  a: T[] | undefined,
  b: T[] | undefined,
): T[] => Array.from(new Set([...(a ?? []), ...(b ?? [])]));

export type PartialInputAssignment = PartialDeep<InputAssignment>;

/**
 * later assignments override earlier ones if they define the same keys, buttons, axes
 */
export function combineInputAssignments(
  ...assignments: PartialInputAssignment[]
): InputAssignment {
  // Track which inputs have been claimed by later assignments
  const claimedKeys = new Set<Key>();
  const claimedButtons = new Set<number>();
  const claimedAxes = new Set<number>();
  const claimedRadialAxes = new Set<number>();

  // Process assignments in reverse order so later ones take precedence
  return assignments.reduceRight(
    (ac: InputAssignment, curAssignment): InputAssignment => {
      const alreadyClaimedKeys = new Set<Key>(claimedKeys);
      const alreadyClaimedButtons = new Set<number>(claimedButtons);
      const alreadyClaimedAxes = new Set<number>(claimedAxes);
      const alreadyClaimedRadialAxes = new Set<number>(claimedRadialAxes);

      // Process presses
      for (const action of allActions) {
        const currentKeys = curAssignment?.presses?.[action]?.keys ?? [];
        const currentButtons =
          curAssignment?.presses?.[action]?.gamepadButtons ?? [];

        // Filter out keys and buttons that have been claimed by later assignments
        const unclaimedKeys = currentKeys.filter(
          (key) => !alreadyClaimedKeys.has(key),
        );
        const unclaimedButtons = currentButtons.filter(
          (button) => !alreadyClaimedButtons.has(button),
        );

        // Add unclaimed inputs to this action
        ac.presses[action] = {
          keys: combineWithoutDuplicates(
            ac.presses[action]?.keys,
            unclaimedKeys,
          ),
          gamepadButtons: combineWithoutDuplicates(
            ac.presses[action]?.gamepadButtons,
            unclaimedButtons,
          ),
        };

        // Mark these inputs as claimed
        for (const key of currentKeys) {
          claimedKeys.add(key);
        }
        for (const button of currentButtons) {
          claimedButtons.add(button);
        }
      }

      // Process axes
      for (const axisType of ["x", "y", "xLook", "yLook"] as const) {
        const currentAxes = curAssignment.axes?.[axisType] ?? [];
        const unclaimedAxes = currentAxes.filter(
          (axis) => !alreadyClaimedAxes.has(axis),
        );
        ac.axes[axisType] = combineWithoutDuplicates(
          ac.axes[axisType],
          unclaimedAxes,
        );
        // Mark these axes as claimed
        for (const axis of currentAxes) {
          claimedAxes.add(axis);
        }
      }

      // Process radial axes
      const currentRadialAxes = curAssignment.radialAxes?.xy ?? [];
      const unclaimedRadialAxes = currentRadialAxes.filter(
        (axis) => !alreadyClaimedRadialAxes.has(axis),
      );
      if (ac.radialAxes) {
        ac.radialAxes.xy = combineWithoutDuplicates(
          ac.radialAxes.xy,
          unclaimedRadialAxes,
        );
      }
      // Mark these radial axes as claimed
      for (const axis of currentRadialAxes) {
        claimedRadialAxes.add(axis);
      }

      return ac;
    },
    structuredClone(emptyInputAssignment),
  );
}
