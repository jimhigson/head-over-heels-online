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

export type ReviewPayload = {
  id: string;
  meta: ReviewMeta;
  groups: ReviewGroup[];
  diffs: Record<string, string>;
  sides: Record<string, Side>;
  /** added and removed line counts, per path */
  stats: Record<string, [number, number]>;
  links: Record<string, string>;
};

/** a file in reading order, carrying where it sits in the document */
export type ReviewFile = ReviewItem & {
  groupIndex: number;
  id: string;
};

/** what serve.ts injects into the page; absent when the page is just a file */
export type ReviewServer = { token: string };

declare global {
  interface Window {
    __reviewServer?: ReviewServer;
  }
}
