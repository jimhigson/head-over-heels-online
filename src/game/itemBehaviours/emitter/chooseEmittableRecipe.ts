import type {
  EmittableItemRecipe,
  EmitterEmits,
  WeightedEmittableItemRecipe,
} from "../../../model/json/ItemConfigMap";
import type { WritableNonEmptyTuple } from "../../../utils/types/WritableNonEmptyTuple";

const weightOf = (
  { probabilityWeight }: WeightedEmittableItemRecipe,
  allWeightsZero: boolean,
): number => (allWeightsZero ? 1 : (probabilityWeight ?? 1));

const chooseWeightedRecipe = (
  choices: WritableNonEmptyTuple<WeightedEmittableItemRecipe>,
  roll: number,
): EmittableItemRecipe => {
  const allWeightsZero = choices.every(
    ({ probabilityWeight }) => probabilityWeight === 0,
  );

  let totalWeight = 0;
  for (const choice of choices) {
    totalWeight += weightOf(choice, allWeightsZero);
  }

  const rollWeight = roll * totalWeight;
  let cumulativeWeight = 0;
  let maybeLastChoiceWithWeight: undefined | WeightedEmittableItemRecipe;
  for (const choice of choices) {
    const weight = weightOf(choice, allWeightsZero);
    if (weight > 0) {
      maybeLastChoiceWithWeight = choice;
    }
    cumulativeWeight += weight;
    if (rollWeight < cumulativeWeight) {
      return choice.emits;
    }
  }

  // floating point rounding can leave the roll just past the cumulative total
  if (import.meta.env.DEV && maybeLastChoiceWithWeight === undefined) {
    throw new Error("probabilistic emits had no choice with a weight above 0");
  }
  const lastChoiceWithWeight = maybeLastChoiceWithWeight!;
  return lastChoiceWithWeight.emits;
};

/**
 * resolves what an emitter's `emits` gives for one emission: a plain recipe
 * is itself, a cyclic one steps through its cycle, and a probabilistic one
 * chooses by weight
 */
export const chooseEmittableRecipe = (
  emits: EmitterEmits,
  /**
   * how many items the emitter has emitted so far - which step a cycle is on
   */
  quantityEmitted: number,
  /**
   * a pseudo-random number in [0, 1) - which choice a probabilistic emits makes
   */
  roll: number,
): EmittableItemRecipe => {
  if (emits.type === "cyclic") {
    return emits.cycle[quantityEmitted % emits.cycle.length];
  }
  if (emits.type === "probabilistic") {
    return chooseWeightedRecipe(emits.choices, roll);
  }
  return emits;
};
