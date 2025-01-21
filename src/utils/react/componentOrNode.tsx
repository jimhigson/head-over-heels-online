import { Fragment, type ReactElement } from "react";
import type { JSX } from "react/jsx-runtime";

export const componentOrElement = <P extends JSX.IntrinsicAttributes>(
  either: ((props: P) => ReactElement | null) | ReactElement,
  { key, ...props }: P,
): ReactElement => {
  if (typeof either === "function") {
    const Component = either;
    return <Component {...(props as P)} key={key} />;
  } else {
    return <Fragment key={key}>{either}</Fragment>;
  }
};
