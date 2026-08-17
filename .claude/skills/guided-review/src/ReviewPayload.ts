/* the shapes build.ts embeds in the page, and the page reads back out of it.
   No runtime code lives here - build.ts imports these types directly under
   plain node, and a module with side effects (payload.ts reads the DOM) would
   execute on import even when only its types are wanted. */

export type FileStatus = "A" | "D" | "M" | "R";

export type ReviewItem = {
  path: string;
  status: string;
  /** why this file is here and what to look at, as html */
  note?: string;
};

export type ReviewGroup = {
  title: string;
  /** html */
  blurb?: string;
  items: ReviewItem[];
};

export type ReviewMeta = {
  title: string;
  headerTitle?: string;
  eyebrow?: string;
  /** html */
  lede?: string;
  /** html, each */
  facts?: string[];
  /** html */
  footer?: string;
};

/** a file's whole before and after, for the diff editor to work from */
export type Side = {
  before: string;
  after: string;
  /** what the modified side hashed to when the review was built */
  sha: string;
};

/** one comparable version of an image file */
export type ImageVersion = {
  /** short chooser label, eg "production", "main", "branch" */
  label: string;
  /** what the label resolved to, shown as the chooser tooltip */
  description: string;
  /** index into the row's blob block; byte-identical versions share one */
  blob: number;
  bytes: number;
};

/**
 * an image file's comparable versions. The data uris live in their own inert
 * json block (`block` names its element), parsed only when the row needs them,
 * so evaluating the payload never touches image data. An empty `versions`
 * means the image was left out of the page by the --max-images cap.
 */
export type ImageRow = {
  block: string;
  /** oldest first - the chooser's column order */
  versions: ImageVersion[];
  /** index into versions: the default "from" side of the comparison */
  from: number;
  /** index into versions: the default "to" side of the comparison */
  to: number;
};

export type ReviewPayload = {
  id: string;
  meta: ReviewMeta;
  groups: ReviewGroup[];
  sides: Record<string, Side>;
  /** added and removed line counts, per path */
  stats: Record<string, [number, number]>;
  links: Record<string, string>;
  images: Record<string, ImageRow>;
};

/**
 * one review the page carries - or, in a PR stack, knows of without carrying:
 * a stack sibling whose review nobody has authored yet has no `block`
 */
export type ShellReview = {
  number: number;
  title: string;
  /** the PR page on the forge */
  url: string;
  /** element id of the inert block holding this review's ReviewPayload */
  block?: string;
  /** the review's store id - its ticks and notes directory */
  reviewId?: string;
  /** head branch name, so the server can tell which review edits its checkout */
  head?: string;
  /** an instructions file in the stack directory awaits a contributing agent */
  awaitingContribution?: boolean;
};

/**
 * what the page parses before any review: every review it knows about, in
 * stack order (a plain un-stacked review is a list of one), and which to show
 * first
 */
export type ReviewShell = {
  reviews: ShellReview[];
  /** the `number` of the review shown first */
  current: number;
};

/** a file in reading order, carrying where it sits in the document */
export type ReviewFile = ReviewItem & {
  groupIndex: number;
  id: string;
};

/** what serve.ts injects into the page; absent when the page is just a file */
export type ReviewServer = {
  token: string;
  /** the review whose head branch the served checkout has on disk - the only
      one whose editors may save back; absent when no carried review matches */
  editableReviewId?: string;
};

declare global {
  interface Window {
    __reviewServer?: ReviewServer;
  }
}
