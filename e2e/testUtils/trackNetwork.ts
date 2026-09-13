import { type Page, type Request } from "@playwright/test";
import chalk from "chalk";

import { elapsed, formatDuration } from "./logging";

/** enough to name the culprit without burying the failure that listed them */
const maxRequestsListed = 20;

export type TrackedNetwork = {
  /**
   * log every request that has been started but has neither finished nor
   * failed, oldest first
   */
  logRequestsStillInFlight: () => void;
};

/**
 * watch the page's network so a load that goes wrong says so in the log.
 *
 * Two kinds otherwise go unreported. A response that arrives with an error
 * status is not a failure as far as the browser is concerned, so nothing
 * announces it; and a request that stalls produces no event at all - the only
 * sign of it is whatever was waiting on it timing out much later, by which
 * point the log has nothing to say about why. The first is reported as it
 * happens, the second by
 * {@link TrackedNetwork.logRequestsStillInFlight} at the moment of the failure
 */
export const trackNetwork = (
  page: Page,
  formattedName: string,
): TrackedNetwork => {
  const startedAtByRequest = new Map<Request, number>();

  page.on("request", (request) => {
    startedAtByRequest.set(request, performance.now());
  });
  page.on("requestfinished", (request) => {
    startedAtByRequest.delete(request);
  });
  page.on("requestfailed", (request) => {
    startedAtByRequest.delete(request);
    console.log(
      `${formattedName} ${elapsed()} ${chalk.red("[request failed]")} ${request.method()} ${request.url()} - ${request.failure()?.errorText ?? "no reason given"}`,
    );
  });
  page.on("response", (response) => {
    if (response.status() >= 400) {
      console.log(
        `${formattedName} ${elapsed()} ${chalk.red(`[http ${response.status()}]`)} ${response.request().method()} ${response.url()}`,
      );
    }
  });

  return {
    logRequestsStillInFlight() {
      if (startedAtByRequest.size === 0) {
        console.log(`${formattedName} ${elapsed()} no requests were in flight`);
        return;
      }

      const now = performance.now();
      console.log(
        `${formattedName} ${elapsed()} ${chalk.yellow(`[${startedAtByRequest.size} request(s) still in flight]`)} oldest first:`,
      );
      const oldestFirst = startedAtByRequest
        .entries()
        .toArray()
        .sort(([, startedAtA], [, startedAtB]) => startedAtA - startedAtB)
        .slice(0, maxRequestsListed);
      for (const [request, startedAt] of oldestFirst) {
        console.log(
          `${formattedName} ${elapsed()}   started ${formatDuration(now - startedAt)} ago: ${request.method()} ${request.url()}`,
        );
      }
    },
  };
};
