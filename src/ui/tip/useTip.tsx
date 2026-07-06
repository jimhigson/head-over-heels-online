import { type ComponentChildren, type VNode } from "preact";
import { useId } from "preact/hooks";

import { Tip } from "./Tip";

export type UseTipOptions = {
  /** see {@link TipProps#svgInvoker} */
  svgInvoker?: boolean;
};

/**
 * the two fields are correlated: with content, both the invoker attribute and
 * the tip element; without, neither - so a trigger never carries an
 * `interestfor` referencing a popover that isn't rendered
 */
export type UseTipReturn =
  | { interestfor: string; tip: VNode }
  | { interestfor: undefined; tip: null };

/**
 * pairs a trigger with a tooltip without the caller inventing an id: put the
 * returned `interestfor` on the trigger button/link and render `tip` as a
 * sibling. Both are undefined/null when there is no content, so triggers
 * without tooltips render clean
 */
export const useTip = (
  content: ComponentChildren,
  { svgInvoker }: UseTipOptions = {},
): UseTipReturn => {
  const id = useId();

  return !content ?
      { interestfor: undefined, tip: null }
    : {
        interestfor: id,
        tip: (
          <Tip id={id} svgInvoker={svgInvoker}>
            {content}
          </Tip>
        ),
      };
};
