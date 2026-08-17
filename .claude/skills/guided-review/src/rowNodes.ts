/* which file the reader is on, and how to get to one.
 *
 * Rows register themselves here as they mount, and the watcher observes
 * whatever is registered whenever it is registered - rows are remounted (the
 * layout changing under a window resize does it), and an observer that only
 * ever saw the first set of nodes would go on watching detached ones and quietly
 * stop tracking the reading.
 */

/** every rendered file row, so the contents can scroll to one by id */
const rowNodes = new Map<string, HTMLElement>();

const inView = new Set<string>();

let observer: IntersectionObserver | undefined;

/** while a click from the contents is still travelling, that file is the
    current one - whatever the rows crossing the viewport say on the way */
let followScrollAfter = 0;

export const holdActiveFile = (milliseconds: number): void => {
  followScrollAfter = performance.now() + milliseconds;
};

export const registerRow = (id: string, node: HTMLElement): void => {
  node.dataset.rowId = id;
  rowNodes.set(id, node);
  observer?.observe(node);
};

export const unregisterRow = (id: string, node: HTMLElement): void => {
  rowNodes.delete(id);
  inView.delete(id);
  observer?.unobserve(node);
};

export const scrollToRow = (id: string): void => {
  rowNodes.get(id)?.scrollIntoView({ block: "start", behavior: "smooth" });
};

/** reports the first file in reading order that is in the top band of the
    viewport, which is the one being read */
export const watchRows = (
  readingOrder: string[],
  report: (id: string) => void,
): (() => void) => {
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const {rowId} = (entry.target as HTMLElement).dataset;
        if (rowId === undefined) {
          continue;
        }
        if (entry.isIntersecting) {
          inView.add(rowId);
        } else {
          inView.delete(rowId);
        }
      }
      const first = readingOrder.find((id) => inView.has(id));
      if (first !== undefined && performance.now() > followScrollAfter) {
        report(first);
      }
    },
    // only the top band of the viewport counts as "where you are"
    { rootMargin: "-25% 0px -60% 0px" },
  );
  // rows mount before the app's own effects run, so the ones already here have
  // to be picked up rather than waited for
  for (const node of rowNodes.values()) {
    observer.observe(node);
  }
  const watching = observer;
  return () => {
    watching.disconnect();
    inView.clear();
    if (observer === watching) {
      observer = undefined;
    }
  };
};
