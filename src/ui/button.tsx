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
  ({ className, selected, disabled = false, onClick, ...props }, ref) => {
    return (
      <button
        disabled={disabled}
        onClick={onClick}
        data-selected={selected}
        className={cn(
          `inline-flex items-center justify-center whitespace-nowrap 
          bg-metallicBlue zx:bg-zxBlue border-none border-shadow
          gap-2
           disabled:bg-midGrey disabled:text-lightGrey 
           data-[selected=true]:bg-lightBeige
           [&:not(:disabled):hover:not([data-selected=true])]:bg-pastelBlue 
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
