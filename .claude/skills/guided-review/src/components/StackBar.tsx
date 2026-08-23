import { useEffect } from "preact/hooks";

import { activeReview, files, shell, total } from "../payload.ts";
import { type ReadingState } from "../readingState.ts";
import { type ShellReview } from "../ReviewPayload.ts";
import { switchReview } from "../reviewSwitch.ts";
import { loadStackProgress, setSiblingTicked, stackProgressStore } from "../stackProgress.ts";
import { useStore } from "../stores.ts";

export type StackBarProps = { state: ReadingState };

/**
 * The PR-stack strip along the top: every PR of the stack in order, trunk end
 * first, with the active review highlighted. A sibling whose review the page
 * carries is a button that switches to it in place; one without a review is
 * greyed - marked "awaiting review" when a contribution has been requested -
 * and links to the forge in a new tab. Each carried review gets a checkbox
 * showing whether every one of its files has been ticked - live for the
 * active review, fetched once for the others - and ticking it there ticks
 * every file of that review at once.
 */
export const StackBar = ({ state }: StackBarProps) => {
  const progress = useStore(stackProgressStore);

  useEffect(() => {
    loadStackProgress();
  }, []);

  if (shell.reviews.length < 2) {
    return null;
  }
  const active = activeReview;

  const readCheckbox = (review: ShellReview) => {
    const isActiveReview = review.number === active.number;
    const [done, reviewTotal] =
      isActiveReview ? [state.ticked.size, total] : (
        [progress[review.number]?.ticked ?? 0, progress[review.number]?.total ?? 0]
      );
    const onToggle = (on: boolean) => {
      if (isActiveReview) {
        for (const file of files) {
          state.tickFile(file, on);
        }
        return;
      }
      if (review.block === undefined) {
        return;
      }
      setSiblingTicked({ ...review, block: review.block }, on);
    };
    return (
      <input
        class="tick small"
        type="checkbox"
        checked={reviewTotal > 0 && done === reviewTotal}
        indeterminate={done > 0 && done < reviewTotal}
        aria-label={`Tick every file in ${review.title}`}
        onClick={(event) => event.stopPropagation()}
        onChange={(event) => onToggle(event.currentTarget.checked)}
      />
    );
  };

  return (
    <nav class="stack-bar" aria-label="PR stack">
      <span class="stack-label">stack</span>
      {shell.reviews.map((review, index) => (
        <span class="stack-step" key={review.number}>
          {index > 0 && <span class="stack-arrow">→</span>}
          {review.number === active.number ?
            <span class="stack-pr is-current" title={review.title} aria-current="page">
              {readCheckbox(review)}
              <span class="stack-number">#{review.number}</span>
              <span class="stack-title">{review.title}</span>
            </span>
          : review.block !== undefined ?
            <button
              type="button"
              class="stack-pr"
              title={review.title}
              onClick={() => switchReview(review.number)}
            >
              {readCheckbox(review)}
              <span class="stack-number">#{review.number}</span>
              <span class="stack-title">{review.title}</span>
            </button>
          : <a
              class="stack-pr is-unreviewed"
              href={review.url}
              target="_blank"
              rel="noreferrer"
              title={`${review.title} — ${
                review.awaitingContribution === true ?
                  "review requested from its agent, not yet contributed"
                : "no review in this page"
              }`}
            >
              <span class="stack-number">#{review.number}</span>
              <span class="stack-title">{review.title}</span>
              {review.awaitingContribution === true && (
                <span class="stack-awaiting">awaiting review</span>
              )}
              <span class="stack-forge">↗</span>
            </a>
          }
        </span>
      ))}
    </nav>
  );
};
