import { activeReview, shell } from "../payload.ts";
import { switchReview } from "../reviewSwitch.ts";

/**
 * The PR-stack strip along the top: every PR of the stack in order, trunk end
 * first, with the active review highlighted. A sibling whose review the page
 * carries is a button that switches to it in place; one without a review is
 * greyed - marked "awaiting review" when a contribution has been requested -
 * and links to the forge in a new tab.
 */
export const StackBar = () => {
  if (shell.reviews.length < 2) {
    return null;
  }
  const active = activeReview;

  return (
    <nav class="stack-bar" aria-label="PR stack">
      <span class="stack-label">stack</span>
      {shell.reviews.map((review, index) => (
        <span class="stack-step" key={review.number}>
          {index > 0 && <span class="stack-arrow">→</span>}
          {review.number === active.number ?
            <span class="stack-pr is-current" title={review.title} aria-current="page">
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
