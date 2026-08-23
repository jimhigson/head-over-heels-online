/* how much of each stack sibling's review has been read, for the checkbox
   beside it in the stack bar - and ticking a whole one at once from there.
   Only the active review's ticks change live in this page - a sibling's are
   fetched once per mount and written directly, the same way its own page
   would: from the server when served, else localStorage. */

import { server, shell } from "./payload.ts";
import { type ReviewPayload, type ShellReview } from "./ReviewPayload.ts";
import { makeStore } from "./stores.ts";

export type StackProgress = { ticked: number; total: number };

export const stackProgressStore = makeStore<Record<number, StackProgress>>({});

const hasBlock = (review: ShellReview): review is ShellReview & { block: string } =>
  review.block !== undefined;

const pathsOf = (block: string): string[] => {
  const element = document.getElementById(block);
  if (element === null) {
    return [];
  }
  const parsed = JSON.parse(element.textContent ?? "{}") as ReviewPayload;
  return parsed.groups.flatMap((group) => group.items.map((item) => item.path));
};

const tickedCountOf = async (review: ShellReview & { block: string }): Promise<number> => {
  if (review.reviewId === undefined) {
    return 0;
  }
  if (server === undefined) {
    try {
      const stored = localStorage.getItem(`guidedReviewTicks:${review.reviewId}`);
      return stored === null ? 0 : (JSON.parse(stored) as string[]).length;
    } catch {
      return 0;
    }
  }
  const response = await fetch(`/ticks?review=${encodeURIComponent(review.reviewId)}`).catch(
    () => undefined,
  );
  if (response?.ok !== true) {
    return 0;
  }
  const body = (await response.json()) as { ticked: string[] };
  return body.ticked.length;
};

export const loadStackProgress = async (): Promise<void> => {
  const entries = await Promise.all(
    shell.reviews.filter(hasBlock).map(async (review) => {
      const total = pathsOf(review.block).length;
      const ticked = await tickedCountOf(review);
      return [review.number, { ticked, total }] as const;
    }),
  );
  stackProgressStore.set(Object.fromEntries(entries));
};

/** ticks (or unticks) every file of a stack sibling that isn't the active
    review - the active one's own tick state lives in the page and is set
    through it instead */
export const setSiblingTicked = async (
  review: ShellReview & { block: string },
  on: boolean,
): Promise<void> => {
  if (review.reviewId === undefined) {
    return;
  }
  const paths = pathsOf(review.block);
  const ticked = on ? paths : [];

  // optimistic: the fetch/write below can take a moment, and the checkbox
  // reads this store, not the request in flight
  stackProgressStore.set({
    ...stackProgressStore.get(),
    [review.number]: { ticked: ticked.length, total: paths.length },
  });

  if (server === undefined) {
    try {
      localStorage.setItem(`guidedReviewTicks:${review.reviewId}`, JSON.stringify(ticked));
    } catch {
      /* storage unavailable - the choice just won't outlive the page */
    }
    return;
  }

  await fetch(`/ticks?review=${encodeURIComponent(review.reviewId)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Review-Token": server.token },
    body: JSON.stringify({ ticked }),
  }).catch(() => undefined);
};
