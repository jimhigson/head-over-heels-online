/* the stack bar asks for a different review through here; main.tsx owns what
   switching actually involves (reload notes and ticks, remount the app) and
   registers itself at startup */

export type ReviewSwitcher = (
  /** the shell `number` of the review to make active */
  number: number,
) => void;

let switcher: ReviewSwitcher = () => {};

export const setReviewSwitcher = (next: ReviewSwitcher): void => {
  switcher = next;
};

export const switchReview = (number: number): void => {
  switcher(number);
};
