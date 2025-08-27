import type { JSX } from "react/jsx-runtime";

import { Fragment, type ReactElement } from "react";

export const componentOrElement = <P extends JSX.IntrinsicAttributes>(
  either: ((props: P) => null | ReactElement) | ReactElement,
  { key, ...props }: P,
): ReactElement => {
  if (typeof either === "function") {
    const Component = either;
    return <Component {...(props as P)} key={key} />;
  } else {
    return <Fragment key={key}>{either}</Fragment>;
  }
};
