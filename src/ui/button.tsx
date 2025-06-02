import * as React from "react";
import { cn } from "./utils";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <button
        className={cn(
          `inline-flex h-6 items-center justify-center whitespace-nowrap bg-metallicBlue zx:bg-zxBlue border-solid border-shadow hover:bg-moss gap-2`,
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
