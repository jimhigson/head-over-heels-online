import { type ComponentChildren } from "preact";
import { createPortal } from "preact/compat";
import { useEffect, useRef } from "preact/hooks";

import { BlockyMarkdown } from "../../game/components/BlockyMarkdown";
import { CssVariables } from "../../game/components/CssVariables";
import { cn } from "../cn";

declare module "preact" {
  // interest invokers (Chrome 142+): not yet in preact's own attribute types
  interface HTMLAttributes<RefType extends EventTarget = EventTarget> {
    interestfor?: string;
  }
  interface SVGAttributes<Target extends EventTarget = SVGElement> {
    interestfor?: string;
  }
}

/** fired on the tip when its invoker gains interest (hover/focus/long-press) */
type InterestEvent = Event & { source: Element };

export type TipProps = {
  /** referenced by the invoker's `interestfor` attribute */
  id: string;
  /**
   * the invoker is an element inside an svg: css anchor positioning cannot see
   * svg geometry, so portal the tip out of the svg tree and position it from
   * the invoker's bounding rect each time interest is shown
   */
  svgInvoker?: boolean;
  /** extra distance in viewport px below the invoker; svgInvoker mode only */
  offset?: number;
  children: ComponentChildren;
};

/**
 * the styled tooltip rectangle, shown as a hint popover in the top layer.
 * Pair with any button/link carrying `interestfor={id}` - the browser handles
 * hover intent (see the `interest-delay` rule in the anchorPopovers tailwind
 * plugin), focus, dismissal and positioning (css anchor positioning against
 * the invoker as implicit anchor)
 */
export const Tip = ({
  id,
  svgInvoker = false,
  offset = 0,
  children,
}: TipProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgInvoker) {
      return;
    }
    const el = ref.current;
    if (el === null) {
      return;
    }
    const handleInterest = (e: Event) => {
      const rect = (e as InterestEvent).source.getBoundingClientRect();
      // centred under the invoker's bounding box (the class translates -50% x)
      el.style.left = `${rect.left + rect.width / 2}px`;
      el.style.top = `${rect.bottom + offset}px`;
    };
    el.addEventListener("interest", handleInterest);
    return () => el.removeEventListener("interest", handleInterest);
  }, [svgInvoker, offset]);

  const tip = (
    // CssVariables wraps the popover from outside: custom properties inherit
    // through the DOM tree (top layer included), so --block/--scale resolve
    // for the popover's own padding and drop shadow
    <CssVariables scaleFactor={2}>
      <div
        id={id}
        popover="hint"
        ref={ref}
        class={cn(
          "bg-lightBeige zx:bg-zxYellowDimmed toppy:bg-toppyWarm2 toppy:text-toppyCool4 text-white p-1 drop-shadow-oneBlock",
          svgInvoker ? "tip-svg-invoker" : "tip",
        )}
      >
        {typeof children === "string" ?
          <div class="max-w-16">
            <BlockyMarkdown markdown={children} />
          </div>
        : children}
      </div>
    </CssVariables>
  );

  // a <div> can't live inside the svg tree; the top layer positions it anyway
  return svgInvoker ? createPortal(tip, document.body) : tip;
};
