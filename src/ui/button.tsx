import * as React from "react";
import { cn } from "./cn";
import type { Simplify } from "type-fest";

export type ButtonProps = Simplify<
  Pick<
    // support selected html attributes
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "onClick" | "role" | "style" | "disabled" | "className"
  > &
    React.PropsWithChildren<{
      selected?: boolean;
    }>
>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, selected, ...props }, ref) => {
    return (
      <button
        data-selected={selected}
        className={cn(
          `inline-flex items-center justify-center whitespace-nowrap 
          bg-metallicBlue zx:bg-zxBlue border-none border-shadow
          gap-2
           disabled:bg-midGrey disabled:text-lightGrey 
           data-[selected=true]:bg-midRed
           [&:not(:disabled):hover:not([data-selected=true])]:bg-moss 
           `,
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button };
