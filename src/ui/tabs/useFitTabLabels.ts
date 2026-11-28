import type { RefObject } from "preact";
import { useLayoutEffect } from "preact/hooks";

/**
 * which tabs show their short labels - as `tabLabels.css` reads it
 */
type LabelShortening = "allTabs" | "inactiveTabs" | "none";

/**
 * least shortened first: the active tab's label is the last to be shortened
 */
const labelShortenings: LabelShortening[] = ["none", "inactiveTabs", "allTabs"];

/**
 * marks the tab list with the least shortening at which its tabs fit
 */
const fitTabLabels = (tabList: HTMLElement) => {
  for (const labelShortening of labelShortenings) {
    tabList.dataset.labelShortening = labelShortening;
    if (tabList.scrollWidth <= tabList.clientWidth) {
      return;
    }
  }
};

/**
 * shortens a tab list's labels only as far as it takes for its tabs to fit the
 * width the bar's parent gives it - fitted again whenever the tabs, which tab
 * is active, or that width change
 */
export const useFitTabLabels = (
  tabListRef: RefObject<HTMLElement | null>,
  barRef: RefObject<HTMLElement | null>,
) => {
  useLayoutEffect(() => {
    const { current: tabList } = tabListRef;
    const { current: bar } = barRef;
    if (tabList === null || bar === null) {
      return;
    }
    const { parentElement: barParent } = bar;
    if (barParent === null) {
      return;
    }
    const fit = () => fitTabLabels(tabList);
    fit();
    // marking the tab list isn't a change to its tabs, so isn't observed:
    const mutationObserver = new MutationObserver(fit);
    mutationObserver.observe(tabList, {
      subtree: true,
      childList: true,
      characterData: true,
      attributeFilter: ["aria-selected"],
    });
    const resizeObserver = new ResizeObserver(fit);
    resizeObserver.observe(barParent);
    // a font loading resizes the labels:
    document.fonts.addEventListener("loadingdone", fit);
    return () => {
      mutationObserver.disconnect();
      resizeObserver.disconnect();
      document.fonts.removeEventListener("loadingdone", fit);
    };
  }, [tabListRef, barRef]);
};
