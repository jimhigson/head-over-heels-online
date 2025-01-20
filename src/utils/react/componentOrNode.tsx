import type { ReactElement } from "react";
import type { JSX } from "react/jsx-runtime";

export const componentOrElement = <P extends JSX.IntrinsicAttributes>(
  either: ((props: P) => ReactElement | null) | ReactElement,
  props: P,
): ReactElement => {
  if (typeof either === "function") {
    const Component = either;
    return <Component {...props} />;
  } else {
    return either;
  }
};
