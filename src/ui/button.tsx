import { cn } from "./cn";
import type { Simplify } from "type-fest";
import type { PropsWithChildren, Ref } from "react";
import { type ReactNode } from "react";
import { Tooltip } from "./Tooltip";

export type ButtonProps = Simplify<
  Pick<
    // support selected html attributes
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "onClick" | "role" | "style" | "disabled" | "className"
  > &
    PropsWithChildren<{
      selected?: boolean;
      tooltipContent?: ReactNode;
      ref?: Ref<HTMLButtonElement>;
    }>
>;

export const Button = ({
  className,
  selected,
  disabled = false,
  onClick,
  ref,
  tooltipContent,
  ...props
}: ButtonProps) => {
  const button = (
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

  return <Tooltip triggerContent={button} tooltipContent={tooltipContent} />;
};
