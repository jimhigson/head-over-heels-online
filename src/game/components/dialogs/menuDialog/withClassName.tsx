import type { ReactElement } from "react";

export const withProps =
  <
    ComponentProps extends Record<string, unknown>,
    CompletedProps extends Partial<ComponentProps>,
  >(
    Component: (props: ComponentProps) => null | ReactElement,
    completedProps: CompletedProps,
  ) =>
  (props: Omit<ComponentProps, keyof CompletedProps>) => {
    const finalProps = { ...completedProps, ...props } as ComponentProps;

    return <Component {...finalProps} />;
  };
