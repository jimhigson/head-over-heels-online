import type { ReactNode } from "react";

import { Fragment } from "react";

import { linkOpenExternalClickHandler } from "../../../../../../utils/tauri/openExternalLink";

type StackTracesWithLinksProps = {
  children: string;
};

const PROJECT_ROOT = "/Users/jim/dev/hohjs";

export const StackTracesWithLinks = ({
  children,
}: StackTracesWithLinksProps) => {
  const urlRegex = /https?:\/\/[^\s)>\]}]+/gi;
  const parts = children.split(urlRegex);
  const matches = [...children.matchAll(urlRegex)];

  const result: ReactNode[] = [];

  parts.forEach((part, index) => {
    result.push(part);
    const match = matches[index];
    if (match) {
      try {
        const [original] = match;
        const url = new URL(original);

        // Skip Vite dependency chunks
        if (url.pathname.startsWith("/node_modules/.vite/deps/")) {
          result.push(original);
          return;
        }

        const fullPath = `${PROJECT_ROOT}${url.pathname}`;
        const lineCharMatch = original.match(/:(\d+):(\d+)$/);
        const lineSuffix =
          lineCharMatch ? `:${lineCharMatch[1]}:${lineCharMatch[2]}` : "";

        const vscodeHref = `vscode://file${fullPath}${lineSuffix}`;

        result.push(
          <a
            key={index}
            onClick={linkOpenExternalClickHandler}
            href={vscodeHref}
            target="_blank"
          >
            {url.pathname}
          </a>,
        );
      } catch {
        result.push(match[0]);
      }
    }
  });

  return <Fragment>{result}</Fragment>;
};
